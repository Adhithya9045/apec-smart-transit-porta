import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TransitRoute,
  BusTelemetry,
  DriverProfile,
  StudentTransitRecord,
  GateLedgerEntry,
  TransitAlert,
  ToastMessage,
  UserRole,
} from '../types/transit';
import {
  initialRoutes,
  initialBuses,
  initialDrivers,
  initialStudents,
  initialGateLedger,
  initialAlerts,
} from '../data/mockData';

interface TransitContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  routes: TransitRoute[];
  buses: BusTelemetry[];
  drivers: DriverProfile[];
  students: Record<string, StudentTransitRecord>;
  gateLedger: GateLedgerEntry[];
  alerts: TransitAlert[];
  toasts: ToastMessage[];
  selectedRouteId: string;
  setSelectedRouteId: (id: string) => void;
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  updateBusPosition: (busId: string, stopIndex: number) => void;
  addBus: (bus: Omit<BusTelemetry, 'lastUpdated'>) => void;
  updateBus: (busId: string, updates: Partial<BusTelemetry>) => void;
  deleteBus: (busId: string) => void;
  addDriver: (driver: DriverProfile) => void;
  updateDriver: (driverId: string, updates: Partial<DriverProfile>) => void;
  deleteDriver: (driverId: string) => void;
  addGateEntry: (entry: Omit<GateLedgerEntry, 'id' | 'timestamp'>) => void;
  processStudentPayment: (rollNumber: string, amount: number, note?: string) => { success: boolean; receiptNo?: string };
  markAlertRead: (alertId: string) => void;
  addTransitAlert: (alert: Omit<TransitAlert, 'id' | 'timestamp' | 'isRead'>) => void;
}

const TransitContext = createContext<TransitContextType | undefined>(undefined);

