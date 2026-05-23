import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Check, Trash2, ClipboardList, MessageCircle, Briefcase, User,
  ChevronLeft, ChevronRight, Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import s from './NotificationPanel.module.css';

const typeConfig = {
  application: {
    Icon: ClipboardList,
    label: 'Ariza',
    color: '#3B82F6',
  },
  message: {
    Icon: MessageCircle,
    label: 'Xabar',
    color: '#10B981',
  },
  job: {
    Icon: Briefcase,
    label: "Ish e'loni",
    color: '#F59E0B',
  },
  system: {
    Icon: User,
    label: 'Profil',
    color: '#8B5CF6',
  },
};

function NotifIcon({ type, size = 18, large }) {
  const cfg = typeConfig[type] || typeConfig.system;
  const Icon = cfg.Icon;
  return (
    <div
      className={`${s.icon} ${large ? s.iconLarge : ''}`}
      style={{
        background: `${cfg.color}18`,
        borderColor: `${cfg.color}35`,
        color: cfg.color,
      }}
    >
      <Icon size={size} strokeWidth={2} />
    </div>
  );
}

export default function NotificationPanel({ open, onClose }) {
  const { state, dispatch, unreadNotifs } = useApp();
  const [detail, setDetail] = useState(null);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setDetail(null);
      return;
    }
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  const openDetail = (n) => {
    dispatch({ type: 'MARK_NOTIF_READ', id: n.id });
    setDetail(n);
  };

  const handleAction = (path) => {
    onClose();
    setDetail(null);
    navigate(path);
  };

  if (!open) return null;

  const cfg = detail ? typeConfig[detail.type] || typeConfig.system : null;

  return (
    <div className={s.panel} ref={ref} role="dialog" aria-label="Bildirishnomalar">
      {detail ? (
        <>
          <div className={s.detailNav}>
            <button type="button" className={s.backBtn} onClick={() => setDetail(null)}>
              <ChevronLeft size={18} /> Orqaga
            </button>
            <span className={s.detailNavLabel}>Batafsil</span>
          </div>

          <div className={s.detailBody}>
            <NotifIcon type={detail.type} size={26} large />
            <span className={s.detailCat} style={{ color: cfg.color, borderColor: `${cfg.color}40` }}>
              {cfg.label}
            </span>
            <h3 className={s.detailTitle}>{detail.title}</h3>
            <span className={s.detailTime}>
              <Clock size={13} /> {detail.time}
            </span>
            <p className={s.detailText}>{detail.detail || detail.body}</p>
            {detail.action && (
              <button
                type="button"
                className={s.detailAction}
                onClick={() => handleAction(detail.action.path)}
              >
                {detail.action.label}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={s.header}>
            <div className={s.headerLeft}>
              <Bell size={16} />
              <span className={s.headerTitle}>Bildirishnomalar</span>
              {unreadNotifs > 0 && <span className={s.headerBadge}>{unreadNotifs}</span>}
            </div>
            <div className={s.headerRight}>
              {unreadNotifs > 0 && (
                <button
                  type="button"
                  className={s.markAllBtn}
                  onClick={() => dispatch({ type: 'MARK_ALL_NOTIFS_READ' })}
                  title="Barchasini o'qilgan deb belgilash"
                >
                  <Check size={13} /> Barchasi o'qildi
                </button>
              )}
              <button
                type="button"
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
            {state.notifications.map(n => (
              <button
                key={n.id}
                type="button"
                className={`${s.item} ${!n.read ? s.unread : ''}`}
                onClick={() => openDetail(n)}
              >
                <NotifIcon type={n.type} />
                <div className={s.content}>
                  <p className={s.notifTitle}>{n.title}</p>
                  <p className={s.notifBody}>{n.body}</p>
                  <span className={s.notifTime}>{n.time}</span>
                </div>
                {!n.read && <div className={s.dot} />}
                <ChevronRight size={14} className={s.itemArrow} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
