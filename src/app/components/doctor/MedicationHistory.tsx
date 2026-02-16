import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Calendar, Pill, User, Filter } from 'lucide-react';
import { mockPatients } from '../../lib/mockData';

interface MedicationHistoryProps {
    onBack: () => void;
}

export function MedicationHistory({ onBack }: MedicationHistoryProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

    // Flatten all medications from all patients with patient info
    const allMedications = mockPatients.flatMap(patient =>
        patient.medications.map(med => ({
            ...med,
            patientId: patient.id,
            patientName: patient.name,
            patientAge: patient.age,
            patientAllergies: patient.allergies
        }))
    );

    // Filter medications based on search
    const filteredMedications = allMedications.filter(med =>
        (selectedPatient ? med.patientId === selectedPatient : true) &&
        (med.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.genericName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort by prescribed date (most recent first)
    const sortedMedications = [...filteredMedications].sort((a, b) =>
        new Date(b.prescribedDate).getTime() - new Date(a.prescribedDate).getTime()
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Medication History</h1>
                        <p className="text-sm text-slate-600 mt-1">
                            Complete medication records for all patients
                        </p>
                    </div>
                    <Button variant="outline" onClick={onBack}>
                        ← Back to Dashboard
                    </Button>
                </div>
            </div>

            <div className="p-8 space-y-6">
                {/* Search and Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by patient name or medication..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border rounded-md text-sm"
                                value={selectedPatient || ''}
                                onChange={(e) => setSelectedPatient(e.target.value || null)}
                            >
                                <option value="">All Patients</option>
                                {mockPatients.map(patient => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </select>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                More Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">Total Medications</p>
                                    <p className="text-3xl font-semibold mt-2">{allMedications.length}</p>
                                </div>
                                <Pill className="h-12 w-12 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">Active Patients</p>
                                    <p className="text-3xl font-semibold mt-2">
                                        {mockPatients.filter(p => p.medications.length > 0).length}
                                    </p>
                                </div>
                                <User className="h-12 w-12 text-emerald-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">Controlled Substances</p>
                                    <p className="text-3xl font-semibold mt-2">
                                        {allMedications.filter(m => m.scheduleClass).length}
                                    </p>
                                </div>
                                <Badge className="h-12 w-12 bg-red-100 text-red-600 flex items-center justify-center text-xl">
                                    C
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">This Month</p>
                                    <p className="text-3xl font-semibold mt-2">
                                        {allMedications.filter(m => {
                                            const date = new Date(m.prescribedDate);
                                            const now = new Date();
                                            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                                        }).length}
                                    </p>
                                </div>
                                <Calendar className="h-12 w-12 text-amber-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Medication List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Medication Records ({sortedMedications.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {sortedMedications.length === 0 ? (
                            <div className="text-center py-12 text-slate-600">
                                <Pill className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                                <p>No medications found</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {sortedMedications.map((med, index) => (
                                    <div
                                        key={`${med.patientId}-${med.id}-${index}`}
                                        className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="grid grid-cols-6 gap-4">
                                            <div className="col-span-2">
                                                <div className="text-xs text-slate-600 mb-1">Patient</div>
                                                <div className="font-medium">{med.patientName}</div>
                                                <div className="text-xs text-slate-500">Age: {med.patientAge}</div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="text-xs text-slate-600 mb-1">Medication</div>
                                                <div className="font-medium">{med.name}</div>
                                                <div className="text-xs text-slate-500">{med.genericName}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-600 mb-1">Strength</div>
                                                <div className="text-sm font-medium">{med.strength}</div>
                                                <div className="text-xs text-slate-500">{med.dosageForm}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-600 mb-1">Details</div>
                                                <div className="text-xs">Qty: {med.quantity}</div>
                                                <div className="text-xs">Refills: {med.refills}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t">
                                            <div className="grid grid-cols-3 gap-4 text-xs">
                                                <div>
                                                    <span className="text-slate-600">SIG:</span> {med.sig}
                                                </div>
                                                <div>
                                                    <span className="text-slate-600">Prescribed:</span> {new Date(med.prescribedDate).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    <span className="text-slate-600">Pharmacy:</span> {med.pharmacy}
                                                </div>
                                            </div>
                                            {med.scheduleClass && (
                                                <div className="mt-2">
                                                    <Badge variant="destructive" className="text-xs">
                                                        {med.scheduleClass}
                                                    </Badge>
                                                </div>
                                            )}
                                            {med.patientAllergies.length > 0 && (
                                                <div className="mt-2">
                                                    <span className="text-xs text-amber-600">
                                                        ⚠️ Allergies: {med.patientAllergies.join(', ')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
