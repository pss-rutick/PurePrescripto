import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Users,
  ShieldAlert,
  History,
  Shield,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Key
} from 'lucide-react';
import { mockUsers } from '../../lib/mockData';

interface AdminPanelProps {
  onNavigate: (view: string) => void;
}

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const providers = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Internal Medicine', deaNumber: 'BJ1234563', npiNumber: '1234567890', status: 'active', deaExpiry: '2026-08-15' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Family Medicine', deaNumber: 'BC9876543', npiNumber: '0987654321', status: 'active', deaExpiry: '2026-12-01' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', deaNumber: 'BR5555555', npiNumber: '5555555555', status: 'pending', deaExpiry: '2027-03-20' }
  ];

  const auditLogs = [
    { id: 1, timestamp: '2026-02-13 10:45:23', user: 'Dr. Sarah Johnson', action: 'Prescribed controlled substance', details: 'Oxycodone 5mg to John Smith', level: 'high' },
    { id: 2, timestamp: '2026-02-13 10:30:15', user: 'Dr. Sarah Johnson', action: 'Approved refill', details: 'Metformin 500mg for John Smith', level: 'normal' },
    { id: 3, timestamp: '2026-02-13 09:15:42', user: 'Robert Chen, PharmD', action: 'Dispensed medication', details: 'Lisinopril 10mg to Maria Garcia', level: 'normal' },
    { id: 4, timestamp: '2026-02-13 08:45:10', user: 'Admin User', action: 'Updated provider DEA', details: 'Renewed DEA for Dr. Michael Chen', level: 'high' },
    { id: 5, timestamp: '2026-02-12 16:20:05', user: 'Dr. Sarah Johnson', action: 'PDMP check performed', details: 'Patient: Robert Williams', level: 'high' }
  ];

  const stats = [
    { label: 'Active Providers', value: '24', icon: Users, color: 'blue' },
    { label: 'DEA Renewals Due', value: '3', icon: ShieldAlert, color: 'amber' },
    { label: 'Audit Events Today', value: '156', icon: History, color: 'slate' },
    { label: 'Compliance Score', value: '98%', icon: CheckCircle, color: 'emerald' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
            <p className="text-sm text-slate-600 mt-1">
              System administration and compliance management
            </p>
          </div>
          <Badge variant="outline">System Administrator</Badge>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="dea">DEA Verification</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>

          {/* Providers Tab */}
          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Provider Management
                </CardTitle>
                <CardDescription>Manage healthcare providers and their credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {providers.map((provider) => (
                    <div key={provider.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{provider.name}</div>
                            <Badge variant={provider.status === 'active' ? 'default' : 'secondary'}>
                              {provider.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600">{provider.specialty}</div>
                          <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                            <div>
                              <span className="text-slate-500">DEA:</span>
                              <span className="ml-2 font-mono">{provider.deaNumber}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">NPI:</span>
                              <span className="ml-2 font-mono">{provider.npiNumber}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">DEA Expiry:</span>
                              <span className="ml-2">{provider.deaExpiry}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    + Add New Provider
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEA Verification Tab */}
          <TabsContent value="dea">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                  DEA Verification Status
                </CardTitle>
                <CardDescription>Monitor DEA registrations and compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Expiring Soon */}
                <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-amber-900">3 DEA Registrations Expiring Soon</div>
                      <div className="text-sm text-amber-700 mt-1">
                        The following providers need to renew their DEA registrations within 90 days
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white rounded">
                          <div className="text-sm">
                            <span className="font-medium">Dr. Sarah Johnson</span>
                            <span className="text-slate-600 ml-2">Expires: 2026-08-15 (184 days)</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-semibold text-emerald-600">21</div>
                    <div className="text-sm text-slate-600 mt-1">Verified & Active</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-semibold text-amber-600">3</div>
                    <div className="text-sm text-slate-600 mt-1">Expiring Soon</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-semibold text-blue-600">2</div>
                    <div className="text-sm text-slate-600 mt-1">Pending Verification</div>
                  </div>
                </div>

                {/* DEA Verification Actions */}
                <div className="space-y-3">
                  <Label>Manual DEA Verification</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Enter DEA Number" />
                    <Button className="bg-red-600 hover:bg-red-700">
                      Verify DEA Number
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Audit Logs
                </CardTitle>
                <CardDescription>Complete system activity audit trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-lg border ${
                        log.level === 'high' ? 'bg-red-50 border-red-200' : 'bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-500">{log.timestamp}</span>
                            {log.level === 'high' && (
                              <Badge variant="destructive" className="text-xs">High Security</Badge>
                            )}
                          </div>
                          <div className="mt-1 space-y-1">
                            <div className="text-sm font-medium">{log.action}</div>
                            <div className="text-xs text-slate-600">User: {log.user}</div>
                            <div className="text-xs text-slate-500">{log.details}</div>
                          </div>
                        </div>
                        <Activity className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Load More Logs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security policies and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Session Settings */}
                <div className="space-y-4">
                  <div className="font-medium">Session Management</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Automatic Session Timeout</div>
                        <div className="text-xs text-slate-600">Logout users after inactivity</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Timeout Duration (minutes)</Label>
                      <Input className="w-24" type="number" defaultValue="15" />
                    </div>
                  </div>
                </div>

                {/* 2FA Settings */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Require 2FA for All Users</div>
                        <div className="text-xs text-slate-600">Mandatory for DEA EPCS compliance</div>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Enhanced 2FA for Controlled Substances</div>
                        <div className="text-xs text-slate-600">Additional verification for Schedule II drugs</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Password Policy */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="font-medium">Password Policy</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Minimum Password Length</Label>
                      <Input className="w-24" type="number" defaultValue="12" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Require Complex Passwords</div>
                        <div className="text-xs text-slate-600">Include uppercase, lowercase, numbers, symbols</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Password Expiry (days)</Label>
                      <Input className="w-24" type="number" defaultValue="90" />
                    </div>
                  </div>
                </div>

                {/* IP Restrictions */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="font-medium">IP Address Restrictions</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Enable IP Whitelisting</div>
                      <div className="text-xs text-slate-600">Restrict access to specific IP ranges</div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="w-full">Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys & Integrations
                </CardTitle>
                <CardDescription>Manage FHIR and external system integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Active Integrations */}
                <div className="space-y-3">
                  <div className="font-medium">Active Integrations</div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium">Surescripts</span>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </div>
                        <div className="text-xs text-slate-600">E-Prescribing network integration</div>
                        <div className="text-xs font-mono text-slate-500">API Key: sure_live_•••••••••••1234</div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium">PDMP Gateway</span>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </div>
                        <div className="text-xs text-slate-600">Prescription Drug Monitoring Program</div>
                        <div className="text-xs font-mono text-slate-500">API Key: pdmp_live_•••••••••••5678</div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium">FHIR API (R4)</span>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </div>
                        <div className="text-xs text-slate-600">Fast Healthcare Interoperability Resources</div>
                        <div className="text-xs font-mono text-slate-500">Endpoint: https://fhir.healthsys.com/r4</div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>

                  <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <span className="font-medium">DEA EPCS</span>
                          <Badge variant="secondary" className="text-xs">Configuration Required</Badge>
                        </div>
                        <div className="text-xs text-amber-700">Electronic Prescribing for Controlled Substances</div>
                      </div>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">Configure</Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  + Add New Integration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Compliance Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Compliance Dashboard
            </CardTitle>
            <CardDescription>HIPAA, DEA, and regulatory compliance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium text-emerald-900">HIPAA Compliance</div>
                    <div className="text-xs text-emerald-700">All security measures in place</div>
                  </div>
                </div>
                <Badge className="bg-emerald-600">100%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium text-emerald-900">DEA EPCS Compliance</div>
                    <div className="text-xs text-emerald-700">All providers verified and active</div>
                  </div>
                </div>
                <Badge className="bg-emerald-600">98%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">Audit Log Retention</div>
                    <div className="text-xs text-blue-700">7 years of records maintained</div>
                  </div>
                </div>
                <Badge className="bg-blue-600">Compliant</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
