# AI-Powered E-Prescribing Platform - Testing Guide

## How to Test the AI Prescription Generation

### Step 1: Login as Doctor
- Email: `sarah.johnson@healthsys.com`
- Password: `password`
- Complete 2FA (any code works in demo mode)

### Step 2: Access New Prescription Screen

**Option A: With Patient Context (Recommended)**
1. Click **"Patients"** in the sidebar
2. Select any patient from the list
3. Click **"New Prescription"** button in the patient profile

**Option B: Direct Access**
1. Click **"New Prescription"** from the dashboard

### Step 3: Use AI Assistant

1. On the **Step 1: Select Medication** screen, click the **"Use AI Assistant"** button in the top right
2. The AI Consultation Note Processor will open

### Step 4: Add Consultation Notes

**Quick Test Option:**
1. Click the **"Try Sample Note"** button
2. This will populate a sample clinical note about a patient with bronchitis and asthma
3. Click **"Add Text Note"**

**Manual Entry Options:**
- **Text**: Type or paste clinical notes in the text area
- **Audio**: Click "Record Audio" to simulate voice transcription
- **Image**: Upload medical images (X-rays, skin photos, etc.)

### Step 5: Generate AI Prescription

1. After adding one or more consultation notes, click **"Generate AI Prescription"**
2. Watch the AI processing stages:
   - Analyzing consultation notes...
   - Matching ICD-10 codes...
   - Generating medication recommendations...
3. Wait 3-5 seconds for processing to complete

### Step 6: Review AI Results

The system will return you to the prescription screen with:
- **Chief Complaint**: Automatically extracted
- **Suggested Diagnoses**: ICD-10 codes with confidence scores
- **Recommended Medications**: Primary and alternative options with clinical reasoning
- **Clinical Warnings**: Safety alerts and considerations

### Step 7: Complete the Prescription

1. The first recommended medication will be auto-selected (or select manually)
2. Continue through the 4-step prescription workflow:
   - Step 1: Drug selection ✓
   - Step 2: Sig builder (dosage instructions)
   - Step 3: Clinical alerts review
   - Step 4: Pharmacy selection and sign

## Testing Prior Authorization

1. From the sidebar, click **"Prior Authorization"**
2. Click **"New PA Request"**
3. Fill out the form with patient and medication details
4. Submit the request
5. View the status tracking dashboard

## Testing Reports & Analytics

1. From the sidebar, click **"Reports"**
2. Explore different report tabs:
   - **Overview**: Key metrics and trends
   - **Prescriptions**: Detailed prescription analytics
   - **Controlled Substances**: DEA compliance tracking
   - **Compliance**: HIPAA/EPCS metrics
3. Change date ranges and export reports

## Sample Clinical Notes for Testing

### Bronchitis with Asthma (Sample button)
```
Patient presents with persistent dry cough for 7 days, fever of 101°F, 
shortness of breath on exertion, and chest tightness. No known allergies. 
Physical exam reveals wheezing on auscultation bilaterally. 
Patient has history of asthma. Suspect acute bronchitis with asthma exacerbation.
```

### Type 2 Diabetes
```
Patient reports increased thirst, frequent urination, and fatigue for 2 weeks.
Fasting blood glucose: 245 mg/dL. HbA1c: 8.9%. BMI: 32.
No family history of diabetes. Recommend initiating oral hypoglycemic therapy.
```

### Hypertension
```
Patient with elevated blood pressure readings: 158/96 mmHg consistently over 3 visits.
Reports occasional headaches. No chest pain or dizziness.
Family history of hypertension. Lifestyle modifications discussed.
Recommend antihypertensive medication.
```

### Acute Pharyngitis
```
Patient presents with severe sore throat for 3 days, difficulty swallowing,
fever of 102°F. Rapid strep test positive. Enlarged and erythematous tonsils
with white exudate. No allergies to penicillin.
```

### Generalized Anxiety Disorder
```
Patient reports persistent worry, restlessness, and difficulty sleeping for 6 months.
GAD-7 score: 16 (moderate anxiety). Reports panic attacks 2-3 times per week.
No history of substance abuse. Previous therapy with limited success.
Consider pharmacological intervention.
```

## Expected AI Behavior

### ICD-10 Code Matching
The AI will scan clinical text for keywords and match to the appropriate ICD-10 codes from the dataset:
- 30+ common diagnoses across multiple categories
- Confidence scores (70-95%) based on keyword matching
- Multiple diagnosis suggestions when applicable

### Medication Recommendations
The AI suggests medications based on:
- Evidence-based guidelines for the matched diagnosis
- Drug database correlation
- Safety considerations
- Primary vs. alternative therapy designation

### Clinical Warnings
The AI generates warnings for:
- Controlled substances (PDMP check reminders)
- Antibiotic stewardship considerations
- Pregnancy concerns
- Elderly patient considerations
- Drug interactions (when patient data available)

## Testing Different User Roles

### Pharmacist Login
- Email: `robert.chen@pharmacy.com`
- Password: `password`
- Access pharmacy-specific reports and dispensing analytics

### Admin Login
- Email: `admin@healthsys.com`
- Password: `password`
- Access system-wide reports and compliance dashboards

## Known Demo Limitations

1. **AI Processing**: Simulated with realistic delays (2-3 seconds)
2. **Audio Recording**: Uses mock transcription (not real speech-to-text)
3. **Image Analysis**: Returns generic analysis text (not real AI vision)
4. **No Real Database**: All data resets on page refresh
5. **No Real APIs**: Mock Surescripts, PDMP, and insurance checks

## Tips for Best Results

1. Always test with a **patient selected** for full context
2. Use **clinical terminology** in text notes for better ICD-10 matching
3. Try different **combinations of symptoms** to see varied recommendations
4. Test **controlled substances** (e.g., mention chronic pain) to see enhanced security flows
5. Review the **AI Results card** before proceeding to understand the reasoning

## Troubleshooting

**AI button not showing:**
- Make sure you're on Step 1 of the prescription flow
- The button appears in the top right corner

**No AI results after processing:**
- Check browser console for errors
- Ensure consultation notes were added before clicking Generate

**Prescription doesn't auto-populate:**
- Some medications in the AI recommendations may not exist in the mock drug database
- Manually search for and select the suggested medication

## Feature Highlights

✅ Multi-modal input (text, audio, image)  
✅ Real-time ICD-10 code matching  
✅ Evidence-based medication recommendations  
✅ Clinical safety warnings  
✅ Controlled substance compliance  
✅ Prior authorization workflow  
✅ Comprehensive analytics and reporting  
✅ Role-based access control  
✅ DEA EPCS 2FA for controlled substances
