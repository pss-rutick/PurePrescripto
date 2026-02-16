import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
    Search,
    ShieldAlert,
    Calendar,
    User,
    FileText,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Activity
} from 'lucide-react';
import { mockPatients, mockPrescriptions } from '../../lib/mockData';

interface ControlledSubstancesProps {
    onBack: () => void;
}

export function ControlledSubstances({ onBack }: ControlledSubstancesProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [timeFilter, setTimeFilter] = useState('30'); // days

    // Get all controlled substance medications
    const controlledMeds = mockPatients.flatMap(patient =>
        patient.medications
            .filter(med => med.scheduleClass)
            .map(med => ({
                ...med,
                patientId: patient.id,
                patientName: patient.name,
                patientAge: patient.age,
                patientDOB: patient.dob
            }))
    );

    // Get controlled substance prescriptions
    const controlledPrescriptions = mockPrescriptions.filter(rx => rx.isControlled);

    // Filter based on search
    const filteredMeds = controlledMeds.filter(med =>
        med.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (med.scheduleClass && med.scheduleClass.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Calculate statistics
    const scheduleIICount = controlledMeds.filter(m => m.scheduleClass?.includes('II')).length;
    const scheduleIIIVCount = controlledMeds.filter(m =>
        m.scheduleClass && !m.scheduleClass.includes('II')
    ).length;
    const totalPrescribed = controlledPrescriptions.length;

    // Mock PDMP data
    const pdmpChecks = [
        { id: 1, patient: 'Ananya Pawar', date: '2026-02-14', result: 'No concerns', risk: 'low' },
        { id: 2, patient: 'Manisha Chavan', date: '2026-02-13', result: 'No concerns', risk: 'low' },
        { id: 3, patient: 'Omkar Katale', date: '2026-02-10', result: 'Multiple prescribers noted', risk: 'medium' }
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Controlled Substances</h1>
                        <p className="text-sm text-slate-600 mt-1">
                            DEA-compliant controlled substance prescribing and monitoring
                        </p>
                    </div>
                    <Button variant="outline" onClick={onBack}>
                        ← Back to Dashboard
                    </Button>
                </div>
            </div>

            <div className="p-8 space-y-6">
                {/* DEA Compliance Alert */}
                <Alert className="border-emerald-200 bg-emerald-50">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <AlertTitle className="text-emerald-900">DEA Compliance Status</AlertTitle>
                    <AlertDescription className="text-emerald-800">
                        100% compliance with DEA EPCS requirements. DEA registration valid until August 15, 2026.
                    </AlertDescription>
                </Alert>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">Schedule II</p>
                                    <p className="text-3xl font-semibold mt-2">{scheduleIICount}</p>
                                    <p className="text-xs text-slate-500 mt-1">Active prescriptions</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                    <ShieldAlert className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">Schedule III-V</p>
                                    <p className="text-3xl font-semibold mt-2">{scheduleIIIVCount}</p>
                                    <p className="text-xs text-slate-500 mt-1">Active prescriptions</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">Prescribed (30d)</p>
                                    <p className="text-3xl font-semibold mt-2">24</p>
                                    <p className="text-xs text-slate-500 mt-1">Total prescriptions</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">PDMP Checks</p>
                                    <p className="text-3xl font-semibold mt-2">91</p>
                                    <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-emerald-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by patient name, medication, or schedule..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border rounded-md text-sm"
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                                <option value="365">Last year</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Controlled Substances */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5 text-red-600" />
                                Active Controlled Substances ({filteredMeds.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {filteredMeds.length === 0 ? (
                                <div className="text-center py-12 text-slate-600">
                                    <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                                    <p>No controlled substances found</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                    {filteredMeds.map((med, index) => (
                                        <div
                                            key={`${med.patientId}-${med.id}-${index}`}
                                            className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <div className="font-medium">{med.name}</div>
                                                    <div className="text-sm text-slate-600">{med.genericName}</div>
                                                </div>
                                                <Badge
                                                    variant="destructive"
                                                    className={med.scheduleClass?.includes('II') ? 'bg-red-600' : 'bg-amber-600'}
                                                >
                                                    {med.scheduleClass}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                                                <div>
                                                    <span className="text-slate-600">Patient:</span> {med.patientName}
                                                </div>
                                                <div>
                                                    <span className="text-slate-600">Strength:</span> {med.strength}
                                                </div>
                                                <div>
                                                    <span className="text-slate-600">Quantity:</span> {med.quantity}
                                                </div>
                                                <div>
                                                    <span className="text-slate-600">Refills:</span> {med.refills}
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-slate-600">
                                                <span className="font-medium">SIG:</span> {med.sig}
                                            </div>
                                            <div className="mt-2 text-xs text-slate-500">
                                                Prescribed: {new Date(med.prescribedDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* PDMP Checks */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-emerald-600" />
                                Recent PDMP Checks
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {pdmpChecks.map((check) => (
                                    <div
                                        key={check.id}
                                        className="p-4 border rounded-lg"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="font-medium">{check.patient}</div>
                                                <div className="text-xs text-slate-500 mt-1">
                                                    <Calendar className="h-3 w-3 inline mr-1" />
                                                    {new Date(check.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Badge
                                                variant={check.risk === 'low' ? 'default' : 'secondary'}
                                                className={
                                                    check.risk === 'low'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                }
                                            >
                                                {check.risk === 'low' ? 'Low Risk' : 'Medium Risk'}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            {check.result}
                                        </div>
                                        {check.risk === 'medium' && (
                                            <div className="mt-2">
                                                <Button size="sm" variant="outline" className="text-xs">
                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                    Review Details
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4">
                                View All PDMP Checks
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Compliance Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>DEA Compliance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">PDMP Checks Performed</span>
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="text-2xl font-semibold">100%</div>
                                <div className="text-xs text-slate-500">All required checks completed</div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">E-Prescribing Compliance</span>
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="text-2xl font-semibold">100%</div>
                                <div className="text-xs text-slate-500">EPCS requirements met</div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">Documentation Complete</span>
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="text-2xl font-semibold">100%</div>
                                <div className="text-xs text-slate-500">All records properly documented</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Controlled Substance Schedule Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Badge variant="destructive" className="bg-red-600">Schedule II</Badge>
                                    <div>
                                        <div className="font-medium">High Potential for Abuse</div>
                                        <div className="text-xs text-slate-600">Examples: Oxycodone, Adderall, Fentanyl</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold">{scheduleIICount}</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-amber-600">Schedule III</Badge>
                                    <div>
                                        <div className="font-medium">Moderate to Low Potential</div>
                                        <div className="text-xs text-slate-600">Examples: Codeine, Ketamine, Anabolic steroids</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold">0</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-yellow-600">Schedule IV</Badge>
                                    <div>
                                        <div className="font-medium">Low Potential for Abuse</div>
                                        <div className="text-xs text-slate-600">Examples: Xanax, Valium, Ambien</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold">{scheduleIIIVCount}</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-green-600">Schedule V</Badge>
                                    <div>
                                        <div className="font-medium">Lowest Potential for Abuse</div>
                                        <div className="text-xs text-slate-600">Examples: Cough preparations with codeine</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold">0</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
