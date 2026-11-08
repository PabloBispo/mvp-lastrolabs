import { useEffect, useMemo, useState } from 'react';
import AppLayout from '../components/layout/AppLayout.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import StatusBadge, { STATUS } from '../components/ui/StatusBadge.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import useAsync from '../hooks/useAsync.js';
import { api } from '../mocks/api.js';

// Hash sintético estável para os laudos do seed (os enviados na demo têm hash real).
const fakeHash = (seed) => {
  let h = 2166136261;
  let out = '';
  for (let i = 0; out.length < 64; i++) {
    h ^= seed.charCodeAt(i % seed.length) + i;
    h = Math.imul(h, 16777619) >>> 0;
    out += h.toString(16).padStart(8, '0');
  }
  return out.slice(0, 64);
};

const ORDER = { [STATUS.EM_ANALISE]: 0, [STATUS.CORRECAO]: 1, [STATUS.APROVADO]: 2 };
const fmtDate = (iso) => new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

/** Análise da IA: checagens explicáveis (sinal para o analista, não decisão). */
function analyze(p) {
  const arquivos = p.evidencia?.arquivos?.length
    ? p.evidencia.arquivos
    : [{ nome: `laudo-${p.guia}.pdf`, tamanho: 184_320, hash: fakeHash(p.guia) }];
  const checks = [
    { ok: true, label: 'Paciente do laudo confere com a guia', detalhe: `${p.nome} · ${p.guia}` },
    { ok: true, label: 'Procedimento confere (código TUSS)', detalhe: p.exame },
    { ok: true, label: 'Laudo assinado por médico com CRM ativo', detalhe: 'Dra. Camila Rezende · CRM 000000' },
    { ok: true, label: 'Selo do arquivo registrado (SHA-256)', detalhe: `${arquivos.length} arquivo(s)` },
    { ok: true, label: 'Imagem inédita (sem reuso em outra guia)', detalhe: 'Hash perceptual sem correspondência' },
  ];
  let risco = 8;
  if (p.duplicidade) {
    risco += 40;
    checks.push({
      ok: false,
      label: `Exame repetido: mesmo TUSS há ${p.duplicidade.dias} dias`,
      detalhe: `${p.duplicidade.prestador} · ${p.duplicidade.laudo ? 'laudo anterior disponível' : 'anterior pago SEM laudo'}`,
    });
    if (!p.duplicidade.laudo) risco += 30;
  }
  if (p.status === STATUS.CORRECAO && !p.decisao) {
    risco += 20;
    checks.push({ ok: false, label: 'Data do laudo diferente da data de execução', detalhe: 'Divergência de 3 dias' });
  }
  risco = Math.min(risco, 99);
  const nivel = risco >= 60 ? 'Alto' : risco >= 30 ? 'Médio' : 'Baixo';
  const recomendacao = risco >= 60 ? 'Revisar com auditoria médica antes de liberar' : risco >= 30 ? 'Revisar pertinência do pedido' : 'Liberar pagamento';
  return { arquivos, checks, risco, nivel, recomendacao };
}

