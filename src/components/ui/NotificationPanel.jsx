import { useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Briefcase, MessageCircle, Star, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import s from './NotificationPanel.module.css';

const typeIcons = {
  application: Briefcase,
  message:     MessageCircle,
  job:         Briefcase,
  system:      Star,
};

export default function NotificationPanel({ open, onClose }) {
  const { state, dispatch, unreadNotifs } = useApp();
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={s.panel} ref={ref} role="dialog" aria-label="Bildirishnomalar">
      <div className={s.header}>
        <div className={s.headerLeft}>
          <Bell size={16} />
          <span className={s.headerTitle}>Bildirishnomalar</span>
          {unreadNotifs > 0 && <span className={s.headerBadge}>{unreadNotifs}</span>}
        </div>
        <div className={s.headerRight}>
          {unreadNotifs > 0 && (
            <button
              className={s.markAllBtn}
              onClick={() => dispatch({ type: 'MARK_ALL_NOTIFS_READ' })}
              title="Barchasini o'qilgan deb belgilash"
            >
              <Check size={13} /> Barchasi o'qildi
            </button>
          )}
          <button
            className={s.clearBtn}
            onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })}
            title="Tozalash"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className={s.list}>
        {state.notifications.length === 0 && (
          <div className={s.empty}>
            <Bell size={32} />
            <p>Bildirishnoma yo'q</p>
          </div>
        )}
        {state.notifications.map(n => {
          const Icon = typeIcons[n.type] || Star;
          return (
            <div
              key={n.id}
              className={`${s.item} ${!n.read ? s.unread : ''}`}
              onClick={() => dispatch({ type: 'MARK_NOTIF_READ', id: n.id })}
            >
              <div className={`${s.icon} ${s[`icon_${n.type}`] || ''}`}>
                <span className={s.emoji}>{n.icon}</span>
              </div>
              <div className={s.content}>
                <p className={s.notifTitle}>{n.title}</p>
                <p className={s.notifBody}>{n.body}</p>
                <span className={s.notifTime}>{n.time}</span>
              </div>
              {!n.read && <div className={s.dot} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
