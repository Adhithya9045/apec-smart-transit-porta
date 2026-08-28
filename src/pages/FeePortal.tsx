import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  GraduationCap,
  QrCode,
  History,
  FileText,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { StudentTransitRecord } from '../types/transit';
import { DigitalBusPass } from '../components/fee/DigitalBusPass';
import { PaymentModal } from '../components/fee/PaymentModal';
import { PaymentReceipt } from '../components/fee/PaymentReceipt';
import { StatusBadge } from '../components/common/StatusBadge';

export const FeePortal: React.FC = () => {
  const { students, processStudentPayment } = useTransit();
  const [rollNumber, setRollNumber] = useState('420423205002');
  const [activeStudent, setActiveStudent] = useState<StudentTransitRecord | null>(
    students['420423205002'] || null
  );
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'pass' | 'history'>('details');

  // Modal states
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    receiptNo: string;
    amount: number;
  } | null>(null);

  const sampleRollNumbers = ['420423205002', '2021CS001', '2021EC045', '2021ME032'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(rollNumber.trim().toUpperCase());
  };

  const performLookup = (roll: string) => {
    setError('');
    const data = students[roll];
    if (data) {
      setActiveStudent(data);
      setRollNumber(roll);
    } else {
      setActiveStudent(null);
      setError(`Student with Roll Number "${roll}" was not found in transport registry. Please check and try again.`);
    }
  };

  const handlePaymentSuccess = (receiptNo: string, amount: number) => {
    if (activeStudent) {
      processStudentPayment(activeStudent.rollNumber, amount);
      const updated = students[activeStudent.rollNumber];
      if (updated) setActiveStudent({ ...updated, balance: Math.max(0, updated.balance - amount) });
      setReceiptData({ receiptNo, amount });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            Student Commuter Services
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Student Bus Pass & Transit Fee Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Look up route allocation, verify digital bus pass status, and complete online fee clearance
          </p>
        </div>

        {/* Quick Sample Roll Number Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-bold text-slate-400 px-1">Sample Rolls:</span>
          {sampleRollNumbers.map((roll) => (
            <button
              key={roll}
              onClick={() => performLookup(roll)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeStudent?.rollNumber === roll
                  ? 'bg-safety-orange text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {roll}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Enter Student Roll Number / Registration ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g., 420423205002, 2021CS001"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-safety-orange bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-semibold uppercase text-sm transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-safety-orange hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              <Search size={16} />
              <span>Verify Records</span>
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-rose-50 dark:bg-rose-950/40 border-l-4 border-rose-500 rounded-2xl flex items-center gap-3 text-xs text-rose-700 dark:text-rose-400">
            <XCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Active Student Results */}
        {activeStudent && (
          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            {/* View Tabs */}
            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'details'
                    ? 'bg-white dark:bg-slate-900 text-safety-orange shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText size={14} />
                <span>Account & Fees</span>
              </button>
              <button
                onClick={() => setActiveTab('pass')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'pass'
                    ? 'bg-white dark:bg-slate-900 text-safety-orange shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <QrCode size={14} />
                <span>Digital Bus Pass</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-slate-900 text-safety-orange shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <History size={14} />
                <span>Receipts</span>
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Student Hero Header Card */}
                <div className="bg-gradient-to-br from-deep-navy to-apec-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center font-bold text-2xl font-heading shadow-md">
                      {activeStudent.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold font-heading">
                          {activeStudent.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded bg-safety-orange text-white font-mono text-[10px] font-bold">
                          {activeStudent.rollNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                        <GraduationCap size={15} className="text-safety-orange" />
                        <span>{activeStudent.department} • {activeStudent.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-xs text-slate-300">Transit Pass Status:</span>
                    <StatusBadge status={activeStudent.paymentStatus} />
                  </div>
                </div>

                {/* 4 Financial & Route Stat Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Payment Status */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                      Payment Status
                    </span>
                    <div className="flex items-center gap-2">
                      {activeStudent.paymentStatus === 'Paid' ? (
                        <>
                          <CheckCircle className="text-emerald-500" size={22} />
                          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-heading">
                            Clear (Paid)
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="text-safety-orange" size={22} />
                          <span className="text-xl font-bold text-safety-orange font-heading">
                            Due Pending
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Balance Due */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                      Outstanding Balance
                    </span>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                      ₹{activeStudent.balance.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Total Annual Fees */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                      Total Annual Fee
                    </span>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                      ₹{activeStudent.totalFees.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Last Payment */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                      Last Payment Date
                    </span>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                      {new Date(activeStudent.lastPayment).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Route Allocation Details */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-3">
                    Assigned Boarding Stop & Bus Route
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Boarding Stop</span>
                      <strong className="text-slate-900 dark:text-white text-sm font-semibold">
                        {activeStudent.assignedStopName}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Assigned Corridor</span>
                      <strong className="text-safety-orange font-bold">
                        {activeStudent.assignedRouteId === 'R1' ? 'Route 01: Kutralam Express' : activeStudent.assignedRouteId === 'R2' ? 'Route 02: Thanjavur Direct' : 'Route 03: Trichy Connector'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Pass Serial No.</span>
                      <strong className="font-mono text-slate-700 dark:text-slate-300">
                        {activeStudent.busPassNumber}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Payment CTA if balance > 0 */}
                {activeStudent.balance > 0 ? (
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold font-heading">
                        Clear Outstanding Transit Fee
                      </h4>
                      <p className="text-xs text-orange-100 mt-0.5">
                        Settle your pending balance of ₹{activeStudent.balance.toLocaleString('en-IN')} to ensure uninterrupted bus boarding.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPayModalOpen(true)}
                      className="px-8 py-3.5 rounded-2xl bg-white text-orange-600 font-extrabold text-xs shadow-lg hover:bg-orange-50 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      Pay Now — ₹{activeStudent.balance.toLocaleString('en-IN')}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} />
                      <span>All academic transport fees cleared. Your bus pass is valid through <strong>{activeStudent.passValidUntil}</strong>.</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('pass')}
                      className="font-bold underline"
                    >
                      View Pass
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pass' && <DigitalBusPass student={activeStudent} />}

            {activeTab === 'history' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-4">
                  Past Payment & Fee Clearance Receipts
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 font-bold border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      <tr>
                        <th className="px-4 py-3">Receipt No</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {activeStudent.transactions && activeStudent.transactions.length > 0 ? (
                        activeStudent.transactions.map((txn: any) => (
                          <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="px-4 py-3 font-mono font-bold text-safety-orange">
                              {txn.receiptNo}
                            </td>
                            <td className="px-4 py-3 font-mono">{txn.date}</td>
                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                              {txn.description}
                            </td>
                            <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                              ₹{txn.amount.toLocaleString('en-IN')}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                {txn.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => setReceiptData({ receiptNo: txn.receiptNo, amount: txn.amount })}
                                className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-xs font-semibold"
                              >
                                View Receipt
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                            No past transaction records available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payment Checkout Simulator Modal */}
      {activeStudent && (
        <PaymentModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          student={activeStudent}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Official Receipt Modal */}
      {activeStudent && receiptData && (
        <PaymentReceipt
          isOpen={!!receiptData}
          onClose={() => setReceiptData(null)}
          student={activeStudent}
          receiptNo={receiptData.receiptNo}
          amount={receiptData.amount}
        />
      )}
    </div>
  );
};
