/** Célula de cabeçalho com título à esquerda e ações (filtro/ordenar) à direita. */
export default function TableHeaderCell({ children, actions, className = '', bordered = true }) {
  return (
    <th className={`px-6 py-3 font-normal ${bordered ? 'border-r border-slate-200' : ''} ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span>{children}</span>
        {actions && <span className="flex items-center gap-2">{actions}</span>}
      </div>
    </th>
  );
}
