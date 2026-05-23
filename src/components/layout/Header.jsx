import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { user } from '../../data/mockData';
import NotificationPanel from '../ui/NotificationPanel';
import s from './Header.module.css';

export default function Header() {
  const { state, dispatch, totalUnread, unreadNotifs } = useApp();
  const [query, setQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/jobs?q=${encodeURIComponent(query.trim())}`);
  };

  // Close notif panel when clicking outside the bell wrapper
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [notifOpen]);

  return (
    <header className={s.header}>
      <button className={s.menuBtn} onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
        {state.sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <form className={s.searchWrap} onSubmit={handleSearch}>
        <Search size={15} className={s.searchIcon} />
        <input
          className={s.searchInput}
          type="text"
          placeholder="Ish nomi, kompaniya yoki kalit so'z"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button type="button" className={s.clearBtn} onClick={() => setQuery('')}>
            <X size={14} />
          </button>
        )}
      </form>

      <div className={s.actions}>
        <button className={s.iconBtn} onClick={() => navigate('/messages')} title="Xabarlar">
          <MessageSquare size={19} />
          {totalUnread > 0 && <span className={s.dot}>{totalUnread}</span>}
        </button>

        <div className={s.bellWrap} ref={bellRef}>
          <button
            className={s.iconBtn}
            title="Bildirishnomalar"
            onClick={() => setNotifOpen(v => !v)}
          >
            <Bell size={19} />
            {unreadNotifs > 0 && <span className={s.dot}>{unreadNotifs}</span>}
          </button>
          <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        <button className={s.profileBtn} onClick={() => navigate('/settings')}>
          <div className={s.avatar}>
            <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
              <circle cx="20" cy="20" r="20" fill="var(--primary-light)" />
              <circle cx="20" cy="16" r="7" fill="var(--primary)" opacity="0.6"/>
              <path d="M6 36 C6 27 34 27 34 36" fill="var(--primary)" opacity="0.5"/>
            </svg>
          </div>
          <div className={s.profileInfo}>
            <span className={s.profileName}>{user.name}</span>
            <span className={s.profileSub}>Profilim</span>
          </div>
        </button>
      </div>
    </header>
  );
}
