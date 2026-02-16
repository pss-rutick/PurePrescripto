// ICD-10 Codes Dataset for AI-Powered Diagnosis Matching
// This dataset gets updated regularly based on CDC and CMS guidelines

export interface ICD10Code {
  code: string;
  description: string;
  category: string;
  commonMedications: string[];
  keywords: string[];
}

export const icd10CodesDataset: ICD10Code[] = [
  // Diabetes
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    category: 'Endocrine',
    commonMedications: ['Metformin', 'Glipizide', 'Insulin', 'Januvia', 'Jardiance', 'Ozempic'],
    keywords: ['diabetes', 'blood sugar', 'glucose', 'diabetic', 'hyperglycemia', 'insulin resistance']
  },
  {
    code: 'E11.65',
    description: 'Type 2 diabetes mellitus with hyperglycemia',
    category: 'Endocrine',
    commonMedications: ['Metformin', 'Insulin', 'Glipizide', 'Januvia'],
    keywords: ['high blood sugar', 'hyperglycemia', 'diabetes', 'glucose elevated']
  },
  {
    code: 'E10.9',
    description: 'Type 1 diabetes mellitus without complications',
    category: 'Endocrine',
    commonMedications: ['Insulin', 'Humalog', 'Lantus', 'Novolog'],
    keywords: ['type 1 diabetes', 'insulin dependent', 'juvenile diabetes']
  },
  
  // Hypertension
  {
    code: 'I10',
    description: 'Essential (primary) hypertension',
    category: 'Cardiovascular',
    commonMedications: ['Lisinopril', 'Amlodipine', 'Losartan', 'Hydrochlorothiazide', 'Metoprolol'],
    keywords: ['high blood pressure', 'hypertension', 'HTN', 'elevated BP', 'blood pressure']
  },
  {
    code: 'I11.0',
    description: 'Hypertensive heart disease with heart failure',
    category: 'Cardiovascular',
    commonMedications: ['Lisinopril', 'Carvedilol', 'Furosemide', 'Spironolactone'],
    keywords: ['hypertensive heart', 'heart failure', 'HTN with CHF']
  },
  
  // Respiratory
  {
    code: 'J45.909',
    description: 'Unspecified asthma, uncomplicated',
    category: 'Respiratory',
    commonMedications: ['Albuterol', 'Fluticasone', 'Montelukast', 'Advair', 'Symbicort'],
    keywords: ['asthma', 'wheezing', 'shortness of breath', 'bronchospasm', 'breathing difficulty']
  },
  {
    code: 'J20.9',
    description: 'Acute bronchitis, unspecified',
    category: 'Respiratory',
    commonMedications: ['Albuterol', 'Prednisone', 'Benzonatate', 'Azithromycin'],
    keywords: ['bronchitis', 'cough', 'chest congestion', 'acute cough']
  },
  {
    code: 'J44.1',
    description: 'Chronic obstructive pulmonary disease with acute exacerbation',
    category: 'Respiratory',
    commonMedications: ['Albuterol', 'Spiriva', 'Prednisone', 'Azithromycin'],
    keywords: ['COPD', 'emphysema', 'chronic bronchitis', 'smoking lung']
  },
  
  // Pain
  {
    code: 'M54.5',
    description: 'Low back pain',
    category: 'Musculoskeletal',
    commonMedications: ['Ibuprofen', 'Cyclobenzaprine', 'Meloxicam', 'Gabapentin', 'Tramadol'],
    keywords: ['back pain', 'lumbar pain', 'lower back', 'backache']
  },
  {
    code: 'M25.561',
    description: 'Pain in right knee',
    category: 'Musculoskeletal',
    commonMedications: ['Ibuprofen', 'Meloxicam', 'Diclofenac', 'Tramadol'],
    keywords: ['knee pain', 'joint pain', 'knee ache']
  },
  {
    code: 'M79.1',
    description: 'Myalgia',
    category: 'Musculoskeletal',
    commonMedications: ['Ibuprofen', 'Acetaminophen', 'Cyclobenzaprine', 'Methocarbamol'],
    keywords: ['muscle pain', 'myalgia', 'muscle ache', 'sore muscles']
  },
  
  // Mental Health
  {
    code: 'F41.1',
    description: 'Generalized anxiety disorder',
    category: 'Mental Health',
    commonMedications: ['Sertraline', 'Escitalopram', 'Buspirone', 'Alprazolam', 'Duloxetine'],
    keywords: ['anxiety', 'GAD', 'worry', 'anxious', 'panic', 'stress']
  },
  {
    code: 'F33.1',
    description: 'Major depressive disorder, recurrent, moderate',
    category: 'Mental Health',
    commonMedications: ['Sertraline', 'Escitalopram', 'Bupropion', 'Duloxetine', 'Fluoxetine'],
    keywords: ['depression', 'depressed', 'major depression', 'MDD', 'low mood', 'sadness']
  },
  {
    code: 'G47.00',
    description: 'Insomnia, unspecified',
    category: 'Mental Health',
    commonMedications: ['Zolpidem', 'Trazodone', 'Melatonin', 'Eszopiclone'],
    keywords: ['insomnia', 'sleep disorder', 'cannot sleep', 'trouble sleeping']
  },
  
  // Infections
  {
    code: 'J02.9',
    description: 'Acute pharyngitis, unspecified',
    category: 'Infectious',
    commonMedications: ['Amoxicillin', 'Azithromycin', 'Penicillin', 'Cephalexin'],
    keywords: ['sore throat', 'pharyngitis', 'throat infection', 'strep throat']
  },
  {
    code: 'N39.0',
    description: 'Urinary tract infection, site not specified',
    category: 'Infectious',
    commonMedications: ['Nitrofurantoin', 'Ciprofloxacin', 'Bactrim', 'Cephalexin'],
    keywords: ['UTI', 'urinary infection', 'bladder infection', 'cystitis']
  },
  {
    code: 'H66.90',
    description: 'Otitis media, unspecified, unspecified ear',
    category: 'Infectious',
    commonMedications: ['Amoxicillin', 'Azithromycin', 'Cefdinir', 'Augmentin'],
    keywords: ['ear infection', 'otitis', 'ear ache', 'middle ear']
  },
  
  // Gastrointestinal
  {
    code: 'K21.9',
    description: 'Gastro-esophageal reflux disease without esophagitis',
    category: 'Gastrointestinal',
    commonMedications: ['Omeprazole', 'Pantoprazole', 'Famotidine', 'Esomeprazole'],
    keywords: ['GERD', 'acid reflux', 'heartburn', 'indigestion']
  },
  {
    code: 'K58.9',
    description: 'Irritable bowel syndrome without diarrhea',
    category: 'Gastrointestinal',
    commonMedications: ['Dicyclomine', 'Hyoscyamine', 'Fiber supplements', 'Linaclotide'],
    keywords: ['IBS', 'irritable bowel', 'abdominal pain', 'bowel disorder']
  },
  
  // Cardiovascular
  {
    code: 'I25.10',
    description: 'Atherosclerotic heart disease of native coronary artery without angina pectoris',
    category: 'Cardiovascular',
    commonMedications: ['Atorvastatin', 'Aspirin', 'Metoprolol', 'Lisinopril'],
    keywords: ['coronary artery disease', 'CAD', 'atherosclerosis', 'heart disease']
  },
  {
    code: 'E78.5',
    description: 'Hyperlipidemia, unspecified',
    category: 'Cardiovascular',
    commonMedications: ['Atorvastatin', 'Simvastatin', 'Rosuvastatin', 'Pravastatin'],
    keywords: ['high cholesterol', 'hyperlipidemia', 'dyslipidemia', 'elevated lipids']
  },
  
  // Dermatological
  {
    code: 'L30.9',
    description: 'Dermatitis, unspecified',
    category: 'Dermatological',
    commonMedications: ['Hydrocortisone', 'Triamcinolone', 'Betamethasone', 'Cetirizine'],
    keywords: ['dermatitis', 'skin rash', 'eczema', 'skin inflammation']
  },
  {
    code: 'L70.0',
    description: 'Acne vulgaris',
    category: 'Dermatological',
    commonMedications: ['Benzoyl peroxide', 'Tretinoin', 'Doxycycline', 'Adapalene'],
    keywords: ['acne', 'pimples', 'breakout', 'facial acne']
  },
  
  // Endocrine
  {
    code: 'E03.9',
    description: 'Hypothyroidism, unspecified',
    category: 'Endocrine',
    commonMedications: ['Levothyroxine', 'Synthroid', 'Armour Thyroid'],
    keywords: ['hypothyroid', 'low thyroid', 'underactive thyroid', 'thyroid disorder']
  },
  
  // Neurological
  {
    code: 'G43.909',
    description: 'Migraine, unspecified, not intractable, without status migrainosus',
    category: 'Neurological',
    commonMedications: ['Sumatriptan', 'Rizatriptan', 'Propranolol', 'Topiramate'],
    keywords: ['migraine', 'severe headache', 'headache', 'migraine attack']
  },
  {
    code: 'R51.9',
    description: 'Headache, unspecified',
    category: 'Neurological',
    commonMedications: ['Ibuprofen', 'Acetaminophen', 'Sumatriptan'],
    keywords: ['headache', 'head pain', 'cephalalgia']
  },
  
  // Allergies
  {
    code: 'J30.9',
    description: 'Allergic rhinitis, unspecified',
    category: 'Allergic',
    commonMedications: ['Cetirizine', 'Loratadine', 'Fluticasone nasal', 'Montelukast'],
    keywords: ['allergies', 'allergic rhinitis', 'hay fever', 'seasonal allergies', 'nasal congestion']
  }
];

// AI helper function to find matching ICD-10 codes from clinical text
export function findMatchingICD10Codes(clinicalText: string): ICD10Code[] {
  const lowerText = clinicalText.toLowerCase();
  const matches: Array<{ code: ICD10Code; score: number }> = [];
  
  icd10CodesDataset.forEach(code => {
    let score = 0;
    
    // Check if any keywords match
    code.keywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += 10;
      }
    });
    
    // Check if description matches
    if (lowerText.includes(code.description.toLowerCase())) {
      score += 20;
    }
    
    // Check if code itself is mentioned
    if (lowerText.includes(code.code.toLowerCase())) {
      score += 50;
    }
    
    if (score > 0) {
      matches.push({ code, score });
    }
  });
  
  // Sort by score and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(m => m.code);
}

// AI helper function to suggest medications based on ICD-10 codes
export function suggestMedicationsForDiagnoses(diagnoses: string[]): string[] {
  const medications = new Set<string>();
  
  diagnoses.forEach(diagnosisCode => {
    const match = icd10CodesDataset.find(code => code.code === diagnosisCode);
    if (match) {
      match.commonMedications.forEach(med => medications.add(med));
    }
  });
  
  return Array.from(medications);
}
