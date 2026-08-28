import React from 'react';
import {
  Gauge,
  BatteryCharging,
  Phone,
  Wind,
  Video,
  Radio,
} from 'lucide-react';
import { BusTelemetry, DriverProfile, TransitRoute } from '../../types/transit';
import { StatusBadge } from '../common/StatusBadge';

interface BusTelemetryCardProps {
  bus: BusTelemetry;
  driver?: DriverProfile;
  routes: TransitRoute[];
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
}

export const BusTelemetryCard: React.FC<BusTelemetryCardProps> = ({
  bus,
  driver,
  routes,
  selectedRouteId,
  onSelectRoute,
}) => {
  const occupancyPercent = Math.round((bus.occupiedSeats / bus.capacity) * 100);

  return (
    <div className="space-y-6">
      {/* Bus Profile & Live Telemetry */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Vehicle Telemetry
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">
              {bus.busNumber}
            </h3>
            <p className="text-xs font-mono font-bold text-safety-orange mt-0.5">
              {bus.registrationNumber}
            </p>
          </div>
          <StatusBadge status={bus.status} />
        </div>

        {/* Live Gauges Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Speed */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Gauge size={14} className="text-apec-600 dark:text-apec-400" />
              <span>Current Speed</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
              {bus.currentSpeedKmH}{' '}
              <span className="text-xs font-normal text-slate-500">km/h</span>
            </div>
          </div>

          {/* Fuel / Battery */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <BatteryCharging size={14} className="text-emerald-500" />
              <span>Fuel / Power</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
              {bus.fuelBatteryPercent}%
            </div>
          </div>
        </div>

        {/* Seat Occupancy Meter */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Passenger Capacity
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {bus.occupiedSeats} / {bus.capacity} Seats ({occupancyPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                occupancyPercent > 85
                  ? 'bg-rose-500'
                  : occupancyPercent > 60
                  ? 'bg-safety-orange'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${occupancyPercent}%` }}
            />
          </div>
        </div>

        {/* Active Smart Features / Safety Checks */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <Wind size={15} className={bus.acStatus ? 'text-blue-500' : 'text-slate-400'} />
            <span>{bus.acStatus ? 'AC Active' : 'Non-AC'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <Video size={15} className="text-emerald-500" />
            <span>AI CCTV</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <Radio size={15} className="text-safety-orange animate-pulse" />
            <span>GPS Ping</span>
          </div>
        </div>
      </div>

      {/* Driver Information Card */}
      {driver && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-soft border border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="flex items-center gap-3">
            <img
              src={driver.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
              alt={driver.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate font-heading">
                  {driver.name}
                </h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                  ★ {driver.safetyRating}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                ID: {driver.driverId} • {driver.experienceYears}y Exp
              </p>
            </div>
            <a
              href={`tel:${driver.phone}`}
              className="p-2.5 rounded-xl bg-apec-50 hover:bg-apec-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-apec-600 dark:text-apec-400 transition-colors"
              title="Call Driver"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>
      )}

      {/* Route Switcher Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-soft border border-slate-200/80 dark:border-slate-800 transition-colors">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-3">
          Available Campus Routes
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {routes.map((route) => {
            const isSelected = selectedRouteId === route.id;
            return (
              <button
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-apec-50 dark:bg-slate-800 border-apec-500/50 dark:border-apec-500 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {route.name}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {route.routeNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>{route.stops.length} Stops • {route.totalDistanceKm} km</span>
                  <span className="text-apec-600 dark:text-apec-400 font-semibold">{route.morningDeparture}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
