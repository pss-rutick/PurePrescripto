import { UserRole } from '../../lib/types';
import {
  LayoutDashboard,
  Users,
  FileText,
  RefreshCw,
  History,
  ShieldAlert,
  FileCheck,
  BarChart3,
  Settings,
  LogOut,
  Pill,
  Shield,
  Building2,
  Clock
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  userRole: UserRole;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName: string;
  deaNumber?: string;
}

export function Sidebar({ userRole, currentView, onNavigate, onLogout, userName, deaNumber }: SidebarProps) {
  const doctorMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'new-prescription', label: 'New Patient', icon: FileText },
    { id: 'refills', label: 'Refills', icon: RefreshCw },
    // { id: 'medication-history', label: 'Medication History', icon: History },
    // { id: 'controlled-substances', label: 'Controlled Substances', icon: ShieldAlert },
    // { id: 'prior-authorization', label: 'Prior Authorization', icon: FileCheck },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    // { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const pharmacistMenuItems = [
    { id: 'pharmacy-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'incoming-prescriptions', label: 'Incoming Prescriptions', icon: FileText },
    { id: 'verification-queue', label: 'Verification Queue', icon: FileCheck },
    { id: 'insurance-claims', label: 'Insurance Claims', icon: Building2 },
    { id: 'clarifications', label: 'Clarifications', icon: RefreshCw },
    { id: 'dispensed', label: 'Dispensed', icon: Pill },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'provider-management', label: 'Provider Management', icon: Users },
    { id: 'dea-verification', label: 'DEA Verification', icon: ShieldAlert },
    { id: 'audit-logs', label: 'Audit Logs', icon: History },
    { id: 'security-settings', label: 'Security Settings', icon: Shield },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const menuItems = userRole === 'doctor' ? doctorMenuItems :
    userRole === 'pharmacist' ? pharmacistMenuItems :
      adminMenuItems;

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/pss- logo1.jpeg"
            alt="PurePrescripto Logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-semibold">PurePrescripto</div>
            <div className="text-xs text-slate-400">Healthcare Platform</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="text-sm font-medium">{userName}</div>
          <div className="text-xs text-slate-400 capitalize">{userRole}</div>
          {deaNumber && (
            <div className="text-xs text-slate-400">DEA: {deaNumber}</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors',
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
