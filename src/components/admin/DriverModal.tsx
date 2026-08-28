import React, { useState, useEffect } from 'react';
import { DriverProfile, TransitRoute } from '../../types/transit';
import { Modal } from '../common/Modal';

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver?: DriverProfile | null;
  routes: TransitRoute[];
  onSave: (driverData: DriverProfile) => void;
}

export const DriverModal: React.FC<DriverModalProps> = ({
  isOpen,
  onClose,
  driver,
  routes,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [driverId, setDriverId] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState(8);
  const [assignedRouteId, setAssignedRouteId] = useState('R1');
  const [status, setStatus] = useState<DriverProfile['status']>('On Duty');
  const [emergencyContact, setEmergencyContact] = useState('');

  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setDriverId(driver.driverId);
      setPhone(driver.phone);
      setLicenseNumber(driver.licenseNumber);
      setExperienceYears(driver.experienceYears);
      setAssignedRouteId(driver.assignedRouteId || 'R1');
      setStatus(driver.status);
      setEmergencyContact(driver.emergencyContact);
    } else {
      setName('');
      setDriverId(`DRV-${Math.floor(4200 + Math.random() * 90)}`);
      setPhone('+91 9');
      setLicenseNumber(`TN-48-2020-00${Math.floor(100 + Math.random() * 900)}`);
      setExperienceYears(6);
      setAssignedRouteId(routes[0]?.id || 'R1');
      setStatus('On Duty');
      setEmergencyContact('+91 94432 00000');
    }
  }, [driver, isOpen, routes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: driver?.id || `DRV-${Date.now().toString().slice(-4)}`,
      name,
      driverId,
      phone,
      licenseNumber,
      experienceYears,
      assignedRouteId,
      status,
      safetyRating: driver?.safetyRating || 4.9,
      emergencyContact,
      avatarUrl: driver?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={driver ? `Edit Driver Profile (${driver.name})` : 'Register New Campus Driver'}
      subtitle="APEC Transport Personnel Directory"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Driver Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Rajesh Kumar"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Driver Staff ID
            </label>
            <input
              type="text"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Phone Contact
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+91 98421 12345"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Heavy Vehicle License No.
            </label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
              placeholder="TN-48-2015-00892"
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
              Duty Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="On Duty">On Duty</option>
              <option value="Available">Available</option>
              <option value="On Break">On Break</option>
              <option value="Off Duty">Off Duty</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Emergency Contact Number
          </label>
          <input
            type="text"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
          />
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
            Save Driver Profile
          </button>
        </div>
      </form>
    </Modal>
  );
};
