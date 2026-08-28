import React from 'react';
import {
  Home,
  MapPin,
  CreditCard,
  Shield,
  Bus,
  Users,
  Route,
  Bell,
  User,
} from 'lucide-react';
import { useTransit } from '../../context/TransitContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { userRole, alerts } = useTransit();
  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: Home },
    { id: 'live-tracking', label: 'Live Bus Tracking', icon: MapPin, badge: 'Live' },
    { id: 'routes', label: 'Routes & Timetables', icon: Route },
    { id: 'fee-portal', label: 'Bus Pass & Fee Portal', icon: CreditCard },
    { id: 'alerts', label: 'Transit Bulletins', icon: Bell, count: unreadAlerts },
    { id: 'profile', label: 'Student Profile', icon: User },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Command Overview', icon: Home },
    { id: 'live-tracking', label: 'Fleet Telemetry Map', icon: MapPin, badge: 'Live' },
    { id: 'routes', label: 'Route Directory', icon: Route },
    { id: 'fleet-management', label: 'Bus Fleet Control', icon: Bus },
    { id: 'driver-management', label: 'Driver Directory', icon: Users },
    { id: 'admin-ledger', label: 'ANPR Security Ledger', icon: Shield },
    { id: 'fee-portal', label: 'Student Fee Registry', icon: CreditCard },
    { id: 'alerts', label: 'Broadcast Alerts', icon: Bell, count: unreadAlerts },
    { id: 'profile', label: 'Admin Settings', icon: User },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : studentNavItems;

  const handleNavClick = (id: string) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-deep-navy text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 shadow-2xl lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Institutional Branding */}
        <div className="p-6 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-safety-orange to-amber-600 flex items-center justify-center text-white shadow-glow-orange shrink-0">
              <Bus size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-lg tracking-tight text-white leading-none">
                  APEC
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-safety-orange/20 text-safety-orange border border-safety-orange/30">
                  Campus
                </span>
              </div>
              <p className="text-xs font-medium text-slate-300 mt-1 truncate">
                Smart Transit Portal
              </p>
            </div>
          </div>
        </div>

        {/* Role Indicator Banner */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Active Mode
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              userRole === 'admin'
                ? 'bg-safety-orange/20 text-safety-orange border border-safety-orange/40'
                : 'bg-apec-500/20 text-apec-300 border border-apec-500/40'
            }`}
          >
            {userRole === 'admin' ? 'Transport Admin' : 'Student Portal'}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-safety-orange text-white font-semibold shadow-glow-orange'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={19}
                    className={`${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-white transition-colors'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-safety-orange text-white">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Emergency Transport Hotline */}
        <div className="p-4 m-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-2 text-safety-orange font-bold font-heading">
            <span className="w-2 h-2 rounded-full bg-safety-orange animate-ping" />
            <span>Transit Control Room</span>
          </div>
          <p className="text-slate-300 text-[11px] mt-1">
            Helpline: <span className="font-mono text-white font-semibold">+91 94432 00000</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2">
            <span>Gate 01 • Main Portal</span>
            <span className="text-emerald-400 font-semibold">24/7 Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};
