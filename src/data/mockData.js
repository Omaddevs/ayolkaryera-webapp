// ─── Companies ───────────────────────────────────────────────────────────────
export const companies = [
  { id: 1, name: 'Uzum Market', logo: 'UZUM', color: '#6C3CE1', textColor: '#fff', industry: 'E-commerce', size: '5000+', location: 'Toshkent', jobs: 24, rating: 4.8, verified: true, desc: "O'zbekistonning yetakchi e-commerce platformasi." },
  { id: 2, name: 'Beeline Uzbekistan', logo: 'Bee', color: '#FFD200', textColor: '#111', industry: 'Telekommunikatsiya', size: '3000+', location: 'Toshkent', jobs: 18, rating: 4.6, verified: true, desc: "Yetakchi mobil aloqa operatori." },
  { id: 3, name: 'Coca-Cola', logo: 'CC', color: '#E61C24', textColor: '#fff', industry: 'FMCG', size: '1000+', location: 'Toshkent', jobs: 8, rating: 4.7, verified: true, desc: "Jahonning eng yirik ichimlik ishlab chiqaruvchisi." },
  { id: 4, name: 'Artel Electronics', logo: 'artel', color: '#009A44', textColor: '#fff', industry: 'Elektronika', size: '2000+', location: 'Toshkent', jobs: 15, rating: 4.5, verified: true, desc: "O'zbekistonda ishlab chiqarilgan elektronika." },
  { id: 5, name: 'Kapital Bank', logo: 'KB', color: '#003087', textColor: '#fff', industry: 'Bank', size: '4000+', location: 'Toshkent', jobs: 32, rating: 4.4, verified: true, desc: "O'zbekistonning ishonchli bank tizimi." },
  { id: 6, name: 'Humans', logo: 'H', color: '#FF6B35', textColor: '#fff', industry: 'Texnologiya', size: '500+', location: 'Toshkent', jobs: 12, rating: 4.9, verified: true, desc: "Innovatsion fintech kompaniya." },
  { id: 7, name: 'MyTaxi', logo: 'MT', color: '#FFCB00', textColor: '#111', industry: 'Transport', size: '800+', location: 'Toshkent', jobs: 9, rating: 4.3, verified: true, desc: "Online taksi xizmati." },
  { id: 8, name: 'Zoodmall', logo: 'ZM', color: '#E91E8C', textColor: '#fff', industry: 'Savdo', size: '300+', location: 'Toshkent', jobs: 6, rating: 4.5, verified: false, desc: "Zamonaviy savdo markazi." },
  { id: 9, name: 'OLX', logo: 'OLX', color: '#3A77FF', textColor: '#fff', industry: 'E-commerce', size: '600+', location: 'Toshkent', jobs: 11, rating: 4.6, verified: true, desc: "Elanlar joylash platformasi." },
  { id: 10, name: 'Uzmobile', logo: 'UM', color: '#00A651', textColor: '#fff', industry: 'Telekommunikatsiya', size: '2500+', location: 'Toshkent', jobs: 14, rating: 4.2, verified: true, desc: "Milliy mobil aloqa operatori." },
];

