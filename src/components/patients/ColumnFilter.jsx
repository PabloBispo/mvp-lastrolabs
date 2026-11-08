import { useEffect, useRef, useState } from 'react';
import { FilterIcon } from '../icons/Icons.jsx';

/** Botão de funil no cabeçalho que abre uma lista de opções para filtrar a coluna. */
export default function ColumnFilter({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = selected.length > 0;

  useEffect(() => {
    if (!open) return;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const toggle = (opt) =>
    onChange(selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected, opt]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={`Filtrar ${label}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex ${active ? 'text-lastro-teal' : 'text-slate-500 hover:text-lastro-navy'}`}
      >
        <FilterIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-6 z-10 w-44 rounded-md border border-slate-200 bg-white p-2 text-sm font-normal shadow-soft">
          {options.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="accent-lastro-navy"
              />
              {opt}
            </label>
          ))}
          {active && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="mt-1 w-full rounded px-2 py-1 text-left text-xs text-lastro-deep hover:bg-slate-50"
            >
              Limpar filtro
            </button>
          )}
        </div>
      )}
    </div>
  );
}
