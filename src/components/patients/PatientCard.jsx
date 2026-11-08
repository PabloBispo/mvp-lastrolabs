import StatusBadge from '../ui/StatusBadge.jsx';
import LaudoCell from './LaudoCell.jsx';
import RowActions from './RowActions.jsx';

/** Versão em cartão de uma linha da tabela, usada abaixo de 1024px. */
export default function PatientCard({ patient, sending, onEnviar, onEdit, onDelete }) {
  return (
    <li className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="line-clamp-2 text-[15px] font-medium text-slate-800">{patient.nome}</p>
          <p className="mt-0.5 truncate text-sm text-slate-500">{patient.exame}</p>
        </div>
        <StatusBadge status={patient.status} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <LaudoCell enviado={patient.enviado} sending={sending} onEnviar={() => onEnviar(patient)} />
        <RowActions patientName={patient.nome} onEdit={() => onEdit(patient)} onDelete={() => onDelete(patient)} />
      </div>
    </li>
  );
}

/** Esqueleto do cartão durante o carregamento. */
export function PatientCardSkeleton() {
  return (
    <li className="min-w-0 rounded-lg border border-slate-200 bg-white p-4" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3.5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="h-8 w-[88px] animate-pulse rounded-md bg-slate-200" />
        <div className="h-9 w-20 animate-pulse rounded-md bg-slate-200" />
      </div>
    </li>
  );
}
