import { Bookmark, BookmarkCheck, MapPin, Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import s from './JobCard.module.css';

export default function JobCard({ job, onClick, compact = false }) {
  const { state, dispatch } = useApp();
  const saved = state.savedJobIds.has(job.id);

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_SAVE', id: job.id });
  };

  return (
    <div className={`${s.card} ${compact ? s.compact : ''}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick?.()}>
      <div className={s.logo} style={{ background: job.color }}>
        <span style={{ color: job.logoText, fontSize: job.logo.length > 3 ? 9 : 11, fontWeight: 800, lineHeight: 1.1 }}>
          {job.logo}
        </span>
      </div>

      <div className={s.body}>
        <div className={s.top}>
          <h3 className={s.title}>{job.title}</h3>
          {job.isNew && <span className={s.newTag}>Yangi</span>}
        </div>
        <p className={s.company}>{job.company}</p>
        <div className={s.meta}>
          <span className={s.tag}><Clock size={10} />{job.type}</span>
          <span className={s.tag}><MapPin size={10} />{job.location}</span>
          {job.tags?.slice(0,2).map(t => <span key={t} className={s.pill}>{t}</span>)}
        </div>
      </div>

      <div className={s.end}>
        <div className={s.salary}>{job.salary} so'm</div>
        <div className={s.endRow}>
          <button
            className={`${s.saveBtn} ${saved ? s.saved : ''}`}
            onClick={handleSave}
            title={saved ? 'Saqlangan' : 'Saqlash'}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
          {!compact && <ChevronRight size={15} className={s.arrow} />}
        </div>
      </div>
    </div>
  );
}
