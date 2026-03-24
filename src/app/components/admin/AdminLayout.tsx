import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import {
  BarChart3,
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  TrendingUp,
  UserCheck,
  Calendar,
  Star,
  Home
} from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

interface AdminLayoutProps {
  // No props needed for nested routing
}

type AdminNavItem = "dashboard" | "users" | "tutors" | "bookings" | "reviews" | "analytics";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<AdminNavItem>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems: Array<{
    id: AdminNavItem;
    label: string;
    icon: React.ReactNode;
    path: string;
  }> = [
    { id: "dashboard", label: "Bảng điều khiển", icon: <BarChart3 className="w-5 h-5" />, path: "/admin/dashboard" },
    { id: "users", label: "Quản lý người dùng", icon: <Users className="w-5 h-5" />, path: "/admin/users" },
    { id: "tutors", label: "Quản lý gia sư", icon: <UserCheck className="w-5 h-5" />, path: "/admin/tutors" },
    { id: "bookings", label: "Quản lý đặt lịch", icon: <Calendar className="w-5 h-5" />, path: "/admin/bookings" },
    { id: "reviews", label: "Quản lý đánh giá", icon: <Star className="w-5 h-5" />, path: "/admin/reviews" },
    { id: "analytics", label: "Thống kê", icon: <TrendingUp className="w-5 h-5" />, path: "/admin/analytics" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
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
              <Shield className="w-6 h-6" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-bold text-sm">Admin Panel</span>
                <p className="text-xs text-white/80">Tutor Matching System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-white/25 text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
              onClick={() => setActiveNav(item.id)}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/20 space-y-3">
          {sidebarOpen && (
            <div className="text-sm">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-white/70 text-xs truncate">{user?.email}</p>
              <p className="text-white/60 text-xs">Administrator</p>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {sidebarOpen && "Đăng Xuất"}
            </Button>
          </div>
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
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Home className="w-5 h-5" />
                <span className="text-sm">Về trang chủ</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {navigationItems.find(i => i.path === location.pathname)?.label || "Admin Panel"}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Chào mừng, {user?.name}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}