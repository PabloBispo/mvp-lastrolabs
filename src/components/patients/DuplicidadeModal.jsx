import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

/** Detalhe do alerta de duplicidade: o exame anterior e o laudo, se existir. */
export default function DuplicidadeModal({ patient, onClose }) {
  if (!patient?.duplicidade) return null;
  const d = patient.duplicidade;
  return (
    <Modal
      open
      width="max-w-lg"
      title="Alerta de duplicidade"
      onClose={onClose}
      footer={
        <Button type="button" size="md" onClick={onClose}>
          Entendi
        </Button>
      }
    >
      <div className="space-y-4 text-sm text-slate-700">
        <p>
          <span className="font-semibold">{patient.nome}</span> já fez <span className="font-semibold">{patient.exame}</span> há{' '}
          <span className="font-semibold">{d.dias} dias</span>, mesmo código TUSS.
        </p>
        <dl className="grid grid-cols-[110px_1fr] gap-y-2 rounded-lg bg-slate-50 px-4 py-3 text-xs">
          <dt className="text-slate-500">Executante</dt>
          <dd className="text-slate-800">{d.prestador}</dd>
          <dt className="text-slate-500">Laudo anterior</dt>
          <dd className={d.laudo ? 'text-slate-800' : 'font-semibold text-red-700'}>{d.laudo ?? 'Não enviado: exame pago sem laudo'}</dd>
          <dt className="text-slate-500">Pedido atual</dt>
          <dd className="text-slate-800">Guia {patient.guia} · {patient.solicitante}</dd>
        </dl>
        <p className="text-xs text-slate-500">
          É um sinal, não um bloqueio: o atendimento segue normalmente. A operadora recebe o alerta junto com o laudo para avaliar
          a pertinência.
        </p>
      </div>
    </Modal>
  );
}
