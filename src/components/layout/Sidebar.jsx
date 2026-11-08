import { SettingsIcon } from '../icons/Icons.jsx';

/** Barra lateral fixa com avatar do médico e atalho de configurações. */
export default function Sidebar({ initials = 'CR', doctorName, onSettings }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[72px] flex-col items-center justify-between bg-lastro-navy py-5">
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
        className="text-white/70 transition hover:text-white"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>
    </aside>
  );
}
