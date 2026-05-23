import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { jobs as allJobs, conversations as initialConvs, applications as seedApps } from '../data/mockData';

export const AppContext = createContext(null);

// ─── Initial notifications ────────────────────────────────────────────────────
const initNotifications = [
  { id: 1, type: 'application', title: "Arizangiz ko'rib chiqilmoqda", body: "Uzum Market sizning arizangizni ko'rib chiqmoqda.", time: '2 soat oldin', read: false, icon: '📋' },
  { id: 2, type: 'message',     title: 'Yangi xabar', body: "Humans Recruiting sizga xabar yubordi.", time: '5 soat oldin', read: false, icon: '💬' },
  { id: 3, type: 'job',         title: "Yangi ish e'loni", body: "Sizning yo'nalishingizda 3 ta yangi ish e'loni qo'shildi.", time: 'Kecha', read: true, icon: '💼' },
  { id: 4, type: 'system',      title: 'Profilingiz 80% to\'liq', body: "Profilingizni 100% to'ldiring va ko'proq takliflar oling.", time: '2 kun oldin', read: true, icon: '⭐' },
];

// ─── Initial state ────────────────────────────────────────────────────────────
const initialState = {
  darkMode: false,
  savedJobIds: new Set(),
  conversations: initialConvs,
  applications: seedApps,
  notifications: initNotifications,
  toasts: [],
  sidebarOpen: false,
  _toastId: 100,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    /* ── Dark mode ── */
    case 'TOGGLE_DARK':
      return { ...state, darkMode: !state.darkMode };

    /* ── Sidebar ── */
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };

    /* ── Saved jobs ── */
    case 'TOGGLE_SAVE': {
      const next = new Set(state.savedJobIds);
      next.has(action.id) ? next.delete(action.id) : next.add(action.id);
      return { ...state, savedJobIds: next };
    }

    /* ── Apply to job ── */
    case 'APPLY_JOB': {
      const { job, coverLetter } = action;
      const already = state.applications.find(a => a.jobId === job.id);
      if (already) return state;
      const newApp = {
        id: Date.now(),
        jobId: job.id,
        title: job.title,
        company: job.company,
        logo: job.logo,
        color: job.color,
        logoText: job.logoText,
        appliedDate: new Date().toISOString().slice(0, 10),
        status: 'pending',
        statusLabel: 'Yuborildi',
        salary: job.salary,
        location: job.location,
        nextStep: null,
        notes: coverLetter
          ? `Qo'shimcha xat: ${coverLetter.slice(0, 120)}...`
          : 'Ariza yuborildi.',
        coverLetter,
      };
      const newNotif = {
        id: Date.now() + 1,
        type: 'application',
        title: 'Ariza muvaffaqiyatli yuborildi!',
        body: `${job.company} — ${job.title} lavozimiga arizangiz qabul qilindi.`,
        time: 'Hozir',
        read: false,
        icon: '✅',
      };
      return {
        ...state,
        applications: [newApp, ...state.applications],
        savedJobIds: new Set([...state.savedJobIds, job.id]),
        notifications: [newNotif, ...state.notifications],
      };
    }

    /* ── Withdraw application ── */
    case 'WITHDRAW_APPLICATION':
      return {
        ...state,
        applications: state.applications.filter(a => a.id !== action.id),
      };

    /* ── Update application status ── */
    case 'UPDATE_APP_STATUS':
      return {
        ...state,
        applications: state.applications.map(a =>
          a.id === action.id ? { ...a, ...action.patch } : a
        ),
      };

    /* ── Messages ── */
    case 'SEND_MESSAGE': {
      const convs = state.conversations.map(c =>
        c.id === action.convId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: Date.now(), from: 'me', text: action.text, time: 'Hozir' },
              ],
              time: 'Hozir',
              unread: 0,
            }
          : c
      );
      return { ...state, conversations: convs };
    }
    case 'MARK_READ': {
      const convs = state.conversations.map(c =>
        c.id === action.convId ? { ...c, unread: 0 } : c
      );
      return { ...state, conversations: convs };
    }

    /* ── Notifications ── */
    case 'MARK_NOTIF_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };
    case 'MARK_ALL_NOTIFS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.notif, ...state.notifications],
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    /* ── Toasts ── */
    case 'ADD_TOAST': {
      const id = state._toastId + 1;
      return {
        ...state,
        _toastId: id,
        toasts: [...state.toasts, { id, message: action.message, type: action.toastType || 'success' }],
      };
    }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (s) => {
    try {
      const saved = localStorage.getItem('savedJobs');
      const dark = localStorage.getItem('darkMode');
      return {
        ...s,
        savedJobIds: new Set(saved ? JSON.parse(saved) : []),
        darkMode: dark === 'true',
      };
    } catch { return s; }
  });

  /* Persist */
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify([...state.savedJobIds]));
  }, [state.savedJobIds]);

  useEffect(() => {
    localStorage.setItem('darkMode', String(state.darkMode));
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  }, [state.darkMode]);

  /* Toast auto-dismiss */
  useEffect(() => {
    if (state.toasts.length === 0) return;
    const last = state.toasts[state.toasts.length - 1];
    const t = setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id: last.id }), 3800);
    return () => clearTimeout(t);
  }, [state.toasts]);

  /* Derived */
  const savedJobs = allJobs.filter(j => state.savedJobIds.has(j.id));
  const totalUnread = state.conversations.reduce((s, c) => s + c.unread, 0);
  const unreadNotifs = state.notifications.filter(n => !n.read).length;

  /* Helper: show toast */
  const toast = useCallback((message, toastType = 'success') => {
    dispatch({ type: 'ADD_TOAST', message, toastType });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, savedJobs, totalUnread, unreadNotifs, toast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
