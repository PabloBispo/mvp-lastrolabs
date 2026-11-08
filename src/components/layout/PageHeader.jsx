import Logo from './Logo.jsx';

/**
 * Logo numa faixa própria, acima do título (separada do bloco de conteúdo),
 * e título + subtítulo logo abaixo.
 */
export default function PageHeader({ title, subtitle }) {
  return (
    <header>
      <div className="flex justify-end border-b border-slate-200 pb-4 sm:pb-5">
        <Logo className="h-7 w-auto sm:h-8 lg:h-9" />
      </div>
      <div className="mt-5 min-w-0 sm:mt-6 lg:mt-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[26px] lg:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft sm:mt-1.5 sm:text-base lg:text-lg">{subtitle}</p>}
      </div>
    </header>
  );
}
