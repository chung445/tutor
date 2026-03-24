import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  BookOpen, Calendar, TrendingUp, CheckCircle, User, LogOut, BarChart3, Settings, Menu, X,
  AlertCircle, Search, Plus
} from "lucide-react";
import { motion } from "motion/react";

interface TutorClass {
  id: string;
  subject: string;
  studentName: string;
  grade: string;
  area: string;
  sessionsPerWeek: number;
  dayTime: string;
  status: "pending" | "accepted" | "rejected";
  studentPhone: string;
  startDate: string;
}

interface TutorSchedule {
  id: string;
  classId: string;
  subject: string;
  studentName: string;
  date: string;
  time: string;
  location: string;
  status: "scheduled" | "completed" | "absent";
  notes: string;
}

interface TutorContract {
  id: string;
  classId: string;
  subject: string;
  studentName: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  completedSessions: number;
  monthlyIncome: number;
  status: "active" | "completed" | "terminated";
}

const MOCK_CLASSES: TutorClass[] = [
  {
    id: "c1",
    subject: "Toán",
    studentName: "Nguyễn Minh Anh",
    grade: "Lớp 10",
    area: "Cầu Giấy",
    sessionsPerWeek: 2,
    dayTime: "Thứ 3, 5 - 18:00",
    status: "accepted",
    studentPhone: "0987654321",
    startDate: "2026-01-05"
  },
  {
    id: "c2",
    subject: "Tiếng Anh",
    studentName: "Trần Phương Chi",
    grade: "Lớp 9",
    area: "Đống Đa",
    sessionsPerWeek: 3,
    dayTime: "Thứ 2, 4, 6 - 19:00",
    status: "pending",
    studentPhone: "0976543210",
    startDate: "2026-01-10"
  },
  {
    id: "c3",
    subject: "Lý",
    studentName: "Lê Quốc Huy",
    grade: "Lớp 12",
    area: "Hai Bà Trưng",
    sessionsPerWeek: 2,
    dayTime: "Thứ 2, 6 - 20:00",
    status: "accepted",
    studentPhone: "0965432109",
    startDate: "2026-01-02"
  }
];

const MOCK_SCHEDULES: TutorSchedule[] = [
  {
    id: "s1",
    classId: "c1",
    subject: "Toán",
    studentName: "Nguyễn Minh Anh",
    date: "2026-01-23",
    time: "18:00-19:30",
    location: "Nhà học viên - Cầu Giấy",
    status: "scheduled",
    notes: "Ôn chương phương trình bậc 2"
  },
  {
    id: "s2",
    classId: "c1",
    subject: "Toán",
    studentName: "Nguyễn Minh Anh",
    date: "2026-01-21",
    time: "18:00-19:30",
    location: "Nhà học viên - Cầu Giấy",
    status: "completed",
    notes: "Dạy xong chương 3"
  },
  {
    id: "s3",
    classId: "c3",
    subject: "Lý",
    studentName: "Lê Quốc Huy",
    date: "2026-01-24",
    time: "20:00-21:30",
    location: "Online (Zoom)",
    status: "scheduled",
    notes: "Ôn thi đại học"
  }
];

const MOCK_CONTRACTS: TutorContract[] = [
  {
    id: "ct1",
    classId: "c1",
    subject: "Toán",
    studentName: "Nguyễn Minh Anh",
    startDate: "2026-01-05",
    endDate: "2026-04-05",
    totalSessions: 24,
    completedSessions: 5,
    monthlyIncome: 1200000,
    status: "active"
  },
  {
    id: "ct2",
    classId: "c3",
    subject: "Lý",
    studentName: "Lê Quốc Huy",
    startDate: "2026-01-02",
    endDate: "2026-05-02",
    totalSessions: 30,
    completedSessions: 4,
    monthlyIncome: 1500000,
    status: "active"
  }
];

type NavItem = "dashboard" | "profile" | "classes" | "schedule" | "income" | "settings";

