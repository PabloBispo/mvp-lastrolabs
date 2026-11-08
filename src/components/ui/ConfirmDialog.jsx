import { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

/** Diálogo de confirmação para ações destrutivas. */
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmar', onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);

  const confirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      /* erro já informado por quem chamou; mantém o diálogo aberto */
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      onClose={busy ? () => {} : onClose}
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose} disabled={busy}>
            Cancelar
          </Button>
          <Button variant="danger" size="md" onClick={confirm} disabled={busy}>
            {busy ? 'Aguarde…' : confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-slate-600">{message}</p>
    </Modal>
  );
}
