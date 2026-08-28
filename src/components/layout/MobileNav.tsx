import React from 'react';
import { Home, MapPin, Route, CreditCard, Shield } from 'lucide-react';
import { useTransit } from '../../context/TransitContext';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const { userRole } = useTransit();

  const items =
    userRole === 'admin'
      ? [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'live-tracking', label: 'Tracking', icon: MapPin },
          { id: 'fleet-management', label: 'Fleet', icon: Route },
          { id: 'admin-ledger', label: 'Security', icon: Shield },
          { id: 'fee-portal', label: 'Fees', icon: CreditCard },
        ]
      : [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'live-tracking', label: 'Track Bus', icon: MapPin },
          { id: 'routes', label: 'Routes', icon: Route },
          { id: 'fee-portal', label: 'Bus Pass', icon: CreditCard },
        ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-2xl safe-area-pb">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-safety-orange font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
