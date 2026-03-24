# Hướng Dẫn Đăng Nhập & Test Hệ Thống

## 🔓 Tài Khoản Test

### 1️⃣ Tài Khoản Admin
- **Email:** `admin@tutorcentral.com`
- **Mật khẩu:** `admin123`
- **Vai trò:** Admin
- **Quyền:** Đầy đủ quyền trên hệ thống
- **Ghi chú:** Quản lý cấp cao, có quyền xóa tất cả

### 2️⃣ Tài Khoản Nhân viên Quản lý (Chính)
- **Email:** `staff@tutorcentral.com`
- **Mật khẩu:** `staff123`
- **Vai trò:** Nhân viên
- **Bộ phận:** Quản lý
- **Quyền:** Quản lý gia sư, học viên, lớp, duyệt yêu cầu
- **Ghi chú:** Tài khoản chính để test tính năng staff

### 3️⃣ Tài Khoản Nhân viên Hỗ trợ (Phụ)
- **Email:** `staff2@tutorcentral.com`
- **Mật khẩu:** `staff123`
- **Vai trò:** Nhân viên
- **Bộ phận:** Hỗ trợ
- **Quyền:** Tương tự như staff chính
- **Ghi chú:** Tài khoản thứ hai để test multiple staff

### 4️⃣ Tài Khoản Gia sư
- **Email:** `tutor1@tutorcentral.com`
- **Mật khẩu:** `tutor123`
- **Vai trò:** Gia sư
- **Ghi chú:** Xem được danh sách học sinh, quản lý hồ sơ cá nhân

### 5️⃣ Tài Khoản Học sinh
- **Email:** `student1@tutorcentral.com`
- **Mật khẩu:** `student123`
- **Vai trò:** Học sinh
- **Ghi chú:** Xem danh sách gia sư, yêu cầu lớp học

---

## 📋 Kịch Bản Test Tính Năng

### ✅ Test 1: Đăng nhập Nhân viên
1. Mở ứng dụng
2. Chọn tab "Đăng Nhập Admin"
3. Nhập email: `staff@tutorcentral.com`
4. Nhập mật khẩu: `staff123`
5. Nhấn "Đăng Nhập"
6. **Kết quả mong đợi:** Chuyển sang Dashboard Nhân viên

### ✅ Test 2: Xem & Cập nhật Hồ sơ Cá nhân
1. Sau khi đăng nhập, nhấn nút "Cập nhật hồ sơ" (góc trên phải)
2. Sửa tên, email, hoặc số điện thoại
3. Nhấn "Lưu thay đổi"
4. **Kết quả mong đợi:**
   - Thấy toast "Cập nhật hồ sơ thành công"
   - Dialog đóng lại
   - Thông tin được lưu

### ✅ Test 3: Quản lý Gia sư - Xem Danh sách
1. Đang ở Dashboard Nhân viên
2. Tab "Tổng quan" → Xem "Thống kê Gia sư"
3. Hoặc đi vào các tab khác để xem danh sách gia sư
4. **Kết quả mong đợi:** Thấy danh sách gia sư với thông tin

### ✅ Test 4: Quản lý Gia sư - Thêm Mới
1. Từ danh sách gia sư, nhấn nút "Thêm Gia Sư Mới"
2. Điền đầy đủ thông tin:
   - Họ tên
   - Môn học (tick ít nhất 1)
   - Khu vực
   - Học phí
   - Email & Số điện thoại
   - Kinh nghiệm
3. Nhấn "Lưu"
4. **Kết quả mong đợi:**
   - Thấy toast "Thêm gia sư thành công"
   - Gia sư mới xuất hiện trong danh sách

### ✅ Test 5: Quản lý Gia sư - Sửa Thông tin
1. Từ danh sách gia sư, chọn gia sư muốn sửa
2. Nhấn nút "Sửa"
3. Chỉnh sửa thông tin
4. Nhấn "Lưu"
5. **Kết quả mong đợi:**
   - Thông tin được cập nhật trong danh sách

### ✅ Test 6: Quản lý Gia sư - Xóa
1. Từ danh sách gia sư, nhấn nút "Xóa"
2. Xác nhận xóa nếu có dialog
3. **Kết quả mong đợi:**
   - Gia sư bị xóa khỏi danh sách
   - Thấy toast xác nhận

### ✅ Test 7: Quản lý Học viên - Xem & Tìm Kiếm
1. Nhấn tab "Học viên"
2. Xem danh sách học viên
3. Nhập tên hoặc email vào ô tìm kiếm
4. **Kết quả mong đợi:**
   - Danh sách lọc theo tìm kiếm
   - Hiển thị đúng thông tin học viên

### ✅ Test 8: Quản lý Học viên - Khóa Tài khoản
1. Tab "Học viên"
2. Chọn một học viên có trạng thái "Hoạt động"
3. Nhấn nút "Khóa"
4. **Kết quả mong đợi:**
   - Badge trạng thái đổi thành "Khóa"
   - Thấy toast "Tài khoản học viên đã được locked"

