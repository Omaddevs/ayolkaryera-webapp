import { Search, Bell, MessageSquare } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.searchWrap}>
        <Search size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Ish nomi, kompaniya yoki kalit so'z"
        />
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <MessageSquare size={20} />
          <span className={styles.notifBadge}>3</span>
        </button>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.notifBadge}>12</span>
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=malika&backgroundColor=ffdfbf"
              alt="Malika Nosirova"
              className={styles.avatarImg}
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>Malika Nosirova</div>
            <div className={styles.profileLink}>Profilim</div>
          </div>
        </div>
      </div>
    </header>
  );
}
