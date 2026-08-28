import React, { useState } from 'react';
import {
  Bus,
  Plus,
  Search,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { BusTelemetry, TransitRoute, DriverProfile } from '../types/transit';
import { BusModal } from '../components/admin/BusModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';

export const FleetManagement: React.FC = () => {
  const { buses, routes, drivers, addBus, updateBus, deleteBus } = useTransit();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal states
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<BusTelemetry | null>(null);
  const [deletingBusId, setDeletingBusId] = useState<string | null>(null);

  const filteredBuses = buses.filter((bus: BusTelemetry) => {
    const matchesSearch =
      bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routes.find((r: TransitRoute) => r.id === bus.assignedRouteId)?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || bus.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingBus(null);
    setIsBusModalOpen(true);
  };

  const handleOpenEdit = (bus: BusTelemetry) => {
    setEditingBus(bus);
    setIsBusModalOpen(true);
  };

  const handleSaveBus = (busData: any) => {
    if (editingBus) {
      updateBus(editingBus.busId, busData);
    } else {
      addBus(busData);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingBusId) {
      deleteBus(deletingBusId);
      setDeletingBusId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            Fleet Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Bus Fleet & Asset Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage campus transit vehicles, capacity limits, live GPS telemetry, and driver allocations
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Register New Bus</span>
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
            placeholder="Search by bus number, plate, or assigned route..."
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
          <option value="All">All Fleet Statuses</option>
          <option value="On Time">On Time</option>
          <option value="In Transit">In Transit</option>
          <option value="Delayed">Delayed</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Fleet Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Bus Name & Plate</th>
                <th className="px-4 py-3.5">Assigned Route</th>
                <th className="px-4 py-3.5">Assigned Driver</th>
                <th className="px-4 py-3.5">Capacity / Load</th>
                <th className="px-4 py-3.5">Speed / Battery</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Health</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus: BusTelemetry) => {
                  const route = routes.find((r: TransitRoute) => r.id === bus.assignedRouteId);
                  const driver = drivers.find((d: DriverProfile) => d.id === bus.assignedDriverId);
                  const loadPercent = Math.round((bus.occupiedSeats / bus.capacity) * 100);

                  return (
                    <tr
                      key={bus.busId}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">
                        <div className="font-heading font-bold text-sm">{bus.busNumber}</div>
                        <div className="font-mono text-[11px] text-safety-orange font-bold">
                          {bus.registrationNumber}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                        <div className="font-semibold">{route?.name || 'Unassigned'}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {route?.routeNumber || 'None'}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                        <div className="font-medium">{driver?.name || 'Unassigned'}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {driver?.phone || '—'}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-mono font-bold text-slate-900 dark:text-white">
                          {bus.occupiedSeats}/{bus.capacity} Seats ({loadPercent}%)
                        </div>
                        <div className="w-20 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-safety-orange h-full rounded-full"
                            style={{ width: `${loadPercent}%` }}
                          />
                        </div>
                      </td>

                      <td className="px-4 py-4 font-mono">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {bus.currentSpeedKmH} km/h
                        </div>
                        <div className="text-[11px] text-emerald-500 font-semibold">
                          Battery: {bus.fuelBatteryPercent}%
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={bus.status} />
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            bus.maintenanceStatus === 'Good'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          }`}
                        >
                          {bus.maintenanceStatus}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(bus)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-apec-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit Vehicle"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeletingBusId(bus.busId)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Vehicle"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>
                    <EmptyState
                      icon={Bus}
                      title="No Buses Found"
                      description="No fleet vehicles match your filter criteria."
                      actionLabel="Reset Search"
                      onAction={() => {
                        setSearchTerm('');
                        setFilterStatus('All');
                      }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bus Modal */}
      <BusModal
        isOpen={isBusModalOpen}
        onClose={() => setIsBusModalOpen(false)}
        bus={editingBus}
        routes={routes}
        drivers={drivers}
        onSave={handleSaveBus}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingBusId}
        onClose={() => setDeletingBusId(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Bus from Fleet"
        message="Are you sure you want to remove this vehicle from the active campus transit roster? This action will unassign its route and driver schedule."
        confirmLabel="Remove Bus"
        isDestructive={true}
      />
    </div>
  );
};
