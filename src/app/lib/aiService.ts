// AI Service for Processing Consultation Notes and Generating Prescriptions
// Mock AI service that simulates an in-house medical AI model

import { findMatchingICD10Codes, suggestMedicationsForDiagnoses, icd10CodesDataset } from './icd10Codes';
import { mockDrugs } from './mockData';

export interface ConsultationNote {
  type: 'text' | 'audio' | 'image';
  content: string;
  timestamp: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface AIAnalysisResult {
  chiefComplaint: string;
  symptoms: string[];
  suggestedDiagnoses: Array<{
    code: string;
    description: string;
    confidence: number;
  }>;
  recommendedMedications: Array<{
    name: string;
    genericName: string;
    strength: string;
    reasoning: string;
    priority: 'primary' | 'alternative';
  }>;
  clinicalNotes: string;
  warnings: string[];
}

// Simulate audio transcription
export function transcribeAudio(audioBlob: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock transcription
      resolve(
        "Patient presents with persistent cough for 5 days, fever of 101.5 degrees, " +
        "shortness of breath, and chest discomfort. Reports difficulty sleeping due to coughing. " +
        "No known allergies. Physical exam shows wheezing on auscultation. " +
        "Suspect acute bronchitis with possible asthma component."
      );
    }, 2000);
  });
}

// Simulate image analysis (X-rays, skin conditions, etc.)
export function analyzeImage(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock image analysis
      resolve(
        "Image analysis suggests: Skin lesion consistent with moderate acne vulgaris. " +
        "Multiple comedones and papules visible on facial region. " +
        "No signs of cystic acne or severe inflammation. Recommend topical treatment."
      );
    }, 2500);
  });
}

// Main AI analysis function
export function analyzeConsultationNotes(notes: ConsultationNote[]): Promise<AIAnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Combine all text content
      let combinedText = notes.map(n => n.content).join(' ');
      
      // Find matching ICD-10 codes
      const matchedCodes = findMatchingICD10Codes(combinedText);
      
      // Extract symptoms using keyword matching
      const symptoms = extractSymptoms(combinedText);
      
      // Determine chief complaint
      const chiefComplaint = determineChiefComplaint(combinedText, symptoms);
      
      // Get suggested diagnoses
      const suggestedDiagnoses = matchedCodes.slice(0, 3).map((code, idx) => ({
        code: code.code,
        description: code.description,
        confidence: Math.max(95 - (idx * 10), 70) // Mock confidence scores
      }));
      
      // Get medication recommendations
      const recommendedMedications = generateMedicationRecommendations(
        matchedCodes,
        combinedText
      );
      
      // Generate clinical notes
      const clinicalNotes = generateClinicalNotes(chiefComplaint, symptoms, suggestedDiagnoses);
      
      // Generate warnings
      const warnings = generateWarnings(combinedText, recommendedMedications);
      
      resolve({
        chiefComplaint,
        symptoms,
        suggestedDiagnoses,
        recommendedMedications,
        clinicalNotes,
        warnings
      });
    }, 3000); // Simulate AI processing time
  });
}

function extractSymptoms(text: string): string[] {
  const lowerText = text.toLowerCase();
  const symptoms: string[] = [];
  
  const symptomKeywords = [
    'cough', 'fever', 'pain', 'headache', 'nausea', 'vomiting', 
    'diarrhea', 'fatigue', 'weakness', 'dizziness', 'shortness of breath',
    'wheezing', 'chest pain', 'abdominal pain', 'back pain', 'sore throat',
    'congestion', 'runny nose', 'rash', 'itching', 'swelling',
    'insomnia', 'anxiety', 'depression', 'palpitations', 'sweating'
  ];
  
  symptomKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      symptoms.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  return symptoms.length > 0 ? symptoms : ['General malaise'];
}

function determineChiefComplaint(text: string, symptoms: string[]): string {
  if (symptoms.length === 0) return 'Follow-up visit';
  
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('chest') && (lowerText.includes('pain') || lowerText.includes('discomfort'))) {
    return 'Chest pain/discomfort';
  }
  if (lowerText.includes('back') && lowerText.includes('pain')) {
    return 'Back pain';
  }
  if (lowerText.includes('cough') || lowerText.includes('respiratory')) {
    return 'Respiratory symptoms';
  }
  if (lowerText.includes('anxiety') || lowerText.includes('depression')) {
    return 'Mental health concerns';
  }
  
  return symptoms[0];
}

