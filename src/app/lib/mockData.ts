// Mock data for the e-prescribing platform
import { Patient, Prescription, RefillRequest, Alert, Drug, Pharmacy, User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Priya Deshmukh',
    email: 'priya.deshmukh@healthsys.com',
    role: 'doctor',
    deaNumber: 'BD1234563',
    npiNumber: '1234567890',
    specialty: 'Internal Medicine'
  },
  {
    id: '2',
    name: 'Robert Chen, PharmD',
    email: 'robert.chen@pharmacy.com',
    role: 'pharmacist',
    npiNumber: '0987654321'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@healthsys.com',
    role: 'admin'
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'Omkar Katale',
    dob: '1995-03-15',
    age: 29,
    allergies: ['Penicillin', 'Sulfa drugs'],
    insurance: 'Blue Cross Blue Shield',
    medicareId: 'MC1234567A',
    conditions: [
      { id: 'C1', name: 'Type 2 Diabetes', icd10Code: 'E11.9', diagnosedDate: '2020-01-15' },
      { id: 'C2', name: 'Hypertension', icd10Code: 'I10', diagnosedDate: '2018-06-22' }
    ],
    medications: [
      {
        id: 'M1',
        name: 'Metformin',
        genericName: 'Metformin HCl',
        strength: '500mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth twice daily with meals',
        quantity: 60,
        refills: 5,
        prescribedDate: '2025-12-01',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        ndc: '00093-7214-01'
      },
      {
        id: 'M2',
        name: 'Lisinopril',
        genericName: 'Lisinopril',
        strength: '10mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily',
        quantity: 30,
        refills: 11,
        prescribedDate: '2025-12-01',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        ndc: '68180-0513-01'
      }
    ]
  },
  {
    id: 'P002',
    name: 'Priya Deshmukh',
    dob: '1978-07-22',
    age: 47,
    allergies: [],
    insurance: 'Aetna',
    conditions: [
      { id: 'C3', name: 'Asthma', icd10Code: 'J45.909', diagnosedDate: '2015-03-10' }
    ],
    medications: [
      {
        id: 'M3',
        name: 'Albuterol',
        genericName: 'Albuterol Sulfate',
        strength: '90mcg',
        dosageForm: 'Inhaler',
        sig: 'Inhale 2 puffs every 4-6 hours as needed',
        quantity: 1,
        refills: 3,
        prescribedDate: '2026-01-10',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Walgreens',
        ndc: '00173-0682-20'
      }
    ]
  },
  {
    id: 'P003',
    name: 'Rahul Patil',
    dob: '1990-11-08',
    age: 35,
    allergies: ['Codeine'],
    insurance: 'UnitedHealthcare',
    medicaidId: 'MC9876543B',
    conditions: [
      { id: 'C4', name: 'Chronic Back Pain', icd10Code: 'M54.5', diagnosedDate: '2023-05-15' }
    ],
    medications: []
  },
  {
    id: 'P004',
    name: 'Sneha Kulkarni',
    dob: '1992-05-18',
    age: 33,
    allergies: ['Latex'],
    insurance: 'Cigna',
    conditions: [
      { id: 'C5', name: 'Hypothyroidism', icd10Code: 'E03.9', diagnosedDate: '2019-08-12' }
    ],
    medications: [
      {
        id: 'M4',
        name: 'Levothyroxine',
        genericName: 'Levothyroxine Sodium',
        strength: '75mcg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily on empty stomach',
        quantity: 90,
        refills: 11,
        prescribedDate: '2025-11-15',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        ndc: '00093-4941-98'
      }
    ]
  },
  {
    id: 'P005',
    name: 'Anil Joshi',
    dob: '1958-12-03',
    age: 67,
    allergies: ['Aspirin', 'NSAIDs'],
    insurance: 'Medicare',
    medicareId: 'MC7654321C',
    conditions: [
      { id: 'C6', name: 'Atrial Fibrillation', icd10Code: 'I48.91', diagnosedDate: '2021-03-20' },
      { id: 'C7', name: 'Coronary Artery Disease', icd10Code: 'I25.10', diagnosedDate: '2019-11-05' }
    ],
    medications: [
      {
        id: 'M5',
        name: 'Warfarin',
        genericName: 'Warfarin Sodium',
        strength: '5mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily as directed',
        quantity: 30,
        refills: 5,
        prescribedDate: '2026-01-05',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Walgreens',
        ndc: '00093-0149-01'
      }
    ]
  },
  {
    id: 'P006',
    name: 'Ananya Pawar',
    dob: '2010-09-14',
    age: 15,
    allergies: [],
    insurance: 'Blue Cross Blue Shield',
    conditions: [
      { id: 'C8', name: 'ADHD', icd10Code: 'F90.2', diagnosedDate: '2018-04-10' }
    ],
    medications: [
      {
        id: 'M6',
        name: 'Adderall',
        genericName: 'Amphetamine/Dextroamphetamine',
        strength: '10mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily in the morning',
        quantity: 30,
        refills: 0,
        prescribedDate: '2026-01-20',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        ndc: '00555-0768-02',
        scheduleClass: 'Schedule II'
      }
    ]
  },
  {
    id: 'P007',
    name: 'Vikram Shinde',
    dob: '1975-07-28',
    age: 50,
    allergies: ['Shellfish'],
    insurance: 'Aetna',
    conditions: [
      { id: 'C9', name: 'Depression', icd10Code: 'F32.9', diagnosedDate: '2022-01-15' },
      { id: 'C10', name: 'Anxiety Disorder', icd10Code: 'F41.9', diagnosedDate: '2022-01-15' }
    ],
    medications: [
      {
        id: 'M7',
        name: 'Sertraline',
        genericName: 'Sertraline HCl',
        strength: '50mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily',
        quantity: 30,
        refills: 5,
        prescribedDate: '2026-01-08',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Rite Aid',
        ndc: '00093-7146-01'
      }
    ]
  },
  {
    id: 'P008',
    name: 'Pooja Bhosale',
    dob: '1988-11-22',
    age: 37,
    allergies: ['Morphine'],
    insurance: 'UnitedHealthcare',
    conditions: [
      { id: 'C11', name: 'Migraine', icd10Code: 'G43.909', diagnosedDate: '2020-06-18' }
    ],
    medications: [
      {
        id: 'M8',
        name: 'Sumatriptan',
        genericName: 'Sumatriptan Succinate',
        strength: '100mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet at onset of migraine, may repeat once after 2 hours',
        quantity: 9,
        refills: 3,
        prescribedDate: '2025-12-20',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Walgreens',
        ndc: '00093-5142-56'
      }
    ]
  },
  {
    id: 'P009',
    name: 'Suresh Kadam',
    dob: '1952-04-09',
    age: 73,
    allergies: ['Penicillin'],
    insurance: 'Medicare',
    medicareId: 'MC5432109D',
    conditions: [
      { id: 'C12', name: 'COPD', icd10Code: 'J44.9', diagnosedDate: '2018-09-25' },
      { id: 'C13', name: 'Type 2 Diabetes', icd10Code: 'E11.9', diagnosedDate: '2015-03-12' }
    ],
    medications: [
      {
        id: 'M9',
        name: 'Spiriva',
        genericName: 'Tiotropium Bromide',
        strength: '18mcg',
        dosageForm: 'Inhaler',
        sig: 'Inhale 2 puffs once daily',
        quantity: 1,
        refills: 5,
        prescribedDate: '2025-11-30',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        ndc: '00597-0075-41'
      }
    ]
  },
  {
    id: 'P010',
    name: 'Sunita Jadhav',
    dob: '1968-08-17',
    age: 57,
    allergies: [],
    insurance: 'Cigna',
    conditions: [
      { id: 'C14', name: 'Osteoarthritis', icd10Code: 'M19.90', diagnosedDate: '2021-05-20' }
    ],
    medications: [
      {
        id: 'M10',
        name: 'Meloxicam',
        genericName: 'Meloxicam',
        strength: '15mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily with food',
        quantity: 30,
        refills: 5,
        prescribedDate: '2026-01-12',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Community Pharmacy',
        ndc: '00093-7355-01'
      }
    ]
  },
  {
    id: 'P011',
    name: 'Rohan Sawant',
    dob: '1995-02-28',
    age: 31,
    allergies: ['Sulfa drugs'],
    insurance: 'Blue Cross Blue Shield',
    conditions: [
      { id: 'C15', name: 'Bacterial Sinusitis', icd10Code: 'J01.90', diagnosedDate: '2026-02-10' }
    ],
    medications: [
      {
        id: 'M11',
        name: 'Azithromycin',
        genericName: 'Azithromycin',
        strength: '250mg',
        dosageForm: 'Tablet',
        sig: 'Take 2 tablets on day 1, then 1 tablet daily for 4 days',
        quantity: 6,
        refills: 0,
        prescribedDate: '2026-02-10',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Walgreens',
        ndc: '00093-7146-12'
      }
    ]
  },
  {
    id: 'P012',
    name: 'Kavita Deshpande',
    dob: '1983-06-05',
    age: 42,
    allergies: ['Iodine'],
    insurance: 'Aetna',
    conditions: [
      { id: 'C16', name: 'Hyperlipidemia', icd10Code: 'E78.5', diagnosedDate: '2023-07-14' }
    ],
    medications: [
      {
        id: 'M12',
        name: 'Rosuvastatin',
        genericName: 'Rosuvastatin Calcium',
        strength: '20mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily at bedtime',
        quantity: 30,
        refills: 11,
        prescribedDate: '2026-01-18',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'CVS Pharmacy',
        ndc: '00093-7663-98'
      }
    ]
  },
  {
    id: 'P013',
    name: 'Santosh Gaikwad',
    dob: '1960-10-12',
    age: 65,
    allergies: ['Codeine', 'Morphine'],
    insurance: 'Medicare',
    medicareId: 'MC9876543E',
    conditions: [
      { id: 'C17', name: 'Benign Prostatic Hyperplasia', icd10Code: 'N40.0', diagnosedDate: '2022-04-08' }
    ],
    medications: [
      {
        id: 'M13',
        name: 'Tamsulosin',
        genericName: 'Tamsulosin HCl',
        strength: '0.4mg',
        dosageForm: 'Capsule',
        sig: 'Take 1 capsule by mouth once daily 30 minutes after same meal',
        quantity: 30,
        refills: 5,
        prescribedDate: '2026-01-22',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Rite Aid',
        ndc: '00093-7501-01'
      }
    ]
  },
  {
    id: 'P014',
    name: 'Manisha Chavan',
    dob: '1972-03-30',
    age: 53,
    allergies: [],
    insurance: 'UnitedHealthcare',
    conditions: [
      { id: 'C18', name: 'Insomnia', icd10Code: 'G47.00', diagnosedDate: '2024-11-20' }
    ],
    medications: [
      {
        id: 'M14',
        name: 'Zolpidem',
        genericName: 'Zolpidem Tartrate',
        strength: '10mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth at bedtime as needed',
        quantity: 30,
        refills: 2,
        prescribedDate: '2026-01-25',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Walgreens',
        ndc: '00093-5335-56',
        scheduleClass: 'Schedule IV'
      }
    ]
  },
  {
    id: 'P015',
    name: 'Amit Kale',
    dob: '1998-12-15',
    age: 27,
    allergies: ['Latex', 'Penicillin'],
    insurance: 'Cigna',
    conditions: [
      { id: 'C19', name: 'Seasonal Allergies', icd10Code: 'J30.2', diagnosedDate: '2024-04-15' }
    ],
    medications: [
      {
        id: 'M15',
        name: 'Cetirizine',
        genericName: 'Cetirizine HCl',
        strength: '10mg',
        dosageForm: 'Tablet',
        sig: 'Take 1 tablet by mouth once daily',
        quantity: 90,
        refills: 3,
        prescribedDate: '2026-01-28',
        prescribedBy: 'Dr. Sarah Johnson',
        pharmacy: 'Community Pharmacy',
        ndc: '00093-1044-01'
      }
    ]
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'RX001',
    patientId: 'P001',
    patientName: 'Omkar Katale',
    medication: 'Atorvastatin 20mg',
    strength: '20mg',
    quantity: 30,
    refills: 11,
    sig: 'Take 1 tablet by mouth once daily at bedtime',
    prescribedDate: '2026-02-13',
    status: 'pending',
    pharmacy: 'CVS Pharmacy',
    isControlled: false
  },
  {
    id: 'RX002',
    patientId: 'P002',
    patientName: 'Priya Deshmukh',
    medication: 'Prednisone 10mg',
    strength: '10mg',
    quantity: 21,
    refills: 0,
    sig: 'Take as directed: 3 tablets daily for 3 days, then 2 tablets daily for 3 days, then 1 tablet daily for 3 days',
    prescribedDate: '2026-02-12',
    status: 'dispensed',
    pharmacy: 'Walgreens',
    isControlled: false
  },
  {
    id: 'RX003',
    patientId: 'P004',
    patientName: 'Sneha Kulkarni',
    medication: 'Levothyroxine 75mcg',
    strength: '75mcg',
    quantity: 90,
    refills: 11,
    sig: 'Take 1 tablet by mouth once daily on empty stomach',
    prescribedDate: '2026-02-11',
    status: 'approved',
    pharmacy: 'CVS Pharmacy',
    isControlled: false
  },
  {
    id: 'RX004',
    patientId: 'P006',
    patientName: 'Ananya Pawar',
    medication: 'Adderall 10mg',
    strength: '10mg',
    quantity: 30,
    refills: 0,
    sig: 'Take 1 tablet by mouth once daily in the morning',
    prescribedDate: '2026-02-14',
    status: 'pending',
    pharmacy: 'CVS Pharmacy',
    isControlled: true,
    scheduleClass: 'Schedule II'
  },
  {
    id: 'RX005',
    patientId: 'P007',
    patientName: 'Vikram Shinde',
    medication: 'Sertraline 50mg',
    strength: '50mg',
    quantity: 30,
    refills: 5,
    sig: 'Take 1 tablet by mouth once daily',
    prescribedDate: '2026-02-10',
    status: 'dispensed',
    pharmacy: 'Rite Aid',
    isControlled: false
  },
  {
    id: 'RX006',
    patientId: 'P011',
    patientName: 'Rohan Sawant',
    medication: 'Azithromycin 250mg',
    strength: '250mg',
    quantity: 6,
    refills: 0,
    sig: 'Take 2 tablets on day 1, then 1 tablet daily for 4 days',
    prescribedDate: '2026-02-10',
    status: 'dispensed',
    pharmacy: 'Walgreens',
    isControlled: false
  },
  {
    id: 'RX007',
    patientId: 'P012',
    patientName: 'Kavita Deshpande',
    medication: 'Rosuvastatin 20mg',
    strength: '20mg',
    quantity: 30,
    refills: 11,
    sig: 'Take 1 tablet by mouth once daily at bedtime',
    prescribedDate: '2026-02-09',
    status: 'approved',
    pharmacy: 'CVS Pharmacy',
    isControlled: false
  },
  {
    id: 'RX008',
    patientId: 'P014',
    patientName: 'Manisha Chavan',
    medication: 'Zolpidem 10mg',
    strength: '10mg',
    quantity: 30,
    refills: 2,
    sig: 'Take 1 tablet by mouth at bedtime as needed',
    prescribedDate: '2026-02-08',
    status: 'dispensed',
    pharmacy: 'Walgreens',
    isControlled: true,
    scheduleClass: 'Schedule IV'
  },
  {
    id: 'RX009',
    patientId: 'P005',
    patientName: 'Anil Joshi',
    medication: 'Warfarin 5mg',
    strength: '5mg',
    quantity: 30,
    refills: 5,
    sig: 'Take 1 tablet by mouth once daily as directed',
    prescribedDate: '2026-02-07',
    status: 'approved',
    pharmacy: 'Walgreens',
    isControlled: false
  },
  {
    id: 'RX010',
    patientId: 'P010',
    patientName: 'Sunita Jadhav',
    medication: 'Meloxicam 15mg',
    strength: '15mg',
    quantity: 30,
    refills: 5,
    sig: 'Take 1 tablet by mouth once daily with food',
    prescribedDate: '2026-02-06',
    status: 'dispensed',
    pharmacy: 'Community Pharmacy',
    isControlled: false
  }
];

