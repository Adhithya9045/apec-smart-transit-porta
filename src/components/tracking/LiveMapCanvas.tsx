import React from 'react';
import { Bus, Navigation, Compass, Layers } from 'lucide-react';
import { TransitRoute, BusTelemetry } from '../../types/transit';

interface LiveMapCanvasProps {
  route: TransitRoute;
  activeBus?: BusTelemetry;
  currentStopIndex: number;
  onSelectStop: (stopIndex: number) => void;
}

export const LiveMapCanvas: React.FC<LiveMapCanvasProps> = ({
  route,
  activeBus,
  currentStopIndex,
  onSelectStop,
}) => {
  const stops = route.stops;

  // Build SVG path curve connecting stops
  const pathD = stops
    .map((stop, i) => {
      const x = stop.coordinates?.x ?? (i * 25 + 10);
      const y = stop.coordinates?.y ?? (50 + (i % 2 === 0 ? -15 : 15));
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Current bus coordinates
  const currentStop = stops[currentStopIndex] || stops[0];
  const busX = currentStop.coordinates?.x ?? 35;
  const busY = currentStop.coordinates?.y ?? 50;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl select-none">
      {/* Map Grid Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Map HUD Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-lg flex items-center gap-2.5 text-xs text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold font-heading text-slate-200">
            {route.routeNumber}: {route.name}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-400 font-mono font-semibold">GPS Active</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs text-slate-300 font-mono flex items-center gap-1.5 shadow-lg">
            <Compass size={14} className="text-safety-orange" />
            <span>N 10°57' • E 79°23'</span>
          </div>
          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/80 text-xs text-slate-300 shadow-lg flex items-center gap-1">
            <Layers size={14} className="text-apec-400" />
            <span className="hidden sm:inline">APEC Fleet Grid</span>
          </div>
        </div>
      </div>

      {/* Interactive Vector Map SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full absolute inset-0 cursor-crosshair"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Arterial Road Network */}
        <path
          d="M 5 20 Q 40 40 95 30"
          fill="none"
          stroke="#1e293b"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <path
          d="M 10 90 Q 50 60 90 80"
          fill="none"
          stroke="#1e293b"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <path
          d="M 20 10 L 80 90"
          fill="none"
          stroke="#1e293b"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Outer Glow Route Trail */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          filter="url(#glow)"
        />

        {/* Main Route Transit Line */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stop Points */}
        {stops.map((stop, i) => {
          const x = stop.coordinates?.x ?? (i * 25 + 10);
          const y = stop.coordinates?.y ?? (50 + (i % 2 === 0 ? -15 : 15));
          const isSelected = i === currentStopIndex;
          const isPassed = i < currentStopIndex;

          return (
            <g
              key={stop.id}
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectStop(i)}
            >
              {/* Outer Pulse for Current Stop */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#f97316"
                  opacity="0.25"
                  className="animate-ping"
                />
              )}
              {/* Stop Node Circle */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? "3.2" : "2.2"}
                fill={isSelected ? '#f97316' : isPassed ? '#10b981' : '#334155'}
                stroke="#ffffff"
                strokeWidth="0.8"
              />
              {/* Stop Label */}
              <text
                x={x}
                y={y > 50 ? y + 6.5 : y - 5}
                fill={isSelected ? '#f97316' : '#cbd5e1'}
                fontSize="3.2"
                fontWeight={isSelected ? 'bold' : 'normal'}
                textAnchor="middle"
                className="select-none font-sans"
              >
                {stop.name.split(' ')[0]}
              </text>
            </g>
          );
        })}

        {/* Real-time Bus GPS Marker */}
        <g
          transform={`translate(${busX}, ${busY})`}
          className="transition-all duration-700 ease-in-out cursor-pointer"
        >
          {/* Radar Ring */}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke="#f97316"
            strokeWidth="0.6"
            opacity="0.4"
            className="animate-ping"
          />
          {/* Background Badge */}
          <circle cx="0" cy="0" r="4.2" fill="#ea580c" stroke="#ffffff" strokeWidth="1" />
        </g>
      </svg>

      {/* Floating Animated Bus Icon on Canvas */}
      <div
        className="absolute transition-all duration-700 ease-in-out transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${busX}%`, top: `${busY}%` }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-safety-orange text-white flex items-center justify-center shadow-glow-orange border-2 border-white animate-pulse-slow">
            <Bus size={18} />
          </div>
          {/* Bus Popover Tooltip */}
          <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 shadow-xl text-[10px] text-white whitespace-nowrap flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{activeBus?.registrationNumber || 'TN 48 AB 1234'}</span>
            <span className="text-safety-orange">({activeBus?.currentSpeedKmH || 48} km/h)</span>
          </div>
        </div>
      </div>

      {/* Bottom Destination HUD Card */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 text-white text-xs shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Navigation size={18} />
          </div>
          <div>
            <div className="font-semibold text-slate-200">
              Approaching: <span className="text-safety-orange font-bold font-heading">{currentStop.name}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Landmark: {currentStop.landmark || 'En Route'} • ETA:{' '}
              <span className="text-emerald-400 font-semibold">{currentStop.etaMinutes || 4} mins</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 font-mono text-[11px]">
            {route.totalDistanceKm} KM TOTAL
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-safety-orange text-white font-bold text-[11px] shadow-sm">
            {activeBus?.occupiedSeats || 45}/{activeBus?.capacity || 52} SEATS
          </span>
        </div>
      </div>
    </div>
  );
};
