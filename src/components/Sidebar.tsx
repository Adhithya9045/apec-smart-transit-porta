import { Home, MapPin, CreditCard, Shield, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: Home },
    { id: 'live-tracking', label: 'Live Tracking', icon: MapPin },
    { id: 'fee-portal', label: 'Student Fee Portal', icon: CreditCard },
    { id: 'admin-ledger', label: 'Admin Security Ledger', icon: Shield },
  ];

  return (
    <div className="w-64 h-screen bg-deep-navy dark:bg-gray-900 text-white flex flex-col fixed left-0 top-0 shadow-xl">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold mb-1">PSNA College</h1>
        <p className="text-sm text-gray-300 dark:text-gray-400">Smart Transit Portal</p>
      </div>

      <nav className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                isActive
                  ? 'bg-safety-orange text-white border-r-4 border-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          <span className="font-medium">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
      </div>
    </div>
  );
}
