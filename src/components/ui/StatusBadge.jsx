export const STATUS = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em análise',
  APROVADO: 'Aprovado',
  CORRECAO: 'Correção solicitada',
};

const STYLES = {
  [STATUS.PENDENTE]: 'border-slate-300 bg-slate-100 font-medium text-slate-600',
  [STATUS.EM_ANALISE]: 'border-[#F2A23A] bg-[#FFC48A] font-semibold text-[#8A2B0A]',
  [STATUS.APROVADO]: 'border-[#4A90C2] bg-[#E3F1FB] font-medium text-[#1D5E8C]',
  [STATUS.CORRECAO]: 'border-red-300 bg-red-50 font-semibold text-red-700',
};

/** Selo arredondado do status do laudo (o mesmo vocabulário da visão da operadora). */
export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-0.5 text-xs ${STYLES[status] ?? 'border-slate-300 bg-slate-100'}`}>
      {status}
    </span>
  );
}
