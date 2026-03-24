import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { useAdmin } from "../../context/admin/AdminContext";
import { User } from "../../types/index";
import {
  Search,
  Edit,
  Trash2,
  Ban,
  UserCheck,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function UserManagement() {
  const {
    users,
    loading,
    errors,
    updateUser,
    deleteUser,
    banUser,
    unbanUser,
    refreshUsers
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditingUser({ ...user });
    setShowEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedUser || !editingUser.name || !editingUser.email) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setActionLoading("edit");
    try {
      await updateUser(selectedUser.id, editingUser);
      toast.success("Cập nhật người dùng thành công");
      setShowEditDialog(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật người dùng");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    setActionLoading("delete");
    try {
      await deleteUser(selectedUser.id);
      toast.success("Xóa người dùng thành công");
      setShowDeleteDialog(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa người dùng");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBanUser = async (user: User) => {
    setActionLoading(`ban-${user.id}`);
    try {
      await banUser(user.id);
      toast.success("Đã cấm người dùng thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cấm người dùng");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnbanUser = async (user: User) => {
    setActionLoading(`unban-${user.id}`);
    try {
      await unbanUser(user.id);
      toast.success("Đã bỏ cấm người dùng thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi bỏ cấm người dùng");
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "staff": return "default";
      case "tutor": return "secondary";
      case "student": return "outline";
      default: return "outline";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin": return "Quản trị viên";
      case "staff": return "Nhân viên";
      case "tutor": return "Gia sư";
      case "student": return "Học viên";
      default: return role;
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
            Quản lý người dùng
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
        <Button onClick={refreshUsers} disabled={loading.users}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading.users ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>

      {/* Error Alert */}
      {errors.users && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Lỗi tải dữ liệu:</span>
                <span>{errors.users}</span>
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
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Lọc theo vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="admin">Quản trị viên</SelectItem>
            <SelectItem value="staff">Nhân viên</SelectItem>
            <SelectItem value="tutor">Gia sư</SelectItem>
            <SelectItem value="student">Học viên</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Users Grid */}
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
        {loading.users ? (
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
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    {user.phone && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📞 {user.phone}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      ID: {user.id}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditUser(user)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user)}
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Xóa
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => user.isVerified === false ? handleUnbanUser(user) : handleBanUser(user)}
                        disabled={actionLoading === `ban-${user.id}` || actionLoading === `unban-${user.id}`}
                        className="flex-1"
                      >
                        {actionLoading === `ban-${user.id}` || actionLoading === `unban-${user.id}` ? (
                          <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        ) : user.isVerified === false ? (
                          <UserCheck className="w-4 h-4 mr-1" />
                        ) : (
                          <Ban className="w-4 h-4 mr-1" />
                        )}
                        {user.isVerified === false ? "Bỏ cấm" : "Cấm"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-12"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy người dùng
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Thử thay đổi bộ lọc hoặc tìm kiếm khác
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin của người dùng
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tên</label>
              <Input
                value={editingUser.name || ""}
                onChange={(e) => setEditingUser(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nhập tên"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={editingUser.email || ""}
                onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Nhập email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Số điện thoại</label>
              <Input
                value={editingUser.phone || ""}
                onChange={(e) => setEditingUser(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Vai trò</label>
              <Select
                value={editingUser.role || ""}
                onValueChange={(value) => setEditingUser(prev => ({ ...prev, role: value as User["role"] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Học viên</SelectItem>
                  <SelectItem value="tutor">Gia sư</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa người dùng "{selectedUser?.name}"?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={actionLoading === "delete"}
            >
              {actionLoading === "delete" ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                "Xóa"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}