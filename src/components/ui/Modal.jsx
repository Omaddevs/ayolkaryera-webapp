import { useEffect } from 'react';
import { X } from 'lucide-react';
import s from './Modal.module.css';

export default function Modal({ open, onClose, title, children, width = 520, noPad = false }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', esc); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.dialog}
        style={{ maxWidth: width }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className={s.header}>
            <h2 className={s.title}>{title}</h2>
            <button className={s.close} onClick={onClose} aria-label="Yopish">
              <X size={18} />
            </button>
          </div>
        )}
        <div className={noPad ? '' : s.body}>{children}</div>
      </div>
    </div>
  );
}
