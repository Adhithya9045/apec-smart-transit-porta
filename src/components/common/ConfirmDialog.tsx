import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="md">
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isDestructive
              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
          }`}
        >
          <AlertTriangle size={24} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
          {message}
        </p>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-all transform active:scale-95 ${
            isDestructive
              ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
              : 'bg-apec-600 hover:bg-apec-700 shadow-apec-600/20'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
