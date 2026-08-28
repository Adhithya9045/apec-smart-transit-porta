import React from 'react';
import { AlertTriangle, Info, CheckCircle2, Bell, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useTransit } from '../../context/TransitContext';

interface AlertFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertFeedModal: React.FC<AlertFeedModalProps> = ({ isOpen, onClose }) => {
  const { alerts, markAlertRead } = useTransit();

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="text-amber-500 shrink-0" size={18} />;
      case 'critical':
        return <AlertTriangle className="text-rose-500 shrink-0" size={18} />;
      case 'success':
        return <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />;
      default:
        return <Info className="text-blue-500 shrink-0" size={18} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="APEC Transit Advisories & Bulletins"
      subtitle="Official campus transportation broadcasts and real-time route notices"
      maxWidth="lg"
    >
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Bell className="mx-auto mb-2 opacity-50" size={28} />
            <p className="text-sm">You are all caught up! No active transit advisories.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                alert.isRead
                  ? 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  : 'bg-blue-50/50 dark:bg-slate-800/80 border-blue-200 dark:border-blue-900/60 text-slate-900 dark:text-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(alert.severity)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                        {alert.title}
                      </h4>
                      {!alert.isRead && (
                        <span className="w-2 h-2 rounded-full bg-apec-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      <span>{alert.timestamp}</span>
                      {alert.routeId && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-apec-600 dark:text-apec-400">
                            {alert.routeId}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {!alert.isRead && (
                  <button
                    onClick={() => markAlertRead(alert.id)}
                    className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};
