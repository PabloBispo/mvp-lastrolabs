import ColumnFilter from './ColumnFilter.jsx';
import PatientCard, { PatientCardSkeleton } from './PatientCard.jsx';
import Select from '../ui/Select.jsx';
import { LAUDO_OPTIONS, STATUS_OPTIONS } from './PatientsTable.jsx';

const SORT_OPTIONS = [
  { value: '', label: 'Sem ordenação' },
  { value: 'exame:asc', label: 'Tipo de exame (A–Z)' },
  { value: 'exame:desc', label: 'Tipo de exame (Z–A)' },
  { value: 'laudo:asc', label: 'Laudo: enviados primeiro' },
  { value: 'laudo:desc', label: 'Laudo: a enviar primeiro' },
  { value: 'status:asc', label: 'Status: concluídos primeiro' },
  { value: 'status:desc', label: 'Status: em andamento primeiro' },
];

/**
 * Lista de pacientes em cartões (celular e tablet).
 * Mesmos dados e ações da tabela; filtros e ordenação ficam numa barra acima.
 */
export default function PatientCardList({
  patients,
  loading,
  skeletonCount,
  sendingIds,
  sort,
  onSortSet,
  columnFilters,
  onColumnFiltersChange,
  onEnviar,
  onEdit,
  onDelete,
}) {
  const setFilter = (key) => (sel) => onColumnFiltersChange({ ...columnFilters, [key]: sel });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <ColumnFilter variant="pill" align="left" label="laudo" options={LAUDO_OPTIONS} selected={columnFilters.laudo} onChange={setFilter('laudo')} />
        <ColumnFilter variant="pill" align="left" label="status" options={STATUS_OPTIONS} selected={columnFilters.status} onChange={setFilter('status')} />
        <Select
          aria-label="Ordenar"
          className="min-w-[190px] flex-1 sm:max-w-[260px] sm:flex-none"
          selectClassName="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-lastro-teal focus:outline-none"
          options={SORT_OPTIONS}
          value={sort.key ? `${sort.key}:${sort.dir}` : ''}
          onChange={(e) => {
            const [key, dir] = e.target.value.split(':');
            onSortSet(key ? { key, dir } : { key: null, dir: null });
          }}
        />
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {loading ? (
          Array.from({ length: skeletonCount }, (_, i) => <PatientCardSkeleton key={i} />)
        ) : patients.length === 0 ? (
          <li className="py-10 text-center text-sm text-slate-500 sm:col-span-2">Nenhum paciente encontrado.</li>
        ) : (
          patients.map((p) => (
            <PatientCard
              key={p.id}
              patient={p}
              sending={sendingIds.includes(p.id)}
              onEnviar={onEnviar}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>
    </div>
  );
}
