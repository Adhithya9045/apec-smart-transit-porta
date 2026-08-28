import React, { useState, useEffect } from 'react';
import { BusTelemetry, TransitRoute, DriverProfile } from '../../types/transit';
import { Modal } from '../common/Modal';

interface BusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bus?: BusTelemetry | null;
  routes: TransitRoute[];
  drivers: DriverProfile[];
  onSave: (busData: any) => void;
}

export const BusModal: React.FC<BusModalProps> = ({
  isOpen,
  onClose,
  bus,
  routes,
  drivers,
  onSave,
}) => {
  const [busNumber, setBusNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [assignedRouteId, setAssignedRouteId] = useState('R1');
  const [assignedDriverId, setAssignedDriverId] = useState('DRV-01');
  const [capacity, setCapacity] = useState(52);
  const [status, setStatus] = useState<BusTelemetry['status']>('On Time');
  const [acStatus, setAcStatus] = useState(true);

  useEffect(() => {
    if (bus) {
      setBusNumber(bus.busNumber);
      setRegistrationNumber(bus.registrationNumber);
      setAssignedRouteId(bus.assignedRouteId);
      setAssignedDriverId(bus.assignedDriverId);
      setCapacity(bus.capacity);
      setStatus(bus.status);
      setAcStatus(bus.acStatus);
    } else {
      setBusNumber(`Bus ${Math.floor(10 + Math.random() * 90)}`);
      setRegistrationNumber(`TN 48 AB ${Math.floor(1000 + Math.random() * 9000)}`);
      setAssignedRouteId(routes[0]?.id || 'R1');
      setAssignedDriverId(drivers[0]?.id || 'DRV-01');
      setCapacity(52);
      setStatus('On Time');
      setAcStatus(true);
    }
  }, [bus, isOpen, routes, drivers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      busId: bus?.busId || `BUS-${Date.now().toString().slice(-3)}`,
      busNumber,
      registrationNumber: registrationNumber.toUpperCase(),
      assignedRouteId,
      assignedDriverId,
      capacity,
      occupiedSeats: bus?.occupiedSeats || 0,
      currentSpeedKmH: bus?.currentSpeedKmH || 0,
      fuelBatteryPercent: bus?.fuelBatteryPercent || 95,
      currentStopIndex: bus?.currentStopIndex || 0,
      status,
      gpsCoordinates: bus?.gpsCoordinates || { lat: 10.9602, lng: 79.3845, x: 30, y: 50 },
      maintenanceStatus: 'Good',
      acStatus,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bus ? `Edit Fleet Vehicle (${bus.busNumber})` : 'Register New Campus Bus'}
      subtitle="APEC Transport Management & Fleet Allocation"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Bus Display Name
            </label>
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Vehicle Plate Reg.
            </label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assigned Route
            </label>
            <select
              value={assignedRouteId}
              onChange={(e) => setAssignedRouteId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.routeNumber}: {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assigned Driver
            </label>
            <select
              value={assignedDriverId}
              onChange={(e) => setAssignedDriverId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.driverId})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Seating Capacity
            </label>
            <input
              type="number"
              min="20"
              max="70"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Operational Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="On Time">On Time</option>
              <option value="In Transit">In Transit</option>
              <option value="Delayed">Delayed</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="acStatus"
            checked={acStatus}
            onChange={(e) => setAcStatus(e.target.checked)}
            className="w-4 h-4 text-safety-orange rounded border-slate-300 dark:border-slate-700 focus:ring-safety-orange"
          />
          <label htmlFor="acStatus" className="font-semibold text-slate-700 dark:text-slate-300">
            Equipped with Air Conditioning (AC)
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-safety-orange hover:bg-orange-600 text-white font-bold shadow-glow-orange"
          >
            Save Vehicle
          </button>
        </div>
      </form>
    </Modal>
  );
};
