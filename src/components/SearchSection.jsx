import { useState } from 'react';
import { ChevronDown, Search, MapPin, Briefcase, DollarSign, Home, Clock, Star, Heart, ChevronRight } from 'lucide-react';
import { quickFilters } from '../data/mockData';
import styles from './SearchSection.module.css';

const iconMap = { home: Home, clock: Clock, star: Star, heart: Heart };

export default function SearchSection({ activeFilter, setActiveFilter }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Ish qidiring</h2>
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <SelectFilter icon={<Briefcase size={15} />} placeholder="Yo'nalish" />
          <SelectFilter icon={<Briefcase size={15} />} placeholder="Ish turi" />
          <SelectFilter icon={<MapPin size={15} />} placeholder="Joylashuv" />
          <SelectFilter icon={<DollarSign size={15} />} placeholder="Maosh" />
          <button className={styles.searchBtn}>
            <Search size={16} />
            Qidirish
          </button>
        </div>
        <div className={styles.quickRow}>
          {quickFilters.map(f => {
            const Icon = iconMap[f.icon] || Home;
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                className={`${styles.quickBtn} ${isActive ? styles.quickActive : ''}`}
                onClick={() => setActiveFilter(isActive ? null : f.id)}
              >
                <Icon size={14} />
                {f.label}
              </button>
            );
          })}
          <button className={styles.moreBtn}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectFilter({ icon, placeholder }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const options = {
    'Yo\'nalish': ['IT', 'Marketing', 'Moliya', 'HR', 'Dizayn'],
    'Ish turi': ['To\'liq stavka', 'Yarim stavka', 'Masofaviy', 'Freelance'],
    'Joylashuv': ['Toshkent', 'Samarqand', 'Buxoro', 'Namangan'],
    'Maosh': ['1-3 mln', '3-5 mln', '5-10 mln', '10+ mln'],
  }[placeholder] || [];

  return (
    <div className={styles.selectWrap}>
      <button className={styles.select} onClick={() => setOpen(!open)}>
        <span className={styles.selectIcon}>{icon}</span>
        <span className={`${styles.selectText} ${!value ? styles.placeholder : ''}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={14} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>
      {open && (
        <div className={styles.dropdown}>
          {options.map(opt => (
            <button
              key={opt}
              className={`${styles.dropItem} ${value === opt ? styles.dropItemActive : ''}`}
              onClick={() => { setValue(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
