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
        <div className={s.heroInner}>
          <div className={s.heroContent}>
            <h1 className={s.heroTitle}>Xavfsiz ish toping,<br />kelajagingizni yarating!</h1>
            <p className={s.heroSub}>Ayollar uchun ishonchli ish e'lonlari platformasi.</p>
            <div className={s.heroBtns}>
              <button type="button" className={s.btnPrimary} onClick={() => navigate('/jobs')}>
                <Search size={16} /> Ish qidirish
              </button>
              <button type="button" className={s.btnOutline} onClick={() => navigate('/cv')}>
                <FileText size={16} /> CV yaratish
              </button>
            </div>
          </div>

          <div className={s.heroVisual}>
            <img
              src="/images/hero-woman.png?v=3"
              alt="Professional ayol — karyera platformasi"
              className={s.heroImage}
              width={420}
              height={520}
              loading="eager"
              decoding="async"
            />
            <div className={s.floatingBadges} aria-hidden>
              <div className={`${s.badge} ${s.badgeTop}`}>
                <span className={s.badgeIcon} data-color="green"><Shield size={14} color="#fff" /></span>
                Xavfsiz platforma
              </div>
              <div className={`${s.badge} ${s.badgeMid}`}>
                <span className={s.badgeIcon} data-color="pink"><Users size={14} color="#fff" /></span>
                Ayollar uchun
              </div>
              <div className={`${s.badge} ${s.badgeBottom}`}>
                <span className={s.badgeIcon} data-color="orange"><Star size={14} color="#fff" /></span>
                Ishonchli kompaniyalar
              </div>
            </div>
          </div>
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