export default function TutorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [classList, setClassList] = useState<TutorClass[]>(MOCK_CLASSES);
  const [scheduleList, setScheduleList] = useState<TutorSchedule[]>(MOCK_SCHEDULES);
  const [contractList, setContractList] = useState<TutorContract[]>(MOCK_CONTRACTS);

  // Calculate statistics
  const activeClasses = classList.filter(c => c.status === "accepted").length;
  const pendingClasses = classList.filter(c => c.status === "pending").length;
  const completedSessions = scheduleList.filter(s => s.status === "completed").length;
  const totalIncome = contractList.filter(c => c.status === "active").reduce((sum, c) => sum + c.monthlyIncome, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Đã đăng xuất thành công');
  };

  const navigationItems = [
    { id: "dashboard" as NavItem, label: "Bảng điều khiển", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "profile" as NavItem, label: "Hồ sơ cá nhân", icon: <User className="w-5 h-5" /> },
    { id: "classes" as NavItem, label: "Lớp học", icon: <BookOpen className="w-5 h-5" /> },
    { id: "schedule" as NavItem, label: "Lịch dạy", icon: <Calendar className="w-5 h-5" /> },
    { id: "income" as NavItem, label: "Thu nhập", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "settings" as NavItem, label: "Cài đặt", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-600 to-indigo-600 text-white transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-semibold">Gia sư</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === item.id
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-white/20 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name || 'Gia sư'}</p>
                <p className="text-xs text-white/70 truncate">{user?.email || 'tutor@tutorcentral.com'}</p>
              </div>
            )}
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-white hover:bg-white/20 gap-2"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 hover:bg-white/10 m-3 rounded-lg"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {activeNav === "dashboard" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
              }
            }}
            className="space-y-6"
          >
            {/* Welcome */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h1 className="text-3xl font-bold text-gray-900">Chào mừng {user?.name || 'Gia sư'}</h1>
              <p className="text-gray-600 mt-1">Tổng quan về lớp học, lịch dạy và thu nhập của bạn</p>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Lớp đang dạy', value: activeClasses, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
                { label: 'Yêu cầu chờ duyệt', value: pendingClasses, icon: AlertCircle, color: 'from-orange-500 to-orange-600' },
                { label: 'Buổi đã dạy', value: completedSessions, icon: CheckCircle, color: 'from-green-500 to-green-600' },
                { label: 'Thu nhập/Tháng', value: `${(totalIncome / 1000000).toFixed(1)}M₫`, icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className={`bg-gradient-to-br ${metric.color} text-white pb-3`}>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold">{metric.label}</CardTitle>
                          <Icon className="w-5 h-5" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Classes & Income Section */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Danh sách Lớp học</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Môn học</TableHead>
                        <TableHead>Học sinh</TableHead>
                        <TableHead>Lịch dạy</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classList.slice(0, 3).map(cls => (
                        <TableRow key={cls.id}>
                          <TableCell className="font-medium">{cls.subject}</TableCell>
                          <TableCell>{cls.studentName}</TableCell>
                          <TableCell className="text-sm">{cls.dayTime}</TableCell>
                          <TableCell>
                            <Badge variant={cls.status === "accepted" ? "default" : "secondary"}>
                              {cls.status === "accepted" ? "✓ Đã nhận" : "⏳ Chờ duyệt"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hành động nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 border rounded-lg bg-white px-3 py-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Tìm học viên"
                      className="h-9 bg-transparent border-0 outline-none p-0"
                    />
                  </div>
                  <Button className="w-full" onClick={() => toast.success('Xem chi tiết lớp học')}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Lớp học
                  </Button>
                  <Button className="w-full" variant="secondary" onClick={() => toast.success('Xem lịch dạy')}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Lịch dạy
                  </Button>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-xs font-semibold uppercase text-gray-600">Thống kê</p>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Thu nhập hôm nay</p>
                      <p className="text-xl font-bold text-green-700">{(totalIncome / 30).toLocaleString()}₫</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Buổi học tuần này</p>
                      <p className="text-xl font-bold text-blue-700">{activeClasses * 2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {activeNav === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Hồ sơ cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-6 items-start">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500 text-sm">Họ tên</Label>
                      <p className="text-lg font-medium">{user?.name || 'Gia sư'}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Email</Label>
                      <p className="text-lg font-medium">{user?.email || 'tutor@tutorcentral.com'}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Số điện thoại</Label>
                      <p className="text-lg font-medium">0913555555</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Xác thực</Label>
                      <Badge className="bg-green-600 mt-1">✓ Đã xác thực</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <Label className="text-gray-500 text-sm">Môn dạy</Label>
                  <p className="text-base">Toán, Lý, Hóa</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Trình độ / Bằng cấp</Label>
                  <p className="text-base">Cử nhân Sư phạm Toán</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Kinh nghiệm giảng dạy</Label>
                  <p className="text-base">5 năm</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-sm">Lịch rảnh</Label>
                  <p className="text-base">Thứ 2-6, 18:00-21:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeNav === "classes" && (
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Lớp học</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Môn học</TableHead>
                    <TableHead>Học sinh</TableHead>
                    <TableHead>Lớp/Khu vực</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classList.map(cls => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.subject}</TableCell>
                      <TableCell>{cls.studentName}</TableCell>
                      <TableCell>{cls.grade} - {cls.area}</TableCell>
                      <TableCell>
                        <Badge variant={cls.status === "accepted" ? "default" : "secondary"}>
                          {cls.status === "accepted" ? "✓ Đã nhận" : "⏳ Chờ duyệt"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeNav === "schedule" && (
          <Card>
            <CardHeader>
              <CardTitle>Lịch Dạy</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Môn học</TableHead>
                    <TableHead>Học sinh</TableHead>
                    <TableHead>Ngày/Giờ</TableHead>
                    <TableHead>Địa điểm</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleList.map(schedule => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.subject}</TableCell>
                      <TableCell>{schedule.studentName}</TableCell>
                      <TableCell className="text-sm">{schedule.date} {schedule.time}</TableCell>
                      <TableCell>{schedule.location}</TableCell>
                      <TableCell>
                        <Badge variant={schedule.status === "completed" ? "default" : "outline"}>
                          {schedule.status === "completed" ? "✓ Đã dạy" : "⏳ Sắp tới"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeNav === "income" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-green-800">Thu nhập tháng này</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">{totalIncome.toLocaleString()}₫</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-blue-800">Lớp hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">{activeClasses}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-purple-800">Buổi dạy hoàn tất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700">{completedSessions}</div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết hợp đồng</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Học sinh</TableHead>
                      <TableHead>Thời gian hợp đồng</TableHead>
                      <TableHead>Tổng buổi</TableHead>
                      <TableHead>Đã dạy</TableHead>
                      <TableHead>Thu nhập/Tháng</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractList.map(contract => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.studentName}</TableCell>
                        <TableCell className="text-sm">{contract.startDate} → {contract.endDate}</TableCell>
                        <TableCell>{contract.totalSessions}</TableCell>
                        <TableCell>{contract.completedSessions}</TableCell>
                        <TableCell className="font-semibold text-green-700">{contract.monthlyIncome.toLocaleString()}₫</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeNav === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Cài đặt hệ thống - Phần này đang phát triển</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
