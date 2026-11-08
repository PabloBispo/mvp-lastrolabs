import IconButton from '../ui/IconButton.jsx';
import { PencilIcon } from '../icons/Icons.jsx';

/**
 * Ação de cada linha. Não há exclusão: todo pedido fica registrado
 * (rastreabilidade); correções passam pela edição.
 */
export default function RowActions({ patientName, onEdit }) {
  return (
    <div className="flex justify-center gap-2">
      <IconButton icon={PencilIcon} label={`Editar ${patientName}`} onClick={onEdit} />
    </div>
  );
}
