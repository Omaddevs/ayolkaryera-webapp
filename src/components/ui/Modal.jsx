import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import s from './Modal.module.css';

function getScrollParent() {
  return document.querySelector('.page-shell');
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 520,
  noPad = false,
}) {
  const overlayRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!open) return;

    const scrollParent = getScrollParent();
    scrollYRef.current = window.scrollY;

    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPosition = document.body.style.position;
    const prevBodyWidth = document.body.style.width;
    const prevBodyTop = document.body.style.top;
    const prevParentOverflow = scrollParent?.style.overflow ?? '';

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollYRef.current}px`;

    if (scrollParent) {
      scrollParent.style.overflow = 'hidden';
    }

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    const overlay = overlayRef.current;
    const blockBackgroundTouch = (e) => {
      if (overlay && e.target === overlay) {
        e.preventDefault();
      }
    };
    overlay?.addEventListener('touchmove', blockBackgroundTouch, { passive: false });

    return () => {
      window.removeEventListener('keydown', onKey);
      overlay?.removeEventListener('touchmove', blockBackgroundTouch);

      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.width = prevBodyWidth;
      document.body.style.top = prevBodyTop;

      if (scrollParent) {
        scrollParent.style.overflow = prevParentOverflow;
      }

      window.scrollTo(0, scrollYRef.current);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={s.overlay}
      ref={overlayRef}
      onClick={onClose}
      role="presentation"
    >
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
            <button type="button" className={s.close} onClick={onClose} aria-label="Yopish">
              <X size={18} />
            </button>
          </div>
        )}
        <div className={`${noPad ? '' : s.body} ${footer ? s.bodyWithFooter : ''}`}>
          {children}
        </div>
        {footer && <div className={s.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
