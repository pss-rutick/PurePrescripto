import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';
import {
  Mic,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  Brain
} from 'lucide-react';
import { ConsultationNote, AIAnalysisResult, transcribeAudio, analyzeImage, analyzeConsultationNotes } from '../../lib/aiService';

interface ConsultationNoteProcessorProps {
  patientName: string;
  onAnalysisComplete: (result: AIAnalysisResult) => void;
  onCancel: () => void;
}

export function ConsultationNoteProcessor({ 
  patientName, 
  onAnalysisComplete, 
  onCancel 
}: ConsultationNoteProcessorProps) {
  const [consultationNotes, setConsultationNotes] = useState<ConsultationNote[]>([]);
  const [textNote, setTextNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTextNote = () => {
    if (!textNote.trim()) return;
    
    const note: ConsultationNote = {
      type: 'text',
      content: textNote,
      timestamp: new Date().toISOString()
    };
    
    setConsultationNotes([...consultationNotes, note]);
    setTextNote('');
  };

  const handleRecordAudio = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsProcessing(true);
      setProcessingStatus('Transcribing audio...');
      
      try {
        // Simulate audio recording and transcription
        const transcription = await transcribeAudio('mock-audio-blob');
        
        const note: ConsultationNote = {
          type: 'audio',
          content: transcription,
          timestamp: new Date().toISOString(),
          audioUrl: 'mock-audio-url'
        };
        
        setConsultationNotes([...consultationNotes, note]);
      } catch (error) {
        console.error('Audio transcription failed:', error);
      } finally {
        setIsProcessing(false);
        setProcessingStatus('');
      }
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsProcessing(true);
    setProcessingStatus('Analyzing image...');
    
    try {
      // Create image URL
      const imageUrl = URL.createObjectURL(file);
      
      // Simulate image analysis
      const analysis = await analyzeImage(imageUrl);
      
      const note: ConsultationNote = {
        type: 'image',
        content: analysis,
        timestamp: new Date().toISOString(),
        imageUrl
      };
      
      setConsultationNotes([...consultationNotes, note]);
    } catch (error) {
      console.error('Image analysis failed:', error);
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  const handleRemoveNote = (index: number) => {
    setConsultationNotes(consultationNotes.filter((_, i) => i !== index));
  };

  const handleGeneratePrescription = async () => {
    if (consultationNotes.length === 0) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      setProcessingStatus('Analyzing consultation notes...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStatus('Matching ICD-10 codes...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStatus('Generating medication recommendations...');
      const result = await analyzeConsultationNotes(consultationNotes);
      
      setProgress(100);
      clearInterval(progressInterval);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      onAnalysisComplete(result);
    } catch (error) {
      console.error('AI analysis failed:', error);
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Consultation Note Processor
              </CardTitle>
              <CardDescription>
                Record or upload consultation notes for AI-powered prescription generation
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Info */}
          <Alert>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <AlertTitle>Active Patient</AlertTitle>
            <AlertDescription>{patientName}</AlertDescription>
          </Alert>

          {/* Quick Start Guide */}
          {consultationNotes.length === 0 && !isProcessing && (
            <Alert className="border-blue-200 bg-blue-50">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900">Quick Start Guide</AlertTitle>
              <AlertDescription className="text-blue-800">
                <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
                  <li>Click <strong>"Try Sample Note"</strong> for a quick demo</li>
                  <li>Or type/record your own consultation notes</li>
                  <li>Click <strong>"Add Text Note"</strong> to save the note</li>
                  <li>Click <strong>"Generate AI Prescription"</strong> when ready</li>
                </ol>
              </AlertDescription>
            </Alert>
          )}

          {/* Input Methods */}
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              <ImageIcon className="h-6 w-6" />
              <span className="text-sm">Upload Image</span>
              <span className="text-xs text-slate-500">X-rays, Photos</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <Button
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center gap-2 ${
                isRecording ? 'border-red-500 bg-red-50' : ''
              }`}
              onClick={handleRecordAudio}
              disabled={isProcessing}
            >
              <Mic className={`h-6 w-6 ${isRecording ? 'text-red-600 animate-pulse' : ''}`} />
              <span className="text-sm">{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
              <span className="text-xs text-slate-500">Voice Notes</span>
            </Button>

            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              disabled
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">Text Input</span>
              <span className="text-xs text-slate-500">Type Below</span>
            </Button>
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Clinical Notes</label>
            <Textarea
              placeholder="Type consultation notes, symptoms, physical exam findings, or paste from EMR..."
              value={textNote}
              onChange={(e) => setTextNote(e.target.value)}
              rows={6}
              disabled={isProcessing}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddTextNote}
                disabled={!textNote.trim() || isProcessing}
                size="sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Add Text Note
              </Button>
              <Button
                variant="outline"
                onClick={() => setTextNote(
                  "Patient presents with persistent dry cough for 7 days, fever of 101°F, " +
                  "shortness of breath on exertion, and chest tightness. No known allergies. " +
                  "Physical exam reveals wheezing on auscultation bilaterally. " +
                  "Patient has history of asthma. Suspect acute bronchitis with asthma exacerbation."
                )}
                disabled={isProcessing}
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Try Sample Note
              </Button>
            </div>
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="space-y-3">
              <Alert>
                <Sparkles className="h-4 w-4 animate-pulse" />
                <AlertDescription>{processingStatus}</AlertDescription>
              </Alert>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Consultation Notes List */}
          {consultationNotes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Consultation Notes ({consultationNotes.length})</label>
                <Badge variant="secondary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Ready for AI Analysis
                </Badge>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {consultationNotes.map((note, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-slate-50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {note.type === 'text' && <FileText className="h-3 w-3 mr-1" />}
                        {note.type === 'audio' && <Mic className="h-3 w-3 mr-1" />}
                        {note.type === 'image' && <ImageIcon className="h-3 w-3 mr-1" />}
                        {note.type.toUpperCase()}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveNote(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {note.imageUrl && (
                      <img
                        src={note.imageUrl}
                        alt="Medical image"
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    
                    <p className="text-sm text-slate-700">{note.content}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGeneratePrescription}
              disabled={consultationNotes.length === 0 || isProcessing}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Prescription
            </Button>
          </div>

          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              AI-generated prescriptions are suggestions based on clinical best practices and ICD-10 guidelines. 
              All prescriptions must be reviewed and approved by the prescribing physician.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}