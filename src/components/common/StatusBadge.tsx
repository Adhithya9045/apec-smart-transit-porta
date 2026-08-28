import React from 'react';
import { BusStatus, GateStatus } from '../../types/transit';

interface StatusBadgeProps {
  status: BusStatus | GateStatus | 'Active' | 'Paid' | 'Pending' | 'On Duty' | 'Available' | 'On Break' | 'Off Duty' | 'Service Due' | 'Good';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'On Time':
      case 'Authorized':
      case 'Active':
      case 'Paid':
      case 'On Duty':
      case 'Good':
        return {
          bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
          dot: 'bg-emerald-500 animate-pulse',
        };
      case 'Delayed':
      case 'Pending':
      case 'Available':
      case 'Service Due':
        return {
          bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'In Transit':
        return {
          bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
          dot: 'bg-blue-500 animate-pulse',
        };
      case 'Unknown':
      case 'Flagged':
      case 'Offline':
      case 'Maintenance':
      case 'Off Duty':
      default:
        return {
          bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
          dot: 'bg-rose-500',
        };
    }
  };

  const style = getStyle();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${style.bg} ${sizeClasses} shadow-sm`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <span>{status}</span>
    </span>
  );
};
