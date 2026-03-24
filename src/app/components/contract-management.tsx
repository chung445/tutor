import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FileText, Calendar, AlertCircle, CheckCircle, XCircle, DollarSign, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Contract, Session, Class, Tutor } from "../App";

interface ContractManagementProps {
  contracts: Contract[];
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  classes: Class[];
  tutors: Tutor[];
}

export function ContractManagement({ 
  contracts, 
  setContracts, 
  sessions, 
  setSessions, 
  classes, 
  tutors 
}: ContractManagementProps) {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [failDialogOpen, setFailDialogOpen] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<"completed" | "failed">("completed");
  const [sessionNotes, setSessionNotes] = useState("");

  const getClassForContract = (contractId: string): Class | undefined => {
    const contract = contracts.find(c => c.id === contractId);
    return contract ? classes.find(cl => cl.id === contract.classId) : undefined;
  };

  const getTutorForContract = (contractId: string): Tutor | undefined => {
    const contract = contracts.find(c => c.id === contractId);
    return contract ? tutors.find(t => t.id === contract.tutorId) : undefined;
  };

  const getSessionsForContract = (contractId: string): Session[] => {
    return sessions.filter(s => s.contractId === contractId).sort((a, b) => a.sessionNumber - b.sessionNumber);
  };

  const handleAddSession = () => {
    if (!selectedContract) return;

    const contractSessions = getSessionsForContract(selectedContract.id);
    const nextSessionNumber = contractSessions.length + 1;

    const newSession: Session = {
      id: `s${sessions.length + 1}`,
      contractId: selectedContract.id,
      sessionNumber: nextSessionNumber,
      date: new Date().toISOString().split('T')[0],
      status: sessionStatus,
      notes: sessionNotes
    };

    setSessions(prev => [...prev, newSession]);

    // Update contract
    const updatedContract = {
      ...selectedContract,
      sessionsCompleted: selectedContract.sessionsCompleted + 1
    };

    setContracts(prev => prev.map(c => c.id === selectedContract.id ? updatedContract : c));

    toast.success(`Đã thêm buổi ${nextSessionNumber} với trạng thái: ${sessionStatus === "completed" ? "Hoàn thành" : "Thất bại"}`);
    
    setSessionDialogOpen(false);
    setSessionNotes("");
    setSessionStatus("completed");
  };

  const handleMarkAsFailed = () => {
    if (!selectedContract) return;

    const contractSessions = getSessionsForContract(selectedContract.id);
    
    // Check if failed within first 2 sessions
    const refundAmount = selectedContract.sessionsCompleted <= 2 ? selectedContract.brokerageFee : 0;

    const updatedContract: Contract = {
      ...selectedContract,
      status: "failed",
      refundAmount,
      notes: selectedContract.sessionsCompleted <= 2 
        ? `Lớp hỏng trong ${selectedContract.sessionsCompleted} buổi đầu. Hoàn phí: ${refundAmount.toLocaleString()}đ`
        : "Lớp hỏng sau 2 buổi đầu. Không hoàn phí."
    };

    setContracts(prev => prev.map(c => c.id === selectedContract.id ? updatedContract : c));

    // Update class status back to unassigned
    const contract = contracts.find(c => c.id === selectedContract.id);
    if (contract) {
      // This would need to be passed from parent, but for now we'll just show the toast
      toast.warning(`Hợp đồng đã được đánh dấu thất bại. ${refundAmount > 0 ? `Hoàn phí: ${refundAmount.toLocaleString()}đ` : "Không hoàn phí."}`);
    }

    setFailDialogOpen(false);
  };

  const activeContracts = contracts.filter(c => c.status === "active");
  const failedContracts = contracts.filter(c => c.status === "failed");
  const completedContracts = contracts.filter(c => c.status === "completed");

  const ContractCard = ({ contract }: { contract: Contract }) => {
    const cls = getClassForContract(contract.id);
    const tutor = getTutorForContract(contract.id);
    const contractSessions = getSessionsForContract(contract.id);

    if (!cls || !tutor) return null;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{cls.subject} - {cls.studentName}</h3>
                  <Badge variant={
                    contract.status === "active" ? "default" : 
                    contract.status === "failed" ? "destructive" : 
                    "secondary"
                  }>
                    {contract.status === "active" ? "Đang dạy" : 
                     contract.status === "failed" ? "Đã hỏng" : 
                     "Hoàn thành"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={tutor.avatar} alt={tutor.name} />
                <AvatarFallback>{tutor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{tutor.name}</div>
                <div className="text-xs text-gray-600">{tutor.phone}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Bắt đầu: {new Date(contract.startDate).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="h-4 w-4" />
                <span>{contract.sessionsCompleted} buổi đã dạy</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span>Phí MG: {contract.brokerageFee.toLocaleString()}đ</span>
              </div>
              {contract.refundAmount > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <DollarSign className="h-4 w-4" />
                  <span>Hoàn: {contract.refundAmount.toLocaleString()}đ</span>
                </div>
              )}
            </div>

            {contract.notes && (
              <div className="p-3 bg-blue-50 rounded-lg text-sm">
                <div className="font-semibold text-blue-900 mb-1">Ghi chú:</div>
                <div className="text-blue-800">{contract.notes}</div>
              </div>
            )}

            {contractSessions.length > 0 && (
              <div className="pt-3 border-t">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  Lịch sử buổi học ({contractSessions.length} buổi):
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {contractSessions.map((session) => (
                    <div key={session.id} className="flex items-start gap-2 text-sm p-2 bg-gray-50 rounded">
                      {session.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">
                          Buổi {session.sessionNumber} - {new Date(session.date).toLocaleDateString('vi-VN')}
                        </div>
                        {session.notes && (
                          <div className="text-gray-600 text-xs mt-1">{session.notes}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {contract.status === "active" && (
              <div className="flex gap-2 pt-3 border-t">
                <Dialog open={sessionDialogOpen && selectedContract?.id === contract.id} onOpenChange={(open) => {
                  setSessionDialogOpen(open);
                  if (open) setSelectedContract(contract);
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm buổi học
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm buổi học mới</DialogTitle>
                      <DialogDescription>
                        Ghi nhận buổi học thứ {contractSessions.length + 1}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Trạng thái buổi học</Label>
                        <Select value={sessionStatus} onValueChange={(value: "completed" | "failed") => setSessionStatus(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Hoàn thành</SelectItem>
                            <SelectItem value="failed">Thất bại</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Ghi chú</Label>
                        <Textarea 
                          placeholder="Nội dung buổi học, tiến độ học sinh..."
                          value={sessionNotes}
                          onChange={(e) => setSessionNotes(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSessionDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleAddSession}>
                        Thêm buổi học
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={failDialogOpen && selectedContract?.id === contract.id} onOpenChange={(open) => {
                  setFailDialogOpen(open);
                  if (open) setSelectedContract(contract);
                }}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Đánh dấu hỏng
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Xác nhận lớp hỏng</DialogTitle>
                      <DialogDescription>
                        Đánh dấu hợp đồng này là thất bại
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <div className="font-semibold text-yellow-900 mb-2">Chính sách hoàn phí:</div>
                            <ul className="list-disc list-inside space-y-1 text-yellow-800">
                              <li>Nếu hỏng trong 2 buổi đầu: Hoàn phí môi giới 100%</li>
                              <li>Nếu hỏng sau 2 buổi: Không hoàn phí</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                        <div><span className="font-semibold">Số buổi đã dạy:</span> {contract.sessionsCompleted}</div>
                        <div><span className="font-semibold">Phí môi giới:</span> {contract.brokerageFee.toLocaleString()}đ</div>
                        <div className="pt-2 border-t">
                          <span className="font-semibold">Số tiền hoàn lại:</span>{" "}
                          <span className={contract.sessionsCompleted <= 2 ? "text-green-600 font-bold" : "text-red-600"}>
                            {contract.sessionsCompleted <= 2 ? contract.brokerageFee.toLocaleString() : "0"}đ
                          </span>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setFailDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button variant="destructive" onClick={handleMarkAsFailed}>
                        Xác nhận
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quản lý Hợp đồng
          </CardTitle>
          <CardDescription>
            Theo dõi hợp đồng, buổi học và xử lý hoàn phí khi lớp hỏng trong 2 buổi đầu
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{activeContracts.length}</div>
                <div className="text-sm text-gray-600">Hợp đồng đang dạy</div>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{failedContracts.length}</div>
                <div className="text-sm text-gray-600">Lớp đã hỏng</div>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {failedContracts.reduce((sum, c) => sum + c.refundAmount, 0).toLocaleString()}đ
                </div>
                <div className="text-sm text-gray-600">Tổng hoàn phí</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Contracts */}
      {activeContracts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hợp đồng đang dạy ({activeContracts.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeContracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))}
          </div>
        </div>
      )}

      {/* Failed Contracts */}
      {failedContracts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Lớp đã hỏng ({failedContracts.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {failedContracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))}
          </div>
        </div>
      )}

      {contracts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Chưa có hợp đồng nào
          </CardContent>
        </Card>
      )}
    </div>
  );
}
