import React from 'react';
import { Clock, MapPin, CheckCircle2, Navigation } from 'lucide-react';
import { RouteStop } from '../../types/transit';

interface RouteProgressStepperProps {
  stops: RouteStop[];
  currentStopIndex: number;
  onSelectStop: (index: number) => void;
  routeName: string;
}

export const RouteProgressStepper: React.FC<RouteProgressStepperProps> = ({
  stops,
  currentStopIndex,
  onSelectStop,
  routeName,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-safety-orange animate-pulse" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Live Stop Progression Timeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active tracking along {routeName}
          </p>
        </div>

        {/* Quick Stop Jump Buttons (Preserving and enhancing existing stop switcher) */}
        <div className="flex flex-wrap gap-1.5">
          {stops.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectStop(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentStopIndex === idx
                  ? 'bg-safety-orange text-white shadow-glow-orange'
                  : idx < currentStopIndex
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Stop {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {stops.map((stop, index) => {
          const isActive = index === currentStopIndex;
          const isPassed = index < currentStopIndex;

          return (
            <div key={stop.id} className="relative group">
              {/* Stepper Vertical Connector Line */}
              {index < stops.length - 1 && (
                <div
                  className={`absolute left-[-1.125rem] sm:left-[-1.375rem] top-7 w-0.5 h-[calc(100%+0.75rem)] transition-colors duration-500 ${
                    isPassed
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              )}

              {/* Stop Indicator Node */}
              <div
                onClick={() => onSelectStop(index)}
                className={`absolute left-[-1.5rem] sm:left-[-1.75rem] top-1.5 w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-safety-orange border-white ring-4 ring-orange-500/20 scale-125'
                    : isPassed
                    ? 'bg-emerald-500 border-white dark:border-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                }`}
              />

              {/* Stop Card */}
              <div
                onClick={() => onSelectStop(index)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-50/70 dark:bg-slate-800/90 border-safety-orange shadow-md ring-1 ring-safety-orange/30'
                    : isPassed
                    ? 'bg-slate-50/50 dark:bg-slate-850/50 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                        #{index + 1}
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-bold font-heading ${
                          isActive
                            ? 'text-safety-orange'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {stop.name}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock size={13} className="text-apec-600 dark:text-apec-400" />
                        <span>Pickup: <strong className="text-slate-700 dark:text-slate-200">{stop.morningTime}</strong></span>
                      </div>
                      <span>•</span>
                      <span>Return: {stop.eveningTime}</span>
                      {stop.landmark && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400 italic">{stop.landmark}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="self-start sm:self-center shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        isPassed
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : isActive
                          ? 'bg-safety-orange text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {isPassed ? (
                        <>
                          <CheckCircle2 size={13} />
                          <span>Departed</span>
                        </>
                      ) : isActive ? (
                        <>
                          <Navigation size={13} className="animate-spin" />
                          <span>Live Current Stop</span>
                        </>
                      ) : (
                        <>
                          <Clock size={13} />
                          <span>Upcoming</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Additional Active Stop Details */}
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-orange-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                      <MapPin size={14} className="text-safety-orange" />
                      <span>Estimated Arrival Window: <strong className="text-safety-orange">2 to 4 mins</strong></span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Distance to Gate: {stop.distanceFromCampusKm} KM
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
