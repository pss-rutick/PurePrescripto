import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  FileBarChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Users,
  Pill,
  DollarSign,
  Clock,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { UserRole } from '../../lib/types';

interface ReportsProps {
  userRole: UserRole;
  onBack: () => void;
}

export function Reports({ userRole, onBack }: ReportsProps) {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts
  const prescriptionVolumeData = [
    { month: 'Aug', prescriptions: 245, controlled: 45 },
    { month: 'Sep', prescriptions: 289, controlled: 52 },
    { month: 'Oct', prescriptions: 312, controlled: 48 },
    { month: 'Nov', prescriptions: 298, controlled: 55 },
    { month: 'Dec', prescriptions: 334, controlled: 61 },
    { month: 'Jan', prescriptions: 356, controlled: 58 },
    { month: 'Feb', prescriptions: 247, controlled: 42 }
  ];

  const topMedicationsData = [
    { name: 'Lisinopril', count: 156, percentage: 12.4 },
    { name: 'Metformin', count: 142, percentage: 11.3 },
    { name: 'Atorvastatin', count: 128, percentage: 10.2 },
    { name: 'Amlodipine', count: 98, percentage: 7.8 },
    { name: 'Omeprazole', count: 87, percentage: 6.9 }
  ];

  const diagnosisDistribution = [
    { name: 'Hypertension', value: 245, color: '#3b82f6' },
    { name: 'Diabetes', value: 198, color: '#8b5cf6' },
    { name: 'Hyperlipidemia', value: 167, color: '#06b6d4' },
    { name: 'Asthma', value: 123, color: '#10b981' },
    { name: 'GERD', value: 98, color: '#f59e0b' },
    { name: 'Other', value: 289, color: '#6b7280' }
  ];

  const controlledSubstanceData = [
    { schedule: 'Schedule II', count: 45, trend: 'up' },
    { schedule: 'Schedule III', count: 28, trend: 'down' },
    { schedule: 'Schedule IV', count: 67, trend: 'up' },
    { schedule: 'Schedule V', count: 12, trend: 'stable' }
  ];

  const complianceMetrics = [
    { metric: 'EPCS Compliance', value: 99.8, status: 'excellent' },
    { metric: 'PDMP Checks', value: 100, status: 'excellent' },
    { metric: 'Drug Interaction Review', value: 98.5, status: 'excellent' },
    { metric: 'Prior Auth Follow-up', value: 94.2, status: 'good' }
  ];

  const pharmacyDispenseData = [
    { day: 'Mon', dispensed: 45, pending: 8 },
    { day: 'Tue', dispensed: 52, pending: 6 },
    { day: 'Wed', dispensed: 48, pending: 12 },
    { day: 'Thu', dispensed: 61, pending: 9 },
    { day: 'Fri', dispensed: 58, pending: 15 },
    { day: 'Sat', dispensed: 32, pending: 5 },
    { day: 'Sun', dispensed: 28, pending: 3 }
  ];

  const costSavingsData = [
    { category: 'Generic Substitution', savings: 45680, percentage: 42 },
    { category: 'Therapeutic Alternative', savings: 28450, percentage: 26 },
    { category: 'Formulary Compliance', savings: 19230, percentage: 18 },
    { category: 'Prior Auth Optimization', savings: 15420, percentage: 14 }
  ];

  const handleExportReport = () => {
    // Mock export functionality
    console.log('Exporting report...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-amber-600';
      case 'critical': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Reports & Analytics</h1>
              <p className="text-sm text-slate-600 mt-1">
                Comprehensive reporting and compliance analytics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Prescriptions</p>
                  <p className="text-3xl font-semibold mt-2">2,342</p>
                  <div className="flex items-center gap-1 mt-2 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+12.5%</span>
                  </div>
                </div>
                <Pill className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Patients</p>
                  <p className="text-3xl font-semibold mt-2">1,847</p>
                  <div className="flex items-center gap-1 mt-2 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+8.1%</span>
                  </div>
                </div>
                <Users className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Different Report Views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="controlled">Controlled Substances</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            {userRole === 'pharmacist' && <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>}
            {userRole === 'admin' && <TabsTrigger value="admin">Admin</TabsTrigger>}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Volume Trend</CardTitle>
                  <CardDescription>Monthly prescription activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={prescriptionVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="prescriptions" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="controlled" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diagnosis Distribution</CardTitle>
                  <CardDescription>Top diagnoses by volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={diagnosisDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => entry.name}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {diagnosisDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={prescriptionVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="prescriptions" fill="#3b82f6" />
                    <Bar dataKey="controlled" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costSavingsData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm font-semibold text-emerald-600">
                            ${item.savings.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${item.percentage * 2}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prescription Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Completed</p>
                        <p className="text-2xl font-semibold text-emerald-600">2,156</p>
                      </div>
                      <div className="text-sm text-slate-600">92.1%</div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Pending</p>
                        <p className="text-2xl font-semibold text-amber-600">142</p>
                      </div>
                      <div className="text-sm text-slate-600">6.1%</div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Cancelled</p>
                        <p className="text-2xl font-semibold text-slate-600">44</p>
                      </div>
                      <div className="text-sm text-slate-600">1.8%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Controlled Substances Tab */}
          <TabsContent value="controlled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Controlled Substance Monitoring</CardTitle>
                <CardDescription>DEA EPCS compliance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {controlledSubstanceData.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium">{item.schedule}</p>
                            <p className="text-sm text-slate-600">{item.count} prescriptions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' && (
                            <TrendingUp className="h-5 w-5 text-red-600" />
                          )}
                          {item.trend === 'down' && (
                            <TrendingDown className="h-5 w-5 text-emerald-600" />
                          )}
                          <Badge variant={item.trend === 'up' ? 'destructive' : 'secondary'}>
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PDMP Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm text-emerald-700">PDMP Checks Completed</p>
                    <p className="text-2xl font-semibold text-emerald-900 mt-1">152/152</p>
                    <Badge className="mt-2 bg-emerald-600">100% Compliance</Badge>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">2FA Verifications</p>
                    <p className="text-2xl font-semibold text-blue-900 mt-1">152/152</p>
                    <Badge className="mt-2 bg-blue-600">100% Compliance</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
                <CardDescription>HIPAA, DEA, and Surescripts compliance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{metric.metric}</span>
                        <span className={`text-2xl font-semibold ${getStatusColor(metric.status)}`}>
                          {metric.value}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-emerald-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Log Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Total Audit Entries</span>
                    <Badge variant="secondary">12,456</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Security Events</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Failed Login Attempts</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Data Access Logs</span>
                    <Badge variant="secondary">8,934</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pharmacy Tab */}
          {userRole === 'pharmacist' && (
            <TabsContent value="pharmacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dispensing Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={pharmacyDispenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="dispensed" fill="#10b981" />
                      <Bar dataKey="pending" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600">Avg. Fill Time</p>
                    <p className="text-3xl font-semibold mt-2">18 min</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-600">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm">-5 min</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600">Refills Processed</p>
                    <p className="text-3xl font-semibold mt-2">324</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+12%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600">Counseling Sessions</p>
                    <p className="text-3xl font-semibold mt-2">87</p>
                    <Badge className="mt-2 bg-blue-600">Target: 80</Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Admin Tab */}
          {userRole === 'admin' && (
            <TabsContent value="admin" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-slate-600">System Uptime</p>
                      <p className="text-2xl font-semibold text-emerald-600">99.98%</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-slate-600">API Response Time</p>
                      <p className="text-2xl font-semibold text-blue-600">142ms</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-slate-600">Active Users</p>
                      <p className="text-2xl font-semibold text-slate-900">847</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-slate-600">Total Transactions</p>
                      <p className="text-2xl font-semibold text-slate-900">45,678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
