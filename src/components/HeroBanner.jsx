import { Search, FileText, Users, Shield, Star } from 'lucide-react';
import styles from './HeroBanner.module.css';

const PRIMARY = '#E91E8C';

function WomanIllustration() {
  return (
    <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      {/* Body / blazer */}
      <rect x="45" y="110" width="70" height="90" rx="12" fill="#f9a8d4" />
      {/* Blazer lapels */}
      <path d="M80 115 L60 130 L80 145 L100 130 Z" fill="#e879a8" />
      {/* Neck */}
      <rect x="70" y="90" width="20" height="24" rx="8" fill="#FBBF80" />
      {/* Head */}
      <ellipse cx="80" cy="75" rx="26" ry="26" fill="#FBBF80" />
      {/* Hair */}
      <path d="M54 70 Q54 40 80 38 Q106 40 106 70 L104 58 Q96 34 80 34 Q64 34 56 58 Z" fill="#1a1a2e" />
      {/* Hair sides */}
      <path d="M54 70 Q50 85 55 95" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />
      <path d="M106 70 Q110 85 105 95" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="70" cy="74" rx="4" ry="4.5" fill="#1a1a2e" />
      <ellipse cx="90" cy="74" rx="4" ry="4.5" fill="#1a1a2e" />
      <circle cx="71.5" cy="72.5" r="1.5" fill="white" />
      <circle cx="91.5" cy="72.5" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M72 84 Q80 90 88 84" stroke="#c17060" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Laptop */}
      <rect x="30" y="148" width="100" height="58" rx="8" fill="#e2e8f0" />
      <rect x="34" y="152" width="92" height="48" rx="6" fill="#1e293b" />
      {/* Screen glow */}
      <rect x="38" y="156" width="84" height="40" rx="4" fill="#0f172a" />
      <rect x="42" y="160" width="40" height="4" rx="2" fill="#E91E8C" opacity="0.7" />
      <rect x="42" y="168" width="60" height="2" rx="1" fill="#475569" />
      <rect x="42" y="174" width="50" height="2" rx="1" fill="#475569" />
      <rect x="42" y="180" width="55" height="2" rx="1" fill="#475569" />
      {/* Laptop base */}
      <rect x="24" y="204" width="112" height="6" rx="3" fill="#cbd5e1" />
      {/* Arms */}
      <path d="M55 125 Q35 145 32 155" stroke="#f9a8d4" strokeWidth="14" strokeLinecap="round" />
      <path d="M105 125 Q125 145 128 155" stroke="#f9a8d4" strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

export default function HeroBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          Xavfsiz ish toping,<br />
          kelajagingizni yarating!
        </h1>
        <p className={styles.subtitle}>
          Ayollar uchun ishonchli ish e'lonlari platformasi.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>
            <Search size={15} />
            Ish qidirish
          </button>
          <button className={styles.btnOutline}>
            <FileText size={15} />
            CV yaratish
          </button>
        </div>
      </div>

      <div className={styles.center}>
        <WomanIllustration />
      </div>

      <div className={styles.chips}>
        <div className={styles.chip}>
          <span className={styles.chipIcon} style={{ background: '#4CAF50' }}>
            <Shield size={13} color="white" />
          </span>
          <span>Xavfsiz platforma</span>
        </div>
        <div className={styles.chip}>
          <span className={styles.chipIcon} style={{ background: PRIMARY }}>
            <Users size={13} color="white" />
          </span>
          <span>Ayollar uchun</span>
        </div>
        <div className={styles.chip}>
          <span className={styles.chipIcon} style={{ background: '#FF9800' }}>
            <Star size={13} color="white" />
          </span>
          <span>Ishonchli kompaniyalar</span>
        </div>
      </div>
    </div>
  );
}
