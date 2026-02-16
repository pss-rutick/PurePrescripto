// Type definitions for the e-prescribing platform

export type UserRole = 'doctor' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  deaNumber?: string;
  npiNumber?: string;
  specialty?: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  age: number;
  allergies: string[];
  insurance: string;
  medicareId?: string;
  medicaidId?: string;
  conditions: Condition[];
  medications: Medication[];
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  strength: string;
  dosageForm: string;
  sig: string;
  quantity: number;
  refills: number;
  prescribedDate: string;
  prescribedBy: string;
  pharmacy: string;
  ndc: string;
  scheduleClass?: string;
}

export interface Condition {
  id: string;
  name: string;
  icd10Code: string;
  diagnosedDate: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  strength: string;
  quantity: number;
  refills: number;
  sig: string;
  prescribedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'dispensed';
  pharmacy: string;
  isControlled: boolean;
  scheduleClass?: string;
}

export interface RefillRequest {
  id: string;
  patientName: string;
  medication: string;
  lastFillDate: string;
  remainingRefills: number;
  pharmacy: string;
  status: 'pending' | 'approved' | 'denied';
}

export interface Alert {
  id: string;
  type: 'interaction' | 'allergy' | 'duplicate' | 'recall' | 'blackbox' | 'compliance';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  strength: string[];
  dosageForm: string[];
  ndc: string;
  scheduleClass?: string;
  isGeneric: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  fax: string;
  distance: string;
}
