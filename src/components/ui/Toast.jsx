import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import s from './Toast.module.css';

const cfg = {
  success: { icon: CheckCircle, toast: s.toastSuccess, iconCls: s.iconSuccess, msgCls: s.msgSuccess },
  error:   { icon: XCircle,     toast: s.toastError,   iconCls: s.iconError,   msgCls: s.msgError   },
  warning: { icon: AlertCircle, toast: s.toastWarning, iconCls: s.iconWarning, msgCls: s.msgWarning },
  info:    { icon: Info,        toast: s.toastInfo,    iconCls: s.iconInfo,    msgCls: s.msgInfo    },
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
    <div className={`${s.toast} ${c.toast}`} role="alert">
      <span className={`${s.icon} ${c.iconCls}`}>
        <Icon size={18} />
      </span>
      <span className={`${s.msg} ${c.msgCls}`}>{toast.message}</span>
      <button type="button" className={s.close} onClick={onClose} aria-label="Yopish">
        <X size={14} />
      </button>
    </div>
  );
}
