/**
 * US E-Prescribing & Medication Management Platform (HIPAA-Compliant Demo)
 * 
 * This application demonstrates a complete enterprise-grade e-prescribing system with:
 * - Multi-user role support (Doctor, Pharmacist, Admin)
 * - AI-powered prescription generation from consultation notes (audio/text/image)
 * - ICD-10 code matching and medication recommendations
 * - DEA EPCS-compliant controlled substance prescribing
 * - Prior Authorization workflow management
 * - Comprehensive reporting and analytics
 * - PDMP integration (mocked)
 * - Drug interaction checking
 * - Insurance benefit verification
 * - Comprehensive audit logging
 * 
 * Demo Login Credentials:
 * Doctor: priya.deshmukh@healthsys.com / password
 * Pharmacist: robert.chen@pharmacy.com / password
 * Admin: admin@healthsys.com / password
 * 
 * Note: 2FA verification code is automatically accepted in demo mode
 */

import { useState } from 'react';
import { Toaster } from './components/ui/sonner';

// Auth Components
import { Login } from './components/auth/Login';
import { TwoFactorAuth } from './components/auth/TwoFactorAuth';

// Shared Components
import { Sidebar } from './components/shared/Sidebar';

// Doctor Components
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { PatientsList } from './components/doctor/PatientsList';
import { PatientProfile } from './components/doctor/PatientProfile';
import { NewPrescription } from './components/doctor/NewPrescription';
import { RefillManagement } from './components/doctor/RefillManagement';
import { PriorAuthorization } from './components/doctor/PriorAuthorization';
import { MedicationHistory } from './components/doctor/MedicationHistory';
import { ControlledSubstances } from './components/doctor/ControlledSubstances';

// Pharmacy Components
import { PharmacyDashboard } from './components/pharmacy/PharmacyDashboard';

// Admin Components
import { AdminPanel } from './components/admin/AdminPanel';

// Shared Components
import { Reports } from './components/shared/Reports';

// Types and Data
import { User, Patient, UserRole } from './lib/types';
import { mockUsers, mockPatients } from './lib/mockData';

type AuthStep = 'login' | '2fa' | 'authenticated';

export default function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = (email: string, _password: string) => {
    // Find user by email (simple mock authentication)
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setAuthStep('2fa');
    }
  };

  const handle2FAComplete = () => {
    setAuthStep('authenticated');
    // Set initial view based on role
    if (currentUser?.role === 'doctor') {
      setCurrentView('dashboard');
    } else if (currentUser?.role === 'pharmacist') {
      setCurrentView('pharmacy-dashboard');
    } else if (currentUser?.role === 'admin') {
      setCurrentView('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setAuthStep('login');
    setCurrentUser(null);
    setCurrentView('dashboard');
    setSelectedPatient(null);
  };

  const handleNavigate = (view: string, data?: any) => {
    setCurrentView(view);
    if (data?.patient) {
      setSelectedPatient(data.patient);
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('patient-profile');
  };

  const handleNewPrescription = (patient?: Patient) => {
    if (patient) {
      setSelectedPatient(patient);
    }
    setCurrentView('new-prescription');
  };

  const handleBackToDashboard = () => {
    setSelectedPatient(null);
    if (currentUser?.role === 'doctor') {
      setCurrentView('dashboard');
    } else if (currentUser?.role === 'pharmacist') {
      setCurrentView('pharmacy-dashboard');
    } else if (currentUser?.role === 'admin') {
      setCurrentView('admin-dashboard');
    }
  };

  const handlePrescriptionComplete = () => {
    setCurrentView('dashboard');
    setSelectedPatient(null);
  };

  // Show login screen
  if (authStep === 'login') {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Show 2FA screen
  if (authStep === '2fa' && currentUser) {
    return (
      <>
        <TwoFactorAuth
          onVerify={handle2FAComplete}
          onCancel={() => setAuthStep('login')}
          userName={currentUser.name}
        />
        <Toaster />
      </>
    );
  }

  // Show authenticated app
  if (authStep === 'authenticated' && currentUser) {
    return (
      <div className="flex h-screen bg-slate-50">
        <Sidebar
          userRole={currentUser.role}
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          userName={currentUser.name}
          deaNumber={currentUser.deaNumber}
        />

        {/* Doctor Views */}
        {currentUser.role === 'doctor' && (
          <>
            {currentView === 'dashboard' && (
              <DoctorDashboard onNavigate={handleNavigate} />
            )}
            {currentView === 'patients' && (
              <PatientsList onSelectPatient={handleSelectPatient} />
            )}
            {currentView === 'patient-profile' && selectedPatient && (
              <PatientProfile
                patient={selectedPatient}
                onBack={handleBackToDashboard}
                onNewPrescription={handleNewPrescription}
              />
            )}
            {currentView === 'new-prescription' && (
              <NewPrescription
                patient={selectedPatient || undefined}
                onBack={handleBackToDashboard}
                onComplete={handlePrescriptionComplete}
              />
            )}
            {currentView === 'refills' && (
              <RefillManagement onBack={handleBackToDashboard} />
            )}
            {currentView === 'medication-history' && (
              <MedicationHistory onBack={handleBackToDashboard} />
            )}
            {currentView === 'controlled-substances' && (
              <ControlledSubstances onBack={handleBackToDashboard} />
            )}
            {currentView === 'prior-authorization' && (
              <PriorAuthorization onBack={handleBackToDashboard} />
            )}
            {currentView === 'reports' && (
              <Reports userRole={currentUser.role} onBack={handleBackToDashboard} />
            )}
            {currentView === 'settings' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Settings</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Pharmacist Views */}
        {currentUser.role === 'pharmacist' && (
          <>
            {currentView === 'pharmacy-dashboard' && (
              <PharmacyDashboard onNavigate={handleNavigate} />
            )}
            {currentView === 'incoming-prescriptions' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Incoming Prescriptions</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
            {currentView === 'verification-queue' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Verification Queue</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
            {currentView === 'insurance-claims' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Insurance Claims</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
            {currentView === 'clarifications' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Clarifications</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
            {currentView === 'dispensed' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Dispensed</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
            {currentView === 'reports' && (
              <Reports userRole={currentUser.role} onBack={handleBackToDashboard} />
            )}
            {currentView === 'settings' && (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-600">
                  <h2 className="text-2xl font-semibold mb-2">Settings</h2>
                  <p>This view is under development</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Admin Views */}
        {currentUser.role === 'admin' && (
          <>
            {currentView === 'admin-dashboard' && (
              <AdminPanel onNavigate={handleNavigate} />
            )}
            {currentView === 'provider-management' && (
              <AdminPanel onNavigate={handleNavigate} />
            )}
            {currentView === 'dea-verification' && (
              <AdminPanel onNavigate={handleNavigate} />
            )}
            {currentView === 'audit-logs' && (
              <AdminPanel onNavigate={handleNavigate} />
            )}
            {currentView === 'security-settings' && (
              <AdminPanel onNavigate={handleNavigate} />
            )}
            {currentView === 'reports' && (
              <Reports userRole={currentUser.role} onBack={handleBackToDashboard} />
            )}
          </>
        )}

        <Toaster />
      </div>
    );
  }

  return null;
}