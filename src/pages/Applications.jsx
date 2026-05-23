import { useState } from 'react';
import {
  Clock, CheckCircle, XCircle, MessageSquare, AlertCircle, Circle,
  ChevronRight, CalendarDays, MapPin, Star, Trash2, AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/ui/Modal';
import s from './Applications.module.css';

const tabs = [
  { id: 'all',       label: 'Barchasi'         },
  { id: 'pending',   label: 'Yuborildi'         },
  { id: 'review',    label: "Ko'rib chiqilmoqda"},
  { id: 'interview', label: 'Suhbat'            },
  { id: 'accepted',  label: 'Qabul qilindi'     },
  { id: 'rejected',  label: 'Rad etildi'        },
];

const statusConfig = {
  pending:   { icon: Clock,         color: '#6B7280', bg: '#F3F4F6', label: 'Yuborildi'          },
  review:    { icon: AlertCircle,   color: '#3B82F6', bg: '#EFF6FF', label: "Ko'rib chiqilmoqda" },
  interview: { icon: MessageSquare, color: '#8B5CF6', bg: '#F5F3FF', label: 'Suhbat'             },
  accepted:  { icon: CheckCircle,   color: '#10B981', bg: '#ECFDF5', label: 'Qabul qilindi'      },
  rejected:  { icon: XCircle,       color: '#EF4444', bg: '#FEF2F2', label: 'Rad etildi'         },
};

export default function Applications() {
  const { state, dispatch, toast } = useApp();
  const applications = state.applications;

  const [activeTab,    setActiveTab]    = useState('all');
  const [selected,     setSelected]     = useState(null);
  const [withdrawId,   setWithdrawId]   = useState(null); // confirm modal
  const [ratings,      setRatings]      = useState({});   // jobId → star count
  const [hoverRating,  setHoverRating]  = useState({});   // jobId → hovered star

  const filtered = activeTab === 'all'
    ? applications
    : applications.filter(a => a.status === activeTab);

  const handleWithdraw = (id) => {
    dispatch({ type: 'WITHDRAW_APPLICATION', id });
    toast("Ariza bekor qilindi", 'info');
    setWithdrawId(null);
    if (selected?.id === id) setSelected(null);
  };

  const handleRate = (app, star) => {
    setRatings(prev => ({ ...prev, [app.id]: star }));
    toast(`${app.company} kompaniyasiga ${star} ⭐ baho berildi!`, 'success');
  };

  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1 className={s.title}>Arizalarim</h1>
        <p className={s.sub}>{applications.length} ta ariza topshirilgan</p>
      </div>

      {/* Stats */}
      <div className={s.statsRow}>
        {Object.entries(statusConfig).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const count = applications.filter(a => a.status === key).length;
          return (
            <button
              key={key}
              className={`${s.statCard} ${activeTab === key ? s.statActive : ''}`}
              onClick={() => setActiveTab(key)}
              style={{ '--stat-color': cfg.color, '--stat-bg': cfg.bg }}
            >
              <Icon size={18} />
              <span className={s.statNum}>{count}</span>
              <span className={s.statLabel}>{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className={s.tabs}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${s.tab} ${activeTab === t.id ? s.tabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
            <span className={s.tabCount}>
              {t.id === 'all' ? applications.length : applications.filter(a => a.status === t.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className={s.list}>
        {filtered.map(app => {
          const cfg  = statusConfig[app.status];
          const Icon = cfg.icon;
          const open = selected?.id === app.id;
          const myRating = ratings[app.id] || 0;

          return (
            <div
              key={app.id}
              className={`${s.card} ${open ? s.cardOpen : ''}`}
              onClick={() => setSelected(open ? null : app)}
            >
              <div className={s.cardLeft}>
                <div className={s.logo} style={{ background: app.color }}>
                  <span style={{ color: app.logoText, fontSize: app.logo?.length > 3 ? 8 : 10, fontWeight: 800 }}>
                    {app.logo}
                  </span>
                </div>
                <div className={s.info}>
                  <h3 className={s.jobTitle}>{app.title}</h3>
                  <p className={s.company}>{app.company}</p>
                  <div className={s.meta}>
                    {app.location && <span className={s.metaTag}><MapPin size={10} />{app.location}</span>}
                    <span className={s.metaTag}><CalendarDays size={10} />{app.appliedDate}</span>
                  </div>
                </div>
              </div>
              <div className={s.cardRight}>
                <span className={s.statusBadge} style={{ background: cfg.bg, color: cfg.color }}>
                  <Icon size={12} /> {cfg.label}
                </span>
                {app.salary && <span className={s.salary}>{app.salary} so'm</span>}
                <ChevronRight size={15} className={`${s.chevron} ${open ? s.chevOpen : ''}`} />
              </div>

              {open && (
                <div className={s.detail} onClick={e => e.stopPropagation()}>
                  <Timeline status={app.status} />

                  {app.nextStep && (
                    <div className={s.nextStep}>
                      <CalendarDays size={14} color="var(--purple)" />
                      <span>Keyingi qadam: <strong>{app.nextStep}</strong></span>
                    </div>
                  )}

                  {app.notes && (
                    <div className={s.notes}>
                      <p>{app.notes}</p>
                    </div>
                  )}

                  {/* Rate company */}
                  {(app.status === 'accepted' || app.status === 'rejected') && (
                    <div className={s.rateBox}>
                      <span className={s.rateLabel}>Kompaniyani baholang:</span>
                      <div className={s.stars}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            className={s.starBtn}
                            onMouseEnter={() => setHoverRating(prev => ({ ...prev, [app.id]: star }))}
                            onMouseLeave={() => setHoverRating(prev => ({ ...prev, [app.id]: 0 }))}
                            onClick={() => handleRate(app, star)}
                          >
                            <Star
                              size={20}
                              fill={(hoverRating[app.id] || myRating) >= star ? 'var(--warning)' : 'none'}
                              color={(hoverRating[app.id] || myRating) >= star ? 'var(--warning)' : 'var(--border)'}
                            />
                          </button>
                        ))}
                        {myRating > 0 && <span className={s.ratedText}>{myRating}/5 ⭐</span>}
                      </div>
                    </div>
                  )}

                  <div className={s.detailActions}>
                    <button className={s.msgBtn} onClick={() => {}}>
                      <MessageSquare size={14} /> Xabar yuborish
                    </button>
                    {app.status === 'interview' && (
                      <button className={s.confBtn}>Suhbatga tayyorlanish</button>
                    )}
                    {(app.status === 'pending' || app.status === 'review') && (
                      <button
                        className={s.withdrawBtn}
                        onClick={e => { e.stopPropagation(); setWithdrawId(app.id); }}
                      >
                        <Trash2 size={14} /> Bekor qilish
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className={s.empty}>
          <Circle size={40} />
          <p>Bu kategoriyada ariza topilmadi</p>
        </div>
      )}

      {/* Withdraw confirm modal */}
      <Modal
        open={!!withdrawId}
        onClose={() => setWithdrawId(null)}
        title="Arizani bekor qilish"
        width={400}
      >
        <div className={s.confirmBody}>
          <div className={s.confirmIcon}>
            <AlertTriangle size={32} color="var(--warning)" />
          </div>
          <p className={s.confirmText}>
            Bu arizani bekor qilmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
          </p>
          <div className={s.confirmActions}>
            <button className={s.cancelBtn} onClick={() => setWithdrawId(null)}>
              Yo'q, qoldirish
            </button>
            <button className={s.confirmWithdrawBtn} onClick={() => handleWithdraw(withdrawId)}>
              Ha, bekor qilish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const timelineSteps = ['pending', 'review', 'interview', 'accepted'];

function Timeline({ status }) {
  const isRejected = status === 'rejected';
  const activeIdx  = timelineSteps.indexOf(isRejected ? 'review' : status);
  return (
    <div className={s.timeline}>
      {timelineSteps.map((step, i) => {
        const done    = i <= activeIdx && !isRejected;
        const current = i === activeIdx && !isRejected;
        return (
          <div key={step} className={s.timelineStep}>
            <div className={`${s.timelineDot} ${done ? s.dotDone : ''} ${current ? s.dotCurrent : ''}`}>
              {done ? <CheckCircle size={14} /> : <Circle size={14} />}
            </div>
            <span className={s.timelineLabel}>{statusConfig[step].label}</span>
            {i < timelineSteps.length - 1 && (
              <div className={`${s.timelineLine} ${i < activeIdx && !isRejected ? s.lineDone : ''}`} />
            )}
          </div>
        );
      })}
      {isRejected && (
        <div className={s.timelineStep}>
          <div className={s.dotRejected}><XCircle size={14} /></div>
          <span className={s.timelineLabel}>Rad etildi</span>
        </div>
      )}
    </div>
  );
}