export const mockRefillRequests: RefillRequest[] = [
  {
    id: 'RF001',
    patientName: 'Omkar Katale',
    medication: 'Metformin 500mg',
    lastFillDate: '2026-01-15',
    remainingRefills: 4,
    pharmacy: 'CVS Pharmacy',
    status: 'pending'
  },
  {
    id: 'RF002',
    patientName: 'Priya Deshmukh',
    medication: 'Albuterol Inhaler 90mcg',
    lastFillDate: '2026-01-10',
    remainingRefills: 2,
    pharmacy: 'Walgreens',
    status: 'pending'
  },
  {
    id: 'RF003',
    patientName: 'Naitik Jadhav',
    medication: 'Lisinopril 10mg',
    lastFillDate: '2026-01-20',
    remainingRefills: 10,
    pharmacy: 'CVS Pharmacy',
    status: 'pending'
  },
  {
    id: 'RF004',
    patientName: 'Sneha Kulkarni',
    medication: 'Levothyroxine 75mcg',
    lastFillDate: '2025-11-15',
    remainingRefills: 8,
    pharmacy: 'CVS Pharmacy',
    status: 'pending'
  },
  {
    id: 'RF005',
    patientName: 'Anil Joshi',
    medication: 'Warfarin 5mg',
    lastFillDate: '2026-01-05',
    remainingRefills: 4,
    pharmacy: 'Walgreens',
    status: 'pending'
  },
  {
    id: 'RF006',
    patientName: 'Vikram Shinde',
    medication: 'Sertraline 50mg',
    lastFillDate: '2026-01-08',
    remainingRefills: 3,
    pharmacy: 'Rite Aid',
    status: 'pending'
  },
  {
    id: 'RF007',
    patientName: 'Pooja Bhosale',
    medication: 'Sumatriptan 100mg',
    lastFillDate: '2025-12-20',
    remainingRefills: 2,
    pharmacy: 'Walgreens',
    status: 'pending'
  },
  {
    id: 'RF008',
    patientName: 'Suresh Kadam',
    medication: 'Spiriva 18mcg',
    lastFillDate: '2025-11-30',
    remainingRefills: 4,
    pharmacy: 'CVS Pharmacy',
    status: 'pending'
  },
  {
    id: 'RF009',
    patientName: 'Sunita Jadhav',
    medication: 'Meloxicam 15mg',
    lastFillDate: '2026-01-12',
    remainingRefills: 3,
    pharmacy: 'Community Pharmacy',
    status: 'pending'
  },
  {
    id: 'RF010',
    patientName: 'Kavita Deshpande',
    medication: 'Rosuvastatin 20mg',
    lastFillDate: '2026-01-18',
    remainingRefills: 9,
    pharmacy: 'CVS Pharmacy',
    status: 'pending'
  },
  {
    id: 'RF011',
    patientName: 'Santosh Gaikwad',
    medication: 'Tamsulosin 0.4mg',
    lastFillDate: '2026-01-22',
    remainingRefills: 4,
    pharmacy: 'Rite Aid',
    status: 'pending'
  },
  {
    id: 'RF012',
    patientName: 'Amit Kale',
    medication: 'Cetirizine 10mg',
    lastFillDate: '2026-01-28',
    remainingRefills: 2,
    pharmacy: 'Community Pharmacy',
    status: 'pending'
  }
];

