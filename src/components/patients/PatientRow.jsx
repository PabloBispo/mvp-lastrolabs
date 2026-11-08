import StatusBadge from '../ui/StatusBadge.jsx';
import LaudoCell from './LaudoCell.jsx';
import RowActions from './RowActions.jsx';
import DuplicidadeChip from './DuplicidadeChip.jsx';

export const CELL = 'border-r border-slate-200 px-4 xl:px-6';

/** Uma linha da tabela de pacientes (zebrada). */
export default function PatientRow({ patient, striped, sending, onEnviar, onEdit, onDuplicidade }) {
  return (
    <tr className={`h-14 border-b border-slate-200 ${striped ? 'bg-row' : 'bg-white'}`}>
      <td className={`${CELL} py-2`} title={patient.nome}>
        <div className="truncate">{patient.nome}</div>
        {patient.guia && (
          <div className="truncate text-xs text-slate-400">
            Guia {patient.guia} · Solic. {patient.solicitante}
          </div>
        )}
      </td>
      <td className={`${CELL} py-2`} title={patient.exame}>
        <div className="truncate">{patient.exame}</div>
        <DuplicidadeChip dup={patient.duplicidade} onClick={() => onDuplicidade(patient)} />
      </td>
      <td className={CELL}>
        <LaudoCell enviado={patient.enviado} sending={sending} onEnviar={() => onEnviar(patient)} />
      </td>
      <td className={CELL}>
        <StatusBadge status={patient.status} />
      </td>
      <td className="px-4 xl:px-6">
        <RowActions patientName={patient.nome} onEdit={() => onEdit(patient)} />
      </td>
    </tr>
  );
}
