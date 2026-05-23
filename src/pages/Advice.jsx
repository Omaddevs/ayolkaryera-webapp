import { useState, useEffect, useRef } from 'react';
import {
  Clock, ArrowRight, Search, X, Share2, BookOpen, ChevronLeft, Star,
  FileText, Target, Home, Briefcase, DollarSign, Link2, Lightbulb, Sparkles,
} from 'lucide-react';
import { articles } from '../data/mockData';
import { useApp } from '../context/AppContext';
import s from './Advice.module.css';

const categories = ['Barchasi', 'CV maslahat', 'Suhbat tayyorligi', 'Karyera', 'Ish madaniyati', 'Muzokaralar', 'Shaxsiy brend'];

const ARTICLE_ICONS = {
  'file-text': FileText,
  target: Target,
  home: Home,
  briefcase: Briefcase,
  'dollar-sign': DollarSign,
  'link-2': Link2,
};

function ArticleIcon({ icon, size = 22, className, style }) {
  const Icon = ARTICLE_ICONS[icon] || BookOpen;
  return (
    <span className={className} style={style}>
      <Icon size={size} strokeWidth={2} aria-hidden />
    </span>
  );
}

function IconBadge({ article, size = 'md' }) {
  const sizes = { sm: 40, md: 52, lg: 64 };
  const iconSizes = { sm: 20, md: 26, lg: 32 };
  const dim = sizes[size];
  return (
    <div
      className={s.iconBadge}
      style={{ width: dim, height: dim, background: `${article.color}18`, color: article.color }}
    >
      <ArticleIcon icon={article.icon} size={iconSizes[size]} />
    </div>
  );
}

const getContent = (article) => [
  article.desc,
  `${article.title} mavzusi bugungi ish bozorida juda muhim o'rin tutadi. Ko'plab mutaxassislar ushbu sohadagi bilimlari tufayli muvaffaqiyatga erishganlar. Tadqiqotlar shuni ko'rsatadiki, to'g'ri yondashuv bilan maqsadga erish ehtimoli 3 barobar oshadi.`,
  `Amaliy qadamlar: birinchi navbatda o'zingizni tahlil qiling va kuchli tomonlaringizni aniqlang. So'ngra bozor talablarini o'rganing. Harakat rejasini tuzing va uni muntazam yangilab boring. Natijalarni kuzatib, zarur bo'lsa strategiyangizni moslashtiring.`,
  `Mutaxassislar tavsiyasiga ko'ra, eng muhim narsa — doimiy rivojlanish va o'z sohasidagi yangiliklarga tayyor bo'lish. Networking ham katta rol o'ynaydi: professional aloqalar ko'pincha yangi imkoniyatlar eshigini ochadi.`,
  `Xulosa qilib aytganda, ${article.category.toLowerCase()} sohasida muvaffaqiyatga erishish uchun sabr, izchillik va to'g'ri strategiya kerak. Ushbu maqoladagi tavsiyalar sizga o'z karyerangizni yangi bosqichga olib chiqishda yordam beradi.`,
];

