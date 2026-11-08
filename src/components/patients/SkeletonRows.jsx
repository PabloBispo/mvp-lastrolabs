/** Linhas "fantasma" exibidas enquanto a API mock responde. */
export default function SkeletonRows({ count = 4 }) {
  return Array.from({ length: count }, (_, i) => (
    <tr key={i} className={`h-14 border-b border-slate-200 ${i % 2 === 0 ? 'bg-row' : 'bg-white'}`} aria-hidden="true">
      {[160, 150, 70, 90, 88].map((w, j) => (
        <td key={j} className={`px-6 ${j < 4 ? 'border-r border-slate-200' : ''}`}>
          <div className="h-3 animate-pulse rounded bg-slate-200" style={{ width: w }} />
        </td>
      ))}
    </tr>
  ));
}
