import { useState } from "react";
import { Class, Contract, Session, Tutor } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Eye, BookOpen, FileText, Search } from "lucide-react";
import { Input } from "./ui/input";

interface StudentManagementProps {
  classes: Class[];
  contracts: Contract[];
  sessions: Session[];
  tutors: Tutor[];
}

export function StudentManagement({
  classes,
  contracts,
  sessions,
  tutors,
}: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Class | null>(null);

  // Remove duplicates by student name
  const uniqueStudents = Array.from(
    new Map(classes.map(c => [c.studentName, c])).values()
  );

  const filteredStudents = uniqueStudents.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentClasses = (studentName: string) => {
    return classes.filter(c => c.studentName === studentName);
  };

  const getStudentContracts = (classIds: string[]) => {
    return contracts.filter(c => classIds.includes(c.classId));
  };

  const getTutorName = (tutorId: string) => {
    return tutors.find(t => t.id === tutorId)?.name || "N/A";
  };

  const getStudentClassCount = (studentName: string) => {
    return getStudentClasses(studentName).length;
  };

  const getStudentStatus = (studentName: string) => {
    const studentClasses = getStudentClasses(studentName);
    const allAssigned = studentClasses.every(c => c.status === "assigned");
    const someAssigned = studentClasses.some(c => c.status === "assigned");

    if (allAssigned) return "Đã sắp xếp";
    if (someAssigned) return "Đang xử lý";
    return "Chưa sắp xếp";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã sắp xếp":
        return "bg-green-100 text-green-800";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quản Lý Học Viên</h2>
        <p className="text-muted-foreground">
          Xem và quản lý thông tin chi tiết của các học viên
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo tên học viên hoặc phụ huynh..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Student List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Học Viên</CardTitle>
          <CardDescription>
            Tổng cộng: {filteredStudents.length} học viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Học Viên</TableHead>
                <TableHead>Lớp / Khối</TableHead>
                <TableHead>Môn Đang Học</TableHead>
                <TableHead>Khu Vực</TableHead>
                <TableHead>Phụ Huynh</TableHead>
                <TableHead className="text-center">Số Lớp</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Chức Năng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Không tìm thấy học viên nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => {
                  const studentClasses = getStudentClasses(student.studentName);
                  const subjects = studentClasses.map(c => c.subject).join(", ");
                  const classStatus = getStudentStatus(student.studentName);

                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.studentName}
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{subjects}</TableCell>
                      <TableCell>{student.area}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{student.parentName}</p>
                          <p className="text-muted-foreground text-xs">
                            {student.parentPhone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {getStudentClassCount(student.studentName)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(classStatus)}>
                          {classStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {/* View Details Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedStudent(student)}
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Chi Tiết Học Viên</DialogTitle>
                                <DialogDescription>
                                  Thông tin chi tiết về học viên {student.studentName}
                                </DialogDescription>
                              </DialogHeader>
                              <Tabs defaultValue="info" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="info">Thông Tin</TabsTrigger>
                                  <TabsTrigger value="classes">Các Lớp Học</TabsTrigger>
                                </TabsList>

                                <TabsContent value="info" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Tên Học Viên
                                      </p>
                                      <p className="text-lg font-semibold">
                                        {student.studentName}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Lớp / Khối
                                      </p>
                                      <p className="text-lg font-semibold">
                                        {student.grade}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Khu Vực
                                      </p>
                                      <p className="text-lg font-semibold">
                                        {student.area}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Số Lớp Đang Học
                                      </p>
                                      <p className="text-lg font-semibold">
                                        {getStudentClassCount(student.studentName)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Tên Phụ Huynh
                                      </p>
                                      <p className="text-lg font-semibold">
                                        {student.parentName}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Điện Thoại Phụ Huynh
                                      </p>
                                      <p className="text-lg font-semibold">
                                        {student.parentPhone}
                                      </p>
                                    </div>
                                    <div className="col-span-2">
                                      <p className="text-sm font-medium text-muted-foreground">
                                        Ghi Chú
                                      </p>
                                      <p className="text-base">
                                        {student.description}
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="classes" className="space-y-4">
                                  <div className="space-y-3">
                                    {getStudentClasses(student.studentName).map(
                                      (cls) => {
                                        const classContracts =
                                          getStudentContracts([cls.id]);
                                        const tutor = classContracts[0]
                                          ? getTutorName(classContracts[0].tutorId)
                                          : "Chưa sắp xếp";

                                        return (
                                          <Card key={cls.id}>
                                            <CardContent className="pt-4">
                                              <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                  <p className="text-sm text-muted-foreground">
                                                    Môn Học
                                                  </p>
                                                  <p className="font-semibold">
                                                    {cls.subject}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-sm text-muted-foreground">
                                                    Gia Sư
                                                  </p>
                                                  <p className="font-semibold">
                                                    {tutor}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-sm text-muted-foreground">
                                                    Học Phí Tối Đa
                                                  </p>
                                                  <p className="font-semibold">
                                                    {cls.maxFee.toLocaleString(
                                                      "vi-VN"
                                                    )}{" "}
                                                    VND
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-sm text-muted-foreground">
                                                    Buổi/Tuần
                                                  </p>
                                                  <p className="font-semibold">
                                                    {cls.sessionsPerWeek}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-sm text-muted-foreground">
                                                    Trạng Thái
                                                  </p>
                                                  <Badge
                                                    className={
                                                      cls.status === "assigned"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                    }
                                                  >
                                                    {cls.status === "assigned"
                                                      ? "Đã sắp xếp"
                                                      : "Chưa sắp xếp"}
                                                  </Badge>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        );
                                      }
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </DialogContent>
                          </Dialog>

                          {/* View Classes Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                title="Xem các lớp đã/đang học"
                              >
                                <BookOpen className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  Các Lớp Học Của {student.studentName}
                                </DialogTitle>
                                <DialogDescription>
                                  Danh sách tất cả các lớp học của học viên
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                {getStudentClasses(student.studentName).map(
                                  (cls) => {
                                    const classContracts =
                                      getStudentContracts([cls.id]);
                                    const tutor = classContracts[0]
                                      ? getTutorName(classContracts[0].tutorId)
                                      : "Chưa sắp xếp";
                                    const classCount =
                                      classContracts.length > 0
                                        ? sessions.filter(
                                            (s) =>
                                              s.contractId ===
                                              classContracts[0].id
                                          ).length
                                        : 0;

                                    return (
                                      <Card key={cls.id}>
                                        <CardContent className="pt-6">
                                          <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Môn Học
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {cls.subject}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Gia Sư
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {tutor}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Học Phí Tối Đa
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {cls.maxFee.toLocaleString(
                                                  "vi-VN"
                                                )}{" "}
                                                VND
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Buổi Đã Học
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {classCount}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Trạng Thái
                                              </p>
                                              <Badge
                                                className={
                                                  cls.status === "assigned"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }
                                              >
                                                {cls.status === "assigned"
                                                  ? "Đang học"
                                                  : "Chưa có gia sư"}
                                              </Badge>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground mb-1">
                                              Mô Tả
                                            </p>
                                            <p className="text-sm">
                                              {cls.description}
                                            </p>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    );
                                  }
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* View Contracts Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                title="Liên kết hợp đồng"
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  Hợp Đồng Của {student.studentName}
                                </DialogTitle>
                                <DialogDescription>
                                  Danh sách các hợp đồng liên kết với học viên
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                {getStudentContracts(
                                  getStudentClasses(
                                    student.studentName
                                  ).map((c) => c.id)
                                ).length === 0 ? (
                                  <Card>
                                    <CardContent className="pt-6 text-center">
                                      <p className="text-muted-foreground">
                                        Chưa có hợp đồng nào
                                      </p>
                                    </CardContent>
                                  </Card>
                                ) : (
                                  getStudentContracts(
                                    getStudentClasses(
                                      student.studentName
                                    ).map((c) => c.id)
                                  ).map((contract) => {
                                    const tutorName = getTutorName(
                                      contract.tutorId
                                    );
                                    const contractSessions = sessions.filter(
                                      (s) => s.contractId === contract.id
                                    );

                                    return (
                                      <Card key={contract.id}>
                                        <CardContent className="pt-6">
                                          <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Gia Sư
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {tutorName}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Ngày Bắt Đầu
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {new Date(
                                                  contract.startDate
                                                ).toLocaleDateString("vi-VN")}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Buổi Đã Hoàn Thành
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {
                                                  contractSessions.filter(
                                                    (s) =>
                                                      s.status === "completed"
                                                  ).length
                                                }{" "}
                                                /{" "}
                                                {contractSessions.length}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Trạng Thái
                                              </p>
                                              <Badge
                                                className={
                                                  contract.status === "active"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : contract.status ===
                                                      "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }
                                              >
                                                {contract.status === "active"
                                                  ? "Đang hoạt động"
                                                  : contract.status ===
                                                    "completed"
                                                  ? "Hoàn thành"
                                                  : "Thất bại"}
                                              </Badge>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Phí Môi Giới
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {contract.brokerageFee.toLocaleString(
                                                  "vi-VN"
                                                )}{" "}
                                                VND
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground">
                                                Hoàn Tiền
                                              </p>
                                              <p className="text-lg font-semibold">
                                                {contract.refundAmount.toLocaleString(
                                                  "vi-VN"
                                                )}{" "}
                                                VND
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground mb-1">
                                              Ghi Chú
                                            </p>
                                            <p className="text-sm">
                                              {contract.notes}
                                            </p>
                                          </div>
                                          {contractSessions.length > 0 && (
                                            <div className="mt-4 pt-4 border-t">
                                              <p className="text-sm font-medium mb-2">
                                                Chi Tiết Buổi Học
                                              </p>
                                              <div className="space-y-2">
                                                {contractSessions
                                                  .slice(0, 3)
                                                  .map((session) => (
                                                    <div
                                                      key={session.id}
                                                      className="text-xs bg-muted p-2 rounded flex justify-between"
                                                    >
                                                      <span>
                                                        Buổi {session.sessionNumber}
                                                        ({new Date(
                                                          session.date
                                                        ).toLocaleDateString(
                                                          "vi-VN"
                                                        )}
                                                        )
                                                      </span>
                                                      <Badge
                                                        variant="outline"
                                                        className={
                                                          session.status ===
                                                          "completed"
                                                            ? "bg-green-50"
                                                            : "bg-yellow-50"
                                                        }
                                                      >
                                                        {session.status ===
                                                        "completed"
                                                          ? "Hoàn thành"
                                                          : "Lên lịch"}
                                                      </Badge>
                                                    </div>
                                                  ))}
                                                {contractSessions.length >
                                                  3 && (
                                                  <p className="text-xs text-muted-foreground">
                                                    +{" "}
                                                    {contractSessions.length -
                                                      3}{" "}
                                                    buổi khác
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    );
                                  })
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
