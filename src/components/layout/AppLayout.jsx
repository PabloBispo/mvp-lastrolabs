import Sidebar from './Sidebar.jsx';

/**
 * Estrutura geral: sidebar fixa + área de conteúdo fluida.
 * O conteúdo ocupa a largura disponível até 1440px e fica centralizado
 * em monitores maiores; o respiro lateral cresce com a tela.
 */
export default function AppLayout({ doctor, onSettings, children }) {
  return (
    <div className="min-h-screen">
      <Sidebar initials={doctor?.initials ?? '··'} doctorName={doctor?.name} onSettings={onSettings} />
      <main className="pl-[72px]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-7 lg:px-10 lg:py-8 2xl:px-14">{children}</div>
      </main>
    </div>
  );
}
