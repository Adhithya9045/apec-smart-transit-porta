import React, { useState } from 'react';
import { Route as RouteIcon, Search, Clock } from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { TransitRoute, BusTelemetry, DriverProfile, RouteStop } from '../types/transit';
import { RouteCard } from '../components/routes/RouteCard';
import { RouteDetailModal } from '../components/routes/RouteDetailModal';
import { EmptyState } from '../components/common/EmptyState';

interface RoutesPageProps {
  onNavigate: (page: string) => void;
}

export const RoutesPage: React.FC<RoutesPageProps> = ({ onNavigate }) => {
  const { routes, buses, drivers, setSelectedRouteId } = useTransit();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedModalRoute, setSelectedModalRoute] = useState<TransitRoute | null>(null);

  const filteredRoutes = routes.filter((route: TransitRoute) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.stops.some((s: RouteStop) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'All' || route.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleTrackLive = (routeId: string) => {
    setSelectedRouteId(routeId);
    onNavigate('live-tracking');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            Campus Transit Network
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Routes, Schedules & Timetables
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive itinerary of all morning pickups, evening departures, and intermediate boarding stops
          </p>
        </div>

        {/* Quick Shift Timing Indicators */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Clock size={14} className="text-emerald-500" />
            <span>Morning: 06:00 AM – 08:15 AM</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Clock size={14} className="text-safety-orange" />
            <span>Evening: 04:30 PM – 06:30 PM</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by route name, number, origin, or stop location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-white shadow-soft focus:outline-none focus:ring-2 focus:ring-safety-orange"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-soft focus:outline-none focus:ring-2 focus:ring-safety-orange"
        >
          <option value="All">All Operational Statuses</option>
          <option value="Active">Active (On Schedule)</option>
          <option value="Delayed">Delayed / Rerouted</option>
        </select>
      </div>

      {/* Routes Grid */}
      {filteredRoutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route: TransitRoute) => {
            const bus =
              buses.find((b: BusTelemetry) => b.assignedRouteId === route.id) ||
              buses.find((b: BusTelemetry) => b.busId === route.assignedBusId);
            const driver = drivers.find((d: DriverProfile) => d.id === bus?.assignedDriverId);

            return (
              <RouteCard
                key={route.id}
                route={route}
                bus={bus}
                driver={driver}
                onViewDetails={() => setSelectedModalRoute(route)}
                onTrackLive={() => handleTrackLive(route.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <EmptyState
            icon={RouteIcon}
            title="No Routes Found"
            description="No campus transit routes match your search filters. Try clearing keywords or viewing all routes."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchTerm('');
              setFilterStatus('All');
            }}
          />
        </div>
      )}

      {/* Route Detail Modal */}
      {selectedModalRoute && (
        <RouteDetailModal
          isOpen={!!selectedModalRoute}
          onClose={() => setSelectedModalRoute(null)}
          route={selectedModalRoute}
          bus={buses.find((b: BusTelemetry) => b.assignedRouteId === selectedModalRoute.id)}
          driver={drivers.find(
            (d: DriverProfile) =>
              d.id ===
              buses.find((b: BusTelemetry) => b.assignedRouteId === selectedModalRoute.id)?.assignedDriverId
          )}
          onTrackRoute={() => handleTrackLive(selectedModalRoute.id)}
        />
      )}
    </div>
  );
};
