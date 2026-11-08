import Sidebar from './Sidebar.jsx';
import Logo from './Logo.jsx';

/** Estrutura geral: sidebar fixa + área de conteúdo com a logo no topo. */
export default function AppLayout({ doctor, onSettings, children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar initials={doctor?.initials ?? '··'} doctorName={doctor?.name} onSettings={onSettings} />
      <main className="ml-[72px] flex-1 px-4 pb-16 pt-9 sm:px-8 lg:pl-[33px] lg:pr-14">
        <div className="max-w-[1100px]">
          <div className="flex justify-end">
            <Logo />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
