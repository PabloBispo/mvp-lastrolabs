import TableHeaderCell from './TableHeaderCell.jsx';
import SortButton from './SortButton.jsx';
import ColumnFilter from './ColumnFilter.jsx';
import PatientRow from './PatientRow.jsx';
import SkeletonRows from './SkeletonRows.jsx';
import { STATUS } from '../ui/StatusBadge.jsx';

export const LAUDO_OPTIONS = ['Enviar', 'Enviado'];
export const STATUS_OPTIONS = [STATUS.PENDENTE, STATUS.EM_ANALISE, STATUS.APROVADO, STATUS.CORRECAO];

/**
 * Tabela de pacientes com ordenação e filtros por coluna.
 * Colunas em proporção (table-fixed) para acompanhar a largura da tela;
 * abaixo de 760px a tabela rola na horizontal em vez de espremer.
 */
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
      <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
        {/* Laudo, Status e Ações têm conteúdo de largura conhecida → px fixos.
            Nome e Tipo de exame dividem o restante (55/45). */}
        <colgroup>
          <col className="w-[55%]" />
          <col className="w-[45%]" />
          <col className="w-[140px] xl:w-[170px]" />
          <col className="w-[184px] xl:w-[210px]" />
          <col className="w-[116px] xl:w-[136px]" />
        </colgroup>
        <thead>
          <tr className="text-[13px] text-slate-500">
            <TableHeaderCell>Nome do Paciente</TableHeaderCell>
            <TableHeaderCell actions={sortFor('exame', 'tipo de exame')}>Tipo de exame</TableHeaderCell>
            <TableHeaderCell actions={<>{filterFor('laudo', 'laudo', LAUDO_OPTIONS)}{sortFor('laudo', 'laudo')}</>}>
              Laudo
            </TableHeaderCell>
            <TableHeaderCell actions={<>{filterFor('status', 'status', STATUS_OPTIONS)}{sortFor('status', 'status')}</>}>
              Status
            </TableHeaderCell>
            <th className="px-4 py-3 xl:px-6">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-700 lg:text-[15px]">
          {loading ? (
            <SkeletonRows count={skeletonCount} />
          ) : patients.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
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
