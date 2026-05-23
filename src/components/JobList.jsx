import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import JobCard from './JobCard';
import { jobs as initialJobs } from '../data/mockData';
import styles from './JobList.module.css';

export default function JobList() {
  const [jobs, setJobs] = useState(initialJobs);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? jobs : jobs.slice(0, 3);

  const toggleSave = (id) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isSaved: !j.isSaved } : j));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Tavsiya etilgan ishlar</h2>
        <button className={styles.seeAll} onClick={() => setShowAll(true)}>
          Barchasini ko'rish →
        </button>
      </div>

      <div className={styles.list}>
        {displayed.map(job => (
          <JobCard key={job.id} job={job} onToggleSave={toggleSave} />
        ))}
      </div>

      {!showAll && (
        <button className={styles.loadMore} onClick={() => setShowAll(true)}>
          <ChevronDown size={16} />
          Yana ko'proq ishlar
        </button>
      )}
    </div>
  );
}