export const mockAlerts: Alert[] = [
  // {
  //   id: 'A001',
  //   type: 'recall',
  //   severity: 'critical',
  //   title: 'Drug Recall Alert',
  //   message: 'Losartan tablets recalled due to trace amounts of impurities. Please review affected patients.',
  //   timestamp: '2026-02-13T09:00:00Z'
  // },
  // {
  //   id: 'A002',
  //   type: 'compliance',
  //   severity: 'warning',
  //   title: 'DEA Registration Renewal',
  //   message: 'Your DEA registration expires in 45 days. Please renew to continue prescribing controlled substances.',
  //   timestamp: '2026-02-12T14:30:00Z'
  // },
  // {
  //   id: 'A003',
  //   type: 'interaction',
  //   severity: 'warning',
  //   title: 'Drug Interaction Alert',
  //   message: '3 patients have potential drug-drug interactions requiring review.',
  //   timestamp: '2026-02-13T08:15:00Z'
  // },
  // {
  //   id: 'A004',
  //   type: 'allergy',
  //   severity: 'critical',
  //   title: 'Allergy Alert',
  //   message: 'Patient Robert Williams has documented Codeine allergy. Review before prescribing opioids.',
  //   timestamp: '2026-02-14T10:20:00Z'
  // },
  // {
  //   id: 'A005',
  //   type: 'duplicate',
  //   severity: 'warning',
  //   title: 'Duplicate Therapy Alert',
  //   message: 'Patient John Smith may have duplicate statin therapy. Review medication list.',
  //   timestamp: '2026-02-13T15:45:00Z'
  // },
  // {
  //   id: 'A006',
  //   type: 'blackbox',
  //   severity: 'critical',
  //   title: 'Black Box Warning',
  //   message: 'Warfarin requires regular INR monitoring. Ensure patient Michael Thompson has scheduled lab work.',
  //   timestamp: '2026-02-12T11:00:00Z'
  // },
  // {
  //   id: 'A007',
  //   type: 'compliance',
  //   severity: 'info',
  //   title: 'CME Credits Due',
  //   message: 'Your continuing medical education credits are due for renewal in 60 days.',
  //   timestamp: '2026-02-11T09:30:00Z'
  // },
  // {
  //   id: 'A008',
  //   type: 'interaction',
  //   severity: 'warning',
  //   title: 'Drug-Food Interaction',
  //   message: 'Levothyroxine should be taken on empty stomach. Patient education recommended.',
  //   timestamp: '2026-02-10T14:15:00Z'
  // },
  // {
  //   id: 'A009',
  //   type: 'recall',
  //   severity: 'warning',
  //   title: 'Medication Shortage',
  //   message: 'National shortage of Adderall reported. Consider alternative ADHD medications.',
  //   timestamp: '2026-02-09T08:00:00Z'
  // },
  // {
  //   id: 'A010',
  //   type: 'compliance',
  //   severity: 'warning',
  //   title: 'PDMP Check Required',
  //   message: '5 patients require PDMP checks before controlled substance renewal.',
  //   timestamp: '2026-02-14T07:30:00Z'
  // },
  // {
  //   id: 'A011',
  //   type: 'interaction',
  //   severity: 'info',
  //   title: 'Age-Related Dosing',
  //   message: 'Geriatric patients may require dose adjustments. Review medications for patients over 65.',
  //   timestamp: '2026-02-13T16:00:00Z'
  // },
  // {
  //   id: 'A012',
  //   type: 'allergy',
  //   severity: 'warning',
  //   title: 'Cross-Sensitivity Alert',
  //   message: 'Patient with Penicillin allergy may have cross-sensitivity to Cephalosporins.',
  //   timestamp: '2026-02-12T10:45:00Z'
  // },
  // {
  //   id: 'A013',
  //   type: 'compliance',
  //   severity: 'info',
  //   title: 'Prescription Audit',
  //   message: 'Monthly prescription audit completed. 247 prescriptions written, 100% compliance.',
  //   timestamp: '2026-02-01T09:00:00Z'
  // },
  // {
  //   id: 'A014',
  //   type: 'blackbox',
  //   severity: 'critical',
  //   title: 'Opioid Risk Assessment',
  //   message: 'Controlled substance prescriptions require risk assessment documentation.',
  //   timestamp: '2026-02-14T11:30:00Z'
  // },
  // {
  //   id: 'A015',
  //   type: 'duplicate',
  //   severity: 'warning',
  //   title: 'Multiple Pharmacy Alert',
  //   message: 'Patient using multiple pharmacies detected. Possible medication duplication risk.',
  //   timestamp: '2026-02-13T13:20:00Z'
  // }
];

