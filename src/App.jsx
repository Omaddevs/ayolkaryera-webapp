import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import CV from './pages/CV';
import Saved from './pages/Saved';
import Applications from './pages/Applications';
import Messages from './pages/Messages';
import Companies from './pages/Companies';
import Advice from './pages/Advice';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/"            element={<Home />} />
        <Route path="/jobs"        element={<Jobs />} />
        <Route path="/cv"          element={<CV />} />
        <Route path="/saved"       element={<Saved />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/messages"    element={<Messages />} />
        <Route path="/companies"   element={<Companies />} />
        <Route path="/advice"      element={<Advice />} />
        <Route path="/settings"    element={<Settings />} />
        <Route path="*"            element={<Home />} />
      </Route>
    </Routes>
  );
}
