import { useState, useEffect, useRef } from 'react';
import { Clock, ArrowRight, Search, X, Share2, BookOpen, ChevronLeft, Star } from 'lucide-react';
import { articles } from '../data/mockData';
import { useApp } from '../context/AppContext';
import s from './Advice.module.css';

const categories = ['Barchasi', 'CV maslahat', 'Suhbat tayyorligi', 'Karyera', 'Ish madaniyati', 'Muzokaralar', 'Shaxsiy brend'];

// ── Article detail paragraphs generator
const getContent = (article) => [
  article.desc,
  `${article.title} mavzusi bugungi ish bozorida juda muhim o'rin tutadi. Ko'plab mutaxassislar ushbu sohadagi bilimlari tufayli muvaffaqiyatga erishganlar. Tadqiqotlar shuni ko'rsatadiki, to'g'ri yondashuv bilan maqsadga erish ehtimoli 3 barobar oshadi.`,
  `Amaliy qadamlar: birinchi navbatda o'zingizni tahlil qiling va kuchli tomonlaringizni aniqlang. So'ngra bozor talablarini o'rganing. Harakat rejasini tuzing va uni muntazam yangilab boring. Natijalarni kuzatib, zarur bo'lsa strategiyangizni moslashtiring.`,
  `Mutaxassislar tavsiyasiga ko'ra, eng muhim narsa — doimiy rivojlanish va o'z sohasidagi yangiliklarga tayyor bo'lish. Networking ham katta rol o'ynaydi: professional aloqalar ko'pincha yangi imkoniyatlar eshigini ochadi.`,
  `Xulosa qilib aytganda, ${article.category.toLowerCase()} sohasida muvaffaqiyatga erishish uchun sabr, izchillik va to'g'ri strategiya kerak. Ushbu maqoladagi tavsiyalar sizga o'z karyerangizni yangi bosqichga olib chiqishda yordam beradi.`,
];

