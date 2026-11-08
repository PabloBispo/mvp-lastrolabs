import Button from '../ui/Button.jsx';
import { ArrowUpRightIcon } from '../icons/Icons.jsx';

/** Botão "Enviar" (pendente), "Enviando…" (aguardando API) ou etiqueta "Enviado". */
export default function LaudoCell({ enviado, sending, onEnviar }) {
  if (enviado) {
    return (
      <span className="inline-flex h-7 w-[68px] items-center justify-center rounded bg-slate-300 text-[10px] font-medium text-slate-600">
        Enviado
      </span>
    );
  }
  return (
    <Button onClick={onEnviar} disabled={sending} icon={sending ? undefined : ArrowUpRightIcon} className="min-w-[74px] rounded">
      {sending ? 'Enviando…' : 'Enviar'}
    </Button>
  );
}
