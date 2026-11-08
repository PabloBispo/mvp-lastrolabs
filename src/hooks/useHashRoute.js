import { useEffect, useState } from 'react';

const ROUTES = ['/equipe', '/operadora'];
const norm = () => {
  const p = window.location.pathname.replace(/\/+$/, '');
  return ROUTES.includes(p) ? p : '/';
};

/** Roteamento mínimo por caminho (/ e /equipe). A Vercel reescreve tudo para index.html (vercel.json). */
export default function useHashRoute() {
  const [route, setRoute] = useState(norm);
  useEffect(() => {
    const onPop = () => setRoute(norm());
    const onClick = (e) => {
      const a = e.target.closest?.('a[data-nav]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      window.history.pushState({}, '', a.getAttribute('href'));
      setRoute(norm());
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return route;
}
