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
  CheckCircle,
  Sparkles,
  UserPlus,
  Eye,
  Upload,
  Mic,
  Image as ImageIcon,
  X,
  FileText
} from 'lucide-react';
import { Patient, Drug, Pharmacy } from '../../lib/types';
import { mockDrugs, mockPharmacies, mockPatients } from '../../lib/mockData';
import { ConsultationNoteProcessor } from './ConsultationNoteProcessor';
import { AIAnalysisResult } from '../../lib/aiService';
import { AddPatientModal } from './AddPatientModal';
import { PrescriptionPreview } from './PrescriptionPreview';

interface NewPrescriptionProps {
  patient?: Patient;
  onBack: () => void;
  onComplete: () => void;
}

export function NewPrescription({ patient: initialPatient, onBack, onComplete }: NewPrescriptionProps) {
  // Mode and view state
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');
  const [showPreview, setShowPreview] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  // AI state
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);

  // Patient selection
  const [selectedPatientId, setSelectedPatientId] = useState<string>(initialPatient?.id || '');
  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId) || null;

  // Medication selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [isGeneric, setIsGeneric] = useState(true);
  const [selectedStrength, setSelectedStrength] = useState('');
  const [selectedForm, setSelectedForm] = useState('');

  // Prescription details
  const [quantity, setQuantity] = useState('');
  const [refills, setRefills] = useState('0');
  const [daw, setDaw] = useState(false);
  const [sig, setSig] = useState('');
  const [frequency, setFrequency] = useState('');
  const [route, setRoute] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedICD10, setSelectedICD10] = useState('');

  // Pharmacy selection
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  // Modals
  const [show2FA, setShow2FA] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Image upload and voice input
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string, analysis?: string, timestamp: string }>>([]);
  const [audioRecordings, setAudioRecordings] = useState<Array<{ transcript: string, timestamp: string }>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [textInput, setTextInput] = useState('');
  const [activeInputMethod, setActiveInputMethod] = useState<'image' | 'audio' | 'text' | null>(null);

  // Handle AI analysis completion
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
  };

  const handlePatientAdded = (newPatient: Patient) => {
    setSelectedPatientId(newPatient.id);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
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

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newImage = {
              url: e.target.result as string,
              timestamp: new Date().toLocaleString(),
              analysis: 'Image analysis suggests: Analyzing image content...'
            };
            setUploadedImages(prev => [...prev, newImage]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    setActiveInputMethod('image');
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      setActiveInputMethod('audio');

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          const newRecording = {
            transcript,
            timestamp: new Date().toLocaleString()
          };
          setAudioRecordings(prev => [...prev, newRecording]);
          setClinicalNotes(prev => prev ? `${prev}\n${transcript}` : transcript);
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } else {
        alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
        setIsRecording(false);
      }
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const isFormValid = selectedPatientId && selectedDrug && selectedStrength && selectedForm && quantity && sig && selectedPharmacy;

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
                {mode === 'ai' ? 'AI Prescription Generator' : showPreview ? 'Prescription Preview' : 'New Prescription'}
              </h1>
              {selectedPatient && !showPreview && (
                <p className="text-sm text-slate-600 mt-1">
                  Patient: {selectedPatient.name} • DOB: {selectedPatient.dob}
                </p>
              )}
            </div>
          </div>
          {mode === 'manual' && !showPreview && (
            <Button
              variant="outline"
              onClick={() => setMode('ai')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Use AI Assistant
            </Button>
          )}
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        {/* AI Consultation Mode */}
        {mode === 'ai' && (
          <>
            {/* Patient Selection Required for AI */}
            {!selectedPatientId && (
              <Alert className="mb-4 border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-900">Patient Selection Required</AlertTitle>
                <AlertDescription className="text-amber-800">
                  Please select a patient before using the AI assistant for more accurate recommendations.
                </AlertDescription>
              </Alert>
            )}

            <ConsultationNoteProcessor
              patientName={selectedPatient?.name || 'Unknown Patient'}
              onAnalysisComplete={handleAIAnalysisComplete}
              onCancel={() => setMode('manual')}
            />
          </>
        )}

        {/* AI Results Display */}
        {mode === 'manual' && aiResult && !showPreview && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Sparkles className="h-5 w-5" />
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

        {/* Prescription Preview */}
        {showPreview && selectedPatient && selectedDrug && selectedPharmacy && (
          <PrescriptionPreview
            patient={selectedPatient}
            drug={selectedDrug}
            selectedStrength={selectedStrength}
            selectedForm={selectedForm}
            quantity={quantity}
            refills={refills}
            sig={sig}
            frequency={frequency}
            route={route}
            duration={duration}
            pharmacy={selectedPharmacy}
            icd10Code={selectedICD10}
            isGeneric={isGeneric}
            daw={daw}
            onEdit={handleEdit}
            onSign={handleSign}
          />
        )}

        {/* Prescription Form */}
        {mode === 'manual' && !showPreview && (
          <div className="space-y-6">
            {/* Patient Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <Label>Select Patient *</Label>
                    <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} - DOB: {patient.dob}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddPatientModal(true)}
                      className="gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Add New Patient
                    </Button>
                  </div>
                </div>

                {selectedPatient && (
                  <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Age:</span> {selectedPatient.age} years
                      </div>
                      <div>
                        <span className="text-slate-600">Insurance:</span> {selectedPatient.insurance}
                      </div>
                    </div>
                    {selectedPatient.allergies.length > 0 && (
                      <div>
                        <span className="text-sm text-slate-600">Allergies:</span>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {selectedPatient.allergies.map((allergy, idx) => (
                            <Badge key={idx} variant="destructive" className="text-xs">{allergy}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>


            {/* Input Methods - Three Card Interface */}
            <div className="grid grid-cols-3 gap-4">
              {/* Upload Image Card */}
              <Card className="cursor-pointer hover:border-blue-500 transition-colors" onClick={() => document.getElementById('image-upload')?.click()}>
                <CardContent className="pt-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <h3 className="font-semibold">Upload Image</h3>
                    <p className="text-sm text-slate-600">X-rays, Photos</p>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                </CardContent>
              </Card>

              {/* Record Audio Card */}
              <Card className="cursor-pointer hover:border-blue-500 transition-colors" onClick={handleVoiceInput}>
                <CardContent className="pt-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full ${isRecording ? 'bg-red-100' : 'bg-slate-100'} flex items-center justify-center`}>
                      <Mic className={`h-6 w-6 ${isRecording ? 'text-red-600 animate-pulse' : 'text-slate-600'}`} />
                    </div>
                    <h3 className="font-semibold">{isRecording ? 'Recording...' : 'Record Audio'}</h3>
                    <p className="text-sm text-slate-600">Voice Notes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Text Input Card */}
              <Card className={`cursor-pointer hover:border-blue-500 transition-colors ${activeInputMethod === 'text' ? 'border-blue-500' : ''}`} onClick={() => setActiveInputMethod('text')}>
                <CardContent className="pt-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-slate-600" />
                    </div>
                    <h3 className="font-semibold">Text Input</h3>
                    <p className="text-sm text-slate-600">Type Below</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clinical Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <textarea
                    className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type consultation notes, symptoms, physical exam findings, or paste from EMR..."
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setClinicalNotes('')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Add Text Note
                  </Button>
                  <Button variant="outline" size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Try Sample Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Notes List */}
            {(uploadedImages.length > 0 || audioRecordings.length > 0) && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Consultation Notes ({uploadedImages.length + audioRecordings.length})</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Ready for AI Analysis
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Image Notes */}
                  {uploadedImages.map((image, idx) => (
                    <div key={`img-${idx}`} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-5 w-5 text-slate-600" />
                          <span className="font-medium">IMAGE</span>
                        </div>
                        <button
                          onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <img
                        src={image.url}
                        alt={`Uploaded ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      {image.analysis && (
                        <p className="text-sm text-slate-700">{image.analysis}</p>
                      )}
                      <p className="text-xs text-slate-500">{image.timestamp}</p>
                    </div>
                  ))}

                  {/* Audio Notes */}
                  {audioRecordings.map((recording, idx) => (
                    <div key={`audio-${idx}`} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Mic className="h-5 w-5 text-slate-600" />
                          <span className="font-medium">AUDIO</span>
                        </div>
                        <button
                          onClick={() => setAudioRecordings(prev => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-700">{recording.transcript}</p>
                      <p className="text-xs text-slate-500">{recording.timestamp}</p>
                    </div>
                  ))}

                  {/* Generate AI Prescription Button */}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate AI Prescription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medication Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Medication Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search for medication *</Label>
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
                      <Label>Strength *</Label>
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
                      <Label>Dosage Form *</Label>
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
                  </>
                )}
              </CardContent>
            </Card>

            {/* Prescription Details */}
            {selectedDrug && (
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                    <Label>Complete Sig (Instructions) *</Label>
                    <Input
                      placeholder="e.g., Take 1 tablet by mouth once daily"
                      value={sig}
                      onChange={(e) => setSig(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity *</Label>
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

                  <div className="space-y-2">
                    <Label>ICD-10 Code</Label>
                    <Input
                      placeholder="e.g., E11.9"
                      value={selectedICD10}
                      onChange={(e) => setSelectedICD10(e.target.value)}
                    />
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
                </CardContent>
              </Card>
            )}

            {/* Pharmacy Selection */}
            {selectedDrug && (
              <Card>
                <CardHeader>
                  <CardTitle>Pharmacy Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Select Pharmacy *</Label>
                    <div className="space-y-2">
                      {mockPharmacies.map((pharmacy) => (
                        <button
                          key={pharmacy.id}
                          onClick={() => setSelectedPharmacy(pharmacy)}
                          className={`w-full p-4 border rounded-lg text-left transition-colors ${selectedPharmacy?.id === pharmacy.id
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
                </CardContent>
              </Card>
            )}

            {/* Preview Button */}
            {selectedDrug && (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handlePreview}
                disabled={!isFormValid}
                size="lg"
              >
                <Eye className="h-5 w-5 mr-2" />
                Preview Prescription
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        open={showAddPatientModal}
        onOpenChange={setShowAddPatientModal}
        onPatientAdded={handlePatientAdded}
      />

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