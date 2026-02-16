import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
    FileText,
    Edit,
    Send,
    Printer,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import { Patient, Drug, Pharmacy } from '../../lib/types';

interface PrescriptionPreviewProps {
    patient: Patient;
    drug: Drug;
    selectedStrength: string;
    selectedForm: string;
    quantity: string;
    refills: string;
    sig: string;
    frequency: string;
    route: string;
    duration: string;
    pharmacy: Pharmacy | null;
    icd10Code: string;
    isGeneric: boolean;
    daw: boolean;
    onEdit: () => void;
    onSign: () => void;
}

export function PrescriptionPreview({
    patient,
    drug,
    selectedStrength,
    selectedForm,
    quantity,
    refills,
    sig,
    frequency,
    route,
    duration,
    pharmacy,
    icd10Code,
    isGeneric,
    daw,
    onEdit,
    onSign
}: PrescriptionPreviewProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <Card>
                <CardHeader className="bg-blue-50 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="h-6 w-6 text-blue-600" />
                            <CardTitle>Prescription Preview</CardTitle>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={onEdit}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button variant="outline" size="sm">
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Patient Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-slate-600">Name</div>
                            <div className="font-medium">{patient.name}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-600">Date of Birth</div>
                            <div className="font-medium">{patient.dob}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-600">Age</div>
                            <div className="font-medium">{patient.age} years</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-600">Insurance</div>
                            <div className="font-medium">{patient.insurance}</div>
                        </div>
                        {patient.allergies.length > 0 && (
                            <div className="col-span-2">
                                <div className="text-sm text-slate-600 mb-1">Allergies</div>
                                <div className="flex gap-2 flex-wrap">
                                    {patient.allergies.map((allergy, idx) => (
                                        <Badge key={idx} variant="destructive">{allergy}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Prescription Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Prescription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                        <div className="text-lg font-semibold mb-2">
                            {isGeneric ? drug.genericName : drug.name} {selectedStrength}
                        </div>
                        <div className="text-sm text-slate-600">
                            {selectedForm} • NDC: {drug.ndc}
                        </div>
                        {drug.scheduleClass && (
                            <Badge variant="destructive" className="mt-2">{drug.scheduleClass}</Badge>
                        )}
                        {daw && (
                            <Badge variant="outline" className="mt-2 ml-2">Dispense As Written</Badge>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-slate-600">Quantity</div>
                            <div className="font-medium">{quantity}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-600">Refills</div>
                            <div className="font-medium">{refills}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-600">Days Supply</div>
                            <div className="font-medium">{duration || 'N/A'}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-600">Frequency</div>
                            <div className="font-medium">{frequency || 'N/A'}</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-slate-600 mb-1">Directions (Sig)</div>
                        <div className="p-3 bg-white border rounded font-medium">
                            {sig}
                        </div>
                    </div>

                    {icd10Code && (
                        <div>
                            <div className="text-sm text-slate-600">ICD-10 Code</div>
                            <div className="font-medium">{icd10Code}</div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pharmacy Information */}
            {pharmacy && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Pharmacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="font-medium text-lg">{pharmacy.name}</div>
                            <div className="text-sm text-slate-600">{pharmacy.address}</div>
                            <div className="text-sm text-slate-600">
                                Phone: {pharmacy.phone} • Fax: {pharmacy.fax}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Clinical Alerts */}
            {patient.allergies.length > 0 && (
                <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-900">Allergy Alert</AlertTitle>
                    <AlertDescription className="text-amber-800">
                        Patient has documented allergies: {patient.allergies.join(', ')}. Please verify no contraindications.
                    </AlertDescription>
                </Alert>
            )}

            {drug.scheduleClass && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Controlled Substance</AlertTitle>
                    <AlertDescription>
                        This is a {drug.scheduleClass} medication. Additional verification will be required for signing.
                    </AlertDescription>
                </Alert>
            )}

            <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertTitle className="text-emerald-900">Ready to Sign</AlertTitle>
                <AlertDescription className="text-emerald-800">
                    Prescription has been reviewed and is ready to be signed and sent to the pharmacy.
                </AlertDescription>
            </Alert>

            {/* Actions */}
            <div className="flex gap-3">
                <Button variant="outline" onClick={onEdit} className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Prescription
                </Button>
                <Button
                    onClick={onSign}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!pharmacy}
                >
                    <Send className="h-4 w-4 mr-2" />
                    Sign & Send Prescription
                </Button>
            </div>
        </div>
    );
}