// ─── Jobs ─────────────────────────────────────────────────────────────────────
export const jobs = [
  { id: 1, title: 'Mijozlar bilan ishlash mutaxassisi', company: 'Uzum Market', companyId: 1, logo: 'UZUM', color: '#6C3CE1', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '4 000 000', salaryMax: '5 000 000', isNew: true, tags: ['CRM', 'Muloqot', 'B2C'], desc: "Uzum Market mijozlar bilan muloqot bo'yicha mutaxassis izlaydi. Siz mijozlarning savollariga javob berish, shikoyatlarni hal qilish va mijozlar tajribasini yaxshilash bilan shug'ullanasiz.", requirements: ["Yuqori muloqot ko'nikmalari", "Kompyuter bilan ishlash tajribasi", "Rus tilini bilish (istalgan)"], benefits: ["Rasmiy rasmiylashtiriladi", "Ijtimoiy paket", "Korporativ o'qitish", "Karyera o'sishi"] },
  { id: 2, title: 'Onlayn konsultant', company: 'Beeline Uzbekistan', companyId: 2, logo: 'Bee', color: '#FFD200', logoText: '#111', type: 'Masofaviy', location: 'Toshkent', salary: '3 500 000', salaryMax: '4 500 000', isNew: false, tags: ['Support', 'Chat', 'Masofaviy'], desc: "Beeline Uzbekistan onlayn konsultant qidirmoqda. Ish masofaviy tarzda olib boriladi. Mijozlarga chat va qo'ng'iroqlar orqali yordam berasiz.", requirements: ["O'zbek va rus tillarini bilish", "Yaxshi yozuv tezligi", "Sabr-toqatlilik"], benefits: ["To'liq masofaviy ish", "Moslashuvchan jadval", "Bonuslar tizimi"] },
  { id: 3, title: 'SMM mutaxassisi', company: 'Artel Electronics', companyId: 4, logo: 'artel', color: '#009A44', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '5 000 000', salaryMax: '7 000 000', isNew: false, tags: ['Instagram', 'Content', 'Design'], desc: "Artel Electronics ijtimoiy tarmoqlar bo'yicha mutaxassis izlaydi. Siz brendning ijtimoiy tarmoqlardagi faoliyatini boshqarasiz, kontent yaratasiz va auditoriyani oshirasiz.", requirements: ['Instagram/TikTok tajribasi', 'Kontent yaratish ko\'nikmalari', 'Canva yoki Photoshop'], benefits: ["Rasmiy ish joyi", "Hamkor chegirmalar", "Professional o'sish imkoniyati"] },
  { id: 4, title: 'HR mutaxassisi', company: 'Coca-Cola', companyId: 3, logo: 'CC', color: '#E61C24', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '6 000 000', salaryMax: '8 000 000', isNew: false, tags: ['HR', 'Recruitment', 'Onboarding'], desc: "Coca-Cola HR mutaxassis izlaydi. Siz ishga qabul qilish, yangi xodimlarni moslashtirishga yordam berish va korporativ madaniyatni rivojlantirish bilan shug'ullanasiz.", requirements: ["HR sohasida 2+ yil tajriba", "1C va HRM tizimlarini bilish", "Rasmiy ish yuritish ko'nikmalari"], benefits: ["Xalqaro kompaniyada ish", "DMS (tibbiy sug'urta)", "Yillik bonus"] },
  { id: 5, title: "Moliyachi", company: 'Kapital Bank', companyId: 5, logo: 'KB', color: '#003087', logoText: '#fff', type: "Yarim stavka", location: 'Samarqand', salary: '3 000 000', salaryMax: '4 000 000', isNew: true, tags: ['Finance', 'Excel', '1C'], desc: "Kapital Bank moliyachi izlaydi. Moliyaviy hisobotlar tayyorlash, budjet nazorati va buxgalteriya hisobi bilan shug'ullanasiz.", requirements: ["Moliya yoki iqtisodiyot bo'yicha diplom", "Excel (ilg'or daraja)", "1C:Buxgalteriya"], benefits: ["Bank imtiyozlari", "Pensiya jamg'armasi", "Professional trening"] },
  { id: 6, title: 'UX/UI Dizayner', company: 'Humans', companyId: 6, logo: 'H', color: '#FF6B35', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '8 000 000', salaryMax: '12 000 000', isNew: true, tags: ['Figma', 'UX', 'Prototyping'], desc: "Humans fintech kompaniyasida UX/UI dizayner izlanmoqda. Mahsulot dizaynini yaratish, foydalanuvchi tadqiqotlari o'tkazish va prototiplar yasash.", requirements: ["Figma/Sketch tajribasi", "Portfolio taqdim etish shart", "Mobile-first yondashuv"], benefits: ["Remote-hybrid rejim", "MacBook taqdim etiladi", "Stock options"] },
  { id: 7, title: 'Marketing menejeri', company: 'MyTaxi', companyId: 7, logo: 'MT', color: '#FFCB00', logoText: '#111', type: "To'liq stavka", location: 'Toshkent', salary: '7 000 000', salaryMax: '10 000 000', isNew: false, tags: ['Marketing', 'Analytics', 'Growth'], desc: "MyTaxi marketing menejeri izlaydi. Reklama kampaniyalarini boshqarish, foydalanuvchilarni jalb qilish strategiyasini ishlab chiqish.", requirements: ["Marketing sohasida 3+ yil tajriba", "Google Analytics / Meta Ads", "A/B testing tajribasi"], benefits: ["Korporativ transport", "Flexible jadval", "KPI bonuslari"] },
  { id: 8, title: 'Frontend dasturchi', company: 'OLX', companyId: 9, logo: 'OLX', color: '#3A77FF', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '10 000 000', salaryMax: '15 000 000', isNew: true, tags: ['React', 'TypeScript', 'Next.js'], desc: "OLX frontend dasturchi izlaydi. React va TypeScript yordamida zamonaviy veb-ilovalar yaratish.", requirements: ["React/TypeScript 2+ yil", "REST API bilan ishlash", "Git tajribasi"], benefits: ["Relocation package", "Texnika taqdim etiladi", "International jamoa"] },
  { id: 9, title: 'Mijozlar xizmati operatori', company: 'Uzmobile', companyId: 10, logo: 'UM', color: '#00A651', logoText: '#fff', type: "Smenali ish", location: 'Toshkent', salary: '2 800 000', salaryMax: '3 500 000', isNew: false, tags: ['Call center', 'CRM', 'Support'], desc: "Uzmobile call-center operatori izlaydi. Abonentlarga qo'ng'iroq orqali yordam ko'rsatish.", requirements: ["Ravon nutq", "Sabr-toqat", "Kompyuter bilimi"], benefits: ["Smenali jadval", "Ovqatlanish taqdim etiladi", "Karyera imkoniyati"] },
  { id: 10, title: 'Kontent menejer', company: 'Zoodmall', companyId: 8, logo: 'ZM', color: '#E91E8C', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '4 500 000', salaryMax: '6 000 000', isNew: false, tags: ['Content', 'SEO', 'Copywriting'], desc: "Zoodmall kontent menejer izlaydi. Veb-sayt va ijtimoiy tarmoqlar uchun kontent yaratish, SEO optimizatsiya.", requirements: ["Yozuv ko'nikmalari", "SEO asoslari", "CMS tizimlari"], benefits: ["Korporativ chegirmalar", "Creative muhit", "Flexible ish joyi"] },
  { id: 11, title: 'Buxgalter', company: 'Kapital Bank', companyId: 5, logo: 'KB', color: '#003087', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '5 000 000', salaryMax: '6 500 000', isNew: false, tags: ['1C', 'Soliq', 'Hisobot'], desc: "Kapital Bank buxgalter izlaydi. Moliyaviy hisobot, soliq deklaratsiyasi, daromad-xarajat nazorati.", requirements: ["Buxgalteriya tajribasi 3+ yil", "1C:Buxgalteriya 8.3", "Soliq qonunchiligi bilimlari"], benefits: ["Bank imtiyozlari", "Barqaror ish joyi", "O'quv kurslari"] },
  { id: 12, title: "Pedagogik koordinator", company: 'Uzum Market', companyId: 1, logo: 'UZUM', color: '#6C3CE1', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '5 500 000', salaryMax: '7 000 000', isNew: true, tags: ['Training', 'HR', 'Education'], desc: "Uzum Market korporativ o'quv koordinatori izlaydi. Xodimlarni o'qitish dasturlari tashkil etish.", requirements: ["Pedagogika yoki psixologiya diplomi", "Training facilitation tajribasi", "MS Office"], benefits: ["Katta jamoa", "O'sish imkoniyati", "Korporativ trening"] },
  { id: 13, title: 'Grafik dizayner', company: 'Artel Electronics', companyId: 4, logo: 'artel', color: '#009A44', logoText: '#fff', type: 'Masofaviy', location: 'Toshkent', salary: '4 000 000', salaryMax: '6 000 000', isNew: false, tags: ['Photoshop', 'Illustrator', 'Brending'], desc: "Artel Electronics grafik dizayner izlaydi. Reklama materiallari, brend identifikatsiyasi va print dizayn.", requirements: ["Adobe Suite tajribasi", "Portfolio", "Ijodiy yondashuv"], benefits: ["Remote variant", "Ijodiy muhit", "Portfolio boyitish"] },
  { id: 14, title: 'PR mutaxassisi', company: 'Beeline Uzbekistan', companyId: 2, logo: 'Bee', color: '#FFD200', logoText: '#111', type: "To'liq stavka", location: 'Toshkent', salary: '6 500 000', salaryMax: '9 000 000', isNew: false, tags: ['PR', 'Media', 'Branding'], desc: "Beeline Uzbekistan PR mutaxassisi izlaydi. OAV bilan aloqa, press-relizlar yozish, brend imidjini boshqarish.", requirements: ["Jurnalistika yoki marketing diplomi", "OAV bilan ishlash tajribasi", "Yaxshi yozish uslubi"], benefits: ["Korporativ telefon", "Media imtiyozlar", "Professional o'sish"] },
  { id: 15, title: 'Data analyst', company: 'Humans', companyId: 6, logo: 'H', color: '#FF6B35', logoText: '#fff', type: "To'liq stavka", location: 'Toshkent', salary: '9 000 000', salaryMax: '13 000 000', isNew: true, tags: ['Python', 'SQL', 'Power BI'], desc: "Humans fintech ma'lumotlar tahlilchisi izlaydi. Biznes ko'rsatkichlarini tahlil qilish, dashboard yaratish, hisobot tayyorlash.", requirements: ["Python/R bilimi", "SQL (PostgreSQL)", "Vizualizatsiya vositalari"], benefits: ["Top maaş", "Flexible remote", "Jadval erkinligi"] },
];

