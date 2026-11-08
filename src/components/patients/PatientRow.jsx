import StatusBadge from '../ui/StatusBadge.jsx';
import LaudoCell from './LaudoCell.jsx';
import RowActions from './RowActions.jsx';

export const CELL = 'border-r border-slate-200 px-4 xl:px-6';

/** Uma linha da tabela de pacientes (zebrada). */
export default function PatientRow({ patient, striped, sending, onEnviar, onEdit, onDelete }) {
  return (
    <tr className={`h-14 border-b border-slate-200 ${striped ? 'bg-row' : 'bg-white'}`}>
      <td className={`${CELL} truncate`} title={patient.nome}>
        {patient.nome}
      </td>
      <td className={`${CELL} truncate`} title={patient.exame}>
        {patient.exame}
      </td>
      <td className={CELL}>
        <LaudoCell enviado={patient.enviado} sending={sending} onEnviar={() => onEnviar(patient)} />
      </td>
      <td className={CELL}>
        <StatusBadge status={patient.status} />
      </td>
      <td className="px-4 xl:px-6">
        <RowActions patientName={patient.nome} onEdit={() => onEdit(patient)} onDelete={() => onDelete(patient)} />
      </td>
    </tr>
  );
}
