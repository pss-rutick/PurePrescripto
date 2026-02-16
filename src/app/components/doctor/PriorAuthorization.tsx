import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import {
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
  Phone,
  Mail,
  FileText,
  ArrowLeft
} from 'lucide-react';

export interface PriorAuthRequest {
  id: string;
  patientName: string;
  medication: string;
  diagnosis: string;
  icd10Code: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'denied' | 'more-info-needed';
  insurancePlan: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  estimatedDecisionDate?: string;
}

interface PriorAuthorizationProps {
  onBack: () => void;
}

export function PriorAuthorization({ onBack }: PriorAuthorizationProps) {
  const [view, setView] = useState<'list' | 'new'>('list');
  const [formData, setFormData] = useState({
    patientName: '',
    medication: '',
    diagnosis: '',
    icd10Code: '',
    insurancePlan: '',
    urgency: 'routine',
    clinicalJustification: '',
    triedMedications: '',
    labResults: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockPriorAuthRequests: PriorAuthRequest[] = [
    {
      id: 'PA001',
      patientName: 'John Smith',
      medication: 'Humira (Adalimumab) 40mg',
      diagnosis: 'Rheumatoid Arthritis',
      icd10Code: 'M06.9',
      submittedDate: '2026-02-10',
      status: 'approved',
      insurancePlan: 'Blue Cross Blue Shield',
      urgency: 'urgent',
      estimatedDecisionDate: '2026-02-13'
    },
    {
      id: 'PA002',
      patientName: 'Maria Garcia',
      medication: 'Spiriva (Tiotropium) 18mcg',
      diagnosis: 'COPD',
      icd10Code: 'J44.1',
      submittedDate: '2026-02-12',
      status: 'pending',
      insurancePlan: 'Aetna',
      urgency: 'routine',
      estimatedDecisionDate: '2026-02-17'
    },
    {
      id: 'PA003',
      patientName: 'Robert Williams',
      medication: 'OxyContin (Oxycodone ER) 20mg',
      diagnosis: 'Chronic Back Pain',
      icd10Code: 'M54.5',
      submittedDate: '2026-02-11',
      status: 'more-info-needed',
      insurancePlan: 'UnitedHealthcare',
      urgency: 'urgent',
      estimatedDecisionDate: '2026-02-15'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setView('list');
    // Reset form
    setFormData({
      patientName: '',
      medication: '',
      diagnosis: '',
      icd10Code: '',
      insurancePlan: '',
      urgency: 'routine',
      clinicalJustification: '',
      triedMedications: '',
      labResults: ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'denied':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'more-info-needed':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      approved: 'default',
      denied: 'destructive',
      pending: 'secondary',
      'more-info-needed': 'outline'
    };
    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (view === 'new') {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="bg-white border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setView('list')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">New Prior Authorization Request</h1>
              <p className="text-sm text-slate-600 mt-1">Submit PA request to insurance payer</p>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient & Medication Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patient Name *</Label>
                    <Input
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Insurance Plan *</Label>
                    <Select
                      required
                      value={formData.insurancePlan}
                      onValueChange={(value) => setFormData({ ...formData, insurancePlan: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                        <SelectItem value="aetna">Aetna</SelectItem>
                        <SelectItem value="uhc">UnitedHealthcare</SelectItem>
                        <SelectItem value="cigna">Cigna</SelectItem>
                        <SelectItem value="humana">Humana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Medication *</Label>
                  <Input
                    required
                    value={formData.medication}
                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                    placeholder="Drug name, strength, and form"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Diagnosis *</Label>
                    <Input
                      required
                      value={formData.diagnosis}
                      onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                      placeholder="Primary diagnosis"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ICD-10 Code *</Label>
                    <Input
                      required
                      value={formData.icd10Code}
                      onChange={(e) => setFormData({ ...formData, icd10Code: e.target.value })}
                      placeholder="E.g., E11.9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Urgency *</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine (5-7 business days)</SelectItem>
                      <SelectItem value="urgent">Urgent (72 hours)</SelectItem>
                      <SelectItem value="emergency">Emergency (24 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clinical Justification</CardTitle>
                <CardDescription>Provide detailed medical necessity documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Clinical Justification *</Label>
                  <Textarea
                    required
                    value={formData.clinicalJustification}
                    onChange={(e) => setFormData({ ...formData, clinicalJustification: e.target.value })}
                    placeholder="Explain why this medication is medically necessary..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Previously Tried Medications</Label>
                  <Textarea
                    value={formData.triedMedications}
                    onChange={(e) => setFormData({ ...formData, triedMedications: e.target.value })}
                    placeholder="List medications tried and reasons for discontinuation..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relevant Lab Results/Tests</Label>
                  <Textarea
                    value={formData.labResults}
                    onChange={(e) => setFormData({ ...formData, labResults: e.target.value })}
                    placeholder="Include relevant lab values, imaging results, etc..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600">Upload lab results, imaging, clinical notes</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isSubmitting && (
              <Alert>
                <Clock className="h-4 w-4 animate-spin" />
                <AlertDescription>Submitting prior authorization request...</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setView('list')}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Submit PA Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Prior Authorization</h1>
              <p className="text-sm text-slate-600 mt-1">Manage PA requests and submissions</p>
            </div>
          </div>
          <Button
            onClick={() => setView('new')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FileCheck className="h-4 w-4 mr-2" />
            New PA Request
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Requests</p>
                  <p className="text-2xl font-semibold mt-1">{mockPriorAuthRequests.length}</p>
                </div>
                <FileCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending</p>
                  <p className="text-2xl font-semibold mt-1">
                    {mockPriorAuthRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Approved</p>
                  <p className="text-2xl font-semibold mt-1">
                    {mockPriorAuthRequests.filter(r => r.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Need Action</p>
                  <p className="text-2xl font-semibold mt-1">
                    {mockPriorAuthRequests.filter(r => r.status === 'more-info-needed').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PA Requests List */}
        <Card>
          <CardHeader>
            <CardTitle>Prior Authorization Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPriorAuthRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="mt-1">{getStatusIcon(request.status)}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{request.patientName}</span>
                          {request.urgency === 'urgent' && (
                            <Badge variant="destructive" className="text-xs">URGENT</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-700">{request.medication}</p>
                        <p className="text-sm text-slate-600">
                          {request.diagnosis} ({request.icd10Code})
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                          <span>Submitted: {request.submittedDate}</span>
                          <span>•</span>
                          <span>Insurance: {request.insurancePlan}</span>
                          {request.estimatedDecisionDate && (
                            <>
                              <span>•</span>
                              <span>Decision by: {request.estimatedDecisionDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(request.status)}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  {request.status === 'more-info-needed' && (
                    <Alert className="mt-3 border-orange-200 bg-orange-50">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        Additional information requested by insurance. Please review and respond.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call PA Support: 1-800-PA-HELP
              </Button>
              <Button variant="outline" className="justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email: priorauth@insurance.com
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
