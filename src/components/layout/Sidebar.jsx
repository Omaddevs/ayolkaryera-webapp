import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, FileText, Star, CheckSquare, MessageCircle, Building2, BookOpen, Settings, Sparkles, Sun, Moon, X } from 'lucide-react';
import { navItems } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import s from './Sidebar.module.css';

const icons = { home: Home, search: Search, 'file-text': FileText, star: Star, 'check-square': CheckSquare, 'message-circle': MessageCircle, building: Building2, 'book-open': BookOpen, settings: Settings };

export default function Sidebar() {
  const { state, dispatch, totalUnread } = useApp();
  const location = useLocation();

  return (
    <>
      {state.sidebarOpen && (
        <div className={s.overlay} onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })} />
      )}
      <aside className={`${s.sidebar} ${state.sidebarOpen ? s.open : ''}`}>
        <div className={s.logo}>
          <Logo />
          <div className={s.logoText}>
            <span className={s.brand}>AyolKaryera</span>
            <span className={s.tagline}>Xavfsiz ish, yorqin kelajak</span>
          </div>
          <button className={s.closeBtn} onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}>
            <X size={18} />
          </button>
        </div>

        <nav className={s.nav}>
          {navItems.map(item => {
            const Icon = icons[item.icon] || Home;
            const count = item.id === 'msgs' ? totalUnread : 0;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `${s.navItem} ${isActive ? s.active : ''}`}
                onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
              >
                <Icon size={17} className={s.icon} />
                <span className={s.label}>{item.label}</span>
                {item.badge && <span className={s.badgeNew}>{item.badge}</span>}
                {count > 0 && <span className={s.badgeCount}>{count}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className={s.aiCard}>
          <div className={s.aiHeader}>
            <Sparkles size={13} color="var(--primary)" />
            <span>AI yordamida</span>
          </div>
          <p className={s.aiTitle}>CV yarating</p>
          <p className={s.aiDesc}>1 daqiqada professional CV tayyorla.</p>
          <NavLink to="/cv" className={s.aiBtn} onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}>
            CV yaratish
          </NavLink>
          <div className={s.aiEmoji}>📄✨</div>
        </div>

        <div className={s.footer}>
          <span className={s.footerLabel}>
            {state.darkMode ? <Moon size={15} /> : <Sun size={15} />}
            Tungi rejim
          </span>
          <button
            className={`${s.toggle} ${state.darkMode ? s.toggleOn : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
          >
            <span className={s.thumb} />
          </button>
        </div>
      </aside>
    </>
  );
}

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="16" fill="var(--primary)" />
      <path d="M9 21 C9 13 16 9 16 9 C16 9 23 13 23 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="16" cy="22" r="3" fill="white"/>
    </svg>
  );
}