// ─── Applications ─────────────────────────────────────────────────────────────
export const applications = [
  { id: 1, jobId: 1, title: 'Mijozlar bilan ishlash mutaxassisi', company: 'Uzum Market', logo: 'UZUM', color: '#6C3CE1', logoText: '#fff', appliedDate: '2026-05-10', status: 'interview', statusLabel: 'Suhbat', salary: '4 000 000', location: 'Toshkent', nextStep: '2026-05-25da suhbat', notes: "CV ko'rib chiqildi. HR bilan qo'ng'iroq o'tkazildi." },
  { id: 2, jobId: 3, title: 'SMM mutaxassisi', company: 'Artel Electronics', logo: 'artel', color: '#009A44', logoText: '#fff', appliedDate: '2026-05-08', status: 'review', statusLabel: "Ko'rib chiqilmoqda", salary: '5 000 000', location: 'Toshkent', nextStep: null, notes: "Arizangiz HR tomonidan ko'rib chiqilmoqda." },
  { id: 3, jobId: 6, title: 'UX/UI Dizayner', company: 'Humans', logo: 'H', color: '#FF6B35', logoText: '#fff', appliedDate: '2026-05-05', status: 'accepted', statusLabel: 'Qabul qilindi', salary: '8 000 000', location: 'Toshkent', nextStep: "2026-05-28da ishga kirish", notes: "Tabriklaymiz! Taklif qabul qilindi." },
  { id: 4, jobId: 7, title: 'Marketing menejeri', company: 'MyTaxi', logo: 'MT', color: '#FFCB00', logoText: '#111', appliedDate: '2026-04-28', status: 'rejected', statusLabel: 'Rad etildi', salary: '7 000 000', location: 'Toshkent', nextStep: null, notes: "Boshqa nomzod tanlandi. Keyingi safar omad." },
  { id: 5, jobId: 4, title: 'HR mutaxassisi', company: 'Coca-Cola', logo: 'CC', color: '#E61C24', logoText: '#fff', appliedDate: '2026-05-15', status: 'pending', statusLabel: 'Yuborildi', salary: '6 000 000', location: 'Toshkent', nextStep: null, notes: "Arizangiz yuborildi." },
  { id: 6, jobId: 8, title: 'Frontend dasturchi', company: 'OLX', logo: 'OLX', color: '#3A77FF', logoText: '#fff', appliedDate: '2026-05-18', status: 'pending', statusLabel: 'Yuborildi', salary: '10 000 000', location: 'Toshkent', nextStep: null, notes: "Arizangiz ko'rib chiqilishini kutmoqda." },
  { id: 7, jobId: 14, title: 'PR mutaxassisi', company: 'Beeline', logo: 'Bee', color: '#FFD200', logoText: '#111', appliedDate: '2026-05-01', status: 'review', statusLabel: "Ko'rib chiqilmoqda", salary: '6 500 000', location: 'Toshkent', nextStep: null, notes: "Testdan o'tkazildi, natijalar kutilmoqda." },
  { id: 8, jobId: 11, title: 'Buxgalter', company: 'Kapital Bank', logo: 'KB', color: '#003087', logoText: '#fff', appliedDate: '2026-04-20', status: 'interview', statusLabel: 'Suhbat', salary: '5 000 000', location: 'Toshkent', nextStep: '2026-05-26da video suhbat', notes: "Ish beruvchi bilan suhbat rejalashtirildi." },
];

