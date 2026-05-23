import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Users, Briefcase, Star, Shield, X,
  Globe, Phone, Mail, Heart, ChevronRight, Building2, Calendar
} from 'lucide-react';
import { companies, jobs as allJobs } from '../data/mockData';
import { useApp } from '../context/AppContext';
import Modal from '../components/ui/Modal';
import ApplyModal from '../components/ui/ApplyModal';
import s from './Companies.module.css';

const industries = ['Barchasi', 'E-commerce', 'Telekommunikatsiya', 'Bank', 'Texnologiya', 'FMCG', 'Elektronika', 'Transport'];

export default function Companies() {
  const [query,    setQuery]    = useState('');
  const [industry, setIndustry] = useState('Barchasi');
  const [detail,   setDetail]   = useState(null);   // company detail modal
  const [applyJob, setApplyJob] = useState(null);   // apply modal
  const [followed, setFollowed] = useState(new Set());
  const { toast } = useApp();
  const navigate   = useNavigate();

  const filtered = companies.filter(c => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase()) &&
        !c.industry.toLowerCase().includes(query.toLowerCase())) return false;
    if (industry !== 'Barchasi' && c.industry !== industry) return false;
    return true;
  });

  const companyJobs = detail
    ? allJobs.filter(j => j.company === detail.name)
    : [];

  const toggleFollow = (id) => {
    setFollowed(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast("Kuzatuvdan olib tashlandi", 'info'); }
      else              { next.add(id);    toast("Kompaniya kuzatilmoqda ✅", 'success'); }
      return next;
    });
  };

  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1 className={s.title}>Kompaniyalar</h1>
        <p className={s.sub}>{companies.length} ta tasdiqlangan kompaniya</p>
      </div>

      {/* Search & Filter */}
      <div className={s.toolbar}>
        <div className={s.searchBox}>
          <Search size={15} className={s.searchIco} />
          <input
            className={s.searchIn}
            placeholder="Kompaniya nomi yoki soha..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className={s.filterRow}>
          {industries.map(ind => (
            <button
              key={ind}
              className={`${s.indBtn} ${industry === ind ? s.indActive : ''}`}
              onClick={() => setIndustry(ind)}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {filtered.map(c => (
          <div key={c.id} className={s.card} onClick={() => setDetail(c)}>
            <div className={s.cardTop}>
              <div className={s.logo} style={{ background: c.color }}>
                <span style={{ color: c.textColor, fontSize: c.logo.length > 3 ? 10 : 13, fontWeight: 800 }}>{c.logo}</span>
              </div>
              {c.verified && (
                <div className={s.verBadge}>
                  <Shield size={11} color="var(--success)" />
                  <span>Tasdiqlangan</span>
                </div>
              )}
            </div>
            <h3 className={s.compName}>{c.name}</h3>
            <p className={s.compIndustry}>{c.industry}</p>
            <div className={s.meta}>
              <span className={s.metaItem}><MapPin size={11} />{c.location}</span>
              <span className={s.metaItem}><Users size={11} />{c.size} xodim</span>
            </div>
            <div className={s.bottom}>
              <div className={s.rating}>
                <Star size={12} fill="var(--warning)" color="var(--warning)" />
                <span>{c.rating}</span>
              </div>
              <div className={s.jobCount}>
                <Briefcase size={11} />
                <span>{c.jobs} ish</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={s.empty}>
          <span style={{ fontSize: 40 }}>🏢</span>
          <p>Kompaniya topilmadi</p>
        </div>
      )}

      {/* ── Company Detail Modal ── */}
      <Modal open={!!detail} onClose={() => setDetail(null)} width={640} noPad>
        {detail && (
          <div className={s.modalBody}>
            {/* Hero banner */}
            <div className={s.heroBanner} style={{ background: detail.color }}>
              <button className={s.modalClose} onClick={() => setDetail(null)}>
                <X size={18} />
              </button>
              <div className={s.heroLogo}>
                <span style={{ color: detail.textColor, fontSize: detail.logo.length > 3 ? 18 : 22, fontWeight: 800 }}>
                  {detail.logo}
                </span>
              </div>
            </div>

            <div className={s.modalContent}>
              {/* Company info */}
              <div className={s.compHead}>
                <div>
                  <div className={s.compHeadRow}>
                    <h2 className={s.modalCompName}>{detail.name}</h2>
                    {detail.verified && (
                      <div className={s.verBadgeLg}>
                        <Shield size={13} color="var(--success)" />
                        <span>Tasdiqlangan</span>
                      </div>
                    )}
                  </div>
                  <p className={s.modalIndustry}>{detail.industry}</p>
                </div>
                <div className={s.headActions}>
                  <button
                    className={`${s.followBtn} ${followed.has(detail.id) ? s.followedBtn : ''}`}
                    onClick={() => toggleFollow(detail.id)}
                  >
                    <Heart size={14} fill={followed.has(detail.id) ? 'currentColor' : 'none'} />
                    {followed.has(detail.id) ? 'Kuzatilmoqda' : 'Kuzatish'}
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div className={s.statsRow}>
                <div className={s.statBox}>
                  <Star size={16} fill="var(--warning)" color="var(--warning)" />
                  <span className={s.statVal}>{detail.rating}</span>
                  <span className={s.statLabel}>Reyting</span>
                </div>
                <div className={s.statBox}>
                  <Users size={16} color="var(--primary)" />
                  <span className={s.statVal}>{detail.size}</span>
                  <span className={s.statLabel}>Xodim</span>
                </div>
                <div className={s.statBox}>
                  <Briefcase size={16} color="var(--primary)" />
                  <span className={s.statVal}>{detail.jobs}</span>
                  <span className={s.statLabel}>Ochiq ish</span>
                </div>
                <div className={s.statBox}>
                  <Calendar size={16} color="var(--primary)" />
                  <span className={s.statVal}>{detail.founded || '2015'}</span>
                  <span className={s.statLabel}>Tashkil etilgan</span>
                </div>
              </div>

              {/* Contact */}
              <div className={s.contactRow}>
                <span className={s.contactItem}><MapPin size={13} />{detail.location}</span>
                {detail.website && <span className={s.contactItem}><Globe size={13} />{detail.website}</span>}
                {detail.phone   && <span className={s.contactItem}><Phone size={13} />{detail.phone}</span>}
                {detail.email   && <span className={s.contactItem}><Mail size={13} />{detail.email}</span>}
              </div>

              {/* About */}
              <section className={s.section}>
                <h3 className={s.sectionTitle}><Building2 size={15} /> Kompaniya haqida</h3>
                <p className={s.descText}>{detail.desc}</p>
              </section>

              {/* Open jobs */}
              {companyJobs.length > 0 && (
                <section className={s.section}>
                  <h3 className={s.sectionTitle}>
                    <Briefcase size={15} /> Ochiq lavozimlar
                    <span className={s.jobCountBadge}>{companyJobs.length}</span>
                  </h3>
                  <div className={s.jobsList}>
                    {companyJobs.map(j => (
                      <div key={j.id} className={s.jobItem}>
                        <div className={s.jobItemInfo}>
                          <span className={s.jobItemTitle}>{j.title}</span>
                          <div className={s.jobItemMeta}>
                            <span><MapPin size={10} />{j.location}</span>
                            <span><Briefcase size={10} />{j.type}</span>
                            <span className={s.jobItemSalary}>{j.salary} so'm</span>
                          </div>
                        </div>
                        <button className={s.applySmBtn} onClick={() => setApplyJob(j)}>
                          Ariza <ChevronRight size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* See all in jobs page */}
              <button
                className={s.seeAllBtn}
                onClick={() => { setDetail(null); navigate(`/jobs?q=${encodeURIComponent(detail.name)}`); }}
              >
                <Briefcase size={14} /> Barcha ishlarni ko'rish
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Apply modal */}
      <ApplyModal job={applyJob} open={!!applyJob} onClose={() => setApplyJob(null)} />
    </div>
  );
}
