import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Patient } from '../../lib/types';
import { mockPatients } from '../../lib/mockData';

interface AddPatientModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPatientAdded: (patient: Patient) => void;
}

export function AddPatientModal({ open, onOpenChange, onPatientAdded }: AddPatientModalProps) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [allergies, setAllergies] = useState('');
    const [insurance, setInsurance] = useState('');
    const [conditions, setConditions] = useState('');

    const handleSave = () => {
        // Calculate age from DOB
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Create new patient
        const newPatient: Patient = {
            id: `P${String(mockPatients.length + 1).padStart(3, '0')}`,
            name,
            dob,
            age,
            allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
            insurance,
            conditions: conditions ? conditions.split(',').map((c, idx) => ({
                id: `C${Date.now()}_${idx}`,
                name: c.trim(),
                icd10Code: '',
                diagnosedDate: new Date().toISOString().split('T')[0]
            })) : [],
            medications: []
        };

        // Add to mock data
        mockPatients.push(newPatient);

        // Notify parent
        onPatientAdded(newPatient);

        // Reset form
        setName('');
        setDob('');
        setAllergies('');
        setInsurance('');
        setConditions('');

        // Close modal
        onOpenChange(false);
    };

    const isFormValid = name && dob && insurance;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>
                        Enter patient information to add them to your patient list
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth *</Label>
                            <Input
                                id="dob"
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="insurance">Insurance Provider *</Label>
                        <Select value={insurance} onValueChange={setInsurance}>
                            <SelectTrigger id="insurance">
                                <SelectValue placeholder="Select insurance provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Blue Cross Blue Shield">Blue Cross Blue Shield</SelectItem>
                                <SelectItem value="Aetna">Aetna</SelectItem>
                                <SelectItem value="UnitedHealthcare">UnitedHealthcare</SelectItem>
                                <SelectItem value="Cigna">Cigna</SelectItem>
                                <SelectItem value="Medicare">Medicare</SelectItem>
                                <SelectItem value="Medicaid">Medicaid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                        <Input
                            id="allergies"
                            placeholder="Penicillin, Sulfa drugs"
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="conditions">Medical Conditions (comma-separated)</Label>
                        <Textarea
                            id="conditions"
                            placeholder="Type 2 Diabetes, Hypertension"
                            value={conditions}
                            onChange={(e) => setConditions(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!isFormValid}>
                        Add Patient
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
