import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(() => {});

/** Provedor de avisos rápidos no canto inferior direito. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, tone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg px-4 py-3 text-sm text-white shadow-soft ${t.tone === 'error' ? 'bg-red-600' : 'bg-lastro-navy'}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
