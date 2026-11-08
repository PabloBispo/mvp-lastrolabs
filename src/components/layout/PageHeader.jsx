import Logo from './Logo.jsx';

/**
 * Título e subtítulo da página com a logo.
 * Celular: logo acima do título. A partir de 640px: logo à direita.
 */
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[26px] lg:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft sm:mt-1.5 sm:text-base lg:text-lg">{subtitle}</p>}
      </div>
      <Logo className="h-7 w-auto shrink-0 self-start sm:mt-1 sm:h-8 lg:h-9" />
    </header>
  );
}
