import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import s from './Toast.module.css';

const cfg = {
  success: { icon: CheckCircle, color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
  error:   { icon: XCircle,     color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
  warning: { icon: AlertCircle, color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
  info:    { icon: Info,        color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
};

export default function ToastContainer() {
  const { state, dispatch } = useApp();

  return (
    <div className={s.container}>
      {state.toasts.map(t => (
        <Toast key={t.id} toast={t} onClose={() => dispatch({ type: 'REMOVE_TOAST', id: t.id })} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const c = cfg[toast.type] || cfg.success;
  const Icon = c.icon;

  return (
    <div
      className={s.toast}
      style={{ background: c.bg, borderColor: c.border }}
      role="alert"
    >
      <span className={s.icon} style={{ color: c.color }}>
        <Icon size={18} />
      </span>
      <span className={s.msg}>{toast.message}</span>
      <button className={s.close} onClick={onClose}>
        <X size={14} />
      </button>
    </div>
  );
}
