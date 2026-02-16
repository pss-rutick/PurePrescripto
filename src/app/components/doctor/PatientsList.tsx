import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, User, AlertTriangle } from 'lucide-react';
import { mockPatients } from '../../lib/mockData';
import { Patient } from '../../lib/types';

interface PatientsListProps {
  onSelectPatient: (patient: Patient) => void;
}

export function PatientsList({ onSelectPatient }: PatientsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Patients</h1>
            <p className="text-sm text-slate-600 mt-1">
              {mockPatients.length} patients in system
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by patient name or MRN..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onSelectPatient(patient)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-slate-600">
                          MRN: {patient.id} • DOB: {patient.dob} • Age: {patient.age}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{patient.insurance}</Badge>
                          {patient.medications.length > 0 && (
                            <Badge variant="secondary">{patient.medications.length} active meds</Badge>
                          )}
                          {patient.allergies.length > 0 && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {patient.allergies.length} allergies
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
