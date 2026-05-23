import { useNavigate } from 'react-router-dom';
import { MapPin, Shield, ChevronRight, User, Briefcase, GraduationCap } from 'lucide-react';
import { companies, careerTools, user } from '../../data/mockData';
import s from './RightPanel.module.css';

const toolIcons = { user: User, briefcase: Briefcase, 'graduation-cap': GraduationCap };

export default function RightPanel() {
  const navigate = useNavigate();
  const topCompanies = companies.slice(0, 4);

  return (
    <aside className={s.panel}>
      {/* Profile */}
      <div className={s.card}>
        <div className={s.profileTop}>
          <div className={s.avatar}>
            <svg viewBox="0 0 64 64" fill="none" width="52" height="52">
              <circle cx="32" cy="32" r="32" fill="var(--primary-light)" />
              <circle cx="32" cy="26" r="11" fill="var(--primary)" opacity="0.65"/>
              <path d="M8 58 C8 42 56 42 56 58" fill="var(--primary)" opacity="0.5"/>
            </svg>
          </div>
          <div>
            <div className={s.profileName}>{user.name}</div>
            <div className={s.profileLocation}>
              <MapPin size={11} /> {user.location}
            </div>
            <div className={s.profileTitle}>{user.title}</div>
          </div>
        </div>

        <div className={s.progressRow}>
          <span className={s.progressLabel}>Profil to'ldirilganlik darajasi</span>
          <span className={s.progressPct}>{user.completion}%</span>
        </div>
        <div className={s.bar}><div className={s.fill} style={{ width: `${user.completion}%` }} /></div>

        <button className={s.fillBtn} onClick={() => navigate('/settings')}>
          Profilni to'ldirish
        </button>
      </div>

      {/* Trusted companies */}
      <div className={s.card}>
        <div className={s.cardHeader}>
          <h3 className={s.cardTitle}>Ishonchli kompaniyalar</h3>
          <button className={s.seeAll} onClick={() => navigate('/companies')}>
            Barchasini ko'rish →
          </button>
        </div>
        <div className={s.logos}>
          {topCompanies.map(c => (
            <button
              key={c.id}
              className={s.logo}
              style={{ background: c.color }}
              onClick={() => navigate('/companies')}
              title={c.name}
            >
              <span style={{ color: c.textColor, fontSize: 10, fontWeight: 800 }}>{c.logo}</span>
            </button>
          ))}
        </div>
        <div className={s.verified}>
          <Shield size={13} color="var(--success)" />
          <span>Barcha kompaniyalar tekshirilgan va tasdiqlangan</span>
        </div>
      </div>

      {/* Career tools */}
      <div className={s.card}>
        <h3 className={s.cardTitle} style={{ marginBottom: 12 }}>Karyera uchun foydali</h3>
        <div className={s.tools}>
          {careerTools.map(tool => {
            const Icon = toolIcons[tool.icon] || User;
            return (
              <button key={tool.id} className={s.tool} onClick={() => navigate(tool.path)}>
                <div className={s.toolIcon} style={{ background: tool.color + '18' }}>
                  <Icon size={17} color={tool.color} />
                </div>
                <div className={s.toolBody}>
                  <span className={s.toolTitle}>{tool.title}</span>
                  <span className={s.toolDesc}>{tool.desc}</span>
                </div>
                <ChevronRight size={15} color="var(--text-muted)" />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
