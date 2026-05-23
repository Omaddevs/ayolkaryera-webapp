import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, MapPin, Clock, DollarSign, Briefcase,
  ChevronDown, Shield, Bookmark, BookmarkCheck, ChevronLeft, Star,
  Share2, Building2
} from 'lucide-react';
import { jobs as allJobs } from '../data/mockData';
import { useApp } from '../context/AppContext';
import ApplyModal from '../components/ui/ApplyModal';
import ShareSheet from '../components/ui/ShareSheet';
import { buildJobSharePayload } from '../utils/jobShare';
import s from './Jobs.module.css';

const types     = ["To'liq stavka", "Yarim stavka", "Masofaviy", "Freelance", "Smenali ish"];
const locations = ["Toshkent", "Samarqand", "Buxoro", "Namangan", "Andijon"];
const salaries  = [
  { label: "1–3 mln",  min: 1e6,  max: 3e6       },
  { label: "3–5 mln",  min: 3e6,  max: 5e6       },
  { label: "5–10 mln", min: 5e6,  max: 10e6      },
  { label: "10+ mln",  min: 10e6, max: Infinity  },
];
const sorts = [
  { v: 'new',       l: 'Yangilar birinchi' },
  { v: 'salary-hi', l: 'Yuqori maosh'      },
  { v: 'salary-lo', l: 'Past maosh'        },
];

