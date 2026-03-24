import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, ClipboardList, UserPlus, Search, LogOut, Edit2, Lock, Unlock, DownloadCloud, Plus, BarChart3, Settings, FileText, MessageSquare, Clock, User, Menu, X, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface StaffDashboardProps {
  tutors: any[];
  classes: any[];
  contracts: any[];
}

type NavItem = "dashboard" | "students" | "tutors" | "classes" | "contracts" | "reports" | "settings";

const MOCK_STUDENTS = [
  { id: 'st1', name: 'Nguyễn Minh Anh', email: 'anhminh@email.com', phone: '0912345678', status: 'active', classCount: 1 },
  { id: 'st2', name: 'Trần Phương Chi', email: 'phuongchi@email.com', phone: '0912345679', status: 'active', classCount: 2 },
  { id: 'st3', name: 'Lê Quốc Huy', email: 'quochuy@email.com', phone: '0912345680', status: 'locked', classCount: 0 },
];

export default function StaffDashboard({ tutors, classes, contracts }: StaffDashboardProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [studentActions, setStudentActions] = useState<Record<string, string>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");

  const navigationItems: Array<{ id: NavItem; label: string; icon: React.ReactNode }> = [
    { id: "dashboard", label: "Bảng điều khiển", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "students", label: "Học viên", icon: <Users className="w-5 h-5" /> },
    { id: "tutors", label: "Gia sư", icon: <UserPlus className="w-5 h-5" /> },
    { id: "classes", label: "Lớp học", icon: <BookOpen className="w-5 h-5" /> },
    { id: "contracts", label: "Hợp đồng", icon: <FileText className="w-5 h-5" /> },
    { id: "reports", label: "Báo cáo", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "settings", label: "Cài đặt", icon: <Settings className="w-5 h-5" /> },
  ];

  const totalTutors = tutors.length;
  const totalStudents = MOCK_STUDENTS.length;
  const totalClasses = classes.length;
  const totalContracts = contracts.length;

  const assignedClasses = classes.filter(c => c.status === 'assigned').length;
  const openContracts = contracts.filter(c => c.status === 'pending').length;

  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.phone.includes(search)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Đã đăng xuất thành công');
  };

  const handleQuickAction = (label: string) => {
    toast.success(`${label} được thực hiện thành công`);
  };

  const handleStudentAction = (studentId: string, action: string) => {
    if (action === 'lock') {
      setStudentActions(prev => ({ ...prev, [studentId]: 'locked' }));
      toast.success('Đã khóa học viên');
    } else if (action === 'unlock') {
      setStudentActions(prev => ({ ...prev, [studentId]: 'active' }));
      toast.success('Đã mở khóa học viên');
    } else if (action === 'edit') {
      toast.info('Chức năng chỉnh sửa đang được phát triển');
    }
  };

  const getStudentStatus = (studentId: string, defaultStatus: string) => {
    return studentActions[studentId] || defaultStatus;
  };

  const renderDashboardContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
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
            {/* Welcome Section */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h1 className="text-3xl font-bold text-gray-900">Chào mừng {user?.name || 'Nhân viên'}</h1>
              <p className="text-gray-600 mt-1">Tổng quan về hoạt động hôm nay</p>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Lớp đang dạy', value: totalClasses, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
                { label: 'Học viên hoạt động', value: totalStudents, icon: Users, color: 'from-green-500 to-green-600' },
                { label: 'Yêu cầu chờ duyệt', value: openContracts, icon: AlertCircle, color: 'from-orange-500 to-orange-600' },
                { label: 'Hợp đồng hoạt động', value: totalContracts, icon: FileText, color: 'from-purple-500 to-purple-600' },
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

            {/* Main Content */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Danh sách học viên</CardTitle>
                  <CardDescription>Quản lý và tìm nhanh thông tin học viên</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-3 pb-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto border rounded-lg bg-white px-3 py-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Tìm học viên..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="h-9 bg-transparent border-0 outline-none p-0"
                      />
                    </div>
                    <Button onClick={() => handleQuickAction('Tải lại')}>Tải lại</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-sm text-gray-500 uppercase tracking-wide">
                          <th className="px-3 py-2">Tên</th>
                          <th className="px-3 py-2">Email</th>
                          <th className="px-3 py-2">Lớp</th>
                          <th className="px-3 py-2">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map(student => (
                          <tr key={student.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <td className="px-3 py-3 text-sm font-medium text-gray-900">{student.name}</td>
                            <td className="px-3 py-3 text-sm text-gray-600">{student.email}</td>
                            <td className="px-3 py-3 text-sm text-gray-600">{student.classCount}</td>
                            <td className="px-3 py-3">
                              <Badge variant={student.status === 'active' ? 'default' : 'destructive'}>
                                {student.status === 'active' ? '✓ Hoạt động' : '✗ Khoá'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hành động nhanh</CardTitle>
                  <CardDescription>Tác vụ nhanh dành cho nhân viên</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 border rounded-lg bg-white px-3 py-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Tìm gia sư"
                      className="h-9 bg-transparent border-0 outline-none p-0"
                    />
                  </div>
                  <Button className="w-full" onClick={() => handleQuickAction('Thêm học viên')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm học viên
                  </Button>
                  <Button className="w-full" variant="secondary" onClick={() => handleQuickAction('Phân lớp')}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Phân lớp
                  </Button>
                  <Button className="w-full" variant="secondary" onClick={() => handleQuickAction('Gửi thông báo')}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Gửi thông báo
                  </Button>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-xs font-semibold uppercase text-gray-600">Thống kê hôm nay</p>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Lớp mới</p>
                      <p className="text-xl font-bold text-blue-700">+{assignedClasses}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Yêu cầu chờ</p>
                      <p className="text-xl font-bold text-orange-700">{openContracts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
      case "students":
        return <div className="text-gray-600">Danh sách học viên - Phần này đang phát triển</div>;
      case "tutors":
        return <div className="text-gray-600">Danh sách gia sư - Phần này đang phát triển</div>;
      case "classes":
        return <div className="text-gray-600">Danh sách lớp học - Phần này đang phát triển</div>;
      case "contracts":
        return <div className="text-gray-600">Quản lý hợp đồng - Phần này đang phát triển</div>;
      case "reports":
        return <div className="text-gray-600">Báo cáo thống kê - Phần này đang phát triển</div>;
      case "settings":
        return <div className="text-gray-600">Cài đặt hệ thống - Phần này đang phát triển</div>;
      default:
        return null;
    }
  };

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
              <BarChart3 className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-semibold">Nhân viên</span>}
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
                <p className="text-sm font-semibold truncate">{user?.name || 'Nhân viên'}</p>
                <p className="text-xs text-white/70 truncate">{user?.email || 'staff@tutorcentral.com'}</p>
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
      <main className="flex-1 overflow-auto p-6">{renderDashboardContent()}</main>
    </div>
  );
}
