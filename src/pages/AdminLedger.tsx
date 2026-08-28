import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Camera,
  Download,
  Shield,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { GateLedgerEntry } from '../types/transit';
import { GateScannerModal } from '../components/admin/GateScannerModal';
import { EmptyState } from '../components/common/EmptyState';

export const AdminLedger: React.FC = () => {
  const { gateLedger, addGateEntry, showToast } = useTransit();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Authorized' | 'Unknown'>('All');
  const [filterDirection, setFilterDirection] = useState<'All' | 'Entry' | 'Exit'>('All');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const filteredData = gateLedger.filter((entry: GateLedgerEntry) => {
    const matchesSearch =
      entry.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.driver?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.gateNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || entry.status === filterStatus;
    const matchesDirection = filterDirection === 'All' || entry.direction === filterDirection;

    return matchesSearch && matchesStatus && matchesDirection;
  });

  const authorizedCount = gateLedger.filter((e: GateLedgerEntry) => e.status === 'Authorized').length;
  const unknownCount = gateLedger.filter((e: GateLedgerEntry) => e.status === 'Unknown').length;

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Plate Number', 'Direction', 'Status', 'Driver', 'Gate'];
    const rows = filteredData.map((e: GateLedgerEntry) => [
      e.id,
      e.timestamp,
      e.plateNumber,
      e.direction,
      e.status,
      e.driver || 'N/A',
      e.gateNumber,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r: (string | undefined)[]) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `APEC_Gate_Security_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('CSV Exported', 'Security ledger downloaded successfully.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            <Shield size={14} />
            <span>Campus Security & ANPR Access Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Admin Security & Gate Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time automated Optical Character Recognition (ANPR) and barrier entry/exit logs
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsScannerOpen(true)}
            className="px-5 py-3 rounded-2xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            <Camera size={16} />
            <span>ANPR Gate Scanner</span>
          </button>
        </div>
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 space-y-6">
        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by plate number, driver name, or gate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-safety-orange"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-safety-orange"
            >
              <option value="All">All Verification Statuses</option>
              <option value="Authorized">Authorized Fleet</option>
              <option value="Unknown">Unknown / Flagged</option>
            </select>

            <select
              value={filterDirection}
              onChange={(e) => setFilterDirection(e.target.value as any)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-safety-orange"
            >
              <option value="All">All Directions</option>
              <option value="Entry">Entry (Inbound)</option>
              <option value="Exit">Exit (Outbound)</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Plate Number</th>
                <th className="px-4 py-3.5">Driver / Personnel</th>
                <th className="px-4 py-3.5">Direction</th>
                <th className="px-4 py-3.5">Gate Location</th>
                <th className="px-4 py-3.5">Security Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredData.length > 0 ? (
                filteredData.map((entry: GateLedgerEntry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-4 font-mono text-slate-600 dark:text-slate-400">
                      {entry.timestamp}
                    </td>

                    <td className="px-4 py-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {entry.plateNumber}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300 font-medium">
                      {entry.driver || <span className="text-slate-400 italic">Unidentified / Visitor</span>}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {entry.direction === 'Entry' ? (
                          <>
                            <ArrowDownCircle size={17} className="text-emerald-500" />
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              Entry
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowUpCircle size={17} className="text-blue-500" />
                            <span className="font-semibold text-blue-700 dark:text-blue-400">
                              Exit
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400 font-medium">
                      {entry.gateNumber}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {entry.status === 'Authorized' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                            <CheckCircle size={13} className="text-emerald-500" />
                            <span>Authorized</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                            <AlertCircle size={13} className="text-safety-orange" />
                            <span>Unknown (Flagged)</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      icon={Shield}
                      title="No Gate Events Found"
                      description="No security ledger events match your current query."
                      actionLabel="Clear Filters"
                      onAction={() => {
                        setSearchTerm('');
                        setFilterStatus('All');
                        setFilterDirection('All');
                      }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Statistics */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredData.length}</strong> of{' '}
            <strong className="text-slate-900 dark:text-white font-mono">{gateLedger.length}</strong> recorded gate events
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Authorized: {authorizedCount}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-safety-orange">
              <span className="w-2 h-2 rounded-full bg-safety-orange" />
              <span>Unknown: {unknownCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ANPR Scanner & Manual Logger Modal */}
      <GateScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onLogEntry={addGateEntry}
      />
    </div>
  );
};