// ─── Messages ─────────────────────────────────────────────────────────────────
export const conversations = [
  {
    id: 1, name: 'Uzum Market HR', role: 'HR menejeri', avatar: 'UM', color: '#6C3CE1', unread: 2, time: '10:42',
    messages: [
      { id: 1, from: 'them', text: "Salom! Siz Mijozlar bilan ishlash mutaxassisi lavozimiga ariza topshirdingiz.", time: '10:30' },
      { id: 2, from: 'me', text: "Ha, assalomu alaykum! Ha, topshirdim.", time: '10:32' },
      { id: 3, from: 'them', text: "CVingizni ko'rdik. Suhbatga taklif qilamiz. Ertaga ertalab 10:00 da qulaymi?", time: '10:40' },
      { id: 4, from: 'them', text: "Onlayn formatda bo'ladi, Zoom orqali.", time: '10:42' },
    ]
  },
  {
    id: 2, name: 'Humans Recruiting', role: 'Recruiting Lead', avatar: 'H', color: '#FF6B35', unread: 0, time: 'Kecha',
    messages: [
      { id: 1, from: 'them', text: "Salom Malika! UX/UI pozitsiyasiga qiziquvingiz uchun rahmat.", time: 'Kecha 14:00' },
      { id: 2, from: 'me', text: "Salom! Ha, juda qiziqaman.", time: 'Kecha 14:05' },
      { id: 3, from: 'them', text: "Tabriklaymiz! Taklifni qabul qilganingizdan xursandmiz. Shartnoma hujjatlarini yuboramiz.", time: 'Kecha 16:30' },
      { id: 4, from: 'me', text: "Rahmat! Juda xursandman!", time: 'Kecha 16:32' },
    ]
  },
  {
    id: 3, name: 'Artel Electronics', role: 'Ish beruvchi', avatar: 'artel', color: '#009A44', unread: 1, time: '2 kun',
    messages: [
      { id: 1, from: 'them', text: "SMM mutaxassisi pozitsiyasiga arizangiz qabul qilindi.", time: '2 kun oldin' },
      { id: 2, from: 'me', text: "Rahmat! Natijani kutyapman.", time: '2 kun oldin' },
      { id: 3, from: 'them', text: "Hozirda CVingiz HR tomonidan ko'rib chiqilmoqda. Tez orada xabar beramiz!", time: '1 kun oldin' },
    ]
  },
  {
    id: 4, name: 'Kapital Bank', role: 'HR bo\'limi', avatar: 'KB', color: '#003087', unread: 0, time: '3 kun',
    messages: [
      { id: 1, from: 'them', text: "Buxgalter lavozimiga ariza topshirganingiz uchun rahmat.", time: '3 kun oldin' },
      { id: 2, from: 'them', text: "Video suhbatni 26-may kuni soat 15:00 da rejalashtiramiz.", time: '2 kun oldin' },
      { id: 3, from: 'me', text: "Albatta, men tayyor!", time: '2 kun oldin' },
    ]
  },
  {
    id: 5, name: 'AyolKaryera AI', role: 'AI yordamchi', avatar: 'AI', color: '#E91E8C', unread: 0, time: '1 hafta',
    messages: [
      { id: 1, from: 'them', text: "Salom Malika! Men sizning karyerangizni rivojlantirishda yordam beraman. Qanday savol bor?", time: '1 hafta oldin' },
      { id: 2, from: 'me', text: "Marketing sohasida CV qanday yaxshilay?", time: '1 hafta oldin' },
      { id: 3, from: 'them', text: "Ajoyib savol! CV uchun: 1) Aniq natijalar ko'rsating, 2) Kalit so'zlarni qo'shing, 3) Raqamlar bilan ifodalang. Misol: 'SMM orqali sotuvni 35% ga oshirdim'.", time: '1 hafta oldin' },
    ]
  },
];

