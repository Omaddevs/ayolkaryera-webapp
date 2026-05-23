import { NavLink } from 'react-router-dom';
import { Home, Search, FileText, MessageCircle, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import s from './MobileNav.module.css';

const mobileNav = [
  { path: '/',         label: 'Bosh sahifa', icon: Home },
  { path: '/jobs',     label: 'Ish topish',  icon: Search },
  { path: '/cv',       label: 'CV',          icon: FileText, primary: true },
  { path: '/messages', label: 'Xabarlar',    icon: MessageCircle },
  { path: '/settings', label: 'Profil',      icon: User },
];

export default function MobileNav() {
  const { totalUnread } = useApp();

  return (
    <nav className={s.nav}>
      {mobileNav.map(item => {
        const Icon = item.icon;
        const showBadge = item.path === '/messages' && totalUnread > 0;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${s.item} ${isActive ? s.active : ''} ${item.primary ? s.primary : ''}`
            }
          >
            <span className={s.iconWrap}>
              <Icon size={item.primary ? 22 : 20} />
              {showBadge && <span className={s.badge}>{totalUnread}</span>}
            </span>
            <span className={s.label}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
