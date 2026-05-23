import { MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import styles from './JobCard.module.css';

export default function JobCard({ job, onToggleSave }) {
  return (
    <div className={styles.card}>
      <div className={styles.logoWrap} style={{ background: job.companyColor }}>
        <span className={styles.logoText} style={{ color: job.logoText }}>
          {job.companyLogo}
        </span>
      </div>

      <div className={styles.info}>
        <div className={styles.topRow}>
          <h3 className={styles.title}>{job.title}</h3>
          {job.isNew && <span className={styles.newBadge}>Yangi</span>}
        </div>
        <p className={styles.company}>{job.company}</p>
        <div className={styles.tags}>
          <span className={styles.tag}>{job.type}</span>
          <span className={styles.tagLocation}>
            <MapPin size={11} />
            {job.location}
          </span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.salary}>{job.salary}</div>
        <button
          className={`${styles.saveBtn} ${job.isSaved ? styles.saved : ''}`}
          onClick={() => onToggleSave(job.id)}
          title={job.isSaved ? 'Saqlangan' : 'Saqlash'}
        >
          {job.isSaved
            ? <BookmarkCheck size={18} />
            : <Bookmark size={18} />
          }
        </button>
      </div>
    </div>
  );
}
