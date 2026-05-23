import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Shield, Users, Star, Home as HomeIcon, Clock, Heart, ChevronDown, ChevronRight, MapPin, DollarSign, Briefcase, FileText as FT, Building, Headphones, Smile } from 'lucide-react';
import JobCard from '../components/ui/JobCard';
import BannerSection from '../components/home/BannerSection';
import { jobs, stats, companies as allCompanies } from '../data/mockData';
import s from './Home.module.css';

const quickFilters = [
  { id: 'remote',   label: 'Masofaviy',          icon: HomeIcon, type: 'Masofaviy' },
  { id: 'parttime', label: 'Yarim stavka',         icon: Clock,    type: 'Yarim stavka' },
  { id: 'noexp',    label: 'Tajribasizlar uchun',  icon: Star,     type: 'noexp' },
  { id: 'mothers',  label: 'Onalar uchun',         icon: Heart,    type: 'mothers' },
];

const statIcons = { 'file-text': FT, building: Building, users: Users, headphones: Headphones };

export default function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [direction, setDirection] = useState({ yo: '', type: '', loc: '', salary: '' });

  const featuredJobs = jobs.slice(0, showAll ? 6 : 3);

  const handleSearch = () => {
    const parts = [direction.yo, direction.type, direction.loc, direction.salary].filter(Boolean);
    const params = new URLSearchParams();
    if (parts.length) params.set('q', parts.join(' '));
    if (direction.type) params.set('type', direction.type);
    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleQuickFilter = (f) => {
    const active = activeFilter === f.id;
    setActiveFilter(active ? null : f.id);
    if (!active && f.type !== 'noexp' && f.type !== 'mothers') {
      navigate(`/jobs?type=${encodeURIComponent(f.type)}`);
    } else if (!active) {
      navigate(`/jobs?q=${encodeURIComponent(f.label)}`);
    }
  };

  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>Xavfsiz ish toping,<br />kelajagingizni yarating!</h1>
          <p className={s.heroSub}>Ayollar uchun ishonchli ish e'lonlari platformasi.</p>
          <div className={s.heroBtns}>
            <button className={s.btnPrimary} onClick={() => navigate('/jobs')}>
              <Search size={15} /> Ish qidirish
            </button>
            <button className={s.btnOutline} onClick={() => navigate('/cv')}>
              <FileText size={15} /> CV yaratish
            </button>
          </div>
        </div>
        <div className={s.heroBadges}>
          <div className={s.badge}><span className={s.badgeIcon} style={{background:'#4CAF50'}}><Shield size={13} color="#fff"/></span>Xavfsiz platforma</div>
          <div className={s.badge}><span className={s.badgeIcon} style={{background:'#E91E8C'}}><Users size={13} color="#fff"/></span>Ayollar uchun</div>
          <div className={s.badge}><span className={s.badgeIcon} style={{background:'#FF9800'}}><Star size={13} color="#fff"/></span>Ishonchli kompaniyalar</div>
        </div>
        <div className={s.heroIllust}>
          <HeroSVG />
        </div>
      </section>

      {/* Search */}
      <section className={s.searchSection}>
        <h2 className={s.sectionTitle}>Ish qidiring</h2>
        <div className={s.searchCard}>
          <div className={s.filterRow}>
            <SelectDrop icon={<Briefcase size={14}/>} placeholder="Yo'nalish" opts={["IT","Marketing","Moliya","HR","Dizayn","Ta'lim","Tibbiyot"]} value={direction.yo} onChange={v=>setDirection(p=>({...p,yo:v}))} />
            <SelectDrop icon={<FT size={14}/>} placeholder="Ish turi" opts={["To'liq stavka","Yarim stavka","Masofaviy","Freelance","Smenali ish"]} value={direction.type} onChange={v=>setDirection(p=>({...p,type:v}))} />
            <SelectDrop icon={<MapPin size={14}/>} placeholder="Joylashuv" opts={["Toshkent","Samarqand","Buxoro","Namangan","Andijon","Farg'ona"]} value={direction.loc} onChange={v=>setDirection(p=>({...p,loc:v}))} />
            <SelectDrop icon={<DollarSign size={14}/>} placeholder="Maosh" opts={["1–3 mln","3–5 mln","5–10 mln","10+ mln"]} value={direction.salary} onChange={v=>setDirection(p=>({...p,salary:v}))} />
            <button className={s.searchBtn} onClick={handleSearch}>
              <Search size={15}/> Qidirish
            </button>
          </div>
          <div className={s.quickRow}>
            {quickFilters.map(f => {
              const Icon = f.icon;
              const active = activeFilter === f.id;
              return (
                <button key={f.id} className={`${s.quickBtn} ${active?s.quickActive:''}`} onClick={() => handleQuickFilter(f)}>
                  <Icon size={13}/> {f.label}
                </button>
              );
            })}
            <button className={s.moreBtn} onClick={() => navigate('/jobs')}><ChevronRight size={16}/></button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Tavsiya etilgan ishlar</h2>
          <button className={s.seeAll} onClick={() => navigate('/jobs')}>Barchasini ko'rish →</button>
        </div>
        <div className={s.jobsCard}>
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} compact onClick={() => navigate('/jobs')} />
          ))}
          <button className={s.loadMore} onClick={() => showAll ? navigate('/jobs') : setShowAll(true)}>
            <ChevronDown size={16} />
            {showAll ? "Barcha ishlarni ko'rish" : "Yana ko'proq ishlar"}
          </button>
        </div>
      </section>

      {/* Companies */}
      <section>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Ishonchli kompaniyalar</h2>
          <button className={s.seeAll} onClick={() => navigate('/companies')}>Barchasini ko'rish →</button>
        </div>
        <div className={s.companiesRow}>
          {allCompanies.slice(0,6).map(c => (
            <button key={c.id} className={s.companyChip} onClick={() => navigate('/companies')}>
              <div className={s.companyLogo} style={{background:c.color}}>
                <span style={{color:c.textColor,fontSize:c.logo.length>3?9:11,fontWeight:800}}>{c.logo}</span>
              </div>
              <span className={s.companyName}>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Banners */}
      <BannerSection />

      {/* Stats */}
      <section className={s.statsGrid}>
        {stats.map((st, i) => {
          const Icon = statIcons[st.icon] || FT;
          return (
            <div key={i} className={s.statCard}>
              <div className={s.statIcon}><Icon size={20}/></div>
              <div className={s.statVal}>{st.value}</div>
              <div className={s.statLabel}>{st.label}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function SelectDrop({ icon, placeholder, opts, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.selectWrap} ${open ? s.selectWrapOpen : ''}`}>
      <button className={s.select} onClick={() => setOpen(o => !o)}>
        <span className={s.selectIcon}>{icon}</span>
        <span className={`${s.selectText} ${!value ? s.ph : ''}`}>{value || placeholder}</span>
        <ChevronDown size={13} className={`${s.chevron} ${open ? s.chevOpen : ''}`} />
      </button>
      {open && (
        <div className={s.dropdown}>
          {opts.map(o => (
            <button key={o} className={`${s.dropItem} ${value===o?s.dropActive:''}`} onClick={() => { onChange(o); setOpen(false); }}>{o}</button>
          ))}
        </div>
      )}
      {open && <div className={s.dropOverlay} onClick={() => setOpen(false)} />}
    </div>
  );
}

function HeroSVG() {
  return (
    <svg viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect x="40" y="120" width="100" height="100" rx="14" fill="#f9a8d4"/>
      <path d="M90 128 L68 145 L90 158 L112 145 Z" fill="#e879a8"/>
      <rect x="73" y="98" width="24" height="28" rx="10" fill="#FBBF80"/>
      <ellipse cx="90" cy="82" rx="28" ry="28" fill="#FBBF80"/>
      <path d="M62 76 Q62 46 90 44 Q118 46 118 76 L115 62 Q106 38 90 38 Q74 38 65 62 Z" fill="#1a1a2e"/>
      <path d="M62 76 Q58 92 63 103" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round"/>
      <path d="M118 76 Q122 92 117 103" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round"/>
      <ellipse cx="78" cy="82" rx="4.5" ry="5" fill="#1a1a2e"/>
      <ellipse cx="102" cy="82" rx="4.5" ry="5" fill="#1a1a2e"/>
      <circle cx="79.5" cy="80.5" r="1.5" fill="white"/>
      <circle cx="103.5" cy="80.5" r="1.5" fill="white"/>
      <path d="M80 93 Q90 100 100 93" stroke="#c17060" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <rect x="26" y="168" width="128" height="66" rx="10" fill="#e2e8f0"/>
      <rect x="30" y="172" width="120" height="58" rx="8" fill="#1e293b"/>
      <rect x="36" y="178" width="108" height="46" rx="5" fill="#0f172a"/>
      <rect x="42" y="184" width="48" height="4" rx="2" fill="#E91E8C" opacity="0.8"/>
      <rect x="42" y="192" width="76" height="2" rx="1" fill="#334155"/>
      <rect x="42" y="198" width="64" height="2" rx="1" fill="#334155"/>
      <rect x="42" y="204" width="70" height="2" rx="1" fill="#334155"/>
      <rect x="20" y="232" width="140" height="7" rx="3.5" fill="#cbd5e1"/>
      <path d="M62 138 Q40 162 38 174" stroke="#f9a8d4" strokeWidth="16" strokeLinecap="round"/>
      <path d="M118 138 Q140 162 142 174" stroke="#f9a8d4" strokeWidth="16" strokeLinecap="round"/>
    </svg>
  );
}
