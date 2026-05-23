import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Plus, Trash2, Download, Eye, User, Briefcase, GraduationCap, Star, FileText } from 'lucide-react';
import s from './CV.module.css';

const steps = [
  { id: 1, label: "Shaxsiy ma'lumotlar", icon: User },
  { id: 2, label: "Ish tajribasi",        icon: Briefcase },
  { id: 3, label: "Ta'lim",              icon: GraduationCap },
  { id: 4, label: "Ko'nikmalar",         icon: Star },
  { id: 5, label: "Ko'rib chiqish",      icon: Eye },
];

const skillList = ['Microsoft Office', 'Google Analytics', 'Photoshop', 'Figma', 'Python', '1C Buxgalteriya', 'Excel', 'CRM tizimlar', 'Project Management', 'Komunikatsiya', 'SQL', 'Canva'];

const emptyExp = () => ({ id: Date.now(), company: '', position: '', from: '', to: '', current: false, desc: '' });
const emptyEdu = () => ({ id: Date.now(), school: '', degree: '', field: '', from: '', to: '' });

export default function CV() {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);

  const [personal, setPersonal] = useState({ name: 'Malika Nosirova', title: 'Marketing mutaxassisi', phone: '+998 90 123 45 67', email: 'malika@example.com', location: "Toshkent, O'zbekiston", summary: "Kreativ va natijalarga yo'naltirilgan marketing mutaxassisi. 3 yillik tajriba." });
  const [exps, setExps] = useState([{ id: 1, company: 'Uzum Market', position: 'Marketing koordinator', from: '2023-01', to: '', current: true, desc: "SMM va kontent marketing boshqaruvi. Instagram auditoriyasini 40% ga oshirdim." }]);
  const [edus, setEdus] = useState([{ id: 1, school: "Toshkent Davlat Iqtisodiyot Universiteti", degree: "Bakalavr", field: "Marketing", from: '2019-09', to: '2023-06' }]);
  const [skills, setSkills] = useState(['Microsoft Office', 'Google Analytics', 'Canva', 'Komunikatsiya']);

  const p = (k, v) => setPersonal(prev => ({ ...prev, [k]: v }));

  const toggleSkill = sk => setSkills(prev => prev.includes(sk) ? prev.filter(s => s !== sk) : [...prev, sk]);

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className={s.page}>
      {/* Header */}
      <div className={s.header}>
        <div>
          <h1 className={s.pageTitle}>CV Yaratish</h1>
          <p className={s.pageSub}>AI yordamida professional CV tayyorlang</p>
        </div>
        <button className={s.previewBtn} onClick={() => setPreview(v => !v)}>
          <Eye size={15} /> {preview ? "Tahrirlash" : "Ko'rib chiqish"}
        </button>
      </div>

      {/* Progress */}
      <div className={s.progressWrap}>
        <div className={s.progressBar}>
          <div className={s.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={s.steps}>
          {steps.map(st => {
            const Icon = st.icon;
            const done = step > st.id;
            const active = step === st.id;
            return (
              <button key={st.id} className={`${s.stepBtn} ${active ? s.stepActive : ''} ${done ? s.stepDone : ''}`} onClick={() => setStep(st.id)}>
                <div className={s.stepCircle}>
                  {done ? <Check size={13} /> : <Icon size={13} />}
                </div>
                <span className={s.stepLabel}>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`${s.body} ${preview ? s.bodyPreview : ''}`}>
        {/* Form */}
        {!preview && (
          <div className={s.form}>
            {step === 1 && (
              <FormSection title="Shaxsiy ma'lumotlar">
                <div className={s.grid2}>
                  <Field label="To'liq ism" value={personal.name} onChange={v=>p('name',v)} placeholder="Malika Nosirova" />
                  <Field label="Mutaxassislik" value={personal.title} onChange={v=>p('title',v)} placeholder="Marketing mutaxassisi" />
                  <Field label="Telefon" value={personal.phone} onChange={v=>p('phone',v)} placeholder="+998 90 000 00 00" />
                  <Field label="Email" value={personal.email} onChange={v=>p('email',v)} placeholder="email@mail.com" type="email" />
                </div>
                <Field label="Joylashuv" value={personal.location} onChange={v=>p('location',v)} placeholder="Toshkent, O'zbekiston" />
                <Textarea label="Qisqacha o'zingiz haqingizda" value={personal.summary} onChange={v=>p('summary',v)} placeholder="2-3 qatorda o'zingizning tajriba va kuchli tomonlaringizni yozing..." />
              </FormSection>
            )}

            {step === 2 && (
              <FormSection title="Ish tajribasi">
                {exps.map((exp, i) => (
                  <div key={exp.id} className={s.entryCard}>
                    <div className={s.entryHeader}>
                      <span className={s.entryNum}>Tajriba #{i + 1}</span>
                      <button className={s.removeBtn} onClick={() => setExps(p => p.filter(e => e.id !== exp.id))}><Trash2 size={14}/></button>
                    </div>
                    <div className={s.grid2}>
                      <Field label="Kompaniya" value={exp.company} onChange={v=>setExps(p=>p.map(e=>e.id===exp.id?{...e,company:v}:e))} placeholder="Kompaniya nomi" />
                      <Field label="Lavozim" value={exp.position} onChange={v=>setExps(p=>p.map(e=>e.id===exp.id?{...e,position:v}:e))} placeholder="Marketing menejeri" />
                      <Field label="Dan" value={exp.from} onChange={v=>setExps(p=>p.map(e=>e.id===exp.id?{...e,from:v}:e))} type="month" />
                      {!exp.current && <Field label="Gacha" value={exp.to} onChange={v=>setExps(p=>p.map(e=>e.id===exp.id?{...e,to:v}:e))} type="month" />}
                    </div>
                    <label className={s.checkLabel}>
                      <input type="checkbox" checked={exp.current} onChange={e=>setExps(p=>p.map(x=>x.id===exp.id?{...x,current:e.target.checked}:x))} />
                      Hozirda ishlayapman
                    </label>
                    <Textarea label="Vazifalar va yutuqlar" value={exp.desc} onChange={v=>setExps(p=>p.map(e=>e.id===exp.id?{...e,desc:v}:e))} placeholder="Asosiy vazifalaringiz va erishgan yutuqlaringizni yozing..." />
                  </div>
                ))}
                <button className={s.addBtn} onClick={() => setExps(p => [...p, emptyExp()])}>
                  <Plus size={15}/> Ish tajribasi qo'shish
                </button>
              </FormSection>
            )}

            {step === 3 && (
              <FormSection title="Ta'lim">
                {edus.map((edu, i) => (
                  <div key={edu.id} className={s.entryCard}>
                    <div className={s.entryHeader}>
                      <span className={s.entryNum}>Ta'lim #{i + 1}</span>
                      <button className={s.removeBtn} onClick={() => setEdus(p => p.filter(e => e.id !== edu.id))}><Trash2 size={14}/></button>
                    </div>
                    <div className={s.grid2}>
                      <Field label="O'quv muassasasi" value={edu.school} onChange={v=>setEdus(p=>p.map(e=>e.id===edu.id?{...e,school:v}:e))} placeholder="Universitet nomi" />
                      <Field label="Daraja" value={edu.degree} onChange={v=>setEdus(p=>p.map(e=>e.id===edu.id?{...e,degree:v}:e))} placeholder="Bakalavr" />
                      <Field label="Yo'nalish" value={edu.field} onChange={v=>setEdus(p=>p.map(e=>e.id===edu.id?{...e,field:v}:e))} placeholder="Marketing" />
                      <div />
                      <Field label="Kirish yili" value={edu.from} onChange={v=>setEdus(p=>p.map(e=>e.id===edu.id?{...e,from:v}:e))} type="month" />
                      <Field label="Tamomlash" value={edu.to} onChange={v=>setEdus(p=>p.map(e=>e.id===edu.id?{...e,to:v}:e))} type="month" />
                    </div>
                  </div>
                ))}
                <button className={s.addBtn} onClick={() => setEdus(p => [...p, emptyEdu()])}>
                  <Plus size={15}/> Ta'lim qo'shish
                </button>
              </FormSection>
            )}

            {step === 4 && (
              <FormSection title="Ko'nikmalar va malakalar">
                <p className={s.skillHint}>Tegishli ko'nikmalarni tanlang yoki o'zingiz qo'shing</p>
                <div className={s.skillGrid}>
                  {skillList.map(sk => (
                    <button key={sk} className={`${s.skillChip} ${skills.includes(sk) ? s.skillActive : ''}`} onClick={() => toggleSkill(sk)}>
                      {skills.includes(sk) && <Check size={12}/>} {sk}
                    </button>
                  ))}
                </div>
                <div className={s.selectedSkills}>
                  <p className={s.skillHint}>Tanlangan: <strong>{skills.length}</strong> ta ko'nikma</p>
                  <div className={s.skillTags}>
                    {skills.map(sk => (
                      <span key={sk} className={s.skillTag}>
                        {sk}
                        <button onClick={() => toggleSkill(sk)}><X size={11}/></button>
                      </span>
                    ))}
                  </div>
                </div>
              </FormSection>
            )}

            {step === 5 && (
              <FormSection title="Ko'rib chiqish va yuklash">
                <div className={s.reviewInfo}>
                  <div className={s.reviewItem}><Check size={15} color="var(--success)"/><span>Shaxsiy ma'lumotlar to'ldirildi</span></div>
                  <div className={s.reviewItem}><Check size={15} color="var(--success)"/><span>{exps.length} ta ish tajribasi qo'shildi</span></div>
                  <div className={s.reviewItem}><Check size={15} color="var(--success)"/><span>{edus.length} ta ta'lim ma'lumoti</span></div>
                  <div className={s.reviewItem}><Check size={15} color="var(--success)"/><span>{skills.length} ta ko'nikma tanlandi</span></div>
                </div>
                <button className={s.downloadBtn} onClick={() => alert("CV yuklab olindi! (Demo mode)")}>
                  <Download size={16}/> CV ni yuklab olish (PDF)
                </button>
                <button className={s.previewFullBtn} onClick={() => setPreview(true)}>
                  <Eye size={16}/> To'liq ko'rib chiqish
                </button>
              </FormSection>
            )}

            <div className={s.navBtns}>
              {step > 1 && (
                <button className={s.prevBtn} onClick={() => setStep(s => s - 1)}>
                  <ChevronLeft size={16}/> Orqaga
                </button>
              )}
              {step < steps.length && (
                <button className={s.nextBtn} onClick={() => setStep(s => s + 1)}>
                  Keyingisi <ChevronRight size={16}/>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Preview */}
        {(preview || step === 5) && (
          <div className={`${s.cvPreview} ${preview ? s.cvPreviewFull : ''}`}>
            <CVPreview personal={personal} exps={exps} edus={edus} skills={skills} />
          </div>
        )}
      </div>
    </div>
  );
}

function CVPreview({ personal, exps, edus, skills }) {
  return (
    <div className={s.cv}>
      <div className={s.cvHead}>
        <div className={s.cvAvatar}>{personal.name.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <h2 className={s.cvName}>{personal.name}</h2>
          <p className={s.cvTitle}>{personal.title}</p>
          <div className={s.cvContact}>
            {personal.phone && <span>📞 {personal.phone}</span>}
            {personal.email && <span>✉️ {personal.email}</span>}
            {personal.location && <span>📍 {personal.location}</span>}
          </div>
        </div>
      </div>
      {personal.summary && <div className={s.cvSection}><h3>Haqida</h3><p>{personal.summary}</p></div>}
      {exps.length > 0 && (
        <div className={s.cvSection}>
          <h3>Ish tajribasi</h3>
          {exps.map(e => (
            <div key={e.id} className={s.cvEntry}>
              <div className={s.cvEntryHead}>
                <strong>{e.position}</strong>
                <span className={s.cvDate}>{e.from} – {e.current ? 'Hozir' : e.to}</span>
              </div>
              <span className={s.cvCompany}>{e.company}</span>
              {e.desc && <p className={s.cvDesc}>{e.desc}</p>}
            </div>
          ))}
        </div>
      )}
      {edus.length > 0 && (
        <div className={s.cvSection}>
          <h3>Ta'lim</h3>
          {edus.map(e => (
            <div key={e.id} className={s.cvEntry}>
              <div className={s.cvEntryHead}>
                <strong>{e.degree} — {e.field}</strong>
                <span className={s.cvDate}>{e.from} – {e.to}</span>
              </div>
              <span className={s.cvCompany}>{e.school}</span>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div className={s.cvSection}>
          <h3>Ko'nikmalar</h3>
          <div className={s.cvSkills}>{skills.map(sk => <span key={sk} className={s.cvSkill}>{sk}</span>)}</div>
        </div>
      )}
    </div>
  );
}

function FormSection({ title, children }) {
  return <div className={s.formSection}><h2 className={s.formTitle}>{title}</h2>{children}</div>;
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      <input className={s.fieldInput} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      <textarea className={s.fieldTextarea} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4} />
    </div>
  );
}

function X({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}
