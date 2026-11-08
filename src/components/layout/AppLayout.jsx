import Sidebar from './Sidebar.jsx';

/**
 * Estrutura geral: navegação fixa + área de conteúdo fluida.
 * Celular: barra no topo (conteúdo começa 56px abaixo).
 * Desktop: barra lateral (conteúdo começa 72px à direita), largura
 * máxima de 1440px centralizada; o respiro lateral cresce com a tela.
 */
export default function AppLayout({ doctor, onSettings, route, children }) {
  return (
    <div className="min-h-screen">
      <Sidebar initials={doctor?.initials ?? '··'} doctorName={doctor?.name} onSettings={onSettings} route={route} />
      <main className="pt-14 md:pl-[72px] md:pt-0">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8 2xl:px-14">
          {children}
        </div>
      </main>
    </div>
  );
}
