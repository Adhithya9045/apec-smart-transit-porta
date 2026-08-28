import React, { useState } from 'react';
import {
  Bus,
  Shield,
  MapPin,
  TrendingUp,
  CreditCard,
  ArrowRight,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Navigation,
  Radio,
  Award,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { BusTelemetry, TransitRoute, DriverProfile } from '../types/transit';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { buses, routes, drivers, setSelectedRouteId } = useTransit();
  const [searchTerm, setSearchTerm] = useState('');

  const activeBusesCount = buses.filter(
    (b: BusTelemetry) => b.status === 'On Time' || b.status === 'In Transit'
  ).length;

  const occupiedSeats = buses.reduce((acc: number, b: BusTelemetry) => acc + b.occupiedSeats, 0);

  const filteredBuses = buses.filter(
    (b: BusTelemetry) =>
      b.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrackBus = (routeId: string) => {
    setSelectedRouteId(routeId);
    onNavigate('live-tracking');
  };

  const featurePillars = [
    {
      icon: Award,
      title: 'APEC Accredited Infrastructure',
      description:
        'State-of-the-art campus mobility network serving thousands of students and faculty daily across Tamil Nadu feeder corridors.',
      color: 'bg-blue-600',
    },
    {
      icon: Shield,
      title: '24/7 AI-Powered ANPR Security',
      description:
        'Automated License Plate Recognition (ANPR) and synchronized gate telemetry ensuring complete campus transport safety.',
      color: 'bg-safety-orange',
    },
    {
      icon: Bus,
      title: 'Sub-Second GPS Fleet Tracking',
      description:
        'Real-time satellite positioning with predictive ETA calculation and instant stop arrival countdowns.',
      color: 'bg-emerald-600',
    },
    {
      icon: TrendingUp,
      title: 'Intelligent Route Optimization',
      description:
        'Data-driven scheduling that dynamically balances passenger loads, reduces carbon footprint, and prevents delays.',
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Showcase Section */}
      <div className="relative bg-gradient-to-br from-deep-navy via-slate-900 to-apec-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl border border-slate-800">
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-safety-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-apec-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-safety-orange mb-4 shadow-sm">
            <Radio size={13} className="animate-pulse" />
            <span>APEC Smart Campus Transit Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight mb-4">
            APEC Smart Transit Portal
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
            Smart, Secure and Connected Transportation for APEC Students, Faculty, and Staff.
            Live GPS telemetry, instant digital bus passes, and automated security.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
            <button
              onClick={() => onNavigate('live-tracking')}
              className="px-6 py-3.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-sm shadow-glow-orange flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              <MapPin size={18} />
              <span>Track Live Bus</span>
            </button>

            <button
              onClick={() => onNavigate('routes')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Navigation size={18} />
              <span>View Route Timetables</span>
            </button>

            <button
              onClick={() => onNavigate('fee-portal')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <CreditCard size={18} />
              <span>Student Pass & Fees</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live System Statistics KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Active Buses on Route
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-safety-orange flex items-center justify-center">
              <Bus size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono font-heading">
            {activeBusesCount}{' '}
            <span className="text-sm font-normal text-slate-500 font-sans">
              / {buses.length} Fleet
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
            <CheckCircle2 size={13} />
            <span>100% GPS Signal Sync</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Fleet On-Time Rate
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono font-heading">
            98.5%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Average deviation &lt; 3 mins
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Active Commuters Today
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono font-heading">
            2,847
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {occupiedSeats} Current In-Transit
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Security Gate Scans
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Shield size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono font-heading">
            142
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ANPR Cameras Active</span>
          </div>
        </div>
      </div>

      {/* Live Bus Fleet Status Table & Quick Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Live Fleet Status & Tracking
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Real-time telemetry and estimated arrival windows for all active buses
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search bus or plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-safety-orange"
            />
          </div>
        </div>

        {/* Responsive Table / Card View */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Bus & Plate</th>
                <th className="px-4 py-3.5">Assigned Route</th>
                <th className="px-4 py-3.5">Driver</th>
                <th className="px-4 py-3.5">Speed / Telemetry</th>
                <th className="px-4 py-3.5">Live Status</th>
                <th className="px-4 py-3.5">Occupancy</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBuses.map((bus: BusTelemetry) => {
                const route = routes.find((r: TransitRoute) => r.id === bus.assignedRouteId);
                const driver = drivers.find((d: DriverProfile) => d.id === bus.assignedDriverId);
                const currentStop = route?.stops[bus.currentStopIndex];

                return (
                  <tr
                    key={bus.busId}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">
                      <div className="font-heading font-bold text-sm">{bus.busNumber}</div>
                      <div className="font-mono text-[11px] text-safety-orange font-bold">
                        {bus.registrationNumber}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {route?.name || 'Assigned Route'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Approaching: {currentStop?.name || 'En Route'}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                      <div className="font-medium">{driver?.name || 'Assigned Driver'}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {driver?.phone || '+91 94432 00000'}
                      </div>
                    </td>

                    <td className="px-4 py-4 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {bus.currentSpeedKmH} km/h
                      </div>
                      <div className="text-[11px] text-emerald-500 font-semibold">
                        Battery: {bus.fuelBatteryPercent}%
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={bus.status} />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-safety-orange h-full rounded-full"
                            style={{
                              width: `${(bus.occupiedSeats / bus.capacity) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-slate-500">
                          {bus.occupiedSeats}/{bus.capacity}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleTrackBus(bus.assignedRouteId)}
                        className="px-3.5 py-1.5 rounded-xl bg-apec-50 hover:bg-apec-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-apec-600 dark:text-apec-400 font-semibold transition-all inline-flex items-center gap-1"
                      >
                        <span>Track</span>
                        <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Pillars Grid */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-wider font-bold text-safety-orange font-mono">
            Enterprise Campus Transport
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Intelligent Logistics Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Engineered to deliver punctual, transparent, and safe daily transportation for the entire academic community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featurePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 shadow-soft border border-slate-200/80 dark:border-slate-800 hover:shadow-card transition-all transform hover:-translate-y-1"
              >
                <div
                  className={`${pillar.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-md`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
