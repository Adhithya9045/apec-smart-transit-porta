import React from 'react';
import { Bus, QrCode, ShieldCheck, Download, Printer, CheckCircle2 } from 'lucide-react';
import { StudentTransitRecord } from '../../types/transit';

interface DigitalBusPassProps {
  student: StudentTransitRecord;
}

export const DigitalBusPass: React.FC<DigitalBusPassProps> = ({ student }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Visual Bus Pass Card */}
      <div className="printable-area relative bg-gradient-to-br from-deep-navy via-slate-900 to-apec-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 overflow-hidden select-none">
        {/* Holographic / Shimmer Overlay */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-safety-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-safety-orange text-white flex items-center justify-center font-bold shadow-glow-orange shrink-0">
              <Bus size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white">
                  APEC SMART TRANSIT
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  VERIFIED PASS
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official Campus Boarding & Transit Authorization Pass
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">PASS NO</span>
            <span className="font-bold text-safety-orange">{student.busPassNumber}</span>
          </div>
        </div>

        {/* Student Details Grid + QR Code */}
        <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Left Student Info */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Commuter Name
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-0.5">
                {student.name}
              </h3>
              <p className="text-xs text-safety-orange font-mono font-semibold mt-0.5">
                Roll No: {student.rollNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">Department</span>
                <span className="font-semibold text-slate-200 mt-0.5 block truncate">
                  {student.department}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">Academic Year</span>
                <span className="font-semibold text-slate-200 mt-0.5 block">
                  {student.year}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">Assigned Route</span>
                <span className="font-bold text-safety-orange mt-0.5 block">
                  {student.assignedRouteId === 'R1' ? 'Route 01: Kutralam Express' : student.assignedRouteId === 'R2' ? 'Route 02: Thanjavur Direct' : 'Route 03: Trichy Connector'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">Boarding Point</span>
                <span className="font-semibold text-slate-200 mt-0.5 block truncate">
                  {student.assignedStopName}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Security QR Code Matrix */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white text-slate-900 shadow-xl border border-white/20">
            {/* High-contrast simulated QR Matrix */}
            <div className="w-32 h-32 bg-slate-950 p-2.5 rounded-xl flex items-center justify-center shadow-inner relative">
              <QrCode size={110} className="text-white" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-7 h-7 rounded-md bg-safety-orange text-white flex items-center justify-center shadow-md font-bold text-[10px]">
                  AP
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-600 mt-2">
              SCAN TO VALIDATE
            </span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-0.5">
              <CheckCircle2 size={12} />
              <span>ACTIVE STATUS</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Validity: <strong className="text-white font-mono">{student.passValidUntil}</strong></span>
          </div>
          <div className="text-[11px]">
            Emergency Helpline: <span className="font-mono text-slate-200">+91 94432 00000</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm transition-all"
        >
          <Printer size={16} />
          <span>Print Pass</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white text-xs font-semibold shadow-glow-orange transition-all transform active:scale-95"
        >
          <Download size={16} />
          <span>Download Digital Pass</span>
        </button>
      </div>
    </div>
  );
};
