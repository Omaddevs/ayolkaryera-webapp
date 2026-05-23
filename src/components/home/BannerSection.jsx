import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, GraduationCap, Megaphone, FileText, ChevronRight, Calendar,
  Check, Sparkles, ArrowRight,
} from 'lucide-react';
import { banners } from '../../data/mockData';
import Modal from '../ui/Modal';
import s from './BannerSection.module.css';

const bannerIcons = {
  crown: Crown,
  'graduation-cap': GraduationCap,
  megaphone: Megaphone,
  'file-text': FileText,
};

function BannerIcon({ icon, size = 22 }) {
  const Icon = bannerIcons[icon] || Sparkles;
  return <Icon size={size} strokeWidth={2} aria-hidden />;
}

export default function BannerSection() {
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  const handleCta = (path) => {
    setDetail(null);
    navigate(path);
  };

  return (
    <section className={s.section}>
      <div className={s.sectionHeader}>
        <div>
          <h2 className={s.sectionTitle}>Bannerlar va aksiyalar</h2>
          <p className={s.sectionSub}>Maxsus takliflar, kurslar va tadbirlar</p>
        </div>
      </div>

      <div className={s.bannerTrack}>
        {banners.map(b => (
          <button
            key={b.id}
            type="button"
            className={`${s.bannerCard} ${b.featured ? s.bannerFeatured : ''}`}
            onClick={() => setDetail(b)}
            style={{
              '--banner-color': b.color,
              '--banner-bg': `${b.color}14`,
              '--banner-border': `${b.color}30`,
            }}
          >
            {b.featured && <span className={s.featuredLabel}><Sparkles size={10} /> Tavsiya</span>}
            <div className={s.bannerIconWrap}>
              <BannerIcon icon={b.icon} size={24} />
            </div>
            <span className={s.bannerTag}>{b.tag}</span>
            <h3 className={s.bannerTitle}>{b.title}</h3>
            <p className={s.bannerSub}>{b.subtitle}</p>
            <span className={s.bannerMore}>
              Batafsil <ChevronRight size={14} />
            </span>
          </button>
        ))}
      </div>

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.title}
        width={520}
        footer={
          detail?.cta ? (
            <button
              type="button"
              className={s.detailCta}
              style={{ background: `linear-gradient(135deg, ${detail.color}, ${detail.color}cc)` }}
              onClick={() => handleCta(detail.cta.path)}
            >
              {detail.cta.label}
              <ArrowRight size={16} />
            </button>
          ) : null
        }
      >
        {detail && (
          <div className={s.detail}>
            <div
              className={s.detailHero}
              style={{
                background: `linear-gradient(135deg, ${detail.color}20 0%, ${detail.color}08 100%)`,
                borderColor: `${detail.color}35`,
              }}
            >
              <div
                className={s.detailIconWrap}
                style={{ background: `${detail.color}22`, color: detail.color, borderColor: `${detail.color}40` }}
              >
                <BannerIcon icon={detail.icon} size={28} />
              </div>
              <span className={s.detailTag} style={{ color: detail.color, borderColor: `${detail.color}45` }}>
                {detail.tag}
              </span>
              <p className={s.detailSub}>{detail.subtitle}</p>
              {detail.validUntil && (
                <span className={s.detailDate}>
                  <Calendar size={13} /> Amal qiladi: {detail.validUntil}
                </span>
              )}
            </div>

            <p className={s.detailLead}>{detail.desc}</p>
            <p className={s.detailText}>{detail.detail}</p>

            {detail.features?.length > 0 && (
              <ul className={s.detailFeatures}>
                {detail.features.map(f => (
                  <li key={f}>
                    <span className={s.featureCheck} style={{ color: detail.color, background: `${detail.color}18` }}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
