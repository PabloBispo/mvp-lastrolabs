export const FIELD_CLASSES =
  'h-[30px] rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 placeholder:italic placeholder:text-slate-400 focus:border-lastro-teal focus:outline-none focus:ring-2 focus:ring-lastro-cyan/30';

/** Campo de texto do filtro. */
export default function TextInput({ className = '', ...props }) {
  return <input type="text" className={`${FIELD_CLASSES} ${className}`} {...props} />;
}
