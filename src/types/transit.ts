export type BusStatus = 'On Time' | 'Delayed' | 'In Transit' | 'Maintenance' | 'Offline';

export type GateDirection = 'Entry' | 'Exit';

export type GateStatus = 'Authorized' | 'Unknown' | 'Flagged';

export type AlertSeverity = 'info' | 'warning' | 'critical' | 'success';

export type UserRole = 'student' | 'admin';

export interface RouteStop {
  id: number;
  name: string;
  morningTime: string;
  eveningTime: string;
  landmark?: string;
  distanceFromCampusKm: number;
  status?: 'completed' | 'current' | 'upcoming';
  etaMinutes?: number;
  coordinates?: { x: number; y: number };
}

export interface TransitRoute {
  id: string;
  routeNumber: string;
  name: string;
  origin: string;
  destination: string;
  morningDeparture: string;
  eveningDeparture: string;
  assignedBusId: string;
  assignedDriverId: string;
  totalDistanceKm: number;
  totalDurationMin: number;
  stops: RouteStop[];
  status: 'Active' | 'Delayed' | 'Standby';
}

export interface BusTelemetry {
  busId: string;
  busNumber: string;
  registrationNumber: string;
  assignedRouteId: string;
  assignedDriverId: string;
  capacity: number;
  occupiedSeats: number;
  currentSpeedKmH: number;
  fuelBatteryPercent: number;
  currentStopIndex: number;
  status: BusStatus;
  gpsCoordinates: { lat: number; lng: number; x: number; y: number };
  lastUpdated: string;
  maintenanceStatus: 'Good' | 'Service Due' | 'In Inspection';
  acStatus: boolean;
}

export interface DriverProfile {
  id: string;
  name: string;
  driverId: string;
  phone: string;
  licenseNumber: string;
  experienceYears: number;
  assignedBusId?: string;
  assignedRouteId?: string;
  status: 'On Duty' | 'Available' | 'On Break' | 'Off Duty';
  safetyRating: number;
  emergencyContact: string;
  avatarUrl?: string;
}

export interface StudentTransitRecord {
  rollNumber: string;
  name: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  assignedRouteId: string;
  assignedStopId: number;
  assignedStopName: string;
  busPassNumber: string;
  passValidUntil: string;
  paymentStatus: 'Paid' | 'Pending';
  balance: number;
  totalFees: number;
  lastPayment: string;
  avatarUrl?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  transactions?: {
    id: string;
    date: string;
    amount: number;
    description: string;
    receiptNo: string;
    status: 'Success' | 'Pending';
  }[];
}

export interface GateLedgerEntry {
  id: string;
  timestamp: string;
  plateNumber: string;
  direction: GateDirection;
  status: GateStatus;
  driver?: string;
  gateNumber: string;
  vehicleType?: 'APEC Fleet' | 'Staff Car' | 'Visitor' | 'Commercial Supply';
  notes?: string;
}

export interface TransitAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  routeId?: string;
  isRead?: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
