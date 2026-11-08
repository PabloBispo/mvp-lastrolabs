import IconButton from '../ui/IconButton.jsx';
import Select from '../ui/Select.jsx';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons.jsx';

/** Paginação numérica + seletor de itens por página. */
export default function Pagination({ page, totalPages, onPageChange, pageSize, pageSizeOptions, onPageSizeChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-4 flex flex-wrap items-center gap-2" aria-label="Paginação">
      <IconButton
        icon={(p) => <ChevronLeftIcon className="h-3 w-3" {...p} />}
        label="Página anterior"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      />
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onPageChange(n)}
          className={`h-10 w-10 rounded-md border bg-white text-sm transition ${
            n === page ? 'border-blue-600 text-blue-600' : 'border-slate-300 text-slate-700 hover:border-lastro-teal'
          }`}
        >
          {n}
        </button>
      ))}
      <IconButton
        icon={(p) => <ChevronRightIcon className="h-3 w-3" {...p} />}
        label="Próxima página"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      />

      <Select
        aria-label="Itens por página"
        className="ml-6 w-[137px]"
        selectClassName="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-lastro-teal focus:outline-none"
        options={pageSizeOptions}
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      />
      <span className="text-sm text-slate-700">/Page</span>
    </nav>
  );
}
