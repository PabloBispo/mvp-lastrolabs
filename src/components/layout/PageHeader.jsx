import Logo from './Logo.jsx';

/**
 * Logo em linha própria no topo (alinhada à direita), com área de respiro,
 * e abaixo dela o título e o subtítulo da página.
 */
export default function PageHeader({ title, subtitle }) {
  return (
    <header>
      <div className="flex justify-end">
        <Logo className="h-7 w-auto sm:h-8 lg:h-9" />
      </div>
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[26px] lg:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft sm:mt-1.5 sm:text-base lg:text-lg">{subtitle}</p>}
      </div>
    </header>
  );
}
