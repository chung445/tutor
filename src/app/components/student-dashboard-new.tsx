import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  BarChart3,
  Users,
  BookOpen,
  Settings,
  FileText,
  MessageSquare,
  Star,
  Clock,
  Search,
  LogOut,
  Menu,
  X,
  User,
  Lock,
  Plus,
  CheckCircle,
  AlertCircle,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import StudentProfileEdit from "./student-profile-edit";
import StudentSearchTutors from "./student-search-tutors";
import StudentRequestClass from "./student-request-class";
import StudentRequestStatus from "./student-request-status";
import StudentMyClasses from "./student-my-classes";
import StudentSchedule from "./student-schedule";
import StudentMessaging from "./student-messaging";
import StudentReviews from "./student-reviews";
import StudentHistory from "./student-history";
import StudentChangePassword from "./student-change-password";
import { ThemeToggle } from "./theme-toggle";

type NavItem = "dashboard" | "profile" | "search" | "request" | "status" | "classes" | "schedule" | "messages" | "reviews" | "history" | "password";

export default function StudentDashboardNew() {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems: Array<{ id: NavItem; label: string; icon: React.ReactNode; link?: string }> = [
    { id: "dashboard", label: "Bảng điều khiển", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "profile", label: "Hồ sơ cá nhân", icon: <User className="w-5 h-5" /> },
    { id: "search", label: "Tìm gia sư / Lớp", icon: <Search className="w-5 h-5" />, link: "/" },
    { id: "request", label: "Gửi yêu cầu", icon: <Plus className="w-5 h-5" />, link: "/booking" },
    { id: "status", label: "Trạng thái yêu cầu", icon: <FileText className="w-5 h-5" /> },
    { id: "classes", label: "Lớp học của tôi", icon: <BookOpen className="w-5 h-5" />, link: "/my-classes" },
    { id: "schedule", label: "Lịch học", icon: <Clock className="w-5 h-5" /> },
    { id: "messages", label: "Nhắn tin", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "reviews", label: "Đánh giá", icon: <Star className="w-5 h-5" /> },
    { id: "history", label: "Lịch sử học tập", icon: <Zap className="w-5 h-5" /> },
    { id: "password", label: "Đổi mật khẩu", icon: <Lock className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <StudentDashboardHome />;
      case "profile":
        return <StudentProfileEdit />;
      case "search":
        return <StudentSearchTutors />;
      case "request":
        return <StudentRequestClass />;
      case "status":
        return <StudentRequestStatus />;
      case "classes":
        return <StudentMyClasses />;
      case "schedule":
        return <StudentSchedule />;
      case "messages":
        return <StudentMessaging />;
      case "reviews":
        return <StudentReviews />;
      case "history":
        return <StudentHistory />;
      case "password":
        return <StudentChangePassword />;
      default:
        return <StudentDashboardHome />;
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
              <BookOpen className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-bold text-sm">Học Viên</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            item.link ? (
              <Link
                key={item.id}
                to={item.link}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white/80 hover:bg-white/10`}
              >
                {item.icon}
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeNav === item.id
                    ? "bg-white/25 text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {item.icon}
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            )
          ))}
        </nav>
        <div className="p-4 border-t border-white/20 space-y-3">
          {sidebarOpen && (
            <div className="text-sm">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-white/70 text-xs truncate">{user?.email}</p>
            </div>
          )}
          <Button
            onClick={logout}
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {sidebarOpen && "Đăng Xuất"}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {navigationItems.find(i => i.id === activeNav)?.label}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Chào mừng bạn trở lại, {user?.name}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Dashboard Home Component
function StudentDashboardHome() {
  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Lớp đang học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">2</div>
              <p className="text-xs text-gray-500 mt-1">Các lớp đang hoạt động</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Buổi học tuần này
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">3</div>
              <p className="text-xs text-gray-500 mt-1">Sắp tới</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Yêu cầu chờ duyệt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">1</div>
              <p className="text-xs text-gray-500 mt-1">Cần xác nhận</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Điểm đánh giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">4.5</div>
              <p className="text-xs text-gray-500 mt-1">Trên 5 sao</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.4 }
          }
        }}
      >
        {/* Upcoming Classes */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Buổi học sắp tới
              </CardTitle>
              <CardDescription>Các buổi học trong 7 ngày tới</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <motion.div
                className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Toán 10</p>
                    <p className="text-sm text-gray-600">Cô Phạm Thị Hương</p>
                    <p className="text-xs text-gray-500 mt-1">Hôm nay - 18:00 - 19:30</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </motion.div>

              <motion.div
                className="p-3 bg-green-50 rounded-lg border border-green-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Tiếng Anh 11</p>
                    <p className="text-sm text-gray-600">Thầy Đỗ Minh Nhật</p>
                    <p className="text-xs text-gray-500 mt-1">Ngày mai - 19:00 - 20:30</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Hành động nhanh
              </CardTitle>
              <CardDescription>Các tác vụ thường dùng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Tìm gia sư mới
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Gửi yêu cầu lớp mới
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Liên hệ gia sư
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Xem yêu cầu của tôi
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
