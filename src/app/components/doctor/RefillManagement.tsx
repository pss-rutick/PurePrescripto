// src/app/components/doctor/RefillManagement.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Eye
} from 'lucide-react';
import { mockRefillRequests } from '../../lib/mockData';
import { RefillRequest } from '../../lib/types';

interface RefillManagementProps {
  onBack: () => void;
}

export function RefillManagement({ onBack }: RefillManagementProps) {
  const [refills, setRefills] = useState<RefillRequest[]>(mockRefillRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRefills, setSelectedRefills] = useState<string[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRefill, setSelectedRefill] = useState<RefillRequest | null>(null);

  const filteredRefills = refills.filter(refill =>
    refill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    refill.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRefills = filteredRefills.filter(r => r.status === 'pending');

  const handleViewDetails = (refill: RefillRequest) => {
    setSelectedRefill(refill);
    setShowDetailsModal(true);
  };

  const handleBulkApprove = () => {
    setRefills(refills.map(r =>
      selectedRefills.includes(r.id) ? { ...r, status: 'approved' as const } : r
    ));
    setSelectedRefills([]);
  };

  const toggleSelectRefill = (refillId: string) => {
    setSelectedRefills(prev =>
      prev.includes(refillId)
        ? prev.filter(id => id !== refillId)
        : [...prev, refillId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRefills.length === pendingRefills.length) {
      setSelectedRefills([]);
    } else {
      setSelectedRefills(pendingRefills.map(r => r.id));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Refill Management</h1>
            <p className="text-sm text-slate-600 mt-1">
              {pendingRefills.length} pending refill requests
            </p>
          </div>
          {selectedRefills.length > 0 && (
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleBulkApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Selected ({selectedRefills.length})
            </Button>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by patient name or medication..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending</p>
                  <p className="text-3xl font-semibold mt-2">
                    {refills.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-amber-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Approved Today</p>
                  <p className="text-3xl font-semibold mt-2">
                    {refills.filter(r => r.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-emerald-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Denied Today</p>
                  <p className="text-3xl font-semibold mt-2">
                    {refills.filter(r => r.status === 'denied').length}
                  </p>
                </div>
                <XCircle className="h-12 w-12 text-red-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refill Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Refill Requests</CardTitle>
              {pendingRefills.length > 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedRefills.length === pendingRefills.length}
                    onCheckedChange={toggleSelectAll}
                  />
                  <label className="text-sm text-slate-600 cursor-pointer" onClick={toggleSelectAll}>
                    Select All
                  </label>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {pendingRefills.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
                <p>No pending refill requests</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRefills.map((refill) => (
                  <div
                    key={refill.id}
                    className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedRefills.includes(refill.id)}
                        onCheckedChange={() => toggleSelectRefill(refill.id)}
                      />
                      <div className="flex-1 grid grid-cols-5 gap-4">
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Patient</div>
                          <div className="font-medium">{refill.patientName}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Medication</div>
                          <div className="font-medium">{refill.medication}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Last Fill Date</div>
                          <div className="text-sm">{refill.lastFillDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Remaining Refills</div>
                          <div className="text-sm">{refill.remainingRefills}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Pharmacy</div>
                          <div className="text-sm">{refill.pharmacy}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleViewDetails(refill)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Processed */}
        {refills.filter(r => r.status !== 'pending').length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recently Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {refills.filter(r => r.status !== 'pending').map((refill) => (
                  <div key={refill.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{refill.patientName}</div>
                        <div className="text-sm text-slate-600">{refill.medication}</div>
                      </div>
                      <Badge
                        variant={refill.status === 'approved' ? 'default' : 'destructive'}
                        className={refill.status === 'approved' ? 'bg-emerald-600' : ''}
                      >
                        {refill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Refill Request Details</DialogTitle>
            <DialogDescription>
              Review the complete details of this refill request
            </DialogDescription>
          </DialogHeader>
          {selectedRefill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Patient Name</div>
                  <div className="font-medium">{selectedRefill.patientName}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Medication</div>
                  <div className="font-medium">{selectedRefill.medication}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Last Fill Date</div>
                  <div className="font-medium">{selectedRefill.lastFillDate}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Remaining Refills</div>
                  <div className="font-medium">{selectedRefill.remainingRefills}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Pharmacy</div>
                  <div className="font-medium">{selectedRefill.pharmacy}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-600 mb-1">Status</div>
                  <Badge
                    variant={selectedRefill.status === 'approved' ? 'default' : selectedRefill.status === 'denied' ? 'destructive' : 'secondary'}
                    className={selectedRefill.status === 'approved' ? 'bg-emerald-600' : ''}
                  >
                    {selectedRefill.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