// ─── Career Advice Articles ───────────────────────────────────────────────────
export const articles = [
  { id: 1, title: "CV yozishning 10 ta sirli usuli", category: "CV maslahat", readTime: "5 daqiqa", date: "20 May 2026", featured: true, color: '#E91E8C', emoji: '📄', desc: "Professional CV tuzishda ko'pchilik xato qiladigan nuqtalar va ularni bartaraf etish yo'llari haqida to'liq qo'llanma." },
  { id: 2, title: "Suhbatga qanday tayyorlanish kerak?", category: "Suhbat tayyorligi", readTime: "7 daqiqa", date: "18 May 2026", featured: false, color: '#8B5CF6', emoji: '🎯', desc: "Ish suhbatida muvaffaqiyat qozonish uchun eng samarali tayyorlanish usullari va eng ko'p beriladigan savollar." },
  { id: 3, title: "Masofaviy ishlash: afzallik va kamchiliklar", category: "Ish madaniyati", readTime: "4 daqiqa", date: "15 May 2026", featured: false, color: '#3B82F6', emoji: '🏠', desc: "Remote ish nima? Undan qanday unumli foydalanish mumkin? Masofaviy ishda samaradorlikni oshirish sirlari." },
  { id: 4, title: "O'zbekistonda ayollar va karyera", category: "Karyera", readTime: "6 daqiqa", date: "12 May 2026", featured: false, color: '#10B981', emoji: '💼', desc: "Zamonaviy O'zbekistonda ayollar uchun karyera imkoniyatlari, muvaffaqiyatli ayollar tajribasi va ilhomlantiruvchi hikoyalar." },
  { id: 5, title: "Maosh bo'yicha muzokaralar qanday olib borish kerak?", category: "Muzokaralar", readTime: "5 daqiqa", date: "10 May 2026", featured: false, color: '#F59E0B', emoji: '💰', desc: "Ko'pchilik o'zi haqiqatda loyiq bo'lgan maoshdan kam oladi. Muzokaralar orqali maoshingizni oshiring." },
  { id: 6, title: "LinkedIn profilingizni professional qiling", category: "Shaxsiy brend", readTime: "8 daqiqa", date: "8 May 2026", featured: false, color: '#3A77FF', emoji: '🔗', desc: "LinkedIn — professional tarmoqlarning eng muhimi. Profilingizni 100% to'ldiring va recruiterlar e'tiborini torting." },
];

