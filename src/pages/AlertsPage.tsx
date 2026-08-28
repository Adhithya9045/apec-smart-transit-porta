import React, { useState } from 'react';
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  Plus,
  Send,
  Radio,
  Clock,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { TransitAlert, TransitRoute } from '../types/transit';
import { Modal } from '../components/common/Modal';

export const AlertsPage: React.FC = () => {
  const { alerts, userRole, addTransitAlert, markAlertRead, routes } = useTransit();
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  // Broadcast form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<TransitAlert['severity']>('info');
  const [routeId, setRouteId] = useState('All');

  const filteredAlerts = alerts.filter((alert: TransitAlert) => {
    return filterSeverity === 'All' || alert.severity === filterSeverity;
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    addTransitAlert({
      title,
      message,
      severity,
      routeId: routeId === 'All' ? undefined : routeId,
    });
    setTitle('');
    setMessage('');
    setIsBroadcastModalOpen(false);
  };

  const getIcon = (sev: string) => {
    switch (sev) {
      case 'warning':
        return <AlertTriangle className="text-amber-500 shrink-0" size={20} />;
      case 'critical':
        return <AlertTriangle className="text-rose-500 shrink-0" size={20} />;
      case 'success':
        return <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />;
      default:
        return <Info className="text-blue-500 shrink-0" size={20} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            <Radio size={14} className="animate-pulse" />
            <span>Campus Broadcast Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Transit Advisories & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Emergency route diversions, weather updates, exam transport schedules, and gate bulletins
          </p>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Broadcast New Advisory</span>
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'info', 'warning', 'critical', 'success'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filterSeverity === sev
                  ? 'bg-safety-orange text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards Feed */}
      <div className="space-y-4">
        {filteredAlerts.map((alert: TransitAlert) => (
          <div
            key={alert.id}
            className={`p-5 sm:p-6 rounded-3xl border transition-all ${
              alert.isRead
                ? 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 shadow-soft'
                : 'bg-white dark:bg-slate-900 border-safety-orange/50 dark:border-safety-orange/50 shadow-card ring-1 ring-safety-orange/20'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70">
                  {getIcon(alert.severity)}
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                      {alert.title}
                    </h3>
                    {!alert.isRead && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-safety-orange text-white">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {alert.message}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>{alert.timestamp}</span>
                    </div>
                    {alert.routeId && (
                      <>
                        <span>•</span>
                        <span className="font-mono font-bold text-safety-orange">
                          Target: {alert.routeId}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!alert.isRead && (
                <button
                  onClick={() => markAlertRead(alert.id)}
                  className="shrink-0 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Acknowledge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      <Modal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        title="Broadcast Emergency / Transit Advisory"
        subtitle="Transmit instant push notification to all student and faculty dashboards"
        maxWidth="md"
      >
        <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Advisory Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Heavy Rain Warning on Route 02"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Broadcast Message Content
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detail arrival delays, alternate pickup points, or schedule alterations..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="info">Information (Blue)</option>
                <option value="warning">Warning / Delay (Amber)</option>
                <option value="critical">Critical / Emergency (Red)</option>
                <option value="success">Normal Status / Notice (Green)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Route
              </label>
              <select
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="All">All Campus Routes</option>
                {routes.map((r: TransitRoute) => (
                  <option key={r.id} value={r.id}>
                    {r.routeNumber}: {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsBroadcastModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white font-bold shadow-glow-orange flex items-center gap-1.5"
            >
              <Send size={14} />
              <span>Send Broadcast</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
