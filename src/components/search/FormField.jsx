/** Rótulo + controle lado a lado, como no painel de filtro. */
export default function FormField({ label, htmlFor, labelClassName = '', children }) {
  return (
    <>
      <label htmlFor={htmlFor} className={`text-xs text-slate-700 ${labelClassName}`}>
        {label}
      </label>
      {children}
    </>
  );
}
