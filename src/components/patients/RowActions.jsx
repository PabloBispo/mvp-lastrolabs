import IconButton from '../ui/IconButton.jsx';
import { PencilIcon, TrashIcon } from '../icons/Icons.jsx';

/** Botões de editar e excluir de cada linha. */
export default function RowActions({ patientName, onEdit, onDelete }) {
  return (
    <div className="flex justify-center gap-2">
      <IconButton icon={PencilIcon} label={`Editar ${patientName}`} onClick={onEdit} />
      <IconButton icon={TrashIcon} label={`Excluir ${patientName}`} tone="danger" onClick={onDelete} />
    </div>
  );
}
