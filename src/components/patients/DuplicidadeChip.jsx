/** Selo de alerta: mesmo exame (código TUSS) no mesmo paciente dentro da janela. */
export default function DuplicidadeChip({ dup, onClick }) {
  if (!dup) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      title="Ver exame anterior"
      className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 hover:bg-amber-100"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
      </svg>
      Repetido há {dup.dias} dias
    </button>
  );
}