function generateMedicationRecommendations(
  icdCodes: any[],
  clinicalText: string
): Array<{
  name: string;
  genericName: string;
  strength: string;
  reasoning: string;
  priority: 'primary' | 'alternative';
}> {
  const recommendations: any[] = [];
  const lowerText = clinicalText.toLowerCase();
  
  // Get medication suggestions from ICD codes
  const suggestedMedNames = new Set<string>();
  icdCodes.forEach(code => {
    code.commonMedications.slice(0, 2).forEach((med: string) => suggestedMedNames.add(med));
  });
  
  // Match with drug database
  Array.from(suggestedMedNames).forEach((medName, idx) => {
    const drug = mockDrugs.find(d => 
      d.genericName.toLowerCase().includes(medName.toLowerCase()) ||
      d.name.toLowerCase().includes(medName.toLowerCase())
    );
    
    if (drug) {
      recommendations.push({
        name: drug.name,
        genericName: drug.genericName,
        strength: drug.strength[0] || '10mg',
        reasoning: generateReasoning(drug.genericName, icdCodes[0]?.description || ''),
        priority: idx === 0 ? 'primary' : 'alternative'
      });
    }
  });
  
  // If no matches, provide generic recommendations
  if (recommendations.length === 0) {
    if (lowerText.includes('pain')) {
      recommendations.push({
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        strength: '400mg',
        reasoning: 'NSAID for pain and inflammation management',
        priority: 'primary'
      });
    }
  }
  
  return recommendations.slice(0, 4);
}

function generateReasoning(medication: string, diagnosis: string): string {
  const med = medication.toLowerCase();
  
  if (med.includes('metformin')) {
    return 'First-line therapy for Type 2 diabetes management';
  }
  if (med.includes('lisinopril') || med.includes('amlodipine')) {
    return 'Antihypertensive therapy to control blood pressure';
  }
  if (med.includes('albuterol')) {
    return 'Bronchodilator for acute respiratory symptom relief';
  }
  if (med.includes('sertraline') || med.includes('escitalopram')) {
    return 'SSRI for anxiety and depression management';
  }
  if (med.includes('omeprazole')) {
    return 'Proton pump inhibitor for acid reflux control';
  }
  if (med.includes('amoxicillin')) {
    return 'Antibiotic therapy for bacterial infection';
  }
  if (med.includes('atorvastatin')) {
    return 'Statin therapy for cholesterol management';
  }
  
  return `Evidence-based treatment for ${diagnosis}`;
}

function generateClinicalNotes(
  chiefComplaint: string,
  symptoms: string[],
  diagnoses: any[]
): string {
  let notes = `Chief Complaint: ${chiefComplaint}\n\n`;
  notes += `Presenting Symptoms: ${symptoms.join(', ')}\n\n`;
  notes += `AI-Assisted Diagnosis:\n`;
  
  diagnoses.forEach((dx, idx) => {
    notes += `${idx + 1}. ${dx.description} (${dx.code}) - ${dx.confidence}% confidence\n`;
  });
  
  notes += `\nAI Recommendation: Based on clinical presentation and evidence-based guidelines, `;
  notes += `the suggested diagnoses and medication recommendations have been generated. `;
  notes += `Please review and modify as clinically appropriate.`;
  
  return notes;
}

function generateWarnings(clinicalText: string, medications: any[]): string[] {
  const warnings: string[] = [];
  const lowerText = clinicalText.toLowerCase();
  
  // Check for controlled substances
  const hasControlledSubstance = medications.some(med => 
    ['oxycodone', 'hydrocodone', 'tramadol', 'alprazolam', 'zolpidem'].some(cs =>
      med.genericName.toLowerCase().includes(cs)
    )
  );
  
  if (hasControlledSubstance) {
    warnings.push('Controlled substance detected - Additional EPCS verification required');
    warnings.push('PDMP check recommended before prescribing');
  }
  
  // Check for antibiotic stewardship
  if (medications.some(med => 
    ['amoxicillin', 'azithromycin', 'ciprofloxacin'].some(ab =>
      med.genericName.toLowerCase().includes(ab)
    )
  )) {
    warnings.push('Antibiotic prescribed - Ensure bacterial infection confirmed');
  }
  
  // Check for pregnancy concerns
  if (lowerText.includes('pregnant') || lowerText.includes('pregnancy')) {
    warnings.push('Patient may be pregnant - Review medication safety in pregnancy');
  }
  
  // Check for elderly patient
  if (lowerText.includes('elderly') || lowerText.includes('age 65') || lowerText.includes('geriatric')) {
    warnings.push('Elderly patient - Consider dose adjustments and drug interactions');
  }
  
  return warnings;
}

// Quick AI prescription generation from simple text
export function quickGeneratePrescription(
  chiefComplaint: string,
  patientAge: number,
  allergies: string[]
): Promise<AIAnalysisResult> {
  const mockNote: ConsultationNote = {
    type: 'text',
    content: chiefComplaint,
    timestamp: new Date().toISOString()
  };
  
  return analyzeConsultationNotes([mockNote]);
}
