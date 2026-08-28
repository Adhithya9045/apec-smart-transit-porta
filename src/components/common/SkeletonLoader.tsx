import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
    </div>
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-2" />
    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-4" />
    <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-full" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden animate-pulse">
    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex gap-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
    </div>
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex gap-4 items-center">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
        </div>
      ))}
    </div>
  </div>
);
