import { useEffect, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

const ACCEPT = '.pdf,.dcm,image/*,application/pdf,application/dicom';

async function sha256(file) {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const fmtSize = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/**
 * Envio do laudo: o executante anexa o laudo (PDF) e/ou a evidência
 * (DICOM ou foto). O navegador calcula o SHA-256 de cada arquivo, que
 * vira o "selo" do lastro vinculado à guia.
 */
export default function UploadLaudoModal({ patient, onSend, onClose }) {
  const [files, setFiles] = useState([]);
  const [hashing, setHashing] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => setFiles([]), [patient]);
  if (!patient) return null;

  const pick = async (e) => {
    const list = [...e.target.files];
    if (!list.length) return;
    setHashing(true);
    const hashed = await Promise.all(
      list.map(async (f) => ({ nome: f.name, tamanho: f.size, tipo: f.type || 'arquivo', hash: await sha256(f) })),
    );
    setFiles((cur) => [...cur, ...hashed]);
    setHashing(false);
    e.target.value = '';
  };

  const submit = async () => {
    setSending(true);
    try {
      await onSend(patient, { arquivos: files, enviadoEm: new Date().toISOString(), guia: patient.guia });
      onClose();
    } catch {
      /* erro já avisado por quem chamou */
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      open
      width="max-w-lg"
      title="Enviar laudo"
      onClose={sending ? () => {} : onClose}
      footer={
        <>
          <Button type="button" variant="secondary" size="md" onClick={onClose} disabled={sending}>
            Cancelar
          </Button>
          <Button type="button" size="md" onClick={submit} disabled={!files.length || hashing || sending}>
            {sending ? 'Enviando…' : 'Enviar para análise'}
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-sm text-slate-700">
        <div className="rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-600">
          <div className="font-medium text-slate-800">{patient.nome}</div>
          <div>
            {patient.exame} · Guia {patient.guia} · Solicitante {patient.solicitante}
          </div>
        </div>

        {patient.duplicidade && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            <span className="font-semibold">Atenção: exame repetido.</span> {patient.exame} feito há {patient.duplicidade.dias} dias em{' '}
            {patient.duplicidade.prestador}. O alerta segue junto com este laudo para a operadora.
          </div>
        )}

        <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 px-4 py-6 text-center hover:border-lastro-teal">
          <span className="font-medium text-slate-800">Anexar laudo e evidência</span>
          <span className="text-xs text-slate-500">PDF do laudo, imagem DICOM ou foto da tela do aparelho</span>
          <input type="file" multiple accept={ACCEPT} className="sr-only" onChange={pick} />
        </label>

        {hashing && <p className="text-xs text-slate-500">Gerando selo (SHA-256)…</p>}

        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="rounded-lg border border-slate-200 px-3 py-2">
                <div className="flex justify-between gap-2 text-xs">
                  <span className="truncate font-medium text-slate-800">{f.nome}</span>
                  <span className="shrink-0 text-slate-500">{fmtSize(f.tamanho)}</span>
                </div>
                <div className="mt-1 break-all font-mono text-[10px] text-slate-500">SHA-256 {f.hash}</div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-slate-500">
          O selo liga o arquivo à guia com data e hora. A IA da operadora confere o laudo; a decisão final é humana.
          O envio libera o pagamento, nunca bloqueia o atendimento.
        </p>
      </div>
    </Modal>
  );
}
