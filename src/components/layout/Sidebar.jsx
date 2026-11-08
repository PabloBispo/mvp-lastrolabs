import { SettingsIcon } from '../icons/Icons.jsx';

/**
 * Navegação principal.
 * Celular (< 768px): barra fixa no topo, 56px de altura.
 * A partir de 768px: barra lateral fixa à esquerda, 72px de largura.
 */
export default function Sidebar({ initials = 'CR', doctorName, onSettings }) {
  return (
    <aside className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between bg-lastro-navy px-4 md:inset-x-auto md:inset-y-0 md:left-0 md:h-auto md:w-[72px] md:flex-col md:px-0 md:py-5">
      <button
        type="button"
        title={doctorName ? `Perfil de ${doctorName}` : 'Perfil do médico'}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white text-xs font-bold text-lastro-navy"
      >
        {initials}
      </button>
      <button
        type="button"
        onClick={onSettings}
        aria-label="Configurações: restaurar dados iniciais"
        title="Restaurar dados iniciais"
        className="p-1 text-white/70 transition hover:text-white"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>
    </aside>
  );
}
