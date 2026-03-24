import { UserRole } from "../context/AuthContext";

/**
 * Permission Matrix for Tutor Matching System
 * Adapted from library management system structure
 * 
 * Chức năng          | Admin | Tutor | Student | Guest
 * ==================|=======|=======|=========|======
 * QUẢN LÝ GIA SƯ    |       |       |         |
 * - Xem danh sách    |  ✅   |  ✅   |   ✅    |  ✅ (public)
 * - Xem chi tiết     |  ✅   |  ✅   |   ✅    |  ✅
 * - Thêm gia sư      |  ✅   |  ❌   |   ❌    |  ❌
 * - Sửa thông tin    |  ✅   |  ✅*  |   ❌    |  ❌
 * - Xóa gia sư       |  ✅   |  ❌   |   ❌    |  ❌
 * 
 * QUẢN LÝ CHUYÊN MÔN |       |       |         |
 * - Xem danh sách    |  ✅   |  ✅   |   ✅    |  ✅
 * - Thêm chuyên môn  |  ✅   |  ❌   |   ❌    |  ❌
 * - Sửa chuyên môn   |  ✅   |  ❌   |   ❌    |  ❌
 * - Xóa chuyên môn   |  ✅   |  ❌   |   ❌    |  ❌
 * 
 * QUẢN LÝ HỌC SINH   |       |       |         |
 * - Xem danh sách    |  ✅   |  ❌   |   ❌    |  ❌
 * - Thêm học sinh    |  ✅   |  ❌   |   ❌    |  ❌
 * - Phân quyền       |  ✅   |  ❌   |   ❌    |  ❌
 * - Xóa học sinh     |  ✅   |  ❌   |   ❌    |  ❌
 * 
 * QUẢN LÝ LỚP HỌC   |       |       |         |
 * - Xem danh sách    |  ✅   |  ✅   |   ✅    |  ✅ (public)
 * - Xem chi tiết     |  ✅   |  ✅   |   ✅    |  ✅
 * - Tạo lớp         |  ✅   |  ✅*  |   ❌    |  ❌
 * - Sửa lớp         |  ✅   |  ✅*  |   ❌    |  ❌
 * - Xóa lớp         |  ✅   |  ❌   |   ❌    |  ❌
 * 
 * ĐẶT LỊch & HỌC TẬP|       |       |         |
 * - Xem lịch         |  ✅   |  ✅   |   ✅    |  ❌
 * - Đặt lịch         |  ✅*  |  ❌   |   ✅    |  ❌
 * - Hủy lịch         |  ✅*  |  ❌   |   ✅*   |  ❌
 * - Bình luận/Đánh giá|  ✅* |  ✅   |   ✅    |  ❌
 * 
 * XÁC THỰC           |       |       |         |
 * - Đăng ký          |  ✅   |  ✅   |   ✅    |  ✅
 * - Đăng nhập        |  ✅   |  ✅   |   ✅    |  ❌
 * - Đăng xuất        |  ✅   |  ✅   |   ✅    |  ❌
 * 
 * * = Chỉ quản lý của chính mình / own resources
 */

export type Permission =
  // Tutor Management
  | "view_tutors"
  | "view_tutor_details"
  | "create_tutor"
  | "edit_tutor"
  | "delete_tutor"
  
  // Subject/Specialty Management
  | "view_subjects"
  | "create_subject"
  | "edit_subject"
  | "delete_subject"
  
  // Student Management
  | "view_all_students"
  | "create_student"
  | "edit_student"
  | "delete_student"
  
  // Class Management
  | "view_classes"
  | "view_class_details"
  | "create_class"
  | "edit_class"
  | "delete_class"
  
  // Booking & Learning
  | "view_schedule"
  | "create_booking"
  | "cancel_booking"
  | "view_bookings"
  | "leave_review"
  
  // Authentication
  | "register"
  | "login"
  | "logout";

// Permission matrix definition
const PERMISSION_MATRIX: Record<UserRole, Set<Permission>> = {
  admin: new Set([
    // Tutor Management
    "view_tutors",
    "view_tutor_details",
    "create_tutor",
    "edit_tutor",
    "delete_tutor",
    
    // Subject Management
    "view_subjects",
    "create_subject",
    "edit_subject",
    "delete_subject",
    
    // Student Management
    "view_all_students",
    "create_student",
    "edit_student",
    "delete_student",
    
    // Class Management
    "view_classes",
    "view_class_details",
    "create_class",
    "edit_class",
    "delete_class",
    
    // Booking & Learning
    "view_schedule",
    "create_booking",
    "cancel_booking",
    "view_bookings",
    "leave_review",
    
    // Authentication
    "register",
    "login",
    "logout"
  ]),

  staff: new Set([
    // Tutor Management
    "view_tutors",
    "view_tutor_details",
    "create_tutor",
    "edit_tutor",
    "delete_tutor",
    
    // Subject Management
    "view_subjects",
    "create_subject",
    "edit_subject",
    "delete_subject",
    
    // Student Management
    "view_all_students",
    "edit_student",
    "delete_student",
    
    // Class Management
    "view_classes",
    "view_class_details",
    "create_class",
    "edit_class",
    
    // Booking & Learning
    "view_schedule",
    "view_bookings",
    "leave_review",
    
    // Authentication
    "register",
    "login",
    "logout"
  ]),
  
  tutor: new Set([
    // Tutor Management
    "view_tutors",
    "view_tutor_details",
    "edit_tutor", // Only own profile
    
    // Subject Management
    "view_subjects",
    
    // Class Management
    "view_classes",
    "view_class_details",
    "create_class", // Only own classes
    "edit_class", // Only own classes
    
    // Booking & Learning
    "view_schedule",
    "view_bookings",
    "leave_review",
    
    // Authentication
    "register",
    "login",
    "logout"
  ]),
  
  student: new Set([
    // Tutor Management
    "view_tutors",
    "view_tutor_details",
    
    // Subject Management
    "view_subjects",
    
    // Class Management
    "view_classes",
    "view_class_details",
    
    // Booking & Learning
    "view_schedule",
    "create_booking",
    "cancel_booking", // Only own bookings
    "view_bookings",
    "leave_review",
    
    // Authentication
    "register",
    "login",
    "logout"
  ]),
  
  guest: new Set([
    // Tutor Management
    "view_tutors",
    "view_tutor_details",
    
    // Subject Management
    "view_subjects",
    
    // Class Management
    "view_classes",
    "view_class_details",
    
    // Authentication
    "register"
  ])
};

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole | null, permission: Permission): boolean {
  if (!role) return false;
  return PERMISSION_MATRIX[role]?.has(permission) ?? false;
}

/**
 * Check if a user role has multiple permissions (requires all)
 */
export function hasAllPermissions(role: UserRole | null, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Check if a user role has any of the given permissions
 */
export function hasAnyPermission(role: UserRole | null, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return Array.from(PERMISSION_MATRIX[role] ?? []);
}

/**
 * Check if user can manage a resource (own or admin)
 * Used for checking if user can edit/delete their own resources
 */
export function canManageResource(
  userRole: UserRole | null,
  resourceOwnerId: string | undefined,
  currentUserId: string | undefined,
  adminPermission: Permission
): boolean {
  if (!userRole || !currentUserId) return false;
  
  // Admin can manage everything
  if (hasPermission(userRole, adminPermission)) return true;
  
  // Owner can manage their own resources
  return resourceOwnerId === currentUserId;
}
