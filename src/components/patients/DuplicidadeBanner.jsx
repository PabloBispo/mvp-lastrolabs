/** Notificação no topo: pedidos com exame equivalente recente. */
export default function DuplicidadeBanner({ patients = [], onSelect }) {
  const dups = patients.filter((p) => p.duplicidade);
  if (!dups.length) return null;
  return (
    <div role="status" className="flex flex-col gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
        </svg>
        <div className="text-sm text-amber-900">
          <p className="font-semibold">{dups.length} pedidos com exame repetido</p>
          <p className="text-xs">Mesmo exame no mesmo paciente nos últimos 90 dias. Confira o laudo anterior antes de executar.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:ml-auto">
        {dups.slice(0, 3).map((p) => (
          <button key={p.id} type="button" onClick={() => onSelect(p)} className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-amber-800 hover:bg-amber-100">
            {p.nome.split(' ')[0]} · {p.exame} · {p.duplicidade.dias}d
          </button>
        ))}
        {dups.length > 3 && <span className="self-center text-xs text-amber-800">+{dups.length - 3}</span>}
      </div>
    </div>
  );
}
