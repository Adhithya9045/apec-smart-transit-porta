import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { useTransit } from '../../context/TransitContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTransit();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((t) => {
        const icons = {
          success: <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />,
          warning: <AlertTriangle className="text-amber-500 shrink-0" size={20} />,
          error: <XCircle className="text-rose-500 shrink-0" size={20} />,
          info: <Info className="text-blue-500 shrink-0" size={20} />,
        };

        const borderStyles = {
          success: 'border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
          warning: 'border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
          error: 'border-l-4 border-l-rose-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
          info: 'border-l-4 border-l-blue-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
        };

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-card border flex items-start gap-3 transform transition-all duration-300 animate-slide-up ${borderStyles[t.type]}`}
          >
            {icons[t.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-heading leading-tight">
                {t.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {t.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
              aria-label="Dismiss toast"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
