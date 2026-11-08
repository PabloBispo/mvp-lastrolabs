import Logo from './Logo.jsx';

/** Título e subtítulo da página, com a logo alinhada à direita. */
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <h1 className="text-[26px] font-bold tracking-tight text-ink lg:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-base text-ink-soft lg:text-lg">{subtitle}</p>}
      </div>
      <Logo className="mt-1 h-8 w-auto shrink-0 lg:h-9" />
    </header>
  );
}
