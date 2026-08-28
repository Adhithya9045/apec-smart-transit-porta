import React from 'react';
import { Bus, Printer, ShieldCheck, Download } from 'lucide-react';
import { StudentTransitRecord } from '../../types/transit';
import { Modal } from '../common/Modal';

interface PaymentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentTransitRecord;
  receiptNo: string;
  amount: number;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  isOpen,
  onClose,
  student,
  receiptNo,
  amount,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Transit Fee Receipt"
      subtitle={`Receipt Reference: ${receiptNo}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Printable Area */}
        <div className="printable-area p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-5 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-safety-orange text-white flex items-center justify-center font-bold">
                <Bus size={22} />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                  APEC SMART TRANSIT PORTAL
                </h3>
                <p className="text-xs text-slate-500">
                  Accounts & Transport Operations Department
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                PAID & VERIFIED
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-6">
            <div>
              <span className="text-slate-400 block">Student Name:</span>
              <strong className="text-slate-900 dark:text-white text-sm font-heading">{student.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Roll Number:</span>
              <strong className="text-safety-orange font-mono text-sm">{student.rollNumber}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Department & Year:</span>
              <span>{student.department} ({student.year})</span>
            </div>
            <div>
              <span className="text-slate-400 block">Transaction Date:</span>
              <span className="font-mono">{new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 dark:bg-slate-700/60 font-bold text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-2.5 text-left">Description</th>
                  <th className="px-4 py-2.5 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="px-4 py-3">
                    Campus Bus Pass Fee Clearance ({student.assignedStopName})
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">
                    ₹{amount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-slate-500">Digital GPS Pass Security Levies</td>
                  <td className="px-4 py-2.5 text-right font-mono text-emerald-600 font-semibold">
                    Waived (₹0)
                  </td>
                </tr>
                <tr className="bg-slate-100/60 dark:bg-slate-700/40 font-bold text-slate-900 dark:text-white">
                  <td className="px-4 py-3">Total Paid Amount</td>
                  <td className="px-4 py-3 text-right font-mono text-base text-safety-orange">
                    ₹{amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer of Receipt */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Computer Generated Document — No Signature Required</span>
            </div>
            <span className="font-mono text-slate-500">Ref: {receiptNo}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between no-print pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              <Printer size={15} />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white text-xs font-bold shadow-glow-orange"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
