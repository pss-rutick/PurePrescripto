import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  MessageSquare,
  Package,
  TrendingUp
} from 'lucide-react';
import { mockPrescriptions } from '../../lib/mockData';

interface PharmacyDashboardProps {
  onNavigate: (view: string) => void;
}

export function PharmacyDashboard({ onNavigate }: PharmacyDashboardProps) {
  const [prescriptions] = useState(mockPrescriptions);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [substitution, setSubstitution] = useState('');

  const stats = [
    { label: 'Incoming Today', value: '24', icon: FileText, color: 'blue' },
    { label: 'In Verification', value: '8', icon: Clock, color: 'amber' },
    { label: 'Ready to Dispense', value: '12', icon: CheckCircle, color: 'emerald' },
    { label: 'Insurance Issues', value: '3', icon: AlertCircle, color: 'red' }
  ];

  const incomingPrescriptions = [
    { id: 'RX003', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', medication: 'Atorvastatin 20mg', quantity: 30, status: 'new', time: '10 min ago' },
    { id: 'RX004', patient: 'Maria Garcia', doctor: 'Dr. Sarah Johnson', medication: 'Lisinopril 10mg', quantity: 30, status: 'new', time: '25 min ago' },
    { id: 'RX005', patient: 'Robert Williams', doctor: 'Dr. Sarah Johnson', medication: 'Metformin 500mg', quantity: 60, status: 'new', time: '45 min ago' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Pharmacy Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">
              CVS Pharmacy #1234 • Friday, February 13, 2026
            </p>
          </div>
          <Badge className="bg-teal-600">Pharmacy View</Badge>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incoming Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Incoming Prescriptions
              </CardTitle>
              <CardDescription>{incomingPrescriptions.length} new prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incomingPrescriptions.map((rx) => (
                  <div key={rx.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{rx.patient}</div>
                        <div className="text-sm text-slate-600">{rx.medication}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Prescribed by {rx.doctor} • {rx.time}
                        </div>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setShowRejectModal(true)}>
                        Reject
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowSubstitutionModal(true)}>
                        Substitute
                      </Button>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        Accept & Verify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Verification Queue
              </CardTitle>
              <CardDescription>Prescriptions awaiting final verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prescriptions.slice(0, 3).map((rx) => (
                  <div key={rx.id} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{rx.patientName}</div>
                        <div className="text-sm text-slate-600">{rx.medication}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Qty: {rx.quantity} • Refills: {rx.refills}
                        </div>
                      </div>
                      <Badge className="bg-amber-600">Verifying</Badge>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700">
                      Complete Verification
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Insurance Claims */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Insurance Claims
              </CardTitle>
              <CardDescription>Claims requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-red-900">Claim Rejected</div>
                      <div className="text-sm text-red-700 mt-1">
                        Patient: John Smith • Atorvastatin 20mg
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        Reason: Prior authorization required
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                          Contact Provider
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                          Resubmit Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Copay Breakdown</div>
                      <div className="text-sm text-slate-600 mt-1">
                        Patient: Maria Garcia • Lisinopril 10mg
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="text-slate-600">Total Cost</div>
                      <div className="font-semibold">$85.00</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Insurance Pays</div>
                      <div className="font-semibold text-emerald-600">$75.00</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Patient Pays</div>
                      <div className="font-semibold">$10.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clarifications Needed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Clarifications Needed
              </CardTitle>
              <CardDescription>Messages to prescribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="font-medium">Dosage Clarification</div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      Patient: Robert Williams
                    </div>
                    <div className="text-xs text-slate-500">
                      Question: Prescribed dosage exceeds recommended maximum. Please confirm.
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Send Message to Dr. Johnson
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-emerald-900">Clarification Received</div>
                      <div className="text-sm text-emerald-700 mt-1">
                        Dr. Johnson confirmed dosage for Maria Garcia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ready to Dispense */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Ready to Dispense
            </CardTitle>
            <CardDescription>12 prescriptions ready for pickup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Patient #{i}</div>
                      <Badge className="bg-emerald-600">Ready</Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      2 medications • $25.00 copay
                    </div>
                    <Button size="sm" className="w-full">
                      Mark as Dispensed
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Today's Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-semibold">47</div>
                <div className="text-sm text-slate-600 mt-1">Prescriptions Filled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold">95%</div>
                <div className="text-sm text-slate-600 mt-1">On-Time Fill Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold">12 min</div>
                <div className="text-sm text-slate-600 mt-1">Avg Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold">98%</div>
                <div className="text-sm text-slate-600 mt-1">Insurance Approval Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Prescription</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this prescription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Select value={rejectReason} onValueChange={setRejectReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incorrect-dosage">Incorrect dosage</SelectItem>
                  <SelectItem value="drug-interaction">Drug interaction concern</SelectItem>
                  <SelectItem value="out-of-stock">Medication out of stock</SelectItem>
                  <SelectItem value="insurance-issue">Insurance coverage issue</SelectItem>
                  <SelectItem value="clarification-needed">Need clarification from prescriber</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea placeholder="Enter additional details..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={!rejectReason}>
              Reject Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Substitution Modal */}
      <Dialog open={showSubstitutionModal} onOpenChange={setShowSubstitutionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Drug Substitution</DialogTitle>
            <DialogDescription>
              Recommend a generic or alternative medication
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Original: Lipitor 20mg (Brand) - $85.00 copay
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label>Suggested Substitution</Label>
              <Select value={substitution} onValueChange={setSubstitution}>
                <SelectTrigger>
                  <SelectValue placeholder="Select substitution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="generic">Atorvastatin 20mg (Generic) - $10.00 copay</SelectItem>
                  <SelectItem value="alternative">Rosuvastatin 10mg - $15.00 copay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {substitution && (
              <Alert className="bg-emerald-50 border-emerald-200">
                <AlertDescription className="text-emerald-800">
                  <strong>Savings:</strong> Patient will save $75.00 with this substitution
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubstitutionModal(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" disabled={!substitution}>
              Contact Prescriber
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
