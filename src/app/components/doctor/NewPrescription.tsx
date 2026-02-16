import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  ArrowLeft,
  Search,
  AlertTriangle,
  ShieldAlert,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
  Brain
} from 'lucide-react';
import { Patient, Drug, Pharmacy } from '../../lib/types';
import { mockDrugs, mockPharmacies } from '../../lib/mockData';
import { ConsultationNoteProcessor } from './ConsultationNoteProcessor';
import { AIAnalysisResult } from '../../lib/aiService';

interface NewPrescriptionProps {
  patient?: Patient;
  onBack: () => void;
  onComplete: () => void;
}

export function NewPrescription({ patient, onBack, onComplete }: NewPrescriptionProps) {
  const [mode, setMode] = useState<'manual' | 'ai'>('manual'); // New: mode selector
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null); // New: AI results
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [isGeneric, setIsGeneric] = useState(true);
  const [selectedStrength, setSelectedStrength] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [quantity, setQuantity] = useState('');
  const [refills, setRefills] = useState('0');
  const [daw, setDaw] = useState(false);
  const [sig, setSig] = useState('');
  const [frequency, setFrequency] = useState('');
  const [route, setRoute] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showBenefitCheck, setShowBenefitCheck] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedICD10, setSelectedICD10] = useState(''); // New: ICD-10 code selection
  const [priorAuthRequired, setPriorAuthRequired] = useState(false); // New: PA flag

  // New: Handle AI analysis completion
  const handleAIAnalysisComplete = (result: AIAnalysisResult) => {
    setAiResult(result);
    setMode('manual');
    
    // Auto-select first recommended medication if available
    if (result.recommendedMedications.length > 0) {
      const firstMed = result.recommendedMedications[0];
      const drug = mockDrugs.find(d => 
        d.genericName.toLowerCase().includes(firstMed.genericName.toLowerCase())
      );
      if (drug) {
        handleDrugSelect(drug);
      }
    }
    
    // Set ICD-10 code if available
    if (result.suggestedDiagnoses.length > 0) {
      setSelectedICD10(result.suggestedDiagnoses[0].code);
    }
  };

  const filteredDrugs = mockDrugs.filter(drug =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrugSelect = (drug: Drug) => {
    setSelectedDrug(drug);
    setSearchQuery('');
    if (drug.strength.length > 0) setSelectedStrength(drug.strength[0]);
    if (drug.dosageForm.length > 0) setSelectedForm(drug.dosageForm[0]);
    
    // Check if prior authorization might be needed
    if (drug.scheduleClass || drug.name.includes('Humira') || drug.name.includes('Enbrel')) {
      setPriorAuthRequired(true);
    }
  };

  const handleContinueToStep2 = () => {
    if (!selectedDrug || !selectedStrength || !selectedForm) return;
    setStep(2);
  };

  const handleContinueToStep3 = () => {
    if (!sig || !quantity) return;
    // Show interaction alert for demonstration
    if (patient && patient.medications.length > 0) {
      setShowInteractionModal(true);
    } else {
      setStep(3);
    }
  };

  const handleContinueToStep4 = () => {
    setShowBenefitCheck(true);
    setTimeout(() => {
      setShowBenefitCheck(false);
      setStep(4);
    }, 2000);
  };

  const handleSign = () => {
    if (selectedDrug?.scheduleClass) {
      setShow2FA(true);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handle2FAComplete = () => {
    setShow2FA(false);
    setShowSuccess(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
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
              <h1 className="text-2xl font-semibold text-slate-900">
                {mode === 'ai' ? 'AI Prescription Generator' : 'New Prescription'}
              </h1>
              {patient && (
                <p className="text-sm text-slate-600 mt-1">
                  Patient: {patient.name} • DOB: {patient.dob}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {mode === 'manual' && step === 1 && (
              <Button
                variant="outline"
                onClick={() => setMode('ai')}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Use AI Assistant
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Badge variant={step === 1 ? 'default' : 'secondary'}>1. Select Drug</Badge>
              <Badge variant={step === 2 ? 'default' : 'secondary'}>2. Sig Builder</Badge>
              <Badge variant={step === 3 ? 'default' : 'secondary'}>3. Clinical Alerts</Badge>
              <Badge variant={step === 4 ? 'default' : 'secondary'}>4. Sign & Send</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        {/* AI Consultation Mode */}
        {mode === 'ai' && (
          <ConsultationNoteProcessor
            patientName={patient?.name || 'Unknown Patient'}
            onAnalysisComplete={handleAIAnalysisComplete}
            onCancel={() => setMode('manual')}
          />
        )}

        {/* Warning if no patient selected in AI mode */}
        {mode === 'ai' && !patient && (
          <Alert className="mb-4 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-900">No Patient Selected</AlertTitle>
            <AlertDescription className="text-amber-800">
              For best results with AI prescription generation, please select a patient from your patient list first.
              The AI will use the patient's medical history for more accurate recommendations.
            </AlertDescription>
          </Alert>
        )}

        {/* AI Results Display */}
        {mode === 'manual' && aiResult && step === 1 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Brain className="h-5 w-5" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-blue-900 mb-2">Chief Complaint</div>
                <p className="text-sm text-blue-800">{aiResult.chiefComplaint}</p>
              </div>

              <div>
                <div className="text-sm font-medium text-blue-900 mb-2">Suggested Diagnoses</div>
                <div className="space-y-2">
                  {aiResult.suggestedDiagnoses.map((dx, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-blue-800">
                        {dx.description} ({dx.code})
                      </span>
                      <Badge variant="outline" className="bg-white">
                        {dx.confidence}% confidence
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-blue-900 mb-2">Recommended Medications</div>
                <div className="space-y-2">
                  {aiResult.recommendedMedications.map((med, idx) => (
                    <div key={idx} className="p-3 bg-white rounded border">
                      <div className="flex items-start justify-between mb-1">
                        <div className="font-medium text-sm">{med.name} {med.strength}</div>
                        <Badge variant={med.priority === 'primary' ? 'default' : 'secondary'}>
                          {med.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">{med.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {aiResult.warnings.length > 0 && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-900">Clinical Warnings</AlertTitle>
                  <AlertDescription className="text-amber-800">
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {aiResult.warnings.map((warning, idx) => (
                        <li key={idx} className="text-sm">{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                variant="outline"
                onClick={() => setAiResult(null)}
                size="sm"
                className="w-full"
              >
                Clear AI Results
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Select Drug */}
        {mode === 'manual' && step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Select Medication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search for medication</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Type medication name..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {searchQuery && filteredDrugs.length > 0 && (
                    <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
                      {filteredDrugs.map((drug) => (
                        <button
                          key={drug.id}
                          onClick={() => handleDrugSelect(drug)}
                          className="w-full p-3 text-left hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium">{drug.name}</div>
                              <div className="text-sm text-slate-600">{drug.genericName}</div>
                              <div className="text-xs text-slate-500 mt-1">NDC: {drug.ndc}</div>
                            </div>
                            {drug.scheduleClass && (
                              <Badge variant="destructive">{drug.scheduleClass}</Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedDrug && (
                  <>
                    {/* Selected Drug Info */}
                    <Alert>
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <AlertTitle>Selected Medication</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 space-y-1">
                          <div className="font-medium">{selectedDrug.name} ({selectedDrug.genericName})</div>
                          <div className="text-xs">NDC: {selectedDrug.ndc}</div>
                          {selectedDrug.scheduleClass && (
                            <Badge variant="destructive" className="mt-2">{selectedDrug.scheduleClass}</Badge>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>

                    {/* Generic/Brand Toggle */}
                    <div className="flex items-center gap-4">
                      <Label>Formulation</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={isGeneric ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setIsGeneric(true)}
                        >
                          Generic
                        </Button>
                        <Button
                          variant={!isGeneric ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setIsGeneric(false)}
                        >
                          Brand ({selectedDrug.brandName})
                        </Button>
                      </div>
                    </div>

                    {/* Strength */}
                    <div className="space-y-2">
                      <Label>Strength</Label>
                      <Select value={selectedStrength} onValueChange={setSelectedStrength}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strength" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedDrug.strength.map((str) => (
                            <SelectItem key={str} value={str}>{str}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dosage Form */}
                    <div className="space-y-2">
                      <Label>Dosage Form</Label>
                      <Select value={selectedForm} onValueChange={setSelectedForm}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedDrug.dosageForm.map((form) => (
                            <SelectItem key={form} value={form}>{form}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleContinueToStep2}
                      disabled={!selectedStrength || !selectedForm}
                    >
                      Continue to Sig Builder →
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Sig Builder */}
        {step === 2 && selectedDrug && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Sig (Directions) Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {selectedDrug.name} {selectedStrength} - {selectedForm}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once-daily">Once daily</SelectItem>
                        <SelectItem value="twice-daily">Twice daily</SelectItem>
                        <SelectItem value="three-times-daily">Three times daily</SelectItem>
                        <SelectItem value="four-times-daily">Four times daily</SelectItem>
                        <SelectItem value="every-4-hours">Every 4 hours</SelectItem>
                        <SelectItem value="every-6-hours">Every 6 hours</SelectItem>
                        <SelectItem value="as-needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Route</Label>
                    <Select value={route} onValueChange={setRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="by-mouth">By mouth</SelectItem>
                        <SelectItem value="sublingually">Sublingually</SelectItem>
                        <SelectItem value="topically">Topically</SelectItem>
                        <SelectItem value="inhalation">Inhalation</SelectItem>
                        <SelectItem value="injection">Injection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Complete Sig (Instructions)</Label>
                  <Input
                    placeholder="e.g., Take 1 tablet by mouth once daily"
                    value={sig}
                    onChange={(e) => setSig(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      placeholder="30"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Days Supply</Label>
                    <Input
                      placeholder="30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Refills</Label>
                    <Select value={refills} onValueChange={setRefills}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(selectedDrug.scheduleClass ? 1 : 12)].map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="daw" checked={daw} onCheckedChange={(checked) => setDaw(checked as boolean)} />
                  <label htmlFor="daw" className="text-sm cursor-pointer">
                    Dispense As Written (DAW) - Brand name required
                  </label>
                </div>

                {selectedDrug.scheduleClass && (
                  <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Controlled Substance</AlertTitle>
                    <AlertDescription>
                      This is a {selectedDrug.scheduleClass} medication. Additional verification will be required.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleContinueToStep3}
                    disabled={!sig || !quantity}
                  >
                    Continue to Clinical Review →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Clinical Alerts */}
        {step === 3 && selectedDrug && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Clinical Alert Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mock alerts */}
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-900">Drug-Drug Interaction</AlertTitle>
                  <AlertDescription className="text-amber-800">
                    Moderate interaction detected with patient's current medication (Lisinopril). Monitor blood pressure closely.
                  </AlertDescription>
                </Alert>

                {patient?.allergies.includes('Penicillin') && selectedDrug.name.includes('Amoxicillin') && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Allergy Alert</AlertTitle>
                    <AlertDescription>
                      Patient has documented allergy to Penicillin. This medication may cause allergic reaction.
                    </AlertDescription>
                  </Alert>
                )}

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Renal Dose Adjustment</AlertTitle>
                  <AlertDescription>
                    No dose adjustment needed for this patient based on available lab values.
                  </AlertDescription>
                </Alert>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-emerald-900">No Critical Alerts</div>
                      <div className="text-sm text-emerald-700 mt-1">
                        Prescription is safe to proceed with documented warnings
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleContinueToStep4}
                  >
                    Acknowledge & Continue →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Sign & Send */}
        {step === 4 && selectedDrug && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Insurance Benefit Check & Pharmacy Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Benefit Check */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <div className="font-medium">Insurance Benefit Check</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600">Patient Copay</div>
                      <div className="text-lg font-semibold">$10.00</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Insurance Coverage</div>
                      <div className="text-lg font-semibold text-emerald-600">Covered</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Prior Auth</div>
                      <div className="text-lg font-semibold">Not Required</div>
                    </div>
                  </div>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Alternative cheaper option available: Generic equivalent at $5 copay
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Pharmacy Selection */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Select Pharmacy
                  </Label>
                  <div className="space-y-2">
                    {mockPharmacies.map((pharmacy) => (
                      <button
                        key={pharmacy.id}
                        onClick={() => setSelectedPharmacy(pharmacy)}
                        className={`w-full p-4 border rounded-lg text-left transition-colors ${
                          selectedPharmacy?.id === pharmacy.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">{pharmacy.name}</div>
                            <div className="text-sm text-slate-600 mt-1">{pharmacy.address}</div>
                            <div className="text-xs text-slate-500 mt-1">
                              Phone: {pharmacy.phone} • Fax: {pharmacy.fax}
                            </div>
                          </div>
                          <Badge variant="outline">{pharmacy.distance}</Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prescription Summary */}
                <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                  <div className="font-medium">Prescription Summary</div>
                  <div className="text-sm space-y-1">
                    <div><span className="text-slate-600">Medication:</span> {selectedDrug.name} {selectedStrength}</div>
                    <div><span className="text-slate-600">Sig:</span> {sig}</div>
                    <div><span className="text-slate-600">Quantity:</span> {quantity}</div>
                    <div><span className="text-slate-600">Refills:</span> {refills}</div>
                    {selectedPharmacy && (
                      <div><span className="text-slate-600">Pharmacy:</span> {selectedPharmacy.name}</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleSign}
                    disabled={!selectedPharmacy}
                  >
                    Sign & Send Prescription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Interaction Modal */}
      <Dialog open={showInteractionModal} onOpenChange={setShowInteractionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Drug Interaction Alert
            </DialogTitle>
            <DialogDescription>
              A potential interaction has been detected with the patient's current medications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Alert className="border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-800">
                <strong>Interaction:</strong> {selectedDrug?.name} may interact with patient's current medication (Lisinopril)
                <br /><br />
                <strong>Severity:</strong> Moderate
                <br />
                <strong>Recommendation:</strong> Monitor blood pressure closely. Consider alternative if necessary.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInteractionModal(false)}>
              Cancel Prescription
            </Button>
            <Button onClick={() => {
              setShowInteractionModal(false);
              setStep(3);
            }}>
              Acknowledge & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Benefit Check Loading */}
      <Dialog open={showBenefitCheck} onOpenChange={setShowBenefitCheck}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checking Insurance Benefits...</DialogTitle>
            <DialogDescription>
              Verifying coverage and calculating patient copay
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2FA for Controlled Substances */}
      <Dialog open={show2FA} onOpenChange={setShow2FA}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              Two-Factor Authentication Required
            </DialogTitle>
            <DialogDescription>
              DEA EPCS verification required for controlled substances
            </DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription>
              This is a {selectedDrug?.scheduleClass} controlled substance. Additional authentication is required.
            </AlertDescription>
          </Alert>
          <div className="p-4 bg-slate-50 rounded-lg text-center space-y-2">
            <div className="text-sm text-slate-600">Verification code sent to your registered device</div>
            <div className="text-xs text-slate-500">Enter code: 123456 (Demo)</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShow2FA(false)}>
              Cancel
            </Button>
            <Button onClick={handle2FAComplete} className="bg-red-600 hover:bg-red-700">
              Verify & Sign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
            <DialogTitle className="text-center">Prescription Sent Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Prescription has been electronically sent to {selectedPharmacy?.name}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}