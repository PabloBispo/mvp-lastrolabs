/** Título e subtítulo da página. */
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="mt-8">
      <h1 className="text-[27px] font-bold tracking-tight text-ink">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-ink-soft sm:text-xl">{subtitle}</p>}
    </header>
  );
}
