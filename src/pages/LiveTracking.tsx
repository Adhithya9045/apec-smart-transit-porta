import React from 'react';
import { Radio, RotateCcw } from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { LiveMapCanvas } from '../components/tracking/LiveMapCanvas';
import { RouteProgressStepper } from '../components/tracking/RouteProgressStepper';
import { BusTelemetryCard } from '../components/tracking/BusTelemetryCard';
import { BusTelemetry, DriverProfile, TransitRoute } from '../types/transit';

export const LiveTracking: React.FC = () => {
  const {
    routes,
    buses,
    drivers,
    selectedRouteId,
    setSelectedRouteId,
    updateBusPosition,
    showToast,
  } = useTransit();

  const activeRoute = routes.find((r: TransitRoute) => r.id === selectedRouteId) || routes[0];
  const activeBus =
    buses.find((b: BusTelemetry) => b.assignedRouteId === activeRoute.id) ||
    buses.find((b: BusTelemetry) => b.busId === activeRoute.assignedBusId) ||
    buses[0];
  const activeDriver =
    drivers.find((d: DriverProfile) => d.id === activeBus?.assignedDriverId) || drivers[0];

  const currentStopIndex = activeBus?.currentStopIndex ?? 1;

  const handleSelectStop = (index: number) => {
    if (activeBus) {
      updateBusPosition(activeBus.busId, index);
      const stop = activeRoute.stops[index];
      showToast(
        'Bus GPS Updated',
        `${activeBus.busNumber} now positioned at stop ${index + 1}: ${stop?.name}`,
        'info'
      );
    }
  };

  const handleSimulateNextStop = () => {
    if (activeBus) {
      const nextIndex = (currentStopIndex + 1) % activeRoute.stops.length;
      handleSelectStop(nextIndex);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-safety-orange uppercase tracking-wider font-mono">
            <Radio size={14} className="animate-pulse" />
            <span>Sub-Second Telemetry Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Live Fleet GPS Tracking Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time geospatial vehicle coordinates, route path progression, and stop arrival countdowns
          </p>
        </div>

        {/* Route Quick Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {routes.map((r: TransitRoute) => (
            <button
              key={r.id}
              onClick={() => setSelectedRouteId(r.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRouteId === r.id
                  ? 'bg-safety-orange text-white shadow-glow-orange'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {r.routeNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Progress Stepper + Telemetry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Map & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Vector Map Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-heading">
                Interactive Road Network & Telemetry
              </span>
              <button
                onClick={handleSimulateNextStop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-apec-50 hover:bg-apec-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-apec-600 dark:text-apec-400 text-xs font-semibold transition-colors"
              >
                <RotateCcw size={13} />
                <span>Simulate GPS Move</span>
              </button>
            </div>

            <LiveMapCanvas
              route={activeRoute}
              activeBus={activeBus}
              currentStopIndex={currentStopIndex}
              onSelectStop={handleSelectStop}
            />
          </div>

          {/* Detailed Progression Timeline */}
          <RouteProgressStepper
            stops={activeRoute.stops}
            currentStopIndex={currentStopIndex}
            onSelectStop={handleSelectStop}
            routeName={activeRoute.name}
          />
        </div>

        {/* Right 1 Column: Bus Specs, Driver, Route Switcher */}
        <div className="lg:col-span-1">
          <BusTelemetryCard
            bus={activeBus}
            driver={activeDriver}
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
          />
        </div>
      </div>
    </div>
  );
};
