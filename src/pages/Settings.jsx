import { useState, useRef } from 'react';
import {
  Camera, User, Bell, Shield, Moon, Globe, LogOut,
  ChevronRight, Save, Edit3, Lock, Trash2, AlertTriangle, Eye, EyeOff,
  Crown, Check, Sparkles, Zap, MessageCircle, BookOpen,
} from 'lucide-react';

const premiumFeatures = [
  { icon: Zap, label: 'Cheksiz ariza yuborish' },
  { icon: MessageCircle, label: 'AI suhbat tayyorgarligi' },
  { icon: BookOpen, label: 'Karyera maslahatlari' },
  { icon: Sparkles, label: 'Premium imkoniyatlar' },
];
import { useApp } from '../context/AppContext';
import { user } from '../data/mockData';
import Modal from '../components/ui/Modal';
import s from './Settings.module.css';

export default function Settings() {
  const { state, dispatch, toast } = useApp();

  const [editMode,   setEditMode]   = useState(false);
  const [profile,    setProfile]    = useState({ ...user });
  const [avatarUrl,  setAvatarUrl]  = useState(null);
  const [notifs,     setNotifs]     = useState({ newJobs: true, messages: true, applications: true, marketing: false });
  const [privacy,    setPrivacy]    = useState({ profileVisible: true, cvVisible: false });
  const [lang,       setLang]       = useState("O'zbek");
  const fileRef = useRef();

  // Password change
  const [pwSection,  setPwSection]  = useState(false);
  const [oldPw,      setOldPw]      = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [showOld,    setShowOld]    = useState(false);
  const [showNew,    setShowNew]    = useState(false);

  // Account delete
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteInput,  setDeleteInput] = useState('');

  const p = (k, v) => setProfile(prev => ({ ...prev, [k]: v }));
  const n = (k) => setNotifs(prev => ({ ...prev, [k]: !prev[k] }));
  const pv = (k) => setPrivacy(prev => ({ ...prev, [k]: !prev[k] }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(ev.target.result);
    reader.readAsDataURL(file);
    toast("Rasm yuklandi! ✅", 'success');
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    toast("Profil ma'lumotlari saqlandi ✅", 'success');
  };

  const handlePasswordChange = () => {
    if (!oldPw || !newPw || !confirmPw) { toast("Barcha maydonlarni to'ldiring", 'warning'); return; }
    if (newPw !== confirmPw)            { toast("Yangi parollar mos kelmadi", 'error');   return; }
    if (newPw.length < 8)              { toast("Parol kamida 8 ta belgi bo'lishi kerak", 'warning'); return; }
    toast("Parol muvaffaqiyatli o'zgartirildi ✅", 'success');
    setOldPw(''); setNewPw(''); setConfirmPw(''); setPwSection(false);
  };

  const handleDeleteAccount = () => {
    if (deleteInput !== 'O\'CHIRISH') { toast("To'g'ri tasdiq so'zini kiriting", 'error'); return; }
    toast("Hisob o'chirilmoqda...", 'info');
    setDeleteModal(false);
  };

  return (
    <div className={s.page}>
      <h1 className={s.pageTitle}>Sozlamalar</h1>

      {/* Profile */}
      <Section title="Profil ma'lumotlari" icon={<User size={17} />}>
        <div className={s.profileRow}>
          <div className={s.avatarWrap}>
            <div className={s.avatar} onClick={() => fileRef.current?.click()}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className={s.avatarImg} />
              ) : (
                <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                  <circle cx="40" cy="40" r="40" fill="var(--primary-light)" />
                  <circle cx="40" cy="32" r="14" fill="var(--primary)" opacity="0.65" />
                  <path d="M10 72 C10 52 70 52 70 72" fill="var(--primary)" opacity="0.5" />
                </svg>
              )}
            </div>
            <button className={s.cameraBtn} onClick={() => fileRef.current?.click()}>
              <Camera size={14} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </div>
          <div className={s.profileMeta}>
            <p className={s.profileName}>{profile.name}</p>
            <p className={s.profileSub}>{profile.title} · {profile.location}</p>
            <div className={s.completion}>
              <span className={s.compLabel}>Profil: <strong>{user.completion}%</strong></span>
              <div className={s.compBar}><div className={s.compFill} style={{ width: `${user.completion}%` }} /></div>
            </div>
          </div>
          <button className={`${s.editBtn} ${editMode ? s.editActive : ''}`} onClick={() => setEditMode(v => !v)}>
            <Edit3 size={14} /> {editMode ? 'Bekor qilish' : 'Tahrirlash'}
          </button>
        </div>

        {editMode && (
          <div className={s.editForm}>
            <div className={s.grid2}>
              <Field label="To'liq ism"      value={profile.name}     onChange={v => p('name', v)}     />
              <Field label="Mutaxassislik"   value={profile.title}    onChange={v => p('title', v)}    />
              <Field label="Email"           value={profile.email}    onChange={v => p('email', v)}    type="email" />
              <Field label="Telefon"         value={profile.phone}    onChange={v => p('phone', v)}    />
            </div>
            <Field label="Joylashuv" value={profile.location} onChange={v => p('location', v)} />
            <button className={s.saveBtn} onClick={handleSaveProfile}>
              <Save size={15} /> Saqlash
            </button>
          </div>
        )}
      </Section>

      {/* Password */}
      <Section title="Parol o'zgartirish" icon={<Lock size={17} />}>
        {!pwSection ? (
          <button className={s.sectionAction} onClick={() => setPwSection(true)}>
            <Lock size={14} /> Parolni o'zgartirish
          </button>
        ) : (
          <div className={s.pwForm}>
            <PasswordField label="Joriy parol"    value={oldPw}     onChange={setOldPw}     show={showOld} setShow={setShowOld} />
            <PasswordField label="Yangi parol"    value={newPw}     onChange={setNewPw}     show={showNew} setShow={setShowNew} />
            <PasswordField label="Parolni tasdiqlash" value={confirmPw} onChange={setConfirmPw} show={showNew} setShow={setShowNew} />
            <div className={s.pwActions}>
              <button className={s.cancelBtn} onClick={() => { setPwSection(false); setOldPw(''); setNewPw(''); setConfirmPw(''); }}>Bekor qilish</button>
              <button className={s.saveBtn} onClick={handlePasswordChange}><Save size={15} /> Saqlash</button>
            </div>
          </div>
        )}
      </Section>

      {/* Notifications */}
      <Section title="Bildirishnomalar" icon={<Bell size={17} />}>
        <Toggle label="Yangi ish e'lonlari"  desc="Siz izlayotgan sohadagi yangi ishlar"  value={notifs.newJobs}       onChange={() => n('newJobs')}       />
        <Toggle label="Xabarlar"             desc="Ish beruvchilardan yangi xabarlar"     value={notifs.messages}      onChange={() => n('messages')}      />
        <Toggle label="Ariza holati"         desc="Arizangiz holati o'zgarganda"          value={notifs.applications}  onChange={() => n('applications')}  />
        <Toggle label="Marketing xabarlari"  desc="Aksiya va yangiliklar"                value={notifs.marketing}     onChange={() => n('marketing')}     />
      </Section>

      {/* Privacy */}
      <Section title="Maxfiylik" icon={<Shield size={17} />}>
        <Toggle label="Profilni ko'rsatish" desc="Ish beruvchilar profilingizni ko'ra oladi" value={privacy.profileVisible} onChange={() => pv('profileVisible')} />
        <Toggle label="CV ni ko'rsatish"    desc="CV ni ochiq ko'rsatish"                    value={privacy.cvVisible}      onChange={() => pv('cvVisible')}      />
      </Section>

      {/* Appearance */}
      <Section title="Ko'rinish" icon={<Moon size={17} />}>
        <Toggle label="Tungi rejim" desc="Qorong'u fon bilan ishlash" value={state.darkMode} onChange={() => dispatch({ type: 'TOGGLE_DARK' })} />
        <div className={s.row}>
          <div className={s.rowLeft}>
            <Globe size={16} className={s.rowIcon} />
            <div>
              <p className={s.rowLabel}>Til</p>
              <p className={s.rowDesc}>Interfeys tili</p>
            </div>
          </div>
          <select className={s.langSelect} value={lang} onChange={e => setLang(e.target.value)}>
            <option>O'zbek</option>
            <option>Русский</option>
            <option>English</option>
          </select>
        </div>
      </Section>

      {/* Premium */}
      <div className={s.premiumCard}>
        <div className={s.premiumGlow} aria-hidden />
        <div className={s.premiumTop}>
          <div className={s.premiumIconWrap}>
            <Crown size={22} strokeWidth={2.25} />
          </div>
          <div className={s.premiumHead}>
            <span className={s.premiumBadge}>Premium</span>
            <h3 className={s.premTitle}>AyolKaryera Premium</h3>
            <p className={s.premDesc}>
              Karyerangizni keyingi bosqichga olib chiqing — barcha professional imkoniyatlar bir joyda.
            </p>
          </div>
        </div>
        <ul className={s.premiumFeatures}>
          {premiumFeatures.map(({ icon: Icon, label }) => (
            <li key={label} className={s.premiumFeature}>
              <span className={s.premiumFeatureIcon}><Icon size={14} /></span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={s.premBtn}
          onClick={() => toast('Premium tez orada mavjud bo\'ladi!', 'success')}
        >
          Aktivlashtirish
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Danger zone */}
      <Section title="Xavfli zona" icon={<AlertTriangle size={17} />}>
        <div className={s.dangerRow}>
          <div>
            <p className={s.rowLabel}>Hisobni o'chirish</p>
            <p className={s.rowDesc}>Bu amalni qaytarib bo'lmaydi. Barcha ma'lumotlaringiz o'chiriladi.</p>
          </div>
          <button className={s.deleteAccBtn} onClick={() => setDeleteModal(true)}>
            <Trash2 size={14} /> O'chirish
          </button>
        </div>
      </Section>

      {/* Logout */}
      <button className={s.logoutBtn}>
        <LogOut size={16} /> Chiqish
      </button>

      {/* Delete account confirm */}
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Hisobni o'chirish" width={420}>
        <div className={s.deleteBody}>
          <div className={s.deleteIcon}>
            <AlertTriangle size={32} color="#EF4444" />
          </div>
          <p className={s.deleteText}>
            Bu amalni qaytarib bo'lmaydi. Barcha ma'lumotlaringiz, arizalaringiz va CV ingiz <strong>butunlay o'chiriladi</strong>.
          </p>
          <div className={s.deleteInputWrap}>
            <label className={s.deleteLabel}>Tasdiqlash uchun <strong>O'CHIRISH</strong> yozing:</label>
            <input
              className={s.deleteInput}
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              placeholder="O'CHIRISH"
            />
          </div>
          <div className={s.deleteActions}>
            <button className={s.cancelBtn} onClick={() => { setDeleteModal(false); setDeleteInput(''); }}>Bekor qilish</button>
            <button
              className={s.deleteConfirmBtn}
              disabled={deleteInput !== "O'CHIRISH"}
              onClick={handleDeleteAccount}
            >
              <Trash2 size={14} /> Ha, o'chirish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className={s.section}>
      <div className={s.sectionHead}>
        <span className={s.sectionIcon}>{icon}</span>
        <h2 className={s.sectionTitle}>{title}</h2>
      </div>
      <div className={s.sectionBody}>{children}</div>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <div className={s.row}>
      <div className={s.rowLeft}>
        <div>
          <p className={s.rowLabel}>{label}</p>
          {desc && <p className={s.rowDesc}>{desc}</p>}
        </div>
      </div>
      <button className={`${s.toggle} ${value ? s.toggleOn : ''}`} onClick={onChange}>
        <span className={s.thumb} />
      </button>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      <input className={s.fieldInput} type={type} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function PasswordField({ label, value, onChange, show, setShow }) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      <div className={s.pwFieldWrap}>
        <input
          className={s.fieldInput}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ paddingRight: 40 }}
        />
        <button type="button" className={s.eyeBtn} onClick={() => setShow(v => !v)}>
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
