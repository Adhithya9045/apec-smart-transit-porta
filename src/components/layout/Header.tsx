import React, { useState, useEffect } from 'react';
import {
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  GraduationCap,
  Clock,
  Radio,
  Menu,
} from 'lucide-react';
import { useTransit } from '../../context/TransitContext';
import { useTheme } from '../../context/ThemeContext';
import { AlertFeedModal } from '../alerts/AlertFeedModal';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onNavigate }) => {
  const { userRole, setUserRole, alerts, showToast } = useTransit();
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  const handleRoleToggle = (role: 'student' | 'admin') => {
    setUserRole(role);
    showToast(
      'Role Switched',
      role === 'admin'
        ? 'Switched to Transport Administration & Security Control Mode.'
        : 'Switched to Student Commuter & Fee Portal Mode.',
      'info'
    );
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Left: Mobile menu toggle + Live Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>GPS Satellite Fleet Online</span>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-lg">
            <Clock size={13} className="text-apec-600 dark:text-apec-400" />
            <span>{currentTime || '08:00:00 AM'}</span>
          </div>
        </div>

        {/* Center: Live Alert Ticker / Headline */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
          <div
            onClick={() => setIsAlertsOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs cursor-pointer border border-slate-200/80 dark:border-slate-700/80 transition-all truncate"
          >
            <Radio size={14} className="text-safety-orange shrink-0 animate-pulse" />
            <span className="font-semibold text-slate-900 dark:text-white shrink-0 font-heading">
              Notice:
            </span>
            <span className="truncate text-slate-600 dark:text-slate-300">
              {alerts[0]?.title || 'All campus bus routes operating on regular schedule.'}
            </span>
          </div>
        </div>

        {/* Right: Role Switcher + Alerts + Theme + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher Pill */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => handleRoleToggle('student')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                userRole === 'student'
                  ? 'bg-white dark:bg-slate-900 text-apec-600 dark:text-apec-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={15} />
              <span className="hidden sm:inline">Student</span>
            </button>
            <button
              onClick={() => handleRoleToggle('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                userRole === 'admin'
                  ? 'bg-safety-orange text-white shadow-glow-orange'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck size={15} />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>

          {/* Alerts Notification Button */}
          <button
            onClick={() => setIsAlertsOpen(true)}
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-safety-orange text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadAlerts}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          </button>

          {/* Profile Shortcut */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-apec-700 to-apec-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              {userRole === 'admin' ? 'AP' : 'RK'}
            </div>
            <div className="hidden lg:block text-left text-xs leading-none pr-1">
              <p className="font-semibold text-slate-900 dark:text-white">
                {userRole === 'admin' ? 'Transport Office' : 'Rajesh Kumar'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {userRole === 'admin' ? 'Admin / Security' : 'CSE 3rd Year'}
              </p>
            </div>
          </button>
        </div>
      </div>

      <AlertFeedModal isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
    </header>
  );
};
