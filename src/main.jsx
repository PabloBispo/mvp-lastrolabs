import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import TeamRoute from './pages/TeamRoute.jsx';
import useHashRoute from './hooks/useHashRoute.js';
import { ToastProvider } from './components/ui/Toast.jsx';
import './index.css';

function Root() {
  const route = useHashRoute();
  return route === '/equipe' ? <TeamRoute route={route} /> : <App route={route} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <Root />
    </ToastProvider>
  </StrictMode>,
);
