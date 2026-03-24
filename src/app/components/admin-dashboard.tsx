import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, BookOpen, FileText, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface AdminDashboardProps {
  tutors: any[];
  students: any[];
  classes: any[];
  contracts: any[];
  sessions: any[];
}

export default function AdminDashboard({
  tutors,
  students,
  classes,
  contracts,
  sessions
}: AdminDashboardProps) {
  // Calculate statistics
  const totalTutors = tutors.length;
  const totalStudents = students.length;
  const activeClasses = classes.filter(c => c.status === "active" || c.status === "unassigned").length;
  const activeContracts = contracts.filter(c => c.status === "active").length;
  const completedSessions = sessions.filter(s => s.status === "completed").length;

  // Calculate revenue from active contracts
  const totalRevenue = activeContracts * 5000000; // Placeholder calculation
  const totalRefunds = contracts
    .filter(c => c.status === "broken")
    .reduce((sum) => sum + 1000000, 0);

  const stats = [
    {
      title: "Gia Sư Đang Quản Lý",
      value: totalTutors,
      icon: Users,
      color: "bg-blue-500",
      description: "Tổng số gia sư trong hệ thống"
    },
    {
      title: "Học Viên Đang Theo Dõi",
      value: totalStudents,
      icon: BookOpen,
      color: "bg-green-500",
      description: "Tổng số học viên/phụ huynh"
    },
    {
      title: "Lớp Học Hoạt Động",
      value: activeClasses,
      icon: FileText,
      color: "bg-purple-500",
      description: `${activeClasses} lớp đang hoạt động`
    },
    {
      title: "Hợp Đồng Hiệu Lực",
      value: activeContracts,
      icon: TrendingUp,
      color: "bg-orange-500",
      description: `${activeContracts} hợp đồng đang dạy`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Quản Trị</h1>
        <p className="text-gray-600 mt-2">
          Tổng quan hoạt động và thống kê hệ thống
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Total Revenue */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              Doanh Thu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Doanh Thu Ước Tính</p>
              <p className="text-3xl font-bold text-green-600">
                {(totalRevenue / 1000000).toFixed(1)}M ₫
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Từ {activeContracts} hợp đồng đang hoạt động
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Refunds */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Hoàn Phí
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng Hoàn Phí</p>
              <p className="text-3xl font-bold text-red-600">
                {(totalRefunds / 1000000).toFixed(1)}M ₫
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Từ {contracts.filter(c => c.status === "broken").length} hợp đồng hỏng
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Tutors */}
        <Card>
          <CardHeader>
            <CardTitle>Gia Sư Hàng Đầu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tutors.slice(0, 5).map(tutor => (
                <div key={tutor.id} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{tutor.name}</p>
                    <p className="text-xs text-gray-500">{tutor.subjects?.join(", ")}</p>
                  </div>
                  <Badge variant="secondary">
                    ⭐ {tutor.rating || 0}/5
                  </Badge>
                </div>
              ))}
              {tutors.length === 0 && (
                <p className="text-sm text-gray-500">Chưa có gia sư nào</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Session Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Thống Kê Buổi Học</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Buổi Đã Hoàn Thành</span>
              <span className="font-bold text-lg text-green-600">{completedSessions}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Buổi Sắp Tới</span>
              <span className="font-bold text-lg text-blue-600">
                {sessions.filter(s => s.status === "scheduled").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tổng Buổi</span>
              <span className="font-bold text-lg text-gray-900">{sessions.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>Trạng Thái Hệ Thống</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalTutors}</p>
              <p className="text-sm text-gray-600">Gia Sư Tổng</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{totalStudents}</p>
              <p className="text-sm text-gray-600">Học Viên Tổng</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{classes.length}</p>
              <p className="text-sm text-gray-600">Lớp Học Tổng</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{contracts.length}</p>
              <p className="text-sm text-gray-600">Hợp Đồng Tổng</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