export const TransitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [routes] = useState<TransitRoute[]>(initialRoutes);
  const [buses, setBuses] = useState<BusTelemetry[]>(() => {
    const saved = localStorage.getItem('apec_transit_buses');
    return saved ? JSON.parse(saved) : initialBuses;
  });
  const [drivers, setDrivers] = useState<DriverProfile[]>(() => {
    const saved = localStorage.getItem('apec_transit_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });
  const [students, setStudents] = useState<Record<string, StudentTransitRecord>>(() => {
    const saved = localStorage.getItem('apec_transit_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  const [gateLedger, setGateLedger] = useState<GateLedgerEntry[]>(() => {
    const saved = localStorage.getItem('apec_transit_ledger');
    return saved ? JSON.parse(saved) : initialGateLedger;
  });
  const [alerts, setAlerts] = useState<TransitAlert[]>(() => {
    const saved = localStorage.getItem('apec_transit_alerts');
    return saved ? JSON.parse(saved) : initialAlerts;
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('R1');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('apec_transit_buses', JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem('apec_transit_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('apec_transit_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('apec_transit_ledger', JSON.stringify(gateLedger));
  }, [gateLedger]);

  useEffect(() => {
    localStorage.setItem('apec_transit_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateBusPosition = (busId: string, stopIndex: number) => {
    setBuses((prev) =>
      prev.map((bus) => {
        if (bus.busId === busId) {
          const route = routes.find((r) => r.id === bus.assignedRouteId);
          const stopCoords = route?.stops[stopIndex]?.coordinates || bus.gpsCoordinates;
          return {
            ...bus,
            currentStopIndex: stopIndex,
            gpsCoordinates: {
              lat: bus.gpsCoordinates.lat,
              lng: bus.gpsCoordinates.lng,
              x: stopCoords.x,
              y: stopCoords.y,
            },
            lastUpdated: 'Just now',
          };
        }
        return bus;
      })
    );
  };

  const addBus = (busData: Omit<BusTelemetry, 'lastUpdated'>) => {
    const newBus: BusTelemetry = {
      ...busData,
      lastUpdated: 'Just now',
    };
    setBuses((prev) => [newBus, ...prev]);
    showToast('Fleet Updated', `Bus ${newBus.busNumber} (${newBus.registrationNumber}) added to fleet.`, 'success');
  };

  const updateBus = (busId: string, updates: Partial<BusTelemetry>) => {
    setBuses((prev) =>
      prev.map((b) => (b.busId === busId ? { ...b, ...updates, lastUpdated: 'Just now' } : b))
    );
    showToast('Bus Updated', `Vehicle details updated successfully.`, 'success');
  };

  const deleteBus = (busId: string) => {
    const target = buses.find((b) => b.busId === busId);
    setBuses((prev) => prev.filter((b) => b.busId !== busId));
    showToast('Bus Removed', `Bus ${target?.busNumber || busId} was removed from fleet roster.`, 'warning');
  };

  const addDriver = (driver: DriverProfile) => {
    setDrivers((prev) => [driver, ...prev]);
    showToast('Driver Registered', `${driver.name} (ID: ${driver.driverId}) registered successfully.`, 'success');
  };

  const updateDriver = (driverId: string, updates: Partial<DriverProfile>) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === driverId ? { ...d, ...updates } : d))
    );
    showToast('Driver Profile Updated', `Changes saved for driver.`, 'success');
  };

  const deleteDriver = (driverId: string) => {
    const target = drivers.find((d) => d.id === driverId);
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));
    showToast('Driver Removed', `${target?.name || driverId} removed from active roster.`, 'warning');
  };

  const addGateEntry = (entryData: Omit<GateLedgerEntry, 'id' | 'timestamp'>) => {
    const now = new Date();
    const formattedTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newEntry: GateLedgerEntry = {
      id: String(Date.now()),
      timestamp: formattedTimestamp,
      ...entryData,
    };
    setGateLedger((prev) => [newEntry, ...prev]);
    showToast(
      'Gate Event Logged',
      `${newEntry.plateNumber} logged as ${newEntry.direction} (${newEntry.status})`,
      newEntry.status === 'Authorized' ? 'success' : 'warning'
    );
  };

  const processStudentPayment = (rollNumber: string, amount: number, note = 'Semester Transport Fee Clearance') => {
    const student = students[rollNumber.toUpperCase()];
    if (!student) return { success: false };

    const newBalance = Math.max(0, student.balance - amount);
    const receiptNo = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toISOString().split('T')[0];

    const updatedStudent: StudentTransitRecord = {
      ...student,
      balance: newBalance,
      paymentStatus: newBalance === 0 ? 'Paid' : 'Pending',
      lastPayment: nowStr,
      transactions: [
        {
          id: `TXN-${Date.now().toString().slice(-4)}`,
          date: nowStr,
          amount,
          description: note,
          receiptNo,
          status: 'Success',
        },
        ...(student.transactions || []),
      ],
    };

    setStudents((prev) => ({
      ...prev,
      [rollNumber.toUpperCase()]: updatedStudent,
    }));

    showToast(
      'Payment Confirmed',
      `₹${amount.toLocaleString('en-IN')} received for ${student.name}. Receipt: ${receiptNo}`,
      'success'
    );

    return { success: true, receiptNo };
  };

  const markAlertRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isRead: true } : a))
    );
  };

  const addTransitAlert = (alertData: Omit<TransitAlert, 'id' | 'timestamp' | 'isRead'>) => {
    const newAlert: TransitAlert = {
      id: `ALT-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false,
      ...alertData,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    showToast('New Transit Advisory', alertData.title, alertData.severity === 'critical' ? 'error' : alertData.severity);
  };

  return (
    <TransitContext.Provider
      value={{
        userRole,
        setUserRole,
        routes,
        buses,
        drivers,
        students,
        gateLedger,
        alerts,
        toasts,
        selectedRouteId,
        setSelectedRouteId,
        showToast,
        removeToast,
        updateBusPosition,
        addBus,
        updateBus,
        deleteBus,
        addDriver,
        updateDriver,
        deleteDriver,
        addGateEntry,
        processStudentPayment,
        markAlertRead,
        addTransitAlert,
      }}
    >
      {children}
    </TransitContext.Provider>
  );
};

export const useTransit = () => {
  const context = useContext(TransitContext);
  if (!context) {
    throw new Error('useTransit must be used within TransitProvider');
  }
  return context;
};
