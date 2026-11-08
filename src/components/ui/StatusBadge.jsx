export const STATUS = {
  CONCLUIDO: 'Concluído',
  EM_ANDAMENTO: 'Em Andamento',
};

const STYLES = {
  [STATUS.CONCLUIDO]: 'border-[#4A90C2] bg-[#E3F1FB] font-medium text-[#1D5E8C]',
  [STATUS.EM_ANDAMENTO]: 'border-[#F2A23A] bg-[#FFC48A] font-semibold text-[#8A2B0A]',
};

/** Selo arredondado do status de envio. */
export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-0.5 text-xs ${STYLES[status] ?? 'border-slate-300 bg-slate-100'}`}>
      {status}
    </span>
  );
}
