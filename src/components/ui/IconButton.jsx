const TONES = {
  default: 'hover:border-lastro-teal hover:text-lastro-deep',
  danger: 'hover:border-red-400 hover:text-red-600',
};

/** Botão quadrado 36×36 só com ícone (editar, excluir, setas da paginação). */
export default function IconButton({ icon: IconComponent, label, tone = 'default', className = '', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 ${TONES[tone]} ${className}`}
      {...props}
    >
      <IconComponent />
    </button>
  );
}
