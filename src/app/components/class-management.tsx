import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Clock, MapPin, DollarSign, User, Phone, BookOpen, GraduationCap, Edit, Trash2, Play } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import type { Class, Tutor, Contract, Session } from "../App";

interface ClassManagementProps {
  classes: Class[];
  tutors: Tutor[];
  contracts: Contract[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}
export function ClassManagement({ classes, tutors, contracts, setClasses, setContracts, sessions, setSessions }: ClassManagementProps) {
  const unassignedClasses = classes.filter(c => c.status === "unassigned");
  const assignedClasses = classes.filter(c => c.status === "assigned");

  const getTutorForClass = (classId: string): Tutor | undefined => {
    const contract = contracts.find(c => c.classId === classId && c.status !== "failed");
    if (!contract) return undefined;
    return tutors.find(t => t.id === contract.tutorId);
  };

  const ClassCard = ({ cls, tutor }: { cls: Class; tutor?: Tutor }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{cls.subject}</h3>
                <Badge variant={cls.status === "assigned" ? "default" : "secondary"}>
                  {cls.status === "assigned" ? "Đã giao" : "Chưa giao"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{cls.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4 flex-shrink-0" />
              <span>{cls.studentName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="h-4 w-4 flex-shrink-0" />
              <span>{cls.grade}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{cls.area}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-4 w-4 flex-shrink-0" />
              <span>Tối đa {cls.maxFee.toLocaleString()}đ</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{cls.sessionsPerWeek} buổi/tuần</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{cls.parentPhone}</span>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Phụ huynh:</span> {cls.parentName}
            </div>
          </div>

          {tutor && (
            <div className="pt-3 border-t">
              <div className="text-sm font-semibold text-gray-700 mb-2">Gia sư đang dạy:</div>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                  <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{tutor.name}</div>
                  <div className="text-xs text-gray-600">{tutor.phone}</div>
                </div>
              </div>
            </div>
          )}
          <div className="pt-3 border-t flex items-center justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => openEdit(cls)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(cls.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => handleRun(cls)}>
              <Play className="h-4 w-4 mr-1" />Chạy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Add / Edit dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const emptyForm = (): Partial<Class> => ({
    id: "",
    subject: "",
    area: "",
    maxFee: 0,
    studentName: "",
    parentName: "",
    parentPhone: "",
    status: "unassigned",
    description: "",
    grade: "",
    sessionsPerWeek: 1
  });

  const [form, setForm] = useState<Partial<Class>>(emptyForm());

  const openEdit = (cls: Class) => {
    setEditingClass(cls);
    setForm(cls);
    setEditOpen(true);
  };

  const handleAddClass = () => {
    if (!form.subject || !form.studentName) {
      toast.error("Vui lòng điền môn học và tên học sinh");
      return;
    }
    const newClass: Class = {
      ...(form as Class),
      id: `c${classes.length + 1}`,
      maxFee: Number(form.maxFee) || 0,
      sessionsPerWeek: Number(form.sessionsPerWeek) || 1,
      status: (form.status as Class["status"]) || "unassigned"
    };
    setClasses(prev => [...prev, newClass]);
    setAddOpen(false);
    setForm(emptyForm());
    toast.success("Đã thêm lớp mới");
  };

  const handleEditClass = () => {
    if (!editingClass) return;
    setClasses(prev => prev.map(c => c.id === editingClass.id ? { ...(form as Class) } : c));
    setEditOpen(false);
    setEditingClass(null);
    setForm(emptyForm());
    toast.success("Đã cập nhật lớp");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa lớp này?")) return;
    setClasses(prev => prev.filter(c => c.id !== id));
    // Remove related contracts
    setContracts(prev => prev.filter(ct => ct.classId !== id));
    toast.success("Đã xóa lớp");
  };

  const handleRun = (cls: Class) => {
    // Find contract
    const contract = contracts.find(ct => ct.classId === cls.id && ct.status === "active");
    if (!contract) {
      toast.error("Lớp chưa có hợp đồng đang hoạt động để chạy buổi");
      return;
    }
    const newSession: Session = {
      id: `s${sessions.length + 1}`,
      contractId: contract.id,
      sessionNumber: contract.sessionsCompleted + 1,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      notes: "Buổi học tự động tạo"
    };
    setSessions(prev => [...prev, newSession]);
    // update contract's sessionsCompleted
    setContracts(prev => prev.map(ct => ct.id === contract.id ? { ...ct, sessionsCompleted: ct.sessionsCompleted + 1 } : ct));
    toast.success(`Đã tạo buổi ${newSession.sessionNumber} cho hợp đồng ${contract.id}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quản lý Lớp học
          </CardTitle>
          <CardDescription>
            Theo dõi tất cả các lớp học đã giao và chưa giao
          </CardDescription>
          <div className="ml-auto">
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Thêm lớp</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm lớp mới</DialogTitle>
                  <DialogDescription>Điền thông tin lớp học</DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Môn</Label>
                      <Input value={form.subject || ""} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Khu vực</Label>
                      <Input value={form.area || ""} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Học sinh</Label>
                      <Input value={form.studentName || ""} onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Phụ huynh</Label>
                      <Input value={form.parentName || ""} onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Số điện thoại</Label>
                      <Input value={form.parentPhone || ""} onChange={e => setForm(f => ({ ...f, parentPhone: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Học phí tối đa</Label>
                      <Input type="number" value={String(form.maxFee ?? "")} onChange={e => setForm(f => ({ ...f, maxFee: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div>
                    <Label>Mô tả</Label>
                    <Textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddOpen(false)}>Hủy</Button>
                  <Button onClick={handleAddClass}>Thêm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa lớp</DialogTitle>
              <DialogDescription>Chỉnh sửa thông tin lớp</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Môn</Label>
                  <Input value={form.subject || ""} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div>
                  <Label>Khu vực</Label>
                  <Input value={form.area || ""} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Học sinh</Label>
                  <Input value={form.studentName || ""} onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))} />
                </div>
                <div>
                  <Label>Phụ huynh</Label>
                  <Input value={form.parentName || ""} onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Số điện thoại</Label>
                  <Input value={form.parentPhone || ""} onChange={e => setForm(f => ({ ...f, parentPhone: e.target.value }))} />
                </div>
                <div>
                  <Label>Học phí tối đa</Label>
                  <Input type="number" value={String(form.maxFee ?? "")} onChange={e => setForm(f => ({ ...f, maxFee: Number(e.target.value) }))} />
                </div>
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>Hủy</Button>
              <Button onClick={handleEditClass}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      <Tabs defaultValue="unassigned">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="unassigned">
            Chưa giao ({unassignedClasses.length})
          </TabsTrigger>
          <TabsTrigger value="assigned">
            Đã giao ({assignedClasses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unassigned" className="mt-6">
          {unassignedClasses.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                Không có lớp nào chưa được giao
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unassignedClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assigned" className="mt-6">
          {assignedClasses.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                Không có lớp nào đã được giao
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} tutor={getTutorForClass(cls.id)} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
