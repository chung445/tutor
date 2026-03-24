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
  Edit,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  Star,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function TutorManagement() {
  const {
    tutors,
    loading,
    errors,
    approveTutor,
    rejectTutor,
    updateTutor,
    refreshTutors
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Partial<any>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filter tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter(tutor => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all" ||
                           (statusFilter === "approved" && tutor.isVerified) ||
                           (statusFilter === "pending" && !tutor.isVerified);
      return matchesSearch && matchesStatus;
    });
  }, [tutors, searchTerm, statusFilter]);

  const handleViewDetail = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowDetailDialog(true);
  };

  const handleEditTutor = (tutor: any) => {
    setSelectedTutor(tutor);
    setEditingTutor({ ...tutor });
    setShowEditDialog(true);
  };

  const handleApproveTutor = async (tutorId: string) => {
    setActionLoading(`approve-${tutorId}`);
    try {
      await approveTutor(tutorId);
      toast.success("Đã phê duyệt gia sư thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi phê duyệt gia sư");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectTutor = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowRejectDialog(true);
  };

  const confirmReject = async () => {
    if (!selectedTutor) return;

    setActionLoading(`reject-${selectedTutor.id}`);
    try {
      await rejectTutor(selectedTutor.id);
      toast.success("Đã từ chối gia sư thành công");
      setShowRejectDialog(false);
      setSelectedTutor(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi từ chối gia sư");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedTutor || !editingTutor.name || !editingTutor.email) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setActionLoading("edit");
    try {
      await updateTutor(selectedTutor.id, editingTutor);
      toast.success("Cập nhật gia sư thành công");
      setShowEditDialog(false);
      setSelectedTutor(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật gia sư");
    } finally {
      setActionLoading(null);
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
            Quản lý gia sư
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Phê duyệt và quản lý các gia sư trong hệ thống
          </p>
        </div>
        <Button onClick={refreshTutors} disabled={loading.tutors}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading.tutors ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>

      {/* Error Alert */}
      {errors.tutors && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Lỗi tải dữ liệu:</span>
                <span>{errors.tutors}</span>
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
            placeholder="Tìm kiếm theo tên hoặc môn học..."
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
          <option value="approved">Đã phê duyệt</option>
          <option value="pending">Chờ phê duyệt</option>
        </select>
      </motion.div>

      {/* Tutors Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
        {loading.tutors ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <motion.div
              key={tutor.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={tutor.avatar} alt={tutor.name} />
                        <AvatarFallback>
                          {tutor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {tutor.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {tutor.rating}/5.0
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={tutor.isVerified ? "default" : "secondary"}>
                      {tutor.isVerified ? "Đã phê duyệt" : "Chờ phê duyệt"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{tutor.area}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{tutor.experience} năm kinh nghiệm</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">{tutor.hourlyRate}₫/giờ</span>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">MÔN HỌC</p>
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetail(tutor)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Xem
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTutor(tutor)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Sửa
                    </Button>
                  </div>

                  {!tutor.isVerified && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveTutor(tutor.id)}
                        disabled={actionLoading === `approve-${tutor.id}`}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {actionLoading === `approve-${tutor.id}` ? (
                          <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        Phê duyệt
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectTutor(tutor)}
                        disabled={actionLoading === `reject-${tutor.id}`}
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        {actionLoading === `reject-${tutor.id}` ? (
                          <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        Từ chối
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-12"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy gia sư
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
            <DialogTitle>Chi tiết gia sư</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về gia sư
            </DialogDescription>
          </DialogHeader>

          {selectedTutor && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedTutor.avatar} alt={selectedTutor.name} />
                  <AvatarFallback className="text-lg">
                    {selectedTutor.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedTutor.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTutor.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedTutor.rating}/5.0</span>
                    <Badge variant={selectedTutor.isVerified ? "default" : "secondary"}>
                      {selectedTutor.isVerified ? "Đã phê duyệt" : "Chờ phê duyệt"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                  <p className="text-gray-900 dark:text-white">{selectedTutor.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Khu vực</label>
                  <p className="text-gray-900 dark:text-white">{selectedTutor.area}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Kinh nghiệm</label>
                  <p className="text-gray-900 dark:text-white">{selectedTutor.experience} năm</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Giá/giờ</label>
                  <p className="text-gray-900 dark:text-white font-medium text-green-600">
                    {selectedTutor.hourlyRate}₫
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Môn học</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTutor.subjects.map((subject: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {subject}
                    </Badge>
                  ))}
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

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa gia sư</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin của gia sư
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tên</label>
              <Input
                value={editingTutor.name || ""}
                onChange={(e) => setEditingTutor(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nhập tên"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={editingTutor.email || ""}
                onChange={(e) => setEditingTutor(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Nhập email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Số điện thoại</label>
              <Input
                value={editingTutor.phone || ""}
                onChange={(e) => setEditingTutor(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Khu vực</label>
              <Input
                value={editingTutor.area || ""}
                onChange={(e) => setEditingTutor(prev => ({ ...prev, area: e.target.value }))}
                placeholder="Nhập khu vực"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Giá/giờ (VNĐ)</label>
              <Input
                type="number"
                value={editingTutor.hourlyRate || ""}
                onChange={(e) => setEditingTutor(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                placeholder="Nhập giá/giờ"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={actionLoading === "edit"}
            >
              {actionLoading === "edit" ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
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
              Bạn có chắc chắn muốn từ chối gia sư "{selectedTutor?.name}"?
              Gia sư này sẽ không thể xuất hiện trong danh sách tìm kiếm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={actionLoading === `reject-${selectedTutor?.id}`}
            >
              {actionLoading === `reject-${selectedTutor?.id}` ? (
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