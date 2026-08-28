import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Phone,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { DriverProfile, TransitRoute, BusTelemetry } from '../types/transit';
import { DriverModal } from '../components/admin/DriverModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';

export const DriverManagement: React.FC = () => {
  const { drivers, routes, buses, addDriver, updateDriver, deleteDriver } = useTransit();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal states
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<DriverProfile | null>(null);
  const [deletingDriverId, setDeletingDriverId] = useState<string | null>(null);

  const filteredDrivers = drivers.filter((driver: DriverProfile) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm);

    const matchesStatus = filterStatus === 'All' || driver.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingDriver(null);
    setIsDriverModalOpen(true);
  };

  const handleOpenEdit = (driver: DriverProfile) => {
    setEditingDriver(driver);
    setIsDriverModalOpen(true);
  };

  const handleSaveDriver = (driverData: DriverProfile) => {
    if (editingDriver) {
      updateDriver(editingDriver.id, driverData);
    } else {
      addDriver(driverData);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingDriverId) {
      deleteDriver(deletingDriverId);
      setDeletingDriverId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            Transport Personnel Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Driver & Crew Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Verified campus drivers, heavy vehicle licenses, duty shifts, and emergency contact registry
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Register New Driver</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search driver by name, staff ID, phone, or license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-white shadow-soft focus:outline-none focus:ring-2 focus:ring-safety-orange"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-soft focus:outline-none focus:ring-2 focus:ring-safety-orange"
        >
          <option value="All">All Duty Statuses</option>
          <option value="On Duty">On Duty</option>
          <option value="Available">Available (Standby)</option>
          <option value="On Break">On Break</option>
          <option value="Off Duty">Off Duty</option>
        </select>
      </div>

      {/* Drivers Grid / Cards */}
      {filteredDrivers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver: DriverProfile) => {
            const route = routes.find((r: TransitRoute) => r.id === driver.assignedRouteId);
            const bus = buses.find((b: BusTelemetry) => b.assignedDriverId === driver.id);

            return (
              <div
                key={driver.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-card transition-all"
              >
                <div>
                  {/* Top Row: Avatar & Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={driver.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                        alt={driver.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                      />
                      <div>
                        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                          {driver.name}
                        </h3>
                        <p className="text-xs font-mono font-bold text-safety-orange">
                          {driver.driverId}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={driver.status} size="sm" />
                  </div>

                  {/* Driver Meta Grid */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-xs mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">License No:</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        {driver.licenseNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Experience:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {driver.experienceYears} Years
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Safety Rating:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ★ {driver.safetyRating} / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Route & Bus Assignment */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Assigned Route:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {route ? `${route.routeNumber}: ${route.name}` : 'Unassigned'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Assigned Fleet:</span>
                      <span className="font-mono font-bold text-safety-orange">
                        {bus?.registrationNumber || 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`tel:${driver.phone}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-apec-50 hover:bg-apec-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-apec-600 dark:text-apec-400 text-xs font-semibold transition-colors"
                  >
                    <Phone size={14} />
                    <span>{driver.phone}</span>
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(driver)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Driver"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeletingDriverId(driver.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove Driver"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <EmptyState
            icon={Users}
            title="No Drivers Found"
            description="No transport crew members match your search criteria."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchTerm('');
              setFilterStatus('All');
            }}
          />
        </div>
      )}

      {/* Driver Modal */}
      <DriverModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        driver={editingDriver}
        routes={routes}
        onSave={handleSaveDriver}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deletingDriverId}
        onClose={() => setDeletingDriverId(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Driver from Roster"
        message="Are you sure you want to remove this driver from the active campus transport registry?"
        confirmLabel="Remove Driver"
        isDestructive={true}
      />
    </div>
  );
};
