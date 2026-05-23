import { useState } from 'react';
import {
  Home, Search, FileText, Star, CheckSquare,
  MessageCircle, Building2, BookOpen, Settings,
  Moon, Sun, Sparkles
} from 'lucide-react';
import { navItems } from '../data/mockData';
import styles from './Sidebar.module.css';

const iconMap = {
  home: Home, search: Search, 'file-text': FileText, star: Star,
  'check-square': CheckSquare, 'message-circle': MessageCircle,
  building: Building2, 'book-open': BookOpen, settings: Settings,
};

export default function Sidebar({ activeNav, setActiveNav, darkMode, setDarkMode }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#E91E8C" />
            <path d="M8 18 C8 12 14 8 14 8 C14 8 20 12 20 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <circle cx="14" cy="19" r="2.5" fill="white"/>
          </svg>
        </div>
        <div>
          <div className={styles.logoText}>AyolKaryera</div>
          <div className={styles.logoSub}>Xavfsiz ish, yorqin kelajak</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => {
          const Icon = iconMap[item.icon] || Home;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon size={18} className={styles.navIcon} />
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && (
                <span className={`${styles.badge} ${typeof item.badge === 'string' ? styles.badgeNew : styles.badgeCount}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className={styles.aiCard}>
        <div className={styles.aiTop}>
          <Sparkles size={14} color="#E91E8C" />
          <span className={styles.aiLabel}>AI yordamida</span>
        </div>
        <div className={styles.aiTitle}>CV yarating</div>
        <p className={styles.aiDesc}>1 daqiqada professional CV tayyorla va ishga e'tiboringizni oshiring.</p>
        <button className={styles.aiBtn}>CV yaratish</button>
        <div className={styles.aiDeco}>
          <span>📄</span>
          <span className={styles.aiStar}>✨</span>
        </div>
      </div>

      <div className={styles.darkToggle}>
        <Sun size={16} color="#6b7280" />
        <span className={styles.darkLabel}>Tungi rejim</span>
        <button
          className={`${styles.toggle} ${darkMode ? styles.toggleOn : ''}`}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>
    </aside>
  );
}
