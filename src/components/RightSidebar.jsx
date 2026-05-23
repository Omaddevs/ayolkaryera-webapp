import { MapPin, Shield, ChevronRight, User, Briefcase, GraduationCap } from 'lucide-react';
import { companies, careerTools } from '../data/mockData';
import styles from './RightSidebar.module.css';

const toolIcons = { user: User, briefcase: Briefcase, 'graduation-cap': GraduationCap };

export default function RightSidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.avatarWrap}>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=malika&backgroundColor=ffdfbf"
              alt="Malika Nosirova"
              className={styles.avatar}
            />
          </div>
          <div>
            <div className={styles.profileName}>Malika Nosirova</div>
            <div className={styles.profileLocation}>
              <MapPin size={12} />
              Toshkent, Chilonzor
            </div>
            <div className={styles.profileRole}>Marketing mutaxassisi</div>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressLabel}>
            <span>Profil to'ldirilganlik darajasi</span>
            <span className={styles.progressPct}>80%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '80%' }} />
          </div>
        </div>

        <button className={styles.fillBtn}>Profilni to'ldirish</button>
      </div>

      {/* Trusted Companies */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Ishonchli kompaniyalar</h3>
          <button className={styles.seeAll}>Barchasini ko'rish →</button>
        </div>
        <div className={styles.companiesGrid}>
          {companies.map(c => (
            <div
              key={c.id}
              className={styles.companyLogo}
              style={{ background: c.color }}
              title={c.name}
            >
              <span style={{ color: c.textColor, fontSize: 11, fontWeight: 800, letterSpacing: -0.5 }}>
                {c.logo}
              </span>
            </div>
          ))}
          <button className={styles.moreCompany}>›</button>
        </div>
        <div className={styles.verifiedBadge}>
          <Shield size={14} color="#4CAF50" />
          <span>Barcha kompaniyalar tekshirilgan va tasdiqlangan</span>
        </div>
      </div>

      {/* Career Tools */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle} style={{ marginBottom: 12 }}>Karyera uchun foydali</h3>
        <div className={styles.toolsList}>
          {careerTools.map(tool => {
            const Icon = toolIcons[tool.icon] || User;
            return (
              <button key={tool.id} className={styles.toolItem}>
                <div className={styles.toolIcon} style={{ background: tool.color + '18' }}>
                  <Icon size={18} color={tool.color} />
                </div>
                <div className={styles.toolInfo}>
                  <div className={styles.toolTitle}>{tool.title}</div>
                  <div className={styles.toolDesc}>{tool.desc}</div>
                </div>
                <ChevronRight size={16} color="var(--gray-light)" />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