export default function Advice() {
  const [cat,      setCat]      = useState('Barchasi');
  const [query,    setQuery]    = useState('');
  const [detail,   setDetail]   = useState(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useApp();
  const articleRef = useRef();

  const filtered = articles.filter(a => {
    if (cat !== 'Barchasi' && a.category !== cat) return false;
    if (query && !a.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const featured = articles.find(a => a.featured);
  const rest      = filtered.filter(a => !a.featured || cat !== 'Barchasi' || query);
  const related   = detail
    ? articles.filter(a => a.id !== detail.id && a.category === detail.category).slice(0, 2)
    : [];

  // Reading progress bar
  useEffect(() => {
    if (!detail) { setProgress(0); return; }
    const el = articleRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight - clientHeight > 0
        ? Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
        : 100;
      setProgress(pct);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [detail]);

  const handleShare = (article) => {
    navigator.clipboard?.writeText(`${window.location.origin}/advice?q=${encodeURIComponent(article.title)}`);
    toast(`"${article.title}" havolasi nusxalandi`, 'success');
  };

  // Article detail view (full-screen overlay inside page)
  if (detail) {
    const paragraphs = getContent(detail);
    return (
      <div className={s.detailPage}>
        {/* Reading progress */}
        <div className={s.progressBar} style={{ width: `${progress}%` }} />

        {/* Back nav */}
        <div className={s.detailNav}>
          <button className={s.backBtn} onClick={() => setDetail(null)}>
            <ChevronLeft size={18} /> Orqaga
          </button>
          <button className={s.shareBtn} onClick={() => handleShare(detail)}>
            <Share2 size={15} /> Ulashish
          </button>
        </div>

        <div className={s.detailScroll} ref={articleRef}>
          {/* Hero */}
          <div className={s.articleHero} style={{ background: detail.color + '18' }}>
            <div className={s.articleEmoji}>{detail.emoji}</div>
            <span className={s.articleCat} style={{ color: detail.color }}>{detail.category}</span>
            <h1 className={s.articleTitle}>{detail.title}</h1>
            <div className={s.articleMeta}>
              <span><Clock size={13} />{detail.readTime}</span>
              <span>{detail.date}</span>
              <span><Star size={13} fill="var(--warning)" color="var(--warning)" /> 4.8</span>
            </div>
          </div>

          {/* Body */}
          <div className={s.articleBody}>
            {paragraphs.map((p, i) => (
              <p key={i} className={s.articlePara}>{p}</p>
            ))}

            {/* Tips box */}
            <div className={s.tipBox}>
              <span className={s.tipIcon}>💡</span>
              <div>
                <p className={s.tipTitle}>Asosiy maslahat</p>
                <p className={s.tipText}>Ushbu maqoladagi bilimlarni kundalik hayotingizda qo'llang — natijalar 2-4 hafta ichida seziladi.</p>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className={s.relatedSection}>
                <h3 className={s.relatedTitle}><BookOpen size={15} /> O'xshash maqolalar</h3>
                <div className={s.relatedGrid}>
                  {related.map(a => (
                    <div key={a.id} className={s.relatedCard} onClick={() => { setDetail(a); setProgress(0); }}>
                      <span className={s.relatedEmoji}>{a.emoji}</span>
                      <div>
                        <p className={s.relatedName}>{a.title}</p>
                        <span className={s.relatedTime}><Clock size={10} />{a.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <div className={s.header}>
        <div>
          <h1 className={s.title}>Karyera maslahatlari</h1>
          <p className={s.sub}>Mutaxassislardan bepul maslahat va qo'llanmalar</p>
        </div>
        <div className={s.searchBox}>
          <Search size={14} className={s.searchIco} />
          <input
            className={s.searchIn}
            placeholder="Maqola qidirish..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && <button onClick={() => setQuery('')}><X size={13} /></button>}
        </div>
      </div>

      {/* Featured */}
      {featured && cat === 'Barchasi' && !query && (
        <div className={s.featured} onClick={() => setDetail(featured)}>
          <div className={s.featuredEmoji}>{featured.emoji}</div>
          <div className={s.featuredContent}>
            <span className={s.featuredCat}>{featured.category}</span>
            <h2 className={s.featuredTitle}>{featured.title}</h2>
            <p className={s.featuredDesc}>{featured.desc}</p>
            <div className={s.featuredMeta}>
              <span className={s.readTime}><Clock size={12} />{featured.readTime}</span>
              <span className={s.date}>{featured.date}</span>
            </div>
            <button className={s.readBtn}>O'qish <ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className={s.catRow}>
        {categories.map(c => (
          <button key={c} className={`${s.catBtn} ${cat === c ? s.catActive : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className={s.grid}>
        {rest.map(a => (
          <div key={a.id} className={s.card} onClick={() => setDetail(a)}>
            <div className={s.cardEmoji} style={{ background: a.color + '18' }}>{a.emoji}</div>
            <span className={s.cardCat} style={{ color: a.color }}>{a.category}</span>
            <h3 className={s.cardTitle}>{a.title}</h3>
            <p className={s.cardDesc}>{a.desc}</p>
            <div className={s.cardMeta}>
              <span className={s.readTime}><Clock size={11} />{a.readTime}</span>
              <span className={s.date}>{a.date}</span>
            </div>
            <button className={s.cardBtn}>O'qish <ArrowRight size={13} /></button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={s.empty}>
          <span style={{ fontSize: 40 }}>📚</span>
          <p>Bu kategoriyada maqola yo'q</p>
        </div>
      )}

      {/* AI tip */}
      <div className={s.aiTip}>
        <span className={s.aiIcon}>🤖</span>
        <div>
          <h3 className={s.aiTitle}>AI yordamchi</h3>
          <p className={s.aiDesc}>Karyerangiz haqida savol berishingiz mumkin. AI suhbat tayyorgarligida, CV yozishda va ish muzokaralarida yordam beradi.</p>
        </div>
        <button className={s.aiBtn}>Savol berish</button>
      </div>
    </div>
  );
}
