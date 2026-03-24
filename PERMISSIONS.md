# Role-Based Access Control (RBAC) - Tutor Matching System

## Overview

The system implements role-based permission checking adapted from a library management structure, tailored for a tutor matching platform. Users are assigned one of four roles, each with specific permissions.

## User Roles

### 1. **Admin** (Quản trị viên)
- Full system access
- Can manage tutors, students, subjects, and classes
- Can view and manage all users and bookings
- Highest level of access

### 2. **Tutor** (Gia sư)
- Can manage their own profile and teaching materials
- Can create and manage their own classes
- Can view students and bookings
- Can leave reviews
- Cannot delete system data (subjects, etc.)

### 3. **Student** (Học sinh)
- Can view tutors and available classes
- Can create and manage their own bookings
- Can cancel their own bookings
- Can leave reviews and ratings
- Limited to viewing only public content

### 4. **Guest** (Khách - Chưa đăng nhập)
- Can view public tutors and classes
- Can register for an account
- Cannot access any protected features
- No booking or authentication capabilities

## Permission Matrix

| Feature | Admin | Tutor | Student | Guest |
|---------|:-----:|:-----:|:-------:|:-----:|
| **QUẢN LÝ GIA SƯ** |
| Xem danh sách gia sư | ✅ | ✅ | ✅ | ✅ (công khai) |
| Xem chi tiết gia sư | ✅ | ✅ | ✅ | ✅ |
| Thêm gia sư | ✅ | ❌ | ❌ | ❌ |
| Sửa thông tin gia sư | ✅ | ✅* | ❌ | ❌ |
| Xóa gia sư | ✅ | ❌ | ❌ | ❌ |
| **QUẢN LÝ CHUYÊN MÔN** |
| Xem danh sách chuyên môn | ✅ | ✅ | ✅ | ✅ |
| Thêm chuyên môn | ✅ | ❌ | ❌ | ❌ |
| Sửa chuyên môn | ✅ | ❌ | ❌ | ❌ |
| Xóa chuyên môn | ✅ | ❌ | ❌ | ❌ |
| **QUẢN LÝ HỌC SINH** |
| Xem danh sách học sinh | ✅ | ❌ | ❌ | ❌ |
| Thêm học sinh | ✅ | ❌ | ❌ | ❌ |
| Phân quyền học sinh | ✅ | ❌ | ❌ | ❌ |
| Xóa học sinh | ✅ | ❌ | ❌ | ❌ |
| **QUẢN LÝ LỚP HỌC** |
| Xem danh sách lớp | ✅ | ✅ | ✅ | ✅ (công khai) |
| Xem chi tiết lớp | ✅ | ✅ | ✅ | ✅ |
| Tạo lớp | ✅ | ✅* | ❌ | ❌ |
| Sửa lớp | ✅ | ✅* | ❌ | ❌ |
| Xóa lớp | ✅ | ❌ | ❌ | ❌ |
| **ĐẶT LỊCH & HỌC TẬP** |
| Xem lịch | ✅ | ✅ | ✅ | ❌ |
| Đặt lịch | ✅* | ❌ | ✅ | ❌ |
| Hủy lịch | ✅* | ❌ | ✅* | ❌ |
| Bình luận/Đánh giá | ✅* | ✅ | ✅ | ❌ |
| **XÁC THỰC** |
| Đăng ký tài khoản | ✅ | ✅ | ✅ | ✅ |
| Đăng nhập | ✅ | ✅ | ✅ | ❌ |
| Đăng xuất | ✅ | ✅ | ✅ | ❌ |

**Legend:**
- ✅ = Allowed
- ❌ = Not allowed
- \* = Only for own resources (own profile, own classes, own bookings, etc.)

## Implementation

### Files Structure

```
src/app/
├── context/
│   └── AuthContext.tsx         # User authentication and role management
├── utils/
│   └── permissions.ts          # Permission matrix and checking functions
├── hooks/
│   └── usePermissions.ts       # React hooks for permission checking
├── components/
│   ├── protected-route.tsx     # Route protection component with permission checking
│   └── PermissionGate.tsx      # Conditional rendering based on permissions
└── [other components]
```

### Core Components

#### 1. **AuthContext.tsx**
Manages user authentication and state. Stores user information including role.

```tsx
// Types
type UserRole = "admin" | "tutor" | "student" | "guest";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  isVerified?: boolean;
}
```

#### 2. **permissions.ts**
Contains the permission matrix and permission checking functions.

**Available Functions:**
- `hasPermission(role, permission)` - Check single permission
- `hasAllPermissions(role, permissions)` - Check if user has ALL permissions
- `hasAnyPermission(role, permissions)` - Check if user has ANY permission
- `canManageResource(role, resourceOwnerId, userId, permission)` - Check if user can manage a resource

