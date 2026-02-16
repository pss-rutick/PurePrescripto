import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  FileText,
  Pill,
  Activity,
  ShieldAlert,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';
import { Patient } from '../../lib/types';

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
  onNewPrescription: (patient: Patient) => void;
}

export function PatientProfile({ patient, onBack, onNewPrescription }: PatientProfileProps) {
  const [showAllergyAlert, setShowAllergyAlert] = useState(patient.allergies.length > 0);

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
              <h1 className="text-2xl font-semibold text-slate-900">{patient.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                <span>DOB: {patient.dob}</span>
                <span>Age: {patient.age} years</span>
                <span>MRN: {patient.id}</span>
              </div>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onNewPrescription(patient)}>
            <FileText className="h-4 w-4 mr-2" />
            New Prescription
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Allergy Alert */}
        {showAllergyAlert && patient.allergies.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Drug Allergies on File</AlertTitle>
            <AlertDescription>
              <div className="flex items-center gap-2 mt-2">
                <span>Patient is allergic to:</span>
                {patient.allergies.map((allergy, idx) => (
                  <Badge key={idx} variant="destructive">{allergy}</Badge>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-xs text-slate-600">Insurance</div>
                  <div className="font-medium text-sm">{patient.insurance}</div>
                  {patient.medicareId && (
                    <div className="text-xs text-slate-500 mt-1">Medicare: {patient.medicareId}</div>
                  )}
                  {patient.medicaidId && (
                    <div className="text-xs text-slate-500 mt-1">Medicaid: {patient.medicaidId}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Pill className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-xs text-slate-600">Active Medications</div>
                  <div className="font-medium text-sm">{patient.medications.length} medications</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="text-xs text-slate-600">Active Conditions</div>
                  <div className="font-medium text-sm">{patient.conditions.length} conditions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="medications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="conditions">Conditions (ICD-10)</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
            {/* <TabsTrigger value="pdmp">PDMP Check</TabsTrigger> */}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-slate-600 mb-4">Demographics</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Name:</span>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Date of Birth:</span>
                        <span className="font-medium">{patient.dob}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Age:</span>
                        <span className="font-medium">{patient.age} years</span>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <div className="text-sm text-slate-600 mb-4">Insurance Information</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Primary:</span>
                        <span className="font-medium">{patient.insurance}</span>
                      </div>
                      {patient.medicareId && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-600">Medicare ID:</span>
                          <span className="font-medium">{patient.medicareId}</span>
                        </div>
                      )}
                      {patient.medicaidId && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-600">Medicaid ID:</span>
                          <span className="font-medium">{patient.medicaidId}</span>
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medications.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    No active medications on file
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patient.medications.map((med) => (
                      <div key={med.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">{med.name}</div>
                            <div className="text-sm text-slate-600">{med.genericName}</div>
                          </div>
                          {med.scheduleClass && (
                            <Badge variant="destructive">{med.scheduleClass}</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Strength:</span>
                            <span className="ml-2 font-medium">{med.strength}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Form:</span>
                            <span className="ml-2 font-medium">{med.dosageForm}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-600">Sig:</span>
                            <span className="ml-2">{med.sig}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Quantity:</span>
                            <span className="ml-2 font-medium">{med.quantity}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Refills:</span>
                            <span className="ml-2 font-medium">{med.refills}</span>
                          </div>
                          <div className="col-span-2 text-xs text-slate-500">
                            Prescribed by {med.prescribedBy} on {med.prescribedDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Allergies Tab */}
          <TabsContent value="allergies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Drug Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patient.allergies.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    No known drug allergies
                  </div>
                ) : (
                  <div className="space-y-3">
                    {patient.allergies.map((allergy, idx) => (
                      <div key={idx} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <div className="font-medium text-red-900">{allergy}</div>
                            <div className="text-sm text-red-700 mt-1">
                              Reaction type: Severe allergic reaction
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conditions Tab */}
          <TabsContent value="conditions">
            <Card>
              <CardHeader>
                <CardTitle>Active Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.conditions.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    No active conditions documented
                  </div>
                ) : (
                  <div className="space-y-3">
                    {patient.conditions.map((condition) => (
                      <div key={condition.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">{condition.name}</div>
                            <div className="text-sm text-slate-600 mt-1">
                              ICD-10: {condition.icd10Code}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              Diagnosed: {condition.diagnosedDate}
                            </div>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescription History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Prescription History</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medications.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    No prescription history available
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(() => {
                      // Group medications by date
                      const groupedByDate = patient.medications.reduce((groups, med) => {
                        const date = med.prescribedDate;
                        if (!groups[date]) {
                          groups[date] = [];
                        }
                        groups[date].push(med);
                        return groups;
                      }, {} as Record<string, typeof patient.medications>);

                      // Sort dates in descending order (most recent first)
                      const sortedDates = Object.keys(groupedByDate).sort((a, b) =>
                        new Date(b).getTime() - new Date(a).getTime()
                      );

                      // Helper function to get relative date label
                      const getRelativeDateLabel = (dateStr: string) => {
                        const date = new Date(dateStr);
                        const today = new Date();
                        const yesterday = new Date(today);
                        yesterday.setDate(yesterday.getDate() - 1);

                        // Reset time to compare only dates
                        const resetTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
                        const dateOnly = resetTime(date);
                        const todayOnly = resetTime(today);
                        const yesterdayOnly = resetTime(yesterday);

                        if (dateOnly.getTime() === todayOnly.getTime()) {
                          return 'Today';
                        } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
                          return 'Yesterday';
                        } else {
                          const diffTime = todayOnly.getTime() - dateOnly.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                          if (diffDays < 7) {
                            return `${diffDays} days ago`;
                          } else if (diffDays < 30) {
                            const weeks = Math.floor(diffDays / 7);
                            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
                          } else if (diffDays < 365) {
                            const months = Math.floor(diffDays / 30);
                            return months === 1 ? '1 month ago' : `${months} months ago`;
                          } else {
                            const years = Math.floor(diffDays / 365);
                            return years === 1 ? '1 year ago' : `${years} years ago`;
                          }
                        }
                      };

                      return sortedDates.map((date) => (
                        <div key={date} className="space-y-3">
                          {/* Date Header */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              {getRelativeDateLabel(date)}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="flex-1 h-px bg-slate-200"></div>
                          </div>

                          {/* Medications for this date */}
                          <div className="space-y-2 ml-6">
                            {groupedByDate[date].map((med) => (
                              <div key={med.id} className="p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1 flex-1">
                                    <div className="font-medium flex items-center gap-2">
                                      {med.name} {med.strength}
                                      {med.scheduleClass && (
                                        <Badge variant="destructive" className="text-xs">
                                          {med.scheduleClass}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-slate-600">{med.sig}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-4 mt-2">
                                      <span>Qty: {med.quantity}</span>
                                      <span>Refills: {med.refills}</span>
                                      <span>Pharmacy: {med.pharmacy}</span>
                                    </div>
                                  </div>
                                  <Badge variant="secondary">Active</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* PDMP Check Tab
          <TabsContent value="pdmp">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                  PDMP (Prescription Drug Monitoring Program) Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>PDMP Check Required</AlertTitle>
                  <AlertDescription>
                    Before prescribing controlled substances, check the state PDMP database
                  </AlertDescription>
                </Alert>
                <Button className="w-full" variant="outline">
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Perform PDMP Check
                </Button>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Last PDMP Check</div>
                  <div className="text-xs text-slate-600">February 10, 2026 at 2:30 PM</div>
                  <div className="text-xs text-slate-600 mt-2">
                    Result: No concerning patterns detected
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
