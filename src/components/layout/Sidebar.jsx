import { SettingsIcon } from '../icons/Icons.jsx';

const NAV = [
  {
    href: '/',
    label: 'Espaço do Médico',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    href: '/operadora',
    label: 'Espaço da Operadora',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    href: '/equipe',
    label: 'Nossa equipe',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

/**
 * Navegação principal.
 * Celular (< 768px): barra fixa no topo, 56px de altura.
 * A partir de 768px: barra lateral fixa à esquerda, 72px de largura.
 */
export default function Sidebar({ initials = 'CR', doctorName, onSettings, route = '/' }) {
  return (
    <aside className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between bg-lastro-navy px-4 md:inset-x-auto md:inset-y-0 md:left-0 md:h-auto md:w-[72px] md:flex-col md:px-0 md:py-5">
      <div className="flex items-center gap-4 md:flex-col md:gap-6">
        <button
          type="button"
          title={doctorName ? `Perfil de ${doctorName}` : 'Perfil do médico'}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white text-xs font-bold text-lastro-navy"
        >
          {initials}
        </button>
        <nav className="flex gap-2 md:flex-col md:gap-3">
          {NAV.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              data-nav
              title={label}
              aria-label={label}
              aria-current={route === href ? 'page' : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${route === href ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'}`}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </nav>
      </div>
      {onSettings && (
        <button
          type="button"
          onClick={onSettings}
          aria-label="Configurações: restaurar dados iniciais"
          title="Restaurar dados iniciais"
          className="p-1 text-white/70 transition hover:text-white"
        >
          <SettingsIcon className="h-5 w-5" />
        </button>
      )}
    </aside>
  );
}