### ✅ Test 9: Quản lý Học viên - Mở Khóa
1. Tab "Học viên"
2. Chọn học viên có trạng thái "Khóa"
3. Nhấn nút "Mở"
4. **Kết quả mong đợi:**
   - Trạng thái đổi về "Hoạt động"

### ✅ Test 10: Quản lý Lớp học
1. Tab "Lớp học"
2. Xem danh sách các lớp
3. Xem trạng thái (Đã phân công / Chưa phân công)
4. **Kết quả mong đợi:**
   - Hiển thị tất cả thông tin lớp

### ✅ Test 11: Duyệt Yêu cầu Đăng ký
1. Nhấn tab "Yêu cầu"
2. Xem danh sách yêu cầu chờ duyệt (status = "pending")
3. Nhấn nút "Duyệt" cho một yêu cầu
4. **Kết quả mong đợi:**
   - Badge trạng thái đổi thành "Đã duyệt" (xanh)
   - Thấy toast "Yêu cầu đã được phê duyệt"

### ✅ Test 12: Từ chối Yêu cầu
1. Tab "Yêu cầu"
2. Chọn yêu cầu ở trạng thái "Chờ duyệt"
3. Nhấn nút "Từ chối"
4. **Kết quả mong đợi:**
   - Trạng thái đổi thành "Từ chối" (đỏ)

### ✅ Test 13: Xem Thống kê
1. Nhấn tab "Tổng quan"
2. Xem 4 card thống kê:
   - Gia sư đang quản lý
   - Học viên hoạt động
   - Lớp học hoạt động
   - Yêu cầu chờ duyệt
3. **Kết quả mong đợi:**
   - Số liệu chính xác và cập nhật

### ✅ Test 14: Thống kê Chi tiết
1. Tab "Tổng quan"
2. Xem phần "Thống kê Gia sư" và "Thống kê Lớp học"
3. **Kết quả mong đợi:**
   - Hiển thị số liệu phân tích chi tiết

### ✅ Test 15: Đăng Xuất
1. Nhấn nút "Đăng Xuất" (góc trên phải)
2. **Kết quả mong đợi:**
   - Quay về trang đăng nhập
   - Session được xóa

### ✅ Test 16: Kiểm tra Quyền hạn
1. Đăng nhập với staff account
2. Xác nhận có thể:
   - [x] Xem danh sách gia sư
   - [x] Thêm/Sửa/Xóa gia sư
   - [x] Xem danh sách học viên
   - [x] Khóa/Mở tài khoản học viên
   - [x] Xem lớp học
   - [x] Duyệt yêu cầu
   - [x] Xem thống kê
3. **Kết quả mong đợi:**
   - Tất cả tính năng trên hoạt động

---

## 🔄 Quy Trình Đàm phán (Workflow)

### Workflow: Duyệt Yêu cầu Lớp học

```
1. Học sinh gửi yêu cầu đăng ký lớp
   ↓
2. Yêu cầu xuất hiện ở tab "Yêu cầu" với status = "pending"
   ↓
3. Nhân viên xem chi tiết yêu cầu
   ↓
4. Nhân viên chọn "Duyệt" hoặc "Từ chối"
   ↓
5. Nếu duyệt → Tạo lớp học & tìm gia sư phù hợp
   ↓
6. Nếu từ chối → Thông báo học sinh
   ↓
7. Yêu cầu đã xử lý
```

### Workflow: Quản lý Gia sư

```
1. Thêm gia sư mới vào hệ thống
   ↓
2. Cấp quyền & thiết lập hồ sơ
   ↓
3. Phân công lớp học cho gia sư
   ↓
4. Theo dõi tiến độ dạy học
   ↓
5. Xử lý khiếu nại hoặc hủy hợp đồng
   ↓
6. Nếu cần, khóa hoặc xóa tài khoản
```

---

## 🐛 Troubleshooting

### Vấn đề: Không thấy tab "Nhân viên"
**Giải pháp:** 
- Đảm bảo bạn đã đăng nhập với tài khoản staff
- Kiểm tra email và mật khẩu

### Vấn đề: Dữ liệu không lưu
**Giải pháp:**
- Kiểm tra localStorage có hoạt động không
- Thử xóa cache và reload trang

### Vấn đề: Không thấy nút "Cập nhật hồ sơ"
**Giải pháp:**
- Nó nằm ở góc trên phải của trang
- Kiểm tra kích thước màn hình

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra console (F12) xem có lỗi không
2. Thử reload trang (Ctrl + R)
3. Thử xóa localStorage
4. Kiểm tra tài khoản và mật khẩu

---

**Cập nhật:** 23 tháng 1, 2026
**Phiên bản:** 1.0.0
