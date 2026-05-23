import { FileText, Users, Smile, Headphones } from 'lucide-react';
import { stats } from '../data/mockData';
import styles from './StatsBar.module.css';

const icons = { 'file-text': FileText, users: Users, smile: Smile, headphones: Headphones };

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      {stats.map((s, i) => {
        const Icon = icons[s.icon] || FileText;
        return (
          <div key={i} className={styles.item}>
            <div className={styles.iconWrap}>
              <Icon size={20} />
            </div>
            <div>
              <div className={styles.value}>{s.value}</div>
              <div className={styles.label}>{s.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
