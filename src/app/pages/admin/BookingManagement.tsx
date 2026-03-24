import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { useAdmin } from "../../context/admin/AdminContext";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  AlertCircle,
  DollarSign,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function BookingManagement() {
  const {
    users,
    tutors,
    bookings,
    loading,
    errors,
    approveBooking,
    rejectBooking,
    refreshBookings
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const sanitizedBookings = bookings.map((booking: any) => {
    const student = users.find((u: any) => u.id === booking.studentId);
    const tutor = tutors.find((t: any) => t.id === booking.tutorId);

    return {
      id: booking.id,
      studentName: booking.studentName || student?.name || "Học viên",
      tutorName: booking.tutorName || tutor?.name || "Gia sư",
      subject: booking.subject || "Chưa xác định",
      date: booking.date || "",
      time: booking.time || "",
      duration: booking.duration || 0,
      grade: booking.grade || "Chưa xác định",
      location: booking.location || "Chưa xác định",
      price: booking.price || 0,
      status: booking.status || "pending",
      studentAvatar: booking.studentAvatar || student?.avatar || "",
      tutorAvatar: booking.tutorAvatar || tutor?.avatar || "",
      tutorRating: booking.tutorRating || tutor?.rating || 0,
      studentEmail: booking.studentEmail || student?.email || "N/A",
      studentPhone: booking.studentPhone || student?.phone || "N/A",
      tutorEmail: booking.tutorEmail || tutor?.email || "N/A",
      tutorPhone: booking.tutorPhone || tutor?.phone || "N/A",
      notes: booking.notes || "",
      createdAt: booking.createdAt || new Date().toISOString(),
    };
  });

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return sanitizedBookings.filter(booking => {
      const matchesSearch = booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.tutorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" ||
                           (statusFilter === "approved" && booking.status === "approved") ||
                           (statusFilter === "pending" && booking.status === "pending") ||
                           (statusFilter === "rejected" && booking.status === "rejected");
      return matchesSearch && matchesStatus;
    });
  }, [sanitizedBookings, searchTerm, statusFilter]);

  const handleViewDetail = (booking: any) => {
    setSelectedBooking(booking);
    setShowDetailDialog(true);
  };

  const handleApproveBooking = async (bookingId: string) => {
    setActionLoading(`approve-${bookingId}`);
    try {
      await approveBooking(bookingId);
      toast.success("Đã phê duyệt đặt lịch thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi phê duyệt đặt lịch");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowRejectDialog(true);
  };

  const confirmReject = async () => {
    if (!selectedBooking) return;

    setActionLoading(`reject-${selectedBooking.id}`);
    try {
      await rejectBooking(selectedBooking.id);
      toast.success("Đã từ chối đặt lịch thành công");
      setShowRejectDialog(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi từ chối đặt lịch");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Đã phê duyệt</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Chờ phê duyệt</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Đã từ chối</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <motion.div
      className="space-y-6"
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
            Quản lý đặt lịch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Phê duyệt và quản lý các yêu cầu đặt lịch học
          </p>
        </div>
        <Button onClick={refreshBookings} disabled={loading.bookings}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading.bookings ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>

      {/* Error Alert */}
      {errors.bookings && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Lỗi tải dữ liệu:</span>
                <span>{errors.bookings}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên học sinh, gia sư hoặc môn học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ phê duyệt</option>
          <option value="approved">Đã phê duyệt</option>
          <option value="rejected">Đã từ chối</option>
        </select>
      </motion.div>

      {/* Bookings List */}
      <motion.div
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        {loading.bookings ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={booking.studentAvatar} alt={booking.studentName} />
                        <AvatarFallback>
                          {booking.studentName.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {booking.studentName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Học sinh • Lớp {booking.grade}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">GIA SƯ</p>
                        <p className="text-sm font-medium">{booking.tutorName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">MÔN HỌC</p>
                        <p className="text-sm font-medium">{booking.subject}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">NGÀY HỌC</p>
                        <p className="text-sm font-medium">{booking.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">THỜI GIAN</p>
                        <p className="text-sm font-medium">{booking.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {booking.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          {booking.price}₫/buổi
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(booking)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Chi tiết
                      </Button>

                      {booking.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApproveBooking(booking.id)}
                            disabled={actionLoading === `approve-${booking.id}`}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {actionLoading === `approve-${booking.id}` ? (
                              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-1" />
                            )}
                            Phê duyệt
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectBooking(booking)}
                            disabled={actionLoading === `reject-${booking.id}`}
                            className="text-red-600 hover:text-red-700"
                          >
                            {actionLoading === `reject-${booking.id}` ? (
                              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-1" />
                            )}
                            Từ chối
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="text-center py-12"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy đặt lịch
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Thử thay đổi bộ lọc hoặc tìm kiếm khác
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đặt lịch</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về yêu cầu đặt lịch
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Thông tin học sinh</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedBooking.studentAvatar} alt={selectedBooking.studentName} />
                      <AvatarFallback>
                        {selectedBooking.studentName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedBooking.studentName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Học sinh • Lớp {selectedBooking.grade}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {selectedBooking.studentEmail}</p>
                    <p><span className="font-medium">Số điện thoại:</span> {selectedBooking.studentPhone}</p>
                  </div>
                </div>

                {/* Tutor Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Thông tin gia sư</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedBooking.tutorAvatar} alt={selectedBooking.tutorName} />
                      <AvatarFallback>
                        {selectedBooking.tutorName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedBooking.tutorName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gia sư • {selectedBooking.tutorRating} ⭐
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {selectedBooking.tutorEmail}</p>
                    <p><span className="font-medium">Số điện thoại:</span> {selectedBooking.tutorPhone}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Chi tiết buổi học</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Môn học</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày học</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Thời gian</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Thời lượng</label>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.duration} giờ</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Địa điểm</label>
                    <p className="text-gray-900 dark:text-white">{selectedBooking.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Giá</label>
                    <p className="text-gray-900 dark:text-white font-medium text-green-600">
                      {selectedBooking.price}₫/buổi
                    </p>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-500">Ghi chú</label>
                    <p className="text-gray-900 dark:text-white mt-1">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Trạng thái:</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <div className="text-sm text-gray-500">
                  Đặt lúc: {selectedBooking.createdAt}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận từ chối</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn từ chối yêu cầu đặt lịch của "{selectedBooking?.studentName}" với gia sư "{selectedBooking?.tutorName}"?
              Học sinh sẽ được thông báo về việc từ chối này.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={actionLoading === `reject-${selectedBooking?.id}`}
            >
              {actionLoading === `reject-${selectedBooking?.id}` ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Đang từ chối...
                </>
              ) : (
                "Từ chối"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}