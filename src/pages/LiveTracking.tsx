import { useState } from 'react';
import { Bus, MapPin, Clock } from 'lucide-react';

export default function LiveTracking() {
  const [busPosition, setBusPosition] = useState(1);

  const stops = [
    { id: 0, name: 'Kutralam', time: '06:00 AM', status: 'completed' },
    { id: 1, name: 'Aduturai', time: '06:45 AM', status: 'current' },
    { id: 2, name: 'Kumbakonam', time: '07:15 AM', status: 'upcoming' },
    { id: 3, name: 'Papanasam (College Gate)', time: '08:00 AM', status: 'upcoming' },
  ];

  const routes = [
    { name: 'Route 1: Kutralam Express', id: 'R1' },
    { name: 'Route 2: Thanjavur Direct', id: 'R2' },
    { name: 'Route 3: Trichy Connector', id: 'R3' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Live Bus Tracking</h1>
        <p className="text-gray-600 dark:text-gray-300">Real-time location and journey progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Route Progress</h2>
              <p className="text-gray-600 dark:text-gray-400">Route 1: Kutralam Express</p>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setBusPosition(pos)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    busPosition === pos
                      ? 'bg-safety-orange text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Stop {pos + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="relative pl-12">
            {stops.map((stop, index) => {
              const isActive = index === busPosition;
              const isPassed = index < busPosition;

              return (
                <div key={stop.id} className="relative pb-12 last:pb-0">
                  <div
                    className={`absolute left-0 top-0 w-4 h-4 rounded-full border-4 transition-all ${
                      isActive
                        ? 'bg-safety-orange border-safety-orange scale-125'
                        : isPassed
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                    }`}
                    style={{ left: '-1.5rem' }}
                  ></div>

                  {index < stops.length - 1 && (
                    <div
                      className={`absolute left-0 top-4 w-1 transition-all ${
                        isPassed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      style={{ left: '-0.938rem', height: 'calc(100% + 0.5rem)' }}
                    ></div>
                  )}

                  {isActive && (
                    <div
                      className="absolute animate-pulse-slow"
                      style={{ left: '-2.25rem', top: '-0.5rem' }}
                    >
                      <Bus size={32} className="text-red-600 fill-current" />
                    </div>
                  )}

                  <div
                    className={`ml-4 p-4 rounded-lg transition-all ${
                      isActive
                        ? 'bg-safety-orange/10 dark:bg-safety-orange/20 border-2 border-safety-orange'
                        : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`font-bold text-lg ${
                            isActive
                              ? 'text-safety-orange'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {stop.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <Clock size={14} />
                          <span>{stop.time}</span>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isPassed
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : isActive
                              ? 'bg-safety-orange text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {isPassed ? 'Completed' : isActive ? 'Current' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-safety-orange" />
                          <span className="font-medium">ETA: 5 minutes</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Bus Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Vehicle Number</span>
                <span className="font-semibold text-gray-900 dark:text-white">TN 48 AB 1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Driver</span>
                <span className="font-semibold text-gray-900 dark:text-white">Rajesh Kumar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                <span className="font-semibold text-gray-900 dark:text-white">45/52 seats</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Speed</span>
                <span className="font-semibold text-gray-900 dark:text-white">48 km/h</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Available Routes</h3>
            <div className="space-y-2">
              {routes.map((route) => (
                <button
                  key={route.id}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border border-gray-200 dark:border-gray-600"
                >
                  <div className="font-semibold text-gray-900 dark:text-white">{route.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {route.id}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