export const mockDrugs: Drug[] = [
  {
    id: 'D001',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandName: 'Lipitor',
    strength: ['10mg', '20mg', '40mg', '80mg'],
    dosageForm: ['Tablet'],
    ndc: '00071-0155-23',
    isGeneric: true
  },
  {
    id: 'D002',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brandName: 'Prinivil',
    strength: ['2.5mg', '5mg', '10mg', '20mg', '40mg'],
    dosageForm: ['Tablet'],
    ndc: '68180-0513-01',
    isGeneric: true
  },
  {
    id: 'D003',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    brandName: 'Glucophage',
    strength: ['500mg', '850mg', '1000mg'],
    dosageForm: ['Tablet', 'Extended Release Tablet'],
    ndc: '00093-7214-01',
    isGeneric: true
  },
  {
    id: 'D004',
    name: 'Oxycodone',
    genericName: 'Oxycodone HCl',
    brandName: 'OxyContin',
    strength: ['5mg', '10mg', '15mg', '20mg', '30mg'],
    dosageForm: ['Tablet', 'Extended Release Tablet'],
    ndc: '00406-0505-01',
    scheduleClass: 'Schedule II',
    isGeneric: true
  },
  {
    id: 'D005',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    brandName: 'Amoxil',
    strength: ['250mg', '500mg', '875mg'],
    dosageForm: ['Capsule', 'Tablet', 'Suspension'],
    ndc: '00093-4147-73',
    isGeneric: true
  },
  {
    id: 'D006',
    name: 'Alprazolam',
    genericName: 'Alprazolam',
    brandName: 'Xanax',
    strength: ['0.25mg', '0.5mg', '1mg', '2mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-0094-01',
    scheduleClass: 'Schedule IV',
    isGeneric: true
  },
  {
    id: 'D007',
    name: 'Levothyroxine',
    genericName: 'Levothyroxine Sodium',
    brandName: 'Synthroid',
    strength: ['25mcg', '50mcg', '75mcg', '100mcg', '125mcg', '150mcg'],
    dosageForm: ['Tablet'],
    ndc: '00093-4941-98',
    isGeneric: true
  },
  {
    id: 'D008',
    name: 'Albuterol',
    genericName: 'Albuterol Sulfate',
    brandName: 'ProAir HFA',
    strength: ['90mcg'],
    dosageForm: ['Inhaler'],
    ndc: '00173-0682-20',
    isGeneric: false
  },
  {
    id: 'D009',
    name: 'Sertraline',
    genericName: 'Sertraline HCl',
    brandName: 'Zoloft',
    strength: ['25mg', '50mg', '100mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7146-01',
    isGeneric: true
  },
  {
    id: 'D010',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    brandName: 'Prilosec',
    strength: ['10mg', '20mg', '40mg'],
    dosageForm: ['Capsule'],
    ndc: '00093-7347-56',
    isGeneric: true
  },
  {
    id: 'D011',
    name: 'Amlodipine',
    genericName: 'Amlodipine Besylate',
    brandName: 'Norvasc',
    strength: ['2.5mg', '5mg', '10mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7369-56',
    isGeneric: true
  },
  {
    id: 'D012',
    name: 'Gabapentin',
    genericName: 'Gabapentin',
    brandName: 'Neurontin',
    strength: ['100mg', '300mg', '400mg', '600mg', '800mg'],
    dosageForm: ['Capsule', 'Tablet'],
    ndc: '00093-0136-01',
    isGeneric: true
  },
  {
    id: 'D013',
    name: 'Hydrochlorothiazide',
    genericName: 'Hydrochlorothiazide',
    brandName: 'Microzide',
    strength: ['12.5mg', '25mg', '50mg'],
    dosageForm: ['Capsule', 'Tablet'],
    ndc: '00093-1074-01',
    isGeneric: true
  },
  {
    id: 'D014',
    name: 'Losartan',
    genericName: 'Losartan Potassium',
    brandName: 'Cozaar',
    strength: ['25mg', '50mg', '100mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7365-56',
    isGeneric: true
  },
  {
    id: 'D015',
    name: 'Warfarin',
    genericName: 'Warfarin Sodium',
    brandName: 'Coumadin',
    strength: ['1mg', '2mg', '2.5mg', '3mg', '4mg', '5mg', '6mg', '7.5mg', '10mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-0149-01',
    isGeneric: true
  },
  {
    id: 'D016',
    name: 'Prednisone',
    genericName: 'Prednisone',
    brandName: 'Deltasone',
    strength: ['5mg', '10mg', '20mg', '50mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-0147-01',
    isGeneric: true
  },
  {
    id: 'D017',
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    brandName: 'Zithromax',
    strength: ['250mg', '500mg'],
    dosageForm: ['Tablet', 'Suspension'],
    ndc: '00093-7146-12',
    isGeneric: true
  },
  {
    id: 'D018',
    name: 'Rosuvastatin',
    genericName: 'Rosuvastatin Calcium',
    brandName: 'Crestor',
    strength: ['5mg', '10mg', '20mg', '40mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7663-98',
    isGeneric: true
  },
  {
    id: 'D019',
    name: 'Montelukast',
    genericName: 'Montelukast Sodium',
    brandName: 'Singulair',
    strength: ['4mg', '5mg', '10mg'],
    dosageForm: ['Tablet', 'Chewable Tablet'],
    ndc: '00093-7355-56',
    isGeneric: true
  },
  {
    id: 'D020',
    name: 'Escitalopram',
    genericName: 'Escitalopram Oxalate',
    brandName: 'Lexapro',
    strength: ['5mg', '10mg', '20mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7540-56',
    isGeneric: true
  },
  {
    id: 'D021',
    name: 'Adderall',
    genericName: 'Amphetamine/Dextroamphetamine',
    brandName: 'Adderall',
    strength: ['5mg', '10mg', '15mg', '20mg', '30mg'],
    dosageForm: ['Tablet'],
    ndc: '00555-0768-02',
    scheduleClass: 'Schedule II',
    isGeneric: false
  },
  {
    id: 'D022',
    name: 'Sumatriptan',
    genericName: 'Sumatriptan Succinate',
    brandName: 'Imitrex',
    strength: ['25mg', '50mg', '100mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-5142-56',
    isGeneric: true
  },
  {
    id: 'D023',
    name: 'Meloxicam',
    genericName: 'Meloxicam',
    brandName: 'Mobic',
    strength: ['7.5mg', '15mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7355-01',
    isGeneric: true
  },
  {
    id: 'D024',
    name: 'Tamsulosin',
    genericName: 'Tamsulosin HCl',
    brandName: 'Flomax',
    strength: ['0.4mg'],
    dosageForm: ['Capsule'],
    ndc: '00093-7501-01',
    isGeneric: true
  },
  {
    id: 'D025',
    name: 'Zolpidem',
    genericName: 'Zolpidem Tartrate',
    brandName: 'Ambien',
    strength: ['5mg', '10mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-5335-56',
    scheduleClass: 'Schedule IV',
    isGeneric: true
  },
  {
    id: 'D026',
    name: 'Cetirizine',
    genericName: 'Cetirizine HCl',
    brandName: 'Zyrtec',
    strength: ['5mg', '10mg'],
    dosageForm: ['Tablet', 'Chewable Tablet', 'Syrup'],
    ndc: '00093-1044-01',
    isGeneric: true
  },
  {
    id: 'D027',
    name: 'Spiriva',
    genericName: 'Tiotropium Bromide',
    brandName: 'Spiriva',
    strength: ['18mcg'],
    dosageForm: ['Inhaler'],
    ndc: '00597-0075-41',
    isGeneric: false
  },
  {
    id: 'D028',
    name: 'Furosemide',
    genericName: 'Furosemide',
    brandName: 'Lasix',
    strength: ['20mg', '40mg', '80mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-0064-01',
    isGeneric: true
  },
  {
    id: 'D029',
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    brandName: 'Protonix',
    strength: ['20mg', '40mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7347-73',
    isGeneric: true
  },
  {
    id: 'D030',
    name: 'Clopidogrel',
    genericName: 'Clopidogrel Bisulfate',
    brandName: 'Plavix',
    strength: ['75mg'],
    dosageForm: ['Tablet'],
    ndc: '00093-7298-56',
    isGeneric: true
  }
];

export const mockPharmacies: Pharmacy[] = [
  {
    id: 'PH001',
    name: 'CVS Pharmacy #1234',
    address: '123 Main St, Boston, MA 02101',
    phone: '(617) 555-0100',
    fax: '(617) 555-0101',
    distance: '0.5 miles'
  },
  {
    id: 'PH002',
    name: 'Walgreens #5678',
    address: '456 Oak Ave, Boston, MA 02102',
    phone: '(617) 555-0200',
    fax: '(617) 555-0201',
    distance: '0.8 miles'
  },
  {
    id: 'PH003',
    name: 'Rite Aid #9101',
    address: '789 Elm St, Boston, MA 02103',
    phone: '(617) 555-0300',
    fax: '(617) 555-0301',
    distance: '1.2 miles'
  },
  {
    id: 'PH004',
    name: 'Community Pharmacy',
    address: '321 Pine Rd, Boston, MA 02104',
    phone: '(617) 555-0400',
    fax: '(617) 555-0401',
    distance: '1.5 miles'
  },
  {
    id: 'PH005',
    name: 'Target Pharmacy #2468',
    address: '555 Commerce Blvd, Boston, MA 02105',
    phone: '(617) 555-0500',
    fax: '(617) 555-0501',
    distance: '2.1 miles'
  },
  {
    id: 'PH006',
    name: 'Walmart Pharmacy #1357',
    address: '777 Market St, Boston, MA 02106',
    phone: '(617) 555-0600',
    fax: '(617) 555-0601',
    distance: '2.5 miles'
  },
  {
    id: 'PH007',
    name: 'Kroger Pharmacy #8642',
    address: '999 Shopping Center Dr, Boston, MA 02107',
    phone: '(617) 555-0700',
    fax: '(617) 555-0701',
    distance: '3.0 miles'
  },
  {
    id: 'PH008',
    name: 'Express Scripts Mail Order',
    address: 'PO Box 66588, St. Louis, MO 63166',
    phone: '(800) 555-0800',
    fax: '(800) 555-0801',
    distance: 'Mail Order'
  },
  {
    id: 'PH009',
    name: 'Specialty Pharmacy Services',
    address: '1010 Medical Plaza, Boston, MA 02108',
    phone: '(617) 555-0900',
    fax: '(617) 555-0901',
    distance: '1.8 miles'
  },
  {
    id: 'PH010',
    name: 'HealthMart Pharmacy',
    address: '2020 Wellness Way, Boston, MA 02109',
    phone: '(617) 555-1000',
    fax: '(617) 555-1001',
    distance: '2.3 miles'
  }
];
