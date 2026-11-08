import TableHeaderCell from './TableHeaderCell.jsx';
import SortButton from './SortButton.jsx';
import ColumnFilter from './ColumnFilter.jsx';
import PatientRow from './PatientRow.jsx';
import SkeletonRows from './SkeletonRows.jsx';
import { STATUS } from '../ui/StatusBadge.jsx';

export const LAUDO_OPTIONS = ['Enviar', 'Enviado'];
export const STATUS_OPTIONS = [STATUS.CONCLUIDO, STATUS.EM_ANDAMENTO];

/** Tabela de pacientes com ordenação e filtros por coluna. */
export default function PatientsTable({
  patients,
  loading = false,
  skeletonCount = 4,
  sendingIds = [],
  sort,
  onSortChange,
  columnFilters,
  onColumnFiltersChange,
  onEnviar,
  onEdit,
  onDelete,
}) {
  const sortFor = (key, label) => (
    <SortButton label={label} direction={sort.key === key ? sort.dir : null} onClick={() => onSortChange(key)} />
  );
  const filterFor = (key, label, options) => (
    <ColumnFilter
      label={label}
      options={options}
      selected={columnFilters[key]}
      onChange={(sel) => onColumnFiltersChange({ ...columnFilters, [key]: sel })}
    />
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] border-collapse text-left">
        <thead>
          <tr className="text-[13px] text-slate-600">
            <TableHeaderCell className="w-[256px]">Nome do Paciente</TableHeaderCell>
            <TableHeaderCell className="w-[230px]" actions={sortFor('exame', 'tipo de exame')}>
              Tipo de exame
            </TableHeaderCell>
            <TableHeaderCell
              className="w-[197px]"
              actions={<>{filterFor('laudo', 'laudo', LAUDO_OPTIONS)}{sortFor('laudo', 'laudo')}</>}
            >
              Laudo
            </TableHeaderCell>
            <TableHeaderCell
              className="w-[197px]"
              actions={<>{filterFor('status', 'status', STATUS_OPTIONS)}{sortFor('status', 'status')}</>}
            >
              Status do envio
            </TableHeaderCell>
            <th className="px-6 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-[15px] text-slate-700">
          {loading ? (
            <SkeletonRows count={skeletonCount} />
          ) : patients.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                Nenhum paciente encontrado.
              </td>
            </tr>
          ) : (
            patients.map((p, i) => (
              <PatientRow
                key={p.id}
                patient={p}
                striped={i % 2 === 0}
                sending={sendingIds.includes(p.id)}
                onEnviar={onEnviar}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
