import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useAdmin } from "../../context/admin/AdminContext";
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Activity
} from "lucide-react";
import { motion } from "motion/react";

export default function AdminDashboard() {
  const {
    users,
    tutors,
    bookings,
    reviews,
    loading,
    errors,
    refreshUsers,
    refreshTutors,
    refreshBookings,
    refreshReviews
  } = useAdmin();

  const [refreshing, setRefreshing] = useState(false);

  // Calculate metrics
  const metrics = {
    totalUsers: users.length,
    totalTutors: tutors.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === "pending").length,
    confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
    averageRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0"
  };

  // Recent activity
  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refreshUsers(),
        refreshTutors(),
        refreshBookings(),
        refreshReviews()
      ]);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setRefreshing(false);
    }
  };

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bảng điều khiển Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Tổng quan hệ thống Tutor Matching
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Làm mới dữ liệu
        </Button>
      </div>

      {/* Error Alerts */}
      {(errors.users || errors.tutors || errors.bookings || errors.reviews) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Có lỗi khi tải dữ liệu. Vui lòng thử lại.
          </AlertDescription>
        </Alert>
      )}

      {/* Metrics Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Tổng người dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {loading.users ? "..." : metrics.totalUsers}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Đã đăng ký
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Tổng gia sư
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {loading.tutors ? "..." : metrics.totalTutors}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Đã phê duyệt
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Tổng đặt lịch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-600">
                    {loading.bookings ? "..." : metrics.totalBookings}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Tất cả thời gian
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Đánh giá trung bình
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {loading.reviews ? "..." : metrics.averageRating}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Trên 5 sao
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Status Overview */}
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
        {/* Booking Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Trạng thái đặt lịch
            </CardTitle>
            <CardDescription>Tổng quan các booking hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Chờ duyệt</span>
              </div>
              <Badge variant="secondary">{metrics.pendingBookings}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Đã xác nhận</span>
              </div>
              <Badge variant="secondary">{metrics.confirmedBookings}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="font-medium">Tổng số</span>
              </div>
              <Badge variant="secondary">{metrics.totalBookings}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Hoạt động gần đây
            </CardTitle>
            <CardDescription>Các booking mới nhất</CardDescription>
          </CardHeader>
          <CardContent>
            {loading.bookings ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentBookings.length > 0 ? (
              <div className="space-y-3">
                {recentBookings.map((booking) => {
                  const tutor = tutors.find(t => t.id === booking.tutorId);
                  const student = users.find(u => u.id === booking.studentId);

                  return (
                    <div key={booking.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {student?.name} - {booking.subject}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Gia sư: {tutor?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.date).toLocaleDateString('vi-VN')} {booking.time}
                        </p>
                      </div>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {booking.status === "confirmed" ? "Đã xác nhận" :
                         booking.status === "pending" ? "Chờ duyệt" : "Đã hủy"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Chưa có hoạt động nào
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}