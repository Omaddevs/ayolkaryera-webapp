import { useState } from 'react';
import { CheckCircle, FileText, Send, Briefcase, MapPin, DollarSign, Shield, Star } from 'lucide-react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';
import s from './ApplyModal.module.css';

export default function ApplyModal({ job, open, onClose }) {
  const { state, dispatch, toast } = useApp();
  const [phase, setPhase] = useState(1); // 1 = form, 2 = success
  const [cover, setCover] = useState('');
  const [useCv, setUseCv] = useState(true);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!job) return null;
  const alreadyApplied = state.applications.some(a => a.jobId === job.id);

  const handleSubmit = () => {
    if (!agree) { toast("Shartlar bilan roziligingizni tasdiqlang", 'warning'); return; }
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'APPLY_JOB', job, coverLetter: cover });
      toast(`${job.company} kompaniyasiga ariza yuborildi! ✅`, 'success');
      setLoading(false);
      setPhase(2);
    }, 900);
  };

  const handleClose = () => {
    setPhase(1); setCover(''); setAgree(false); setLoading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={phase === 1 ? 'Ariza topshirish' : undefined}
      width={540}
    >
      {phase === 1 ? (
        <div className={s.form}>
          {/* Job preview */}
          <div className={s.jobCard}>
            <div className={s.jobLogo} style={{ background: job.color }}>
              <span style={{ color: job.logoText, fontSize: job.logo?.length > 3 ? 9 : 11, fontWeight: 800 }}>
                {job.logo}
              </span>
            </div>
            <div className={s.jobInfo}>
              <p className={s.jobTitle}>{job.title}</p>
              <p className={s.jobCompany}>{job.company}</p>
              <div className={s.jobMeta}>
                <span><Briefcase size={11} />{job.type}</span>
                <span><MapPin size={11} />{job.location}</span>
                <span><DollarSign size={11} />{job.salary} so'm</span>
              </div>
            </div>
            <div className={s.verBadge}><Shield size={12} color="#10B981" /></div>
          </div>

          {alreadyApplied ? (
            <div className={s.alreadyApplied}>
              <CheckCircle size={20} color="#10B981" />
              <p>Siz bu ish uchun allaqachon ariza topshirgansiz!</p>
            </div>
          ) : (
            <>
              {/* CV toggle */}
              <div className={s.section}>
                <p className={s.sectionTitle}><FileText size={14} /> CV tanlash</p>
                <label className={`${s.cvOption} ${useCv ? s.cvOptionActive : ''}`}>
                  <input type="radio" checked={useCv} onChange={() => setUseCv(true)} />
                  <div className={s.cvOptionContent}>
                    <span className={s.cvName}>Malika_Nosirova_CV.pdf</span>
                    <span className={s.cvDate}>Oxirgi yangilangan: 22 May 2026</span>
                  </div>
                  {useCv && <CheckCircle size={16} color="#E91E8C" />}
                </label>
                <label className={`${s.cvOption} ${!useCv ? s.cvOptionActive : ''}`}>
                  <input type="radio" checked={!useCv} onChange={() => setUseCv(false)} />
                  <div className={s.cvOptionContent}>
                    <span className={s.cvName}>Profil CV (avtomatik)</span>
                    <span className={s.cvDate}>Profilingiz asosida yaratiladi</span>
                  </div>
                  {!useCv && <CheckCircle size={16} color="#E91E8C" />}
                </label>
              </div>

              {/* Cover letter */}
              <div className={s.section}>
                <p className={s.sectionTitle}><Send size={14} /> Qo'shimcha xat (ixtiyoriy)</p>
                <textarea
                  className={s.textarea}
                  placeholder={`Hurmatli ${job.company} jamoasi,\n\nMen ${job.title} lavozimiga o'z nomzodimni taqdim etmoqchiman...`}
                  value={cover}
                  onChange={e => setCover(e.target.value)}
                  rows={5}
                />
                <p className={s.charCount}>{cover.length}/500 belgi</p>
              </div>

              {/* Tips */}
              <div className={s.tipBox}>
                <Star size={13} color="#F59E0B" />
                <p>Qo'shimcha xat bilan ariza topshirish muvaffaqiyat ehtimolini <strong>3x</strong> oshiradi!</p>
              </div>

              {/* Agreement */}
              <label className={s.agreeRow}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                <span>Ma'lumotlarimni ish beruvchiga yuborishga roziman</span>
              </label>

              {/* Actions */}
              <div className={s.actions}>
                <button className={s.cancelBtn} onClick={handleClose}>Bekor qilish</button>
                <button
                  className={s.submitBtn}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <span className={s.spinner} /> : <Send size={15} />}
                  {loading ? 'Yuborilmoqda...' : 'Ariza yuborish'}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Success phase */
        <div className={s.success}>
          <div className={s.successIcon}>
            <CheckCircle size={52} color="#10B981" />
          </div>
          <h2 className={s.successTitle}>Ariza muvaffaqiyatli yuborildi!</h2>
          <p className={s.successMsg}>
            <strong>{job.company}</strong> kompaniyasiga{' '}
            <strong>{job.title}</strong> lavozimi uchun arizangiz qabul qilindi.
            HR mutaxassisi tez orada siz bilan bog'lanadi.
          </p>
          <div className={s.successSteps}>
            <div className={s.step}><span className={s.stepNum}>1</span>Ariza ko'rib chiqiladi</div>
            <div className={s.stepArrow}>→</div>
            <div className={s.step}><span className={s.stepNum}>2</span>HR xabar beradi</div>
            <div className={s.stepArrow}>→</div>
            <div className={s.step}><span className={s.stepNum}>3</span>Suhbatga taklif</div>
          </div>
          <div className={s.successActions}>
            <button className={s.arizalarimBtn} onClick={handleClose}>
              Arizalarimga o'tish
            </button>
            <button className={s.doneBtn} onClick={handleClose}>
              Yaxshi, tushunarli
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
