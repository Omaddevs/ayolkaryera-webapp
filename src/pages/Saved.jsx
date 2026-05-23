import { useNavigate } from 'react-router-dom';
import { Bookmark, Search, Briefcase, MapPin, Trash2 } from 'lucide-react';
import { jobs as allJobs } from '../data/mockData';
import { useApp } from '../context/AppContext';
import s from './Saved.module.css';

export default function Saved() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const savedJobs = allJobs.filter(j => state.savedJobIds.has(j.id));

  if (savedJobs.length === 0) {
    return (
      <div className={s.empty}>
        <div className={s.emptyIcon}><Bookmark size={40} /></div>
        <h2 className={s.emptyTitle}>Saqlangan ishlar yo'q</h2>
        <p className={s.emptyDesc}>Sizni qiziqtirgan ishlarni bookmark qilsangiz, ular shu yerda saqlanadi.</p>
        <button className={s.emptyBtn} onClick={() => navigate('/jobs')}>
          <Search size={15} /> Ish qidirish
        </button>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <div className={s.header}>
        <div>
          <h1 className={s.title}>Saqlangan ishlar</h1>
          <p className={s.sub}>{savedJobs.length} ta ish saqlangan</p>
        </div>
        <button className={s.clearAll} onClick={() => savedJobs.forEach(j => dispatch({ type: 'TOGGLE_SAVE', id: j.id }))}>
          <Trash2 size={14} /> Barchasini o'chirish
        </button>
      </div>

      <div className={s.grid}>
        {savedJobs.map(job => (
          <div key={job.id} className={s.card} onClick={() => navigate('/jobs')}>
            <div className={s.cardTop}>
              <div className={s.logo} style={{ background: job.color }}>
                <span style={{ color: job.logoText, fontSize: job.logo.length > 3 ? 9 : 11, fontWeight: 800 }}>{job.logo}</span>
              </div>
              <button
                className={s.removeBtn}
                onClick={e => { e.stopPropagation(); dispatch({ type: 'TOGGLE_SAVE', id: job.id }); }}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <h3 className={s.jobTitle}>{job.title}</h3>
            <p className={s.company}>{job.company}</p>
            <div className={s.meta}>
              <span className={s.metaTag}><Briefcase size={11} />{job.type}</span>
              <span className={s.metaTag}><MapPin size={11} />{job.location}</span>
            </div>
            <div className={s.footer}>
              <span className={s.salary}>{job.salary} so'm</span>
              {job.isNew && <span className={s.newBadge}>Yangi</span>}
            </div>
            <button className={s.applyBtn}>Ariza topshirish</button>
          </div>
        ))}
      </div>
    </div>
  );
}