export default function Advice() {
  const [cat, setCat] = useState('Barchasi');
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useApp();
  const articleRef = useRef();

  const filtered = articles.filter(a => {
    if (cat !== 'Barchasi' && a.category !== cat) return false;
    if (query && !a.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const featured = articles.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured || cat !== 'Barchasi' || query);
  const related = detail
    ? articles.filter(a => a.id !== detail.id && a.category === detail.category).slice(0, 2)
    : [];

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

  if (detail) {
    const paragraphs = getContent(detail);
    return (
      <div className={s.detailPage}>
        <div className={s.progressBar} style={{ width: `${progress}%` }} />

        <div className={s.detailNav}>
          <button type="button" className={s.backBtn} onClick={() => setDetail(null)}>
            <ChevronLeft size={18} /> Orqaga
          </button>
          <span className={s.readProgress}>{progress}% o'qildi</span>
          <button type="button" className={s.shareBtn} onClick={() => handleShare(detail)}>
            <Share2 size={15} /> Ulashish
          </button>
        </div>

        <div className={s.detailScroll} ref={articleRef}>
          <article className={s.article}>
            <header
              className={s.articleHeader}
              style={{ background: `linear-gradient(135deg, ${detail.color}14 0%, ${detail.color}08 50%, transparent 100%)` }}
            >
              <IconBadge article={detail} size="lg" />
              <div className={s.articleHeaderContent}>
                <span className={s.articleCat} style={{ color: detail.color, borderColor: `${detail.color}40` }}>
                  {detail.category}
                </span>
                <h1 className={s.articleTitle}>{detail.title}</h1>
                <div className={s.articleMeta}>
                  <span className={s.metaChip}><Clock size={13} />{detail.readTime}</span>
                  <span className={s.metaChip}>{detail.date}</span>
                  <span className={s.metaChip}>
                    <Star size={13} fill="var(--warning)" color="var(--warning)" /> 4.8
                  </span>
                </div>
              </div>
            </header>

            <div className={s.articleBody}>
              <p className={s.articleLead}>{paragraphs[0]}</p>
              {paragraphs.slice(1).map((p, i) => (
                <p key={i} className={s.articlePara}>{p}</p>
              ))}

              <div className={s.tipBox}>
                <div className={s.tipIconWrap}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <p className={s.tipTitle}>Asosiy maslahat</p>
                  <p className={s.tipText}>
                    Ushbu maqoladagi bilimlarni kundalik hayotingizda qo'llang — natijalar 2-4 hafta ichida seziladi.
                  </p>
                </div>
              </div>

              {related.length > 0 && (
                <div className={s.relatedSection}>
                  <h3 className={s.relatedTitle}><BookOpen size={15} /> O'xshash maqolalar</h3>
                  <div className={s.relatedGrid}>
                    {related.map(a => (
                      <button
                        key={a.id}
                        type="button"
                        className={s.relatedCard}
                        onClick={() => { setDetail(a); setProgress(0); articleRef.current?.scrollTo(0, 0); }}
                      >
                        <IconBadge article={a} size="sm" />
                        <div className={s.relatedInfo}>
                          <p className={s.relatedName}>{a.title}</p>
                          <span className={s.relatedTime}><Clock size={10} />{a.readTime}</span>
                        </div>
                        <ArrowRight size={16} className={s.relatedArrow} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <footer className={s.articleFooter}>
              <button type="button" className={s.footerBackBtn} onClick={() => setDetail(null)}>
                <ChevronLeft size={16} /> Barcha maqolalar
              </button>
            </footer>
          </article>
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
          {query && <button type="button" onClick={() => setQuery('')}><X size={13} /></button>}
        </div>
      </div>

      {featured && cat === 'Barchasi' && !query && (
        <div className={s.featured} onClick={() => setDetail(featured)} role="button" tabIndex={0}>
          <IconBadge article={featured} size="lg" />
          <div className={s.featuredContent}>
            <span className={s.featuredCat}>{featured.category}</span>
            <h2 className={s.featuredTitle}>{featured.title}</h2>
            <p className={s.featuredDesc}>{featured.desc}</p>
            <div className={s.featuredMeta}>
              <span className={s.readTime}><Clock size={12} />{featured.readTime}</span>
              <span className={s.date}>{featured.date}</span>
            </div>
            <button type="button" className={s.readBtn}>O'qish <ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      <div className={s.catRow}>
        {categories.map(c => (
          <button key={c} type="button" className={`${s.catBtn} ${cat === c ? s.catActive : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className={s.grid}>
        {rest.map(a => (
          <div key={a.id} className={s.card} onClick={() => setDetail(a)} role="button" tabIndex={0}>
            <IconBadge article={a} size="md" />
            <span className={s.cardCat} style={{ color: a.color }}>{a.category}</span>
            <h3 className={s.cardTitle}>{a.title}</h3>
            <p className={s.cardDesc}>{a.desc}</p>
            <div className={s.cardMeta}>
              <span className={s.readTime}><Clock size={11} />{a.readTime}</span>
              <span className={s.date}>{a.date}</span>
            </div>
            <button type="button" className={s.cardBtn}>O'qish <ArrowRight size={13} /></button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={s.empty}>
          <div className={s.emptyIcon}><BookOpen size={32} /></div>
          <p>Bu kategoriyada maqola yo'q</p>
        </div>
      )}

      <div className={s.aiTip}>
        <div className={s.aiIconWrap}><Sparkles size={24} /></div>
        <div>
          <h3 className={s.aiTitle}>AI yordamchi</h3>
          <p className={s.aiDesc}>
            Karyerangiz haqida savol berishingiz mumkin. AI suhbat tayyorgarligida, CV yozishda va ish muzokaralarida yordam beradi.
          </p>
        </div>
        <button type="button" className={s.aiBtn}>Savol berish</button>
      </div>
    </div>
  );
}
