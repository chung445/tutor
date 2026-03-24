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
  Star,
  MessageSquare,
  Trash2,
  Eye,
  RefreshCw,
  AlertCircle,
  User,
  Calendar,
  Flag
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function ReviewManagement() {
  const {
    reviews,
    loading,
    errors,
    deleteReview,
    refreshReviews
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const sanitizedReviews = reviews.map((review: any) => ({
    id: review.id,
    studentName: review.studentName || "Học viên",
    tutorName: review.tutorName || "Gia sư",
    rating: typeof review.rating === "number" ? review.rating : 0,
    comment: review.comment || "",
    createdAt: review.createdAt || new Date().toISOString(),
    tutorAvatar: review.tutorAvatar || "",
    studentAvatar: review.studentAvatar || "",
    tutorId: review.tutorId || "",
    studentId: review.studentId || "",
    subject: review.subject || "Chưa xác định",
  }));

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return sanitizedReviews.filter(review => {
      const matchesSearch = review.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.tutorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter;
      return matchesSearch && matchesRating;
    });
  }, [sanitizedReviews, searchTerm, ratingFilter]);

  const handleViewDetail = (review: any) => {
    setSelectedReview(review);
    setShowDetailDialog(true);
  };

  const handleDeleteReview = (review: any) => {
    setSelectedReview(review);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedReview) return;

    setActionLoading(`delete-${selectedReview.id}`);
    try {
      await deleteReview(selectedReview.id);
      toast.success("Đã xóa đánh giá thành công");
      setShowDeleteDialog(false);
      setSelectedReview(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa đánh giá");
    } finally {
      setActionLoading(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4) return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Tốt</Badge>;
    if (rating >= 3) return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Trung bình</Badge>;
    return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Kém</Badge>;
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
            Quản lý đánh giá
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Giám sát và quản lý các đánh giá từ học sinh
          </p>
        </div>
        <Button onClick={refreshReviews} disabled={loading.reviews}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading.reviews ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>

      {/* Error Alert */}
      {errors.reviews && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Lỗi tải dữ liệu:</span>
                <span>{errors.reviews}</span>
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
            placeholder="Tìm kiếm theo tên học sinh, gia sư hoặc nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả đánh giá</option>
          <option value="5">5 sao</option>
          <option value="4">4 sao</option>
          <option value="3">3 sao</option>
          <option value="2">2 sao</option>
          <option value="1">1 sao</option>
        </select>
      </motion.div>

      {/* Reviews List */}
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
        {loading.reviews ? (
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
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.studentAvatar} alt={review.studentName} />
                        <AvatarFallback>
                          {review.studentName.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {review.studentName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Học sinh • {review.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium ml-1">{review.rating}/5</span>
                      </div>
                      {getRatingBadge(review.rating)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gia sư: {review.tutorName}
                      </span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <MessageSquare className="w-4 h-4 text-gray-400 mb-2" />
                      <p className="text-gray-900 dark:text-white leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{review.sessionDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flag className="w-4 h-4" />
                        <span>{review.subject}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(review)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Chi tiết
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteReview(review)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Xóa
                      </Button>
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
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy đánh giá
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
            <DialogTitle>Chi tiết đánh giá</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đánh giá này
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedReview.studentAvatar} alt={selectedReview.studentName} />
                  <AvatarFallback className="text-lg">
                    {selectedReview.studentName.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedReview.studentName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Học sinh</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedReview.rating)}
                      <span className="font-medium">{selectedReview.rating}/5</span>
                    </div>
                    {getRatingBadge(selectedReview.rating)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Gia sư được đánh giá</label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedReview.tutorName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Môn học</label>
                  <p className="text-gray-900 dark:text-white">{selectedReview.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày học</label>
                  <p className="text-gray-900 dark:text-white">{selectedReview.sessionDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Thời gian đánh giá</label>
                  <p className="text-gray-900 dark:text-white">{selectedReview.createdAt}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Nội dung đánh giá</label>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <MessageSquare className="w-5 h-5 text-gray-400 mb-2" />
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {selectedReview.comment}
                  </p>
                </div>
              </div>

              {selectedReview.adminResponse && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Phản hồi từ admin</label>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                      {selectedReview.adminResponse}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa đánh giá</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đánh giá của "{selectedReview?.studentName}" về gia sư "{selectedReview?.tutorName}"?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={actionLoading === `delete-${selectedReview?.id}`}
            >
              {actionLoading === `delete-${selectedReview?.id}` ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                "Xóa đánh giá"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}