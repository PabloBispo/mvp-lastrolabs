import { useEffect } from 'react';

/** Janela modal simples com fundo escurecido; fecha com Esc ou clique fora. */
export default function Modal({ open, title, onClose, children, footer, width = 'max-w-md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-lastro-navy/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className={`w-full ${width} rounded-2xl bg-white shadow-soft`}>
        <h2 id="modal-title" className="border-b border-slate-200 px-6 py-4 text-base font-semibold text-ink">
          {title}
        </h2>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
