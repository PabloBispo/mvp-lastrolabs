import Button from '../ui/Button.jsx';
import { ArrowUpRightIcon } from '../icons/Icons.jsx';

/** Botão "Enviar" (pendente), "Enviando…" (aguardando API) ou etiqueta "Enviado". */
export default function LaudoCell({ enviado, sending, onEnviar }) {
  if (enviado) {
    return (
      <span className="inline-flex h-8 w-[88px] items-center justify-center rounded-md bg-slate-200 text-xs font-medium text-slate-500">
        Enviado
      </span>
    );
  }
  return (
    <Button onClick={onEnviar} disabled={sending} icon={sending ? undefined : ArrowUpRightIcon} className="w-[88px]">
      {sending ? 'Enviando…' : 'Enviar'}
    </Button>
  );
}