const NIVEL_STYLE = {
  Alto: 'bg-red-50 text-red-700 border-red-200',
  Médio: 'bg-amber-50 text-amber-800 border-amber-200',
  Baixo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function Kpi({ label, value, hint, tone = 'text-ink' }) {
  return (
    <Card className="p-4 lg:p-5">
      <p className="text-xs font-medium text-ink-soft">{label}</p>
      <p className={`mt-1 text-2xl font-bold lg:text-3xl ${tone}`}>{value}</p>
      {hint && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
    </Card>
  );
}

export default function OperatorPage({ route }) {
  const notify = useToast();
  const doctor = useAsync(api.getDoctor);
  const { data, loading } = useAsync(api.listPatients, []);
  const [list, setList] = useState([]);
  const [selId, setSelId] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [deciding, setDeciding] = useState(false);

  useEffect(() => setList(data), [data]);

  const queue = useMemo(
    () =>
      list
        .filter((p) => p.enviado)
        .map((p) => ({ ...p, ia: analyze(p) }))
        .sort((a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9) || b.ia.risco - a.ia.risco),
    [list],
  );
  const sel = queue.find((p) => p.id === selId) ?? queue[0];
  useEffect(() => setMotivo(''), [sel?.id]);

  const count = (s) => list.filter((p) => p.status === s).length;
  const dups = list.filter((p) => p.duplicidade).length;

  const decide = async (status) => {
    if (status === STATUS.CORRECAO && !motivo.trim()) return notify('Informe o motivo da correção', 'error');
    setDeciding(true);
    try {
      const upd = await api.decide(sel.id, status, motivo.trim());
      setList((l) => l.map((p) => (p.id === upd.id ? upd : p)));
      notify(status === STATUS.APROVADO ? `Laudo de ${sel.nome} aprovado, pagamento liberado` : `Correção solicitada para ${sel.nome}`);
    } finally {
      setDeciding(false);
    }
  };

  return (
    <AppLayout doctor={doctor.data} route={route}>
      <PageHeader title="Espaço da Operadora" subtitle="Laudos recebidos, análise da IA e decisão do analista antes do pagamento" />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 lg:mt-8 lg:grid-cols-5 lg:gap-4">
        <Kpi label="Em análise" value={count(STATUS.EM_ANALISE)} hint="aguardando decisão" tone="text-[#8A2B0A]" />
        <Kpi label="Aprovados" value={count(STATUS.APROVADO)} hint="pagamento liberado" tone="text-[#1D5E8C]" />
        <Kpi label="Correção solicitada" value={count(STATUS.CORRECAO)} hint="devolvidos ao executante" tone="text-red-700" />
        <Kpi label="Sem laudo" value={count(STATUS.PENDENTE)} hint="pagamento retido" tone="text-slate-600" />
        <Kpi label="Duplicidades" value={dups} hint="mesmo exame em até 90 dias" tone="text-amber-700" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_440px]">
        <Card className="p-4 lg:p-6">
          <h2 className="mb-3 text-base font-semibold text-ink">Fila de laudos</h2>
          {loading ? (
            <p className="py-10 text-center text-sm text-slate-400">Carregando…</p>
          ) : queue.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">Nenhum laudo recebido.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {queue.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelId(p.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${sel?.id === p.id ? 'bg-[#E6F7FA]' : 'hover:bg-slate-50'}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">{p.nome}</p>
                      <p className="truncate text-xs text-slate-500">
                        {p.exame} · Guia {p.guia}
                      </p>
                    </div>
                    <span className={`hidden rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:inline ${NIVEL_STYLE[p.ia.nivel]}`}>
                      Risco {p.ia.risco}
                    </span>
                    <StatusBadge status={p.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {sel && (
          <Card className="h-fit p-5 lg:sticky lg:top-6 lg:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-ink">{sel.nome}</h2>
                <p className="text-xs text-slate-500">
                  {sel.exame} · Guia {sel.guia}
                </p>
                <p className="text-xs text-slate-500">
                  Solicitante {sel.solicitante} · Executante Dra. Camila Rezende
                </p>
              </div>
              <StatusBadge status={sel.status} />
            </div>

            <div className={`mt-4 rounded-xl border px-4 py-3 ${NIVEL_STYLE[sel.ia.nivel]}`}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold">Análise da IA</span>
                <span className="text-xs">
                  Risco <span className="text-lg font-bold">{sel.ia.risco}</span>/100 · {sel.ia.nivel}
                </span>
              </div>
              <p className="mt-1 text-xs">Recomendação: {sel.ia.recomendacao}</p>
            </div>

            <ul className="mt-4 space-y-2">
              {sel.ia.checks.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${c.ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                    {c.ok ? '✓' : '!'}
                  </span>
                  <span className="min-w-0">
                    <span className="text-slate-800">{c.label}</span>
                    <span className="block text-xs text-slate-500">{c.detalhe}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-600">Lastro anexado</p>
              {sel.ia.arquivos.map((f, i) => (
                <div key={i} className="rounded-lg border border-slate-200 px-3 py-2">
                  <p className="truncate text-xs font-medium text-slate-800">{f.nome}</p>
                  <p className="break-all font-mono text-[10px] text-slate-500">SHA-256 {f.hash}</p>
                </div>
              ))}
              {sel.evidencia?.enviadoEm && <p className="text-[11px] text-slate-400">Recebido em {fmtDate(sel.evidencia.enviadoEm)}</p>}
            </div>

            {sel.decisao ? (
              <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{sel.status}</span> por {sel.decisao.por} em {fmtDate(sel.decisao.em)}
                {sel.decisao.motivo && <span className="block">Motivo: {sel.decisao.motivo}</span>}
              </div>
            ) : sel.status === STATUS.EM_ANALISE ? (
              <div className="mt-5 space-y-3">
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  rows={2}
                  placeholder="Motivo (obrigatório para solicitar correção)"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-lastro-teal focus:outline-none"
                />
                <div className="flex gap-2">
                  <Button size="md" className="flex-1 justify-center" disabled={deciding} onClick={() => decide(STATUS.APROVADO)}>
                    Aprovar e liberar
                  </Button>
                  <Button size="md" variant="secondary" className="flex-1 justify-center" disabled={deciding} onClick={() => decide(STATUS.CORRECAO)}>
                    Solicitar correção
                  </Button>
                </div>
                <p className="text-[11px] text-slate-400">A IA sugere, o analista decide. Toda decisão fica registrada com autor, data e motivo.</p>
              </div>
            ) : (
              <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{sel.status}</span> por Juliana (regulação) em análise anterior
                {sel.status === STATUS.CORRECAO && <span className="block">Motivo: data do laudo diverge da execução; reenviar laudo corrigido.</span>}
              </div>
            )}
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
