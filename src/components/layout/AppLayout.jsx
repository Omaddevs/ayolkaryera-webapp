import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import RightPanel from './RightPanel';
import ToastContainer from '../ui/Toast';
import s from './AppLayout.module.css';

const withRightPanel = ['/'];

export default function AppLayout() {
  const { pathname } = useLocation();
  const showRight = withRightPanel.includes(pathname);

  return (
    <div className={s.app}>
      <Sidebar />
      <div className={s.main}>
        <Header />
        <main className={`${s.content} ${showRight ? s.withRight : ''}`}>
          <div className={s.page}>
            <Outlet />
          </div>
          {showRight && <RightPanel />}
        </main>
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  );
}