export default function Jobs() {
  const [params]    = useSearchParams();
  const navigate    = useNavigate();
  const { state, dispatch, toast } = useApp();

  const [query,        setQuery]       = useState(params.get('q') || '');
  const [filterType,   setFilterType]  = useState(
    params.get('type') ? [params.get('type')] : []
  );
  const [filterLoc,    setFilterLoc]   = useState([]);
  const [filterSalary, setFilterSalary]= useState(null);
  const [sort,         setSort]        = useState('new');
  const [selected,     setSelected]    = useState(null);
  const [showFilters,  setShowFilters] = useState(false);
  const [applyJob,     setApplyJob]    = useState(null);
  const [shareTarget,  setShareTarget] = useState(null);

  const filtered = allJobs
    .filter(j => {
      if (query && !j.title.toLowerCase().includes(query.toLowerCase()) &&
          !j.company.toLowerCase().includes(query.toLowerCase())) return false;
      if (filterType.length && !filterType.includes(j.type))     return false;
      if (filterLoc.length  && !filterLoc.includes(j.location))  return false;
      if (filterSalary) {
        const sal = parseInt(j.salary.replace(/\s/g, ''), 10);
        if (sal < filterSalary.min || sal > filterSalary.max) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === 'new') return b.isNew - a.isNew;
      const sa = parseInt(a.salary.replace(/\s/g, ''), 10);
      const sb = parseInt(b.salary.replace(/\s/g, ''), 10);
      return sort === 'salary-hi' ? sb - sa : sa - sb;
    });

  const toggle     = (arr, setArr, v) => setArr(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const clearAll   = () => { setFilterType([]); setFilterLoc([]); setFilterSalary(null); };
  const hasFilters = filterType.length || filterLoc.length || filterSalary;

  const handleShare = (job, e) => {
    e?.stopPropagation();
    setShareTarget(job);
  };

  const isApplied = (jobId) => state.applications.some(a => a.jobId === jobId);

  const similarJobs = selected
    ? allJobs.filter(j => j.id !== selected.id && (j.type === selected.type || j.location === selected.location)).slice(0, 3)
    : [];

  useEffect(() => {
    const jobId = params.get('job');
    if (!jobId) return;
    const job = allJobs.find(j => String(j.id) === jobId);
    if (job) setSelected(job);
  }, [params]);

  useEffect(() => {
    if (!selected) return undefined;

    const scrollParent = document.querySelector('.page-shell');
    const prevOverflow = scrollParent?.style.overflow ?? '';
    if (scrollParent) scrollParent.style.overflow = 'hidden';

    return () => {
      if (scrollParent) scrollParent.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <div className={`${s.page} ${selected ? s.pageDetailOpen : ''}`}>
      {/* ── Top bar ── */}
      <div className={s.topBar}>
        <div className={s.searchBox}>
          <Search size={15} className={s.searchIco} />
          <input
            className={s.searchIn}
            placeholder="Ish nomi yoki kompaniya..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && <button onClick={() => setQuery('')}><X size={14} /></button>}
        </div>
        <button
          className={`${s.filterBtn} ${showFilters ? s.filterBtnActive : ''}`}
          onClick={() => setShowFilters(v => !v)}
        >
          <SlidersHorizontal size={15} />
          Filterlar {hasFilters ? `(${[...filterType, ...filterLoc, ...(filterSalary ? [1] : [])].length})` : ''}
        </button>
        <div className={s.sortWrap}>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className={s.body}>
        {/* ── Filter panel ── */}
        <aside className={`${s.filterPanel} ${showFilters ? s.filterOpen : ''}`}>
          <div className={s.filterHead}>
            <span className={s.filterTitle}>Filterlar</span>
            {hasFilters && <button className={s.clearBtn} onClick={clearAll}>Tozalash</button>}
          </div>

          <FilterGroup title="Ish turi">
            {types.map(t => (
              <label key={t} className={s.checkRow}>
                <input type="checkbox" checked={filterType.includes(t)} onChange={() => toggle(filterType, setFilterType, t)} />
                <span>{t}</span>
                <span className={s.count}>{allJobs.filter(j => j.type === t).length}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Joylashuv">
            {locations.map(l => (
              <label key={l} className={s.checkRow}>
                <input type="checkbox" checked={filterLoc.includes(l)} onChange={() => toggle(filterLoc, setFilterLoc, l)} />
                <span>{l}</span>
                <span className={s.count}>{allJobs.filter(j => j.location === l).length}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Maosh">
            {salaries.map(sal => (
              <label key={sal.label} className={s.radioRow}>
                <input type="radio" name="salary" checked={filterSalary?.label === sal.label} onChange={() => setFilterSalary(sal)} />
                <span>{sal.label}</span>
              </label>
            ))}
          </FilterGroup>
        </aside>

        {/* ── Job list ── */}
        <div className={`${s.listCol} ${selected ? s.listShrink : ''}`}>
          <div className={s.listHeader}>
            <span className={s.resultsCount}>{filtered.length} ta ish topildi</span>
          </div>
          <div className={s.list}>
            {filtered.length === 0 && (
              <div className={s.empty}>
                <span style={{ fontSize: 40 }}>🔍</span>
                <p>Hech narsa topilmadi</p>
                <button className={s.emptyBtn} onClick={clearAll}>Filtrlarni tozalash</button>
              </div>
            )}
            {filtered.map(job => (
              <div
                key={job.id}
                className={`${s.jobRow} ${selected?.id === job.id ? s.jobRowActive : ''}`}
                onClick={() => setSelected(selected?.id === job.id ? null : job)}
              >
                <div className={s.jobLogo} style={{ background: job.color }}>
                  <span style={{ color: job.logoText, fontSize: job.logo.length > 3 ? 8 : 10, fontWeight: 800 }}>{job.logo}</span>
                </div>
                <div className={s.jobInfo}>
                  <div className={s.jobTop}>
                    <span className={s.jobTitle}>{job.title}</span>
                    {job.isNew && <span className={s.newBadge}>Yangi</span>}
                    {isApplied(job.id) && <span className={s.appliedBadge}>Ariza berildi</span>}
                  </div>
                  <span className={s.jobCompany}>{job.company}</span>
                  <div className={s.jobMeta}>
                    <span className={s.metaTag}><Clock size={10} />{job.type}</span>
                    <span className={s.metaTag}><MapPin size={10} />{job.location}</span>
                  </div>
                </div>
                <div className={s.jobRight}>
                  <span className={s.jobSalary}>{job.salary} so'm</span>
                  <div className={s.rowActions}>
                    <button
                      className={s.shareIco}
                      onClick={e => handleShare(job, e)}
                      title="Ulashish"
                    >
                      <Share2 size={13} />
                    </button>
                    <button
                      className={`${s.saveIco} ${state.savedJobIds.has(job.id) ? s.savedIco : ''}`}
                      onClick={e => { e.stopPropagation(); dispatch({ type: 'TOGGLE_SAVE', id: job.id }); }}
                    >
                      {state.savedJobIds.has(job.id) ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Detail panel ── */}
        {selected && (
          <div className={s.detailPanel}>
            <div className={s.detailTopBar}>
              <button type="button" className={s.detailClose} onClick={() => setSelected(null)} aria-label="Orqaga">
                <ChevronLeft size={18} />
              </button>
              <span className={s.detailTopTitle}>Ish tafsilotlari</span>
            </div>
            <div className={s.detailScroll}>
              <div className={s.detailHeader}>
                <div className={s.detailLogo} style={{ background: selected.color }}>
                  <span style={{ color: selected.logoText, fontSize: selected.logo.length > 3 ? 12 : 14, fontWeight: 800 }}>
                    {selected.logo}
                  </span>
                </div>
                <div>
                  <h2 className={s.detailTitle}>{selected.title}</h2>
                  <button
                    className={s.detailCompany}
                    onClick={() => navigate('/companies')}
                  >
                    <Building2 size={13} />
                    {selected.company}
                    <Shield size={12} color="var(--success)" />
                  </button>
                </div>
              </div>

              <div className={s.detailMeta}>
                <div className={s.metaItem}>
                  <DollarSign size={15} color="var(--primary)" />
                  <div><span className={s.metaLabel}>Maosh</span><span className={s.metaVal}>{selected.salary}–{selected.salaryMax} so'm</span></div>
                </div>
                <div className={s.metaItem}>
                  <Briefcase size={15} color="var(--primary)" />
                  <div><span className={s.metaLabel}>Ish turi</span><span className={s.metaVal}>{selected.type}</span></div>
                </div>
                <div className={s.metaItem}>
                  <MapPin size={15} color="var(--primary)" />
                  <div><span className={s.metaLabel}>Joylashuv</span><span className={s.metaVal}>{selected.location}</span></div>
                </div>
              </div>

              <div className={s.tags}>
                {selected.tags?.map(t => <span key={t} className={s.tag}>{t}</span>)}
              </div>

              <section className={s.detailSection}>
                <h3>Ish haqida</h3>
                <p>{selected.desc}</p>
              </section>

              {selected.requirements && (
                <section className={s.detailSection}>
                  <h3>Talablar</h3>
                  <ul>
                    {selected.requirements.map((r, i) => (
                      <li key={i}><Star size={11} color="var(--primary)" />{r}</li>
                    ))}
                  </ul>
                </section>
              )}

              {selected.benefits && (
                <section className={s.detailSection}>
                  <h3>Afzalliklar</h3>
                  <ul>
                    {selected.benefits.map((b, i) => (
                      <li key={i}><Shield size={11} color="var(--success)" />{b}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Actions */}
              <div className={s.detailActions}>
                {isApplied(selected.id) ? (
                  <button className={s.appliedBtn}>
                    <Shield size={15} /> Ariza yuborildi
                  </button>
                ) : (
                  <button className={s.applyBtn} onClick={() => setApplyJob(selected)}>
                    Hozir ariza topshirish
                  </button>
                )}
                <button
                  className={s.shareDetailBtn}
                  onClick={e => handleShare(selected, e)}
                  title="Ulashish"
                >
                  <Share2 size={16} />
                </button>
                <button
                  className={`${s.saveDetailBtn} ${state.savedJobIds.has(selected.id) ? s.savedDetailBtn : ''}`}
                  onClick={() => dispatch({ type: 'TOGGLE_SAVE', id: selected.id })}
                >
                  {state.savedJobIds.has(selected.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
              </div>

              {/* Similar jobs */}
              {similarJobs.length > 0 && (
                <section className={s.detailSection}>
                  <h3>O'xshash ishlar</h3>
                  <div className={s.similarList}>
                    {similarJobs.map(j => (
                      <div key={j.id} className={s.similarRow} onClick={() => setSelected(j)}>
                        <div className={s.simLogo} style={{ background: j.color }}>
                          <span style={{ color: j.logoText, fontSize: 9, fontWeight: 800 }}>{j.logo}</span>
                        </div>
                        <div className={s.simInfo}>
                          <span className={s.simTitle}>{j.title}</span>
                          <span className={s.simCompany}>{j.company} · {j.salary} so'm</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>

      <ApplyModal job={applyJob} open={!!applyJob} onClose={() => setApplyJob(null)} />

      <ShareSheet
        open={!!shareTarget}
        onClose={() => setShareTarget(null)}
        payload={shareTarget ? buildJobSharePayload(shareTarget) : null}
        onToast={toast}
      />
    </div>
  );
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12, marginBottom: 12 }}>
      <button
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: open ? 10 : 0 }}
        onClick={() => setOpen(v => !v)}
      >
        {title}
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }} />
      </button>
      {open && <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>}
    </div>
  );
}

function SortSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const cur = sorts.find(s => s.v === value);
  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', fontSize: 13, color: 'var(--text)', background: 'var(--surface)', whiteSpace: 'nowrap' }}
        onClick={() => setOpen(v => !v)}
      >
        {cur?.l}<ChevronDown size={13} />
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', boxShadow: 'var(--shadow-md)', zIndex: 50, minWidth: 170, overflow: 'hidden' }}>
            {sorts.map(s => (
              <button
                key={s.v}
                style={{ display: 'block', width: '100%', padding: '9px 14px', fontSize: 13, textAlign: 'left', color: value === s.v ? 'var(--primary)' : 'var(--text)', background: value === s.v ? 'var(--primary-bg)' : 'transparent', fontWeight: value === s.v ? 600 : 400 }}
                onClick={() => { onChange(s.v); setOpen(false); }}
              >
                {s.l}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
