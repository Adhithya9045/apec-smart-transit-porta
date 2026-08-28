import React, { useState } from 'react';
import { Camera, Scan, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { GateLedgerEntry } from '../../types/transit';
import { Modal } from '../common/Modal';

interface GateScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogEntry: (entry: Omit<GateLedgerEntry, 'id' | 'timestamp'>) => void;
}

export const GateScannerModal: React.FC<GateScannerModalProps> = ({
  isOpen,
  onClose,
  onLogEntry,
}) => {
  const [activeTab, setActiveTab] = useState<'anpr' | 'manual'>('anpr');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    plate: string;
    status: 'Authorized' | 'Unknown';
    driver?: string;
    type: 'APEC Fleet' | 'Visitor' | 'Staff Car';
  } | null>(null);

  // Manual form state
  const [plateNumber, setPlateNumber] = useState('');
  const [direction, setDirection] = useState<'Entry' | 'Exit'>('Entry');
  const [status, setStatus] = useState<'Authorized' | 'Unknown'>('Authorized');
  const [driver, setDriver] = useState('');
  const [gateNumber, setGateNumber] = useState('Gate 01 (North Main)');
  const [notes, setNotes] = useState('');

  const samplePlates = [
    { plate: 'TN 48 AB 1234', status: 'Authorized' as const, driver: 'Rajesh Kumar', type: 'APEC Fleet' as const },
    { plate: 'TN 48 CD 5678', status: 'Authorized' as const, driver: 'Suresh Babu', type: 'APEC Fleet' as const },
    { plate: 'TN 49 XY 9999', status: 'Unknown' as const, driver: 'Unknown Driver', type: 'Visitor' as const },
    { plate: 'TN 48 EF 2468', status: 'Authorized' as const, driver: 'Kumar Swamy', type: 'APEC Fleet' as const },
  ];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      const randomSample = samplePlates[Math.floor(Math.random() * samplePlates.length)];
      setScanResult(randomSample);
    }, 1000);
  };

  const handleConfirmScanLog = (dir: 'Entry' | 'Exit') => {
    if (!scanResult) return;
    onLogEntry({
      plateNumber: scanResult.plate,
      direction: dir,
      status: scanResult.status,
      driver: scanResult.driver,
      gateNumber: 'Gate 01 (North Main ANPR)',
      vehicleType: scanResult.type,
      notes: `ANPR Automated Gate Scan (${dir})`,
    });
    setScanResult(null);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogEntry({
      plateNumber: plateNumber.toUpperCase(),
      direction,
      status,
      driver: driver || undefined,
      gateNumber,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ANPR Smart Gate Scanner & Logger"
      subtitle="Automated Optical Character Recognition & Vehicle Verification"
      maxWidth="lg"
    >
      <div className="space-y-5 text-xs">
        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
          <button
            onClick={() => setActiveTab('anpr')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'anpr'
                ? 'bg-white dark:bg-slate-900 text-safety-orange shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AI ANPR Camera Scanner
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'manual'
                ? 'bg-white dark:bg-slate-900 text-safety-orange shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Manual Security Entry Form
          </button>
        </div>

        {activeTab === 'anpr' ? (
          <div className="space-y-4">
            {/* Simulated Camera Feed Viewfinder */}
            <div className="relative h-56 bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Viewfinder Target Reticle */}
              <div className="relative w-64 h-32 border-2 border-dashed border-safety-orange/70 rounded-xl flex items-center justify-center">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-safety-orange" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-safety-orange" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-safety-orange" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-safety-orange" />

                {isScanning ? (
                  <div className="flex flex-col items-center gap-2">
                    <Scan size={32} className="text-safety-orange animate-pulse" />
                    <span className="text-white font-mono text-[11px] animate-pulse">
                      Analyzing License Plate Plate...
                    </span>
                  </div>
                ) : scanResult ? (
                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-center">
                    <span className="font-mono font-black text-lg text-white tracking-widest uppercase block">
                      {scanResult.plate}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                        scanResult.status === 'Authorized'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {scanResult.status} ({scanResult.type})
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Camera size={28} className="mb-1 opacity-70" />
                    <span>ANPR Optical Scanner Ready</span>
                  </div>
                )}
              </div>

              {/* Status footer inside camera */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>CAM: GATE-01-NORTH-HD</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  FEED LIVE (30 FPS)
                </span>
              </div>
            </div>

            {/* Scan Controls */}
            {!scanResult ? (
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-3 rounded-xl bg-safety-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all"
              >
                <Scan size={16} />
                <span>Simulate Vehicle Approach & Plate Scan</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                      {scanResult.plate}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Driver: {scanResult.driver} • Type: {scanResult.type}
                    </p>
                  </div>
                  <span
                    className={`font-bold px-3 py-1 rounded-full ${
                      scanResult.status === 'Authorized'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                    }`}
                  >
                    {scanResult.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleConfirmScanLog('Entry')}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ArrowDownCircle size={16} />
                    <span>Log Gate ENTRY</span>
                  </button>
                  <button
                    onClick={() => handleConfirmScanLog('Exit')}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ArrowUpCircle size={16} />
                    <span>Log Gate EXIT</span>
                  </button>
                  <button
                    onClick={() => setScanResult(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                  >
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Plate Number
              </label>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="e.g., TN 48 AB 1234"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Direction
                </label>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Entry">Entry (Inbound)</option>
                  <option value="Exit">Exit (Outbound)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Security Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Authorized">Authorized</option>
                  <option value="Unknown">Unknown / Visitor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Driver Name (Optional)
                </label>
                <input
                  type="text"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  placeholder="e.g., Rajesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Campus Gate
                </label>
                <select
                  value={gateNumber}
                  onChange={(e) => setGateNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Gate 01 (North Main)">Gate 01 (North Main)</option>
                  <option value="Gate 02 (Visitor Gate)">Gate 02 (Visitor Gate)</option>
                  <option value="Gate 03 (East Gate)">Gate 03 (East Gate)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Log Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Official transit run"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white font-bold shadow-glow-orange"
              >
                Log Entry Record
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
