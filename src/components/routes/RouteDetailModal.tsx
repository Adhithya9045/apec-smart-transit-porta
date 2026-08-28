import React from 'react';
import { Bus, User, Navigation, Printer } from 'lucide-react';
import { TransitRoute, BusTelemetry, DriverProfile } from '../../types/transit';
import { Modal } from '../common/Modal';

interface RouteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: TransitRoute | null;
  bus?: BusTelemetry;
  driver?: DriverProfile;
  onTrackRoute?: () => void;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({
  isOpen,
  onClose,
  route,
  bus,
  driver,
  onTrackRoute,
}) => {
  if (!route) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${route.routeNumber}: ${route.name}`}
      subtitle={`Complete Stop Itinerary & Timings • Total Distance: ${route.totalDistanceKm} KM`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Vehicle & Driver Summary Header */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Assigned Fleet</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white font-mono mt-0.5">
              <Bus size={14} className="text-safety-orange" />
              <span>{bus?.registrationNumber || 'TN 48 AB 1234'}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Assigned Driver</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mt-0.5">
              <User size={14} className="text-apec-600 dark:text-apec-400" />
              <span>{driver?.name || 'Assigned Driver'}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Daily Schedule</span>
            <div className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">
              {route.morningDeparture} / {route.eveningDeparture}
            </div>
          </div>
        </div>

        {/* Detailed Stop Progression Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Boarding / Drop Point</th>
                <th className="px-4 py-3">Morning Pickup</th>
                <th className="px-4 py-3">Evening Drop</th>
                <th className="px-4 py-3">Distance</th>
                <th className="px-4 py-3">Key Landmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {route.stops.map((stop, i) => (
                <tr
                  key={stop.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-slate-400">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                    {stop.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {stop.morningTime}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                    {stop.eveningTime}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500">
                    {stop.distanceFromCampusKm} km
                  </td>
                  <td className="px-4 py-3 text-slate-500 italic">
                    {stop.landmark || 'Main Road'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <Printer size={15} />
            <span>Print Timetable</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            {onTrackRoute && (
              <button
                onClick={() => {
                  onTrackRoute();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white text-xs font-semibold shadow-glow-orange transition-all"
              >
                <Navigation size={15} />
                <span>Track Bus on Map</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
