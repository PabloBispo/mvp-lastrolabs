import { CELL } from './PatientRow.jsx';

/** Linhas "fantasma" exibidas enquanto a API mock responde. */
export default function SkeletonRows({ count = 4 }) {
  return Array.from({ length: count }, (_, i) => (
    <tr key={i} className={`h-14 border-b border-slate-200 ${i % 2 === 0 ? 'bg-row' : 'bg-white'}`} aria-hidden="true">
      {['w-3/4', 'w-2/3', 'w-[88px]', 'w-24', 'w-20'].map((w, j) => (
        <td key={j} className={j < 4 ? CELL : 'px-4 xl:px-6'}>
          <div className={`h-3 animate-pulse rounded bg-slate-200 ${w}`} />
        </td>
      ))}
    </tr>
  ));
}