// ─── Nav items ────────────────────────────────────────────────────────────────
export const navItems = [
  { id: 'home',    path: '/',            label: 'Bosh sahifa',        icon: 'home' },
  { id: 'jobs',    path: '/jobs',        label: 'Ish topish',         icon: 'search' },
  { id: 'cv',      path: '/cv',          label: 'CV yaratish',        icon: 'file-text', badge: 'Yangi' },
  { id: 'saved',   path: '/saved',       label: 'Saqlangan ishlar',   icon: 'star' },
  { id: 'apps',    path: '/applications',label: 'Arizalarim',         icon: 'check-square' },
  { id: 'msgs',    path: '/messages',    label: 'Xabarlar',           icon: 'message-circle', badgeCount: 3 },
  { id: 'companies', path: '/companies', label: 'Kompaniyalar',       icon: 'building' },
  { id: 'advice',  path: '/advice',      label: 'Karyera maslahatlari', icon: 'book-open' },
  { id: 'settings', path: '/settings',  label: 'Sozlamalar',         icon: 'settings' },
];

export const quickFilters = [
  { id: 'remote',   label: 'Masofaviy',         icon: 'home',  type: 'Masofaviy' },
  { id: 'parttime', label: 'Yarim stavka',       icon: 'clock', type: 'Yarim stavka' },
  { id: 'noexp',    label: 'Tajribasizlar uchun', icon: 'star',  type: 'noexp' },
  { id: 'mothers',  label: 'Onalar uchun',       icon: 'heart', type: 'mothers' },
];

export const careerTools = [
  { id: 1, icon: 'user',           title: 'Suhbatga tayyorgarlik', desc: 'AI yordamida suhbat savollariga tayyorlanig', color: '#E91E8C', path: '/advice' },
  { id: 2, icon: 'briefcase',      title: 'Karyera maslahatlari',  desc: "Mutaxassislardan bepul maslahat olish",        color: '#8B5CF6', path: '/advice' },
  { id: 3, icon: 'graduation-cap', title: 'Onlayn kurslar',        desc: "Yangi kasb o'rganing va sertifikat oling",     color: '#3B82F6', path: '/advice' },
];

export const stats = [
  { value: '10 000+', label: "Ish e'lonlari",           icon: 'file-text'  },
  { value: '5 000+',  label: 'Ishonchli kompaniyalar',   icon: 'building'   },
  { value: '50 000+', label: 'Baxtli foydalanuvchilar',  icon: 'users'      },
  { value: '24/7',    label: 'Yordam xizmati',           icon: 'headphones' },
];

export const user = {
  name: 'Malika Nosirova',
  title: 'Marketing mutaxassisi',
  location: 'Toshkent, Chilonzor',
  email: 'malika@example.com',
  phone: '+998 90 123 45 67',
  completion: 80,
  avatar: null,
};
