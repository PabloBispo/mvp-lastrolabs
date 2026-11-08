const VARIANTS = {
  primary: 'bg-lastro-navy text-white hover:bg-lastro-deep disabled:opacity-60',
  secondary: 'border border-slate-300 bg-white text-slate-700 hover:border-lastro-teal',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-60',
  disabled: 'bg-slate-300 text-slate-600',
};

const SIZES = {
  sm: 'h-7 px-4 text-[11px]',
  md: 'h-9 px-5 text-sm',
};

/** Botão de ação (Buscar, Enviar, Salvar…). */
export default function Button({
  variant = 'primary',
  size = 'sm',
  icon: IconComponent,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition disabled:cursor-default ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
      {IconComponent && <IconComponent className="h-3 w-3" />}
    </button>
  );
}
