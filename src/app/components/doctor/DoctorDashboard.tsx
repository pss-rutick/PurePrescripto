// src/app/components/doctor/DoctorDashboard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Calendar,
  Users,
  FileText,
  AlertTriangle,
  ShieldAlert,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react';
import { mockAlerts, mockRefillRequests, mockPatients } from '../../lib/mockData';

interface DoctorDashboardProps {
  onNavigate: (view: string, data?: any) => void;
  userName: string;
}

export function DoctorDashboard({ onNavigate, userName }: DoctorDashboardProps) {
  const todaysAppointments = [
    { time: '09:00 AM', patient: 'John Smith', type: 'Follow-up', status: 'Completed' },
    { time: '10:30 AM', patient: 'Maria Garcia', type: 'Annual Physical', status: 'In Progress' },
    { time: '02:00 PM', patient: 'Robert Williams', type: 'New Patient', status: 'Scheduled' },
    { time: '03:30 PM', patient: 'Lisa Chen', type: 'Medication Review', status: 'Scheduled' }
  ];

  const stats = [
    { label: 'Patients Today', value: '12', icon: Users, color: 'blue' },
    { label: 'Active Alerts', value: mockAlerts.length.toString(), icon: AlertTriangle, color: 'red' },
    { label: 'Prescriptions (30d)', value: '247', icon: TrendingUp, color: 'emerald' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">
              Welcome back, {userName} • Friday, February 13, 2026
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('new-prescription')}>
            <FileText className="h-4 w-4 mr-2" />
            New Prescription
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Critical Alerts */}
        <div className="space-y-3">
          {mockAlerts.filter(a => a.severity === 'critical').map((alert) => (
            <Alert key={alert.id} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
          {mockAlerts.filter(a => a.severity === 'warning').map((alert) => (
            <Alert key={alert.id} className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-900">{alert.title}</AlertTitle>
              <AlertDescription className="text-amber-800">{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                      <p className="text-3xl font-semibold mt-2">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Appointments
              </CardTitle>
              <CardDescription>4 patients scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysAppointments.map((apt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span className="font-medium">{apt.time}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{apt.patient}</div>
                        <div className="text-xs text-slate-600">{apt.type}</div>
                      </div>
                    </div>
                    <Badge
                      variant={apt.status === 'Completed' ? 'default' : apt.status === 'In Progress' ? 'secondary' : 'outline'}
                    >
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Refill Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Refill Requests
              </CardTitle>
              <CardDescription>{mockRefillRequests.length} requests awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRefillRequests.slice(0, 4).map((refill) => (
                  <div key={refill.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{refill.patientName}</div>
                      <div className="text-xs text-slate-600">{refill.medication}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Last fill: {refill.lastFillDate}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onNavigate('refills')}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => onNavigate('refills')}
              >
                View All Refills
              </Button>
            </CardContent>
          </Card>
        </div>


        {/* Controlled Substance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              Controlled Substance Summary
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Schedule II Prescriptions</span>
                <span className="text-lg font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Schedule III-V Prescriptions</span>
                <span className="text-lg font-semibold">67</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">PDMP Checks Performed</span>
                <span className="text-lg font-semibold">91</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-emerald-600">
                  <Activity className="h-4 w-4" />
                  <span>100% compliance with DEA requirements</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onNavigate('controlled-substances')}
            >
              View Detailed Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity Log
            </CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <span className="text-slate-600">10:45 AM</span>
                <span>Prescribed Atorvastatin 20mg to John Smith</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
                <span className="text-slate-600">10:30 AM</span>
                <span>Approved refill request for Maria Garcia - Albuterol</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                <span className="text-slate-600">09:15 AM</span>
                <span>PDMP check performed for Robert Williams</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <span className="text-slate-600">Yesterday 4:20 PM</span>
                <span>Updated patient allergies for Lisa Chen</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
