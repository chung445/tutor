# Hệ thống Quản lý Nhân viên - Tài liệu Tính năng

## Tổng Quan
Đã thêm một hệ thống quản lý nhân viên hoàn chỉnh cho tài khoản **Nhân viên Quản lý** trong ứng dụng Tutor Matching System.

---

## 🔐 Thông tin đăng nhập Nhân viên
- **Email:** `staff@tutorcentral.com`
- **Mật khẩu:** `staff123`
- **Vai trò:** Nhân viên Quản lý
- **Bộ phận:** Quản lý

**Tài khoản thứ 2:**
- **Email:** `staff2@tutorcentral.com`
- **Mật khẩu:** `staff123`
- **Vai trò:** Nhân viên Hỗ trợ
- **Bộ phận:** Hỗ trợ

---

## ✨ Các Tính Năng Chính

### 1. 📋 Xem & Cập nhật Hồ sơ Cá nhân
- **Vị trí:** Nút "Cập nhật hồ sơ" ở góc trên phải
- **Chức năng:**
  - Xem thông tin cá nhân hiện tại
  - Chỉnh sửa tên, email, số điện thoại
  - Chỉnh sửa bộ phận/phòng ban
  - Lưu thay đổi với xác nhận toast
  - Dữ liệu được lưu vào localStorage

### 2. 👨‍🏫 Quản lý Gia sư (CRUD)
- **Các hoạt động:**
  - ✅ **Xem** danh sách gia sư với thông tin chi tiết
  - ✅ **Thêm** gia sư mới vào hệ thống
  - ✅ **Sửa** thông tin gia sư (tên, môn học, khu vực, học phí, etc.)
  - ✅ **Xóa** gia sư khỏi hệ thống

- **Thông tin gia sư:**
  - Tên, Email, Số điện thoại
  - Môn học (Toán, Lý, Hóa, Tiếng Anh, Văn, etc.)
  - Khu vực hoạt động
  - Học phí theo giờ
  - Kinh nghiệm dạy học
  - Đánh giá (rating)
  - Avatar

- **Tính năng Khóa:**
  - Khóa/Mở khóa tài khoản gia sư (nếu triển khai)

### 3. 👥 Quản lý Học viên
- **Tính năng:**
  - ✅ **Xem danh sách** tất cả học viên đang hoạt động
  - ✅ **Khóa/Mở tài khoản** học viên
  - ✅ **Xóa** tài khoản học viên
  - ✅ **Tìm kiếm & lọc** theo tên hoặc email

- **Thông tin hiển thị:**
  - Họ tên học viên
  - Email & Số điện thoại
  - Số lớp học đang tham gia
  - Trạng thái tài khoản (Hoạt động / Khóa)
  - Ngày tham gia

- **Trạng thái học viên:**
  - 🟢 **Hoạt động** - Có thể sử dụng hệ thống
  - 🔴 **Khóa** - Không thể đăng nhập

### 4. 📚 Quản lý Lớp học
- **Tính năng:**
  - ✅ **Xem danh sách** tất cả lớp học
  - ✅ **Xem chi tiết** lớp học
  - ✅ **Tạo lớp học** mới
  - ✅ **Sửa thông tin** lớp học
  - ✅ **Phân công gia sư** cho lớp học

- **Thông tin lớp học:**
  - Môn học
  - Tên học sinh
  - Khu vực
  - Học phí tối đa
  - Lớp/Khối học
  - Số buổi/tuần
  - Mô tả nhu cầu

- **Trạng thái lớp:**
  - 🟡 **Chưa phân công** - Cần tìm gia sư
  - 🟢 **Đã phân công** - Đã có gia sư dạy

### 5. 📋 Duyệt Yêu cầu Đăng ký Lớp của Học viên
- **Vị trí:** Tab "Yêu cầu"
- **Tính năng:**
  - ✅ **Xem danh sách** yêu cầu đăng ký lớp
  - ✅ **Phê duyệt** yêu cầu (Duyệt)
  - ✅ **Từ chối** yêu cầu
  - ✅ **Xem chi tiết** yêu cầu

- **Thông tin yêu cầu:**
  - Tên học sinh
  - Môn học cần học
  - Khu vực
  - Lớp/Khối
  - Học phí dự kiến
  - Ngày yêu cầu
  - Mô tả nhu cầu

- **Trạng thái yêu cầu:**
  - 🟡 **Chờ duyệt** - Chưa quyết định
  - 🟢 **Đã duyệt** - Chấp nhận yêu cầu
  - 🔴 **Từ chối** - Không chấp nhận

### 6. 📊 Xem Thống kê Cơ bản
- **Tab Overview:**
  - Tổng số gia sư đang quản lý
  - Tổng số học viên hoạt động
  - Số lớp học đang dạy
  - Số yêu cầu chờ duyệt

- **Thông tin Chi tiết:**
  - Thống kê Gia sư:
    - Tổng gia sư
    - Gia sư đang dạy
    - Gia sư đã hoàn thành
  
  - Thống kê Lớp học:
    - Tổng lớp học
    - Lớp đã phân công
    - Lớp chưa phân công

### 7. 🔍 Tìm kiếm & Lọc Dữ liệu
- **Tìm kiếm Học viên:**
  - Tìm theo tên học viên
  - Tìm theo email
  - Tìm theo số điện thoại

- **Lọc Gia sư:**
  - Lọc theo khu vực
  - Tìm theo tên hoặc môn học

- **Các bộ lọc khác:**
  - Lọc theo trạng thái (Hoạt động/Khóa)
  - Lọc theo ngày

