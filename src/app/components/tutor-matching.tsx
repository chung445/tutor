import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Search, Star, MapPin, DollarSign, BookOpen, UserPlus } from "lucide-react";
import { toast } from "sonner";
import type { Tutor, Class, Contract, Session } from "../App";

interface TutorMatchingProps {
  tutors: Tutor[];
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  contracts: Contract[];
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

export function TutorMatching({ tutors, classes, setClasses, contracts, setContracts, setSessions }: TutorMatchingProps) {
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [maxFeeFilter, setMaxFeeFilter] = useState<string>("");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Get unique subjects and areas
  const allSubjects = Array.from(new Set(tutors.flatMap(t => t.subjects)));
  const allAreas = Array.from(new Set(tutors.map(t => t.area)));

  // Filter tutors
  const filteredTutors = tutors.filter(tutor => {
    const subjectMatch = subjectFilter === "all" || tutor.subjects.includes(subjectFilter);
    const areaMatch = areaFilter === "all" || tutor.area === areaFilter;
    const feeMatch = !maxFeeFilter || tutor.hourlyRate <= parseInt(maxFeeFilter);
    return subjectMatch && areaMatch && feeMatch;
  });

  // Get unassigned classes
  const unassignedClasses = classes.filter(c => c.status === "unassigned");

  const handleAssignClass = () => {
    if (!selectedTutor || !selectedClass) {
      toast.error("Vui lòng chọn gia sư và lớp học");
      return;
    }

    const classToAssign = classes.find(c => c.id === selectedClass);
    if (!classToAssign) return;

    // Check if tutor's rate is within budget
    if (selectedTutor.hourlyRate > classToAssign.maxFee) {
      toast.error(`Học phí tối đa (${classToAssign.maxFee.toLocaleString()}đ) thấp hơn mức của gia sư (${selectedTutor.hourlyRate.toLocaleString()}đ)`);
      return;
    }

    // Update class status
    setClasses(prev => prev.map(c => 
      c.id === selectedClass ? { ...c, status: "assigned" as const } : c
    ));

    // Create new contract
    const newContract: Contract = {
      id: `ct${contracts.length + 1}`,
      tutorId: selectedTutor.id,
      classId: selectedClass,
      startDate: new Date().toISOString().split('T')[0],
      sessionsCompleted: 0,
      status: "active",
      brokerageFee: selectedTutor.hourlyRate,
      refundAmount: 0,
      notes: "Hợp đồng mới"
    };

    setContracts(prev => [...prev, newContract]);

    toast.success(`Đã giao lớp "${classToAssign.studentName}" cho gia sư ${selectedTutor.name}`);
    setDialogOpen(false);
    setSelectedClass("");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tìm kiếm Gia sư
          </CardTitle>
          <CardDescription>
            Lọc gia sư phù hợp với yêu cầu (Ví dụ: Môn Toán, Khu vực Cầu Giấy, Học phí &lt; 200k)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Môn học</Label>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả môn</SelectItem>
                  {allSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Khu vực</Label>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khu vực" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả khu vực</SelectItem>
                  {allAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Học phí tối đa (VNĐ)</Label>
              <Input 
                type="number" 
                placeholder="Ví dụ: 200000"
                value={maxFeeFilter}
                onChange={(e) => setMaxFeeFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredTutors.length}</span> gia sư phù hợp
          </div>
        </CardContent>
      </Card>

      {/* Tutor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                  <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">{tutor.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{tutor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{tutor.area}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{tutor.hourlyRate.toLocaleString()}đ/buổi</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{tutor.experience} năm kinh nghiệm</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <Dialog open={dialogOpen && selectedTutor?.id === tutor.id} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (open) setSelectedTutor(tutor);
                  }}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-2" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Giao lớp
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Giao lớp cho {tutor.name}</DialogTitle>
                        <DialogDescription>
                          Chọn lớp học chưa được giao để giao cho gia sư này
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Lớp học</Label>
                          <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn lớp học" />
                            </SelectTrigger>
                            <SelectContent>
                              {unassignedClasses.length === 0 ? (
                                <div className="px-2 py-4 text-sm text-gray-500 text-center">
                                  Không có lớp chưa giao
                                </div>
                              ) : (
                                unassignedClasses.map((cls) => (
                                  <SelectItem key={cls.id} value={cls.id}>
                                    {cls.subject} - {cls.studentName} ({cls.area}) - Tối đa {cls.maxFee.toLocaleString()}đ
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedClass && (
                          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                            {(() => {
                              const cls = classes.find(c => c.id === selectedClass);
                              if (!cls) return null;
                              return (
                                <>
                                  <div className="text-sm">
                                    <span className="font-semibold">Học sinh:</span> {cls.studentName} ({cls.grade})
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-semibold">Phụ huynh:</span> {cls.parentName} - {cls.parentPhone}
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-semibold">Mô tả:</span> {cls.description}
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-semibold">Số buổi/tuần:</span> {cls.sessionsPerWeek}
                                  </div>
                                  {tutor.hourlyRate > cls.maxFee && (
                                    <div className="text-sm text-red-600 font-semibold">
                                      ⚠️ Học phí gia sư ({tutor.hourlyRate.toLocaleString()}đ) cao hơn ngân sách ({cls.maxFee.toLocaleString()}đ)
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        )}
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleAssignClass}>
                          Xác nhận giao lớp
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Không tìm thấy gia sư phù hợp với tiêu chí lọc
          </CardContent>
        </Card>
      )}
    </div>
  );
}
