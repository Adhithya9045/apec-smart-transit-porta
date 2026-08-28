import React from 'react';
import { Route, Bus, User, ArrowRight } from 'lucide-react';
import { TransitRoute, BusTelemetry, DriverProfile } from '../../types/transit';
import { StatusBadge } from '../common/StatusBadge';

interface RouteCardProps {
  route: TransitRoute;
  bus?: BusTelemetry;
  driver?: DriverProfile;
  onViewDetails: () => void;
  onTrackLive: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  bus,
  driver,
  onViewDetails,
  onTrackLive,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-800 hover:shadow-card transition-all flex flex-col justify-between group">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-apec-100 dark:bg-slate-800 text-apec-700 dark:text-apec-300 font-mono text-xs font-bold">
                {route.routeNumber}
              </span>
              <StatusBadge status={route.status === 'Active' ? 'On Time' : 'Delayed'} size="sm" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-1.5 group-hover:text-apec-600 dark:group-hover:text-apec-400 transition-colors">
              {route.name}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Route size={20} />
          </div>
        </div>

        {/* Origin to Destination */}
        <div className="my-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-safety-orange shrink-0" />
            <span className="text-slate-500 dark:text-slate-400">Origin:</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate">
              {route.origin}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400">Terminus:</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate">
              {route.destination}
            </span>
          </div>
        </div>

        {/* Timings & Key Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <span className="text-[11px] text-slate-400 block">Morning Dep.</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">
              {route.morningDeparture}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <span className="text-[11px] text-slate-400 block">Evening Return</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">
              {route.eveningDeparture}
            </span>
          </div>
        </div>

        {/* Bus & Driver Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 mb-5">
          <div className="flex items-center gap-1.5">
            <Bus size={14} className="text-slate-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {bus?.registrationNumber || 'TN 48 AB 1234'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-slate-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {driver?.name || 'Assigned Driver'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onViewDetails}
          className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
        >
          View Stops ({route.stops.length})
        </button>
        <button
          onClick={onTrackLive}
          className="flex-1 px-3 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white text-xs font-semibold shadow-glow-orange flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
        >
          <span>Track Live</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
