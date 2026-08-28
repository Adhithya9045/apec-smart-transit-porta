import React, { useState } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { StudentTransitRecord } from '../../types/transit';
import { Modal } from '../common/Modal';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentTransitRecord;
  onSuccess: (receiptNo: string, amount: number) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSuccess,
}) => {
  const [payAmount, setPayAmount] = useState<number>(student.balance || 35000);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('student@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedReceipt = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      onSuccess(generatedReceipt, payAmount);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Secure Transit Fee Settlement"
      subtitle={`Processing payment for ${student.name} (${student.rollNumber})`}
      maxWidth="md"
    >
      <form onSubmit={handlePay} className="space-y-5">
        {/* Outstanding Balance Banner */}
        <div className="p-4 rounded-xl bg-orange-50 dark:bg-slate-800/80 border border-orange-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Outstanding Balance Due:
            </span>
            <span className="font-extrabold text-base text-safety-orange font-mono">
              ₹{student.balance.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Payment Amount (₹ INR)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold">
              ₹
            </span>
            <input
              type="number"
              min="1000"
              max={student.balance}
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-safety-orange"
              required
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => setPayAmount(student.balance)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            >
              Pay Full (₹{student.balance.toLocaleString('en-IN')})
            </button>
            {student.balance > 15000 && (
              <button
                type="button"
                onClick={() => setPayAmount(15000)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                Part Installment (₹15,000)
              </button>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'upi', label: 'UPI / QR' },
              { id: 'card', label: 'Debit / Card' },
              { id: 'netbanking', label: 'NetBanking' },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as any)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === method.id
                    ? 'border-safety-orange bg-orange-50 dark:bg-slate-800 text-safety-orange font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {paymentMethod === 'upi' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              UPI ID / VPA
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g., student@oksbi"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-safety-orange"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
          <Lock size={13} className="text-emerald-500" />
          <span>256-Bit SSL Encrypted Official Campus Payment Gateway</span>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="flex-1 py-3 px-5 rounded-xl bg-safety-orange hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-bold shadow-glow-orange flex items-center justify-center gap-2 transition-all"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Transaction...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>Authorize ₹{payAmount.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