### 8. 🔐 Phân quyền (Chỉ xem hoặc Chỉnh sửa theo Vai trò)
- **Hệ thống Quyền hạn:**
  - Staff có quyền **xem & sửa** hầu hết dữ liệu
  - Staff có quyền **xóa** học viên và gia sư
  - Staff **không có quyền** xóa lớp học
  - Staff **không có quyền** xóa hợp đồng
  - Admin có quyền đầy đủ trên tất cả

- **Các vai trò:**
  - **Admin:** Toàn quyền
  - **Staff:** Quản lý gia sư, học viên, lớp, duyệt yêu cầu
  - **Tutor:** Quản lý hồ sơ cá nhân
  - **Student:** Xem thông tin, yêu cầu lớp học
  - **Guest:** Xem công khai gia sư

- **Ma trận Quyền hạn:** Xem file `src/app/utils/permissions.ts`

---

## 🏗️ Kiến Trúc Hệ Thống

### Files Mới Tạo:
1. **`src/app/components/staff-dashboard.tsx`**
   - Component chính cho Dashboard Nhân viên
   - Quản lý tất cả các tab (Tổng quan, Học viên, Lớp học, Yêu cầu)
   - Xử lý CRUD cho học viên và duyệt yêu cầu

### Files Được Sửa Đổi:
1. **`src/app/context/AuthContext.tsx`**
   - Thêm role type `"staff"`
   - Thêm `department` field cho User
   - Thêm mock staff accounts (MOCK_STAFF)
   - Cập nhật login function để check staff accounts

2. **`src/app/App.tsx`**
   - Import StaffDashboard component
   - Thêm conditional render cho staff role
   - Thêm header & layout cho staff view

3. **`src/app/utils/permissions.ts`**
   - Thêm staff role vào Permission Matrix
   - Staff permissions bao gồm: view, create, edit, delete (tutors & students)

---

## 🎯 Quyền hạn Chi tiết cho Staff

```
Chức năng                    | Có quyền
============================|=========
Xem & Cập nhật hồ sơ cá nhân | ✅
Quản lý Gia sư (CRUD)        | ✅
Quản lý Học viên (xem, xóa)  | ✅
Quản lý Lớp học (CRUD)       | ✅
Duyệt Yêu cầu Đăng ký        | ✅
Xem Hợp đồng                 | ✅
Xem Thống kê                 | ✅
Tìm kiếm & Lọc              | ✅
Khóa/Mở Tài khoản Học viên  | ✅
```

---

## 📱 Giao Diện Người Dùng

### Dashboard Layout:
```
┌─────────────────────────────────────────┐
│ Header (Tên, Vai trò, Logout)          │
├─────────────────────────────────────────┤
│ Thống kê (4 Cards)                      │
├─────────────────────────────────────────┤
│ Tabs:                                   │
│ - Tổng quan (Overview)                 │
│ - Học viên (Students)                  │
│ - Lớp học (Classes)                    │
│ - Yêu cầu (Requests)                   │
├─────────────────────────────────────────┤
│ Tab Content (Dynamic)                   │
└─────────────────────────────────────────┘
```

---

## 💾 Lưu Trữ Dữ Liệu

- **Mock Data:** Dữ liệu mẫu được định nghĩa trong component
- **LocalStorage:** Thông tin người dùng được lưu trong localStorage
- **Trạng thái Component:** State được quản lý bằng React hooks

---

## 🚀 Cách Sử Dụng

### 1. Đăng nhập với tài khoản Nhân viên:
```
Email: staff@tutorcentral.com
Mật khẩu: staff123
```

### 2. Từ Dashboard, bạn có thể:
- Cập nhật hồ sơ cá nhân (nút trên cùng bên phải)
- Xem thống kê trong tab "Tổng quan"
- Quản lý học viên trong tab "Học viên"
- Quản lý lớp học trong tab "Lớp học"
- Duyệt yêu cầu trong tab "Yêu cầu"

### 3. Các thao tác phổ biến:
- **Tìm kiếm:** Nhập tên/email trong ô tìm kiếm
- **Khóa tài khoản:** Nhấn nút "Khóa" hoặc "Mở"
- **Duyệt yêu cầu:** Nhấn "Duyệt" hoặc "Từ chối"
- **Thêm thông tin:** Nhấn nút "+" hoặc "Thêm mới"
- **Sửa thông tin:** Nhấn nút "Sửa" hay click vào dòng

---

## ⚙️ Tính Năng Nâng Cao (Future)

Có thể triển khai thêm:
- Xuất dữ liệu (CSV, PDF)
- Lập báo cáo chi tiết
- Email notifications
- Phân quyền chi tiết hơn (theo phòng ban)
- Audit log (ghi lại các hành động)
- Backup & Restore dữ liệu
- Integration với backend API

---

## ✅ Checklist Hoàn Thành

- [x] Thêm Staff Role Type
- [x] Tạo Mock Staff Accounts
- [x] Tạo Staff Dashboard Component
- [x] Implement Personal Profile View & Edit
- [x] Implement Tutor Management
- [x] Implement Student Management
- [x] Implement Class Management
- [x] Implement Class Request Approval
- [x] Add Statistics View
- [x] Add Search & Filter
- [x] Add Permission System
- [x] Test Build & Compilation

---

## 📝 Ghi Chú

- Toàn bộ hệ thống sử dụng **React + TypeScript**
- Styling sử dụng **Tailwind CSS** + **shadcn/ui components**
- Notifications sử dụng **Sonner toast**
- State management sử dụng **React Hooks & Context API**
- Icons từ **Lucide Icons**

---

**Ngày cập nhật:** 23 tháng 1, 2026
**Phiên bản:** 1.0.0
