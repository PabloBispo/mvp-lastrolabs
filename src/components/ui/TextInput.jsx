export const FIELD_CLASSES =
  'h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 placeholder:italic placeholder:text-slate-400 focus:border-lastro-teal focus:outline-none focus:ring-2 focus:ring-lastro-cyan/30';

/** Campo de texto padrão. */
export default function TextInput({ className = '', ...props }) {
  return <input type="text" className={`${FIELD_CLASSES} ${className}`} {...props} />;
}