#### 3. **usePermissions.ts**
React hooks for easy permission checking in components.

**Available Hooks:**
- `useHasPermission(permission)` - Check single permission
- `useHasAllPermissions(permissions)` - Check multiple permissions (all required)
- `useHasAnyPermission(permissions)` - Check multiple permissions (any required)
- `useCanManageResource(resourceOwnerId, adminPermission)` - Check resource ownership
- `usePermissions()` - Get complete permissions object

#### 4. **PermissionGate.tsx**
Components for conditional rendering based on permissions.

**Components:**
- `<PermissionGate>` - Conditional rendering wrapper
- `<PermissionButton>` - Button that auto-disables based on permissions

## Usage Examples

### Using ProtectedRoute with Permissions

```tsx
import { ProtectedRoute } from "@/app/components/protected-route";

// Require specific permission(s)
<ProtectedRoute 
  requiredPermissions="edit_tutor"
  fallback={<AccessDenied />}
>
  <EditTutorPage />
</ProtectedRoute>

// Require multiple permissions
<ProtectedRoute 
  requiredPermissions={["view_all_students", "edit_student"]}
  requireAll={true} // User must have ALL permissions
>
  <StudentManagement />
</ProtectedRoute>
```

### Using useHasPermission Hook

```tsx
import { useHasPermission } from "@/app/hooks/usePermissions";

function TutorManagement() {
  const canCreateTutor = useHasPermission("create_tutor");
  const canDeleteTutor = useHasPermission("delete_tutor");

  return (
    <div>
      {canCreateTutor && <button>Add New Tutor</button>}
      {canDeleteTutor && <button>Delete Tutor</button>}
    </div>
  );
}
```

### Using PermissionGate Component

```tsx
import { PermissionGate, PermissionButton } from "@/app/components/PermissionGate";

function TutorCard({ tutor }) {
  return (
    <div>
      <h3>{tutor.name}</h3>
      
      {/* Show edit button only for admins and tutors */}
      <PermissionGate 
        requires={["edit_tutor"]}
        fallback={<span className="text-gray-400">Locked</span>}
      >
        <button>Edit Profile</button>
      </PermissionGate>

      {/* Auto-disabling button */}
      <PermissionButton 
        requires="delete_tutor"
        tooltipOnDenied="Only admins can delete tutors"
      >
        Delete Tutor
      </PermissionButton>
    </div>
  );
}
```

### Using usePermissions Hook

```tsx
import { usePermissions } from "@/app/hooks/usePermissions";

function Dashboard() {
  const permissions = usePermissions();

  return (
    <div>
      <p>Role: {permissions.role}</p>
      
      {permissions.hasPermission("view_all_students") && (
        <section>All Students Management</section>
      )}

      {permissions.hasAnyPermission(["create_tutor", "create_student"]) && (
        <button>Create User</button>
      )}

      {permissions.canManage(tutor.id, "edit_tutor") && (
        <button>Edit This Tutor</button>
      )}
    </div>
  );
}
```

## Test Accounts

### Admin
- Email: `admin@tutorcentral.com`
- Password: `admin123`
- Email: `manager@tutorcentral.com`
- Password: `manager123`

### Tutor
- Email: `tutor1@tutorcentral.com`
- Password: `tutor123`
- Email: `tutor2@tutorcentral.com`
- Password: `tutor123`

### Student
- Email: `student1@tutorcentral.com`
- Password: `student123`
- Email: `student2@tutorcentral.com`
- Password: `student123`
- Email: `student3@tutorcentral.com`
- Password: `student123`

## Adding New Permissions

To add new permissions:

1. Add the permission type to the `Permission` type in `permissions.ts`:
   ```tsx
   type Permission = "existing_permission" | "new_permission";
   ```

2. Add it to the appropriate roles in `PERMISSION_MATRIX`:
   ```tsx
   admin: new Set([
     // ... existing permissions
     "new_permission"
   ])
   ```

3. Use it in your components:
   ```tsx
   const hasPermission = useHasPermission("new_permission");
   ```

## Best Practices

1. **Always check permissions** - Use permission guards in route definitions
2. **Use appropriate hooks** - Choose the right hook for your use case
3. **Provide feedback** - Show disabled UI states with tooltips
4. **Protect backend** - Always validate permissions on the server side too
5. **Test thoroughly** - Test with different roles before deployment

## Security Notes

⚠️ **Important:** This is a frontend permission system for UX purposes. Always:
- Validate all permissions on the backend
- Never trust frontend-only permission checks for sensitive operations
- Implement proper backend authorization
- Log permission denials for audit purposes
