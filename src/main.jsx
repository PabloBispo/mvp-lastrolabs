import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import TeamRoute from './pages/TeamRoute.jsx';
import OperatorPage from './pages/OperatorPage.jsx';
import useHashRoute from './hooks/useHashRoute.js';
import { ToastProvider } from './components/ui/Toast.jsx';
import './index.css';

function Root() {
  const route = useHashRoute();
  if (route === '/equipe') return <TeamRoute route={route} />;
  if (route === '/operadora') return <OperatorPage route={route} />;
  return <App route={route} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <Root />
    </ToastProvider>
  </StrictMode>,
);
