import React from 'react';
import { Bus, Shield, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Institutional Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-safety-orange text-white flex items-center justify-center font-bold">
                <Bus size={18} />
              </div>
              <span className="font-heading font-bold text-white text-base">
                APEC Smart Transit
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Intelligent GPS-enabled campus fleet management, digital boarding pass validation, and 24/7 ANPR security infrastructure.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart Transit System Active</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white font-heading text-sm mb-3">
              Commuter Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('live-tracking')}
                  className="hover:text-white transition-colors"
                >
                  Live Bus Tracking Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routes')}
                  className="hover:text-white transition-colors"
                >
                  Route Timetables & Schedules
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fee-portal')}
                  className="hover:text-white transition-colors"
                >
                  Digital Bus Pass & Fee Lookup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alerts')}
                  className="hover:text-white transition-colors"
                >
                  Emergency Bulletins
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Administration & Security */}
          <div>
            <h4 className="font-bold text-white font-heading text-sm mb-3">
              Transit Administration
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('fleet-management')}
                  className="hover:text-white transition-colors"
                >
                  Fleet Maintenance Telemetry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('driver-management')}
                  className="hover:text-white transition-colors"
                >
                  Driver Directory & Shifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-ledger')}
                  className="hover:text-white transition-colors"
                >
                  ANPR Security Gate Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-white transition-colors"
                >
                  System Configuration
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Control Room */}
          <div className="space-y-2">
            <h4 className="font-bold text-white font-heading text-sm mb-3">
              Campus Transport Desk
            </h4>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin size={15} className="text-safety-orange shrink-0 mt-0.5" />
              <span>APEC Main Campus, Transport Complex, North Gate</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone size={15} className="text-safety-orange shrink-0" />
              <span className="font-mono font-semibold">+91 94432 00000 / 04364-22222</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Shield size={15} className="text-emerald-400 shrink-0" />
              <span>24/7 Security Gate Radio Sync</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} APEC Smart Transit Portal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for Campus Mobility & Safety
          </p>
        </div>
      </div>
    </footer>
  );
};
