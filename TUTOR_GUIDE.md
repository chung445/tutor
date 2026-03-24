# 👨‍🏫 Hướng Dẫn Sử Dụng Dashboard Gia Sư

## 🔓 Tài Khoản Demo Gia Sư

```
Email:     tutor@tutorcentral.com
Mật khẩu:  tutor123
```

---

## 📋 Các Tính Năng Chính

### 1. 👤 Xem & Cập nhật Hồ sơ Cá nhân
**Vị trí:** Nút "Cập nhật hồ sơ" - góc trên phải

**Thông tin có thể sửa:**
- ✏️ Họ tên
- ✏️ Email
- ✏️ Số điện thoại
- ✏️ Môn dạy (VD: Toán, Lý, Hóa)
- ✏️ Trình độ / Bằng cấp (VD: Cử nhân Sư phạm Toán)
- ✏️ Kinh nghiệm giảng dạy (VD: 5 năm)
- ✏️ Lịch rảnh (VD: Thứ 2-6, 18:00-21:00)

**Tính năng xem:**
- Ảnh đại diện
- Trạng thái xác thực ✓

---

### 2. 📚 Xem Danh sách Lớp được Phân công
**Vị trí:** Tab "Lớp học"

**Thông tin hiển thị:**
- Tên lớp
- Môn học
- Tên học viên
- Lớp/Khối của học viên
- Khu vực dạy
- Lịch dạy (ngày/giờ)
- Buổi dạy/tuần
- Trạng thái lớp

**Trạng thái lớp:**
- 🟡 **Chờ duyệt** - Cần xác nhận hoặc từ chối
- 🟢 **Đã nhận** - Đã xác nhận dạy
- 🔴 **Từ chối** - Từ chối dạy (không còn hiển thị hành động)

---

### 3. 📖 Xem Chi tiết Lớp Học
**Vị trí:** Nút "Chi tiết" trong tab "Lớp học"

**Thông tin chi tiết:**
- ✅ Môn học
- ✅ Tên học sinh
- ✅ Lớp / Khối
- ✅ Khu vực
- ✅ Lịch dạy (Thứ & Giờ)
- ✅ Buổi dạy/tuần
- ✅ Số điện thoại phụ huynh
- ✅ Ngày bắt đầu

**Dialog Chi tiết:** Popup hiện hết thông tin lớp

---

### 4. 📅 Xem Lịch Dạy (Theo Tuần / Tháng)
**Vị trị:** Tab "Lịch dạy"

**Chức năng Lọc:**
- 🔵 **Tất cả** - Xem tất cả buổi
- 🟢 **Sắp dạy** - Các buổi sắp tới (Scheduled)
- ✅ **Đã dạy** - Các buổi đã hoàn thành (Completed)

**Thông tin mỗi buổi dạy:**
- 📚 Môn học
- 👤 Tên học sinh
- 📅 Ngày dạy
- ⏰ Giờ dạy (VD: 18:00-19:30)
- 📍 Địa điểm / Hình thức
  - Nhà học viên - [Khu vực]
  - Online (Zoom / Google Meet)
- 📝 Ghi chú buổi dạy

**Trạng thái buổi:**
- 🟢 **Sắp dạy** (Scheduled) - Buổi sắp tới
- ✅ **Đã dạy** (Completed) - Buổi đã hoàn thành
- ❌ **Nghỉ** (Absent) - Buổi đã đánh dấu là nghỉ

---

### 5. ✅ Xác Nhận hoặc Từ Chối Lớp được Phân Công
**Vị trí:** Tab "Lớp học" → Cột "Hành động"

**Cho những lớp có trạng thái "Chờ duyệt":**

**Nút Nhận (Xanh lá):**
- Click để chấp nhận dạy lớp
- Lớp sẽ chuyển sang trạng thái "Đã nhận"
- Sẽ xuất hiện trong lịch dạy

**Nút Từ chối (Đỏ):**
- Click để từ chối dạy lớp
- Lớp sẽ chuyển sang trạng thái "Từ chối"
- Lớp sẽ biến mất khỏi danh sách hoạt động

---

### 6. 🔄 Cập Nhật Trạng Thái Buổi Học
**Vị trị:** Tab "Lịch dạy" → Cột "Hành động"

**Cho các buổi có trạng thái "Sắp dạy":**

**Nút ✓ Dạy (Xanh):**
- Click khi buổi dạy đã hoàn thành
- Buổi sẽ chuyển sang trạng thái "Đã dạy"
- Sẽ tính vào tiến độ hợp đồng
- Tính vào thu nhập

**Nút Nghỉ (Cam):**
- Click khi gia sư không thể dạy (bận, ốm, v.v.)
- Buổi sẽ chuyển sang trạng thái "Nghỉ"
- Không tính vào tiến độ
- Không tính vào thu nhập

---

### 7. 📋 Xem Hợp Đồng / Thời Hạn Giảng Dạy
**Vị trí:** Tab "Hợp đồng"

**Thông tin hợp đồng:**
- 📚 Môn học
- 👤 Tên học sinh
- 📅 Ngày bắt đầu hợp đồng
- 📅 Ngày kết thúc hợp đồng
- 📊 Tiến độ (dạo hình thanh tiến độ)
  - VD: 5 / 24 buổi (21% hoàn thành)

**Trạng thái Hợp đồng:**
- 🟢 **Đang hoạt động** - Đang dạy
- 🔵 **Hoàn thành** - Kết thúc (dạy hết số buổi)
- 🔴 **Kết thúc** - Dừng sớm hoặc hủy hợp đồng

**Tiến độ Visual:**
- Thanh tiến độ hiển thị % đã dạy
- Con số buổi đã dạy / Tổng buổi

---

### 8. 💰 Xem Thu Nhập (Demo)
**Vị trị:** Tab "Thu nhập"

**Tổng quan:**
- 💵 **Thu nhập Tháng này:** Tổng tiền từ tất cả lớp
  - VD: 2.7M₫
- 📊 **Buổi Dạy Tháng này:** Số buổi đã hoàn thành
  - VD: 5 buổi
- 📚 **Lớp Đang Hoạt Động:** Số lớp đang dạy
  - VD: 2 lớp

**Chi tiết Thu Nhập Theo Lớp:**

Bảng hiển thị:
- 📚 Môn học
- 👤 Tên học sinh
- 💵 Thu nhập/Tháng (cố định)
  - VD: 1,200,000₫
- 🎯 Buổi dạy (trong tháng)
  - VD: 5 buổi
- 💰 **Tổng cộng** (Thu nhập × Buổi / Tháng)
  - Được tính tự động

**Tổng Cộng:**
- Hiển thị tổng thu nhập tháng này từ tất cả lớp

**Lưu ý:** Đây là dữ liệu demo, không có giao dịch thực tế

---

## 📊 Thống Kê Nhanh (Dashboard Cards)

**4 Card Thống Kê Chính:**

1. **Lớp Học Hoạt Động** (Xanh)
   - Số lớp đã nhận & đang dạy
   - VD: 2

2. **Yêu cầu Chờ Duyệt** (Cam)
   - Số lớp mới chưa xác nhận
   - VD: 1

3. **Buổi Đã Dạy** (Xanh lá)
   - Tổng buổi đã hoàn thành
   - VD: 5

4. **Thu nhập/Tháng** (Tím)
   - Tổng tiền dự kiến tháng này
   - VD: 2.7M₫

---

## 🎯 Quy Trình Công Việc Hàng Ngày

### Sáng:
1. **Đăng nhập** vào Dashboard Gia sư
2. **Kiểm tra** Tab "Lịch dạy" → buổi sắp dạy hôm nay
3. **Chuẩn bị** nội dung giảng dạy

### Sau buổi dạy:
1. **Cập nhật** trạng thái buổi (Tab "Lịch dạy")
   - Click nút **✓ Dạy** nếu dạy xong
   - Click nút **Nghỉ** nếu không thể dạy
2. **Ghi chú** nội dung nếu cần

### Hàng tuần:
1. **Xem** Lịch dạy toàn tuần
2. **Kiểm tra** hợp đồng (Tab "Hợp đồng")
3. **Cập nhật** hồ sơ nếu cần thay đổi (Tab "Hồ sơ")

### Hàng tháng:
1. **Xem** Thu nhập (Tab "Thu nhập")
2. **Kiểm tra** tiến độ các hợp đồng
3. **Lên kế hoạch** cho tháng tiếp theo

---

## 💡 Gợi Ý Sử Dụng

### Khi có lớp mới:
- ✅ Xem chi tiết lớp (nút "Chi tiết")
- ✅ Kiểm tra lịch dạy có trùng không
- ✅ Quyết định nhận hay từ chối
- ✅ Nếu nhận → lớp sẽ xuất hiện trong "Lịch dạy"

### Khi cập nhật hồ sơ:
- ✅ Cập nhật "Lịch rảnh" thường xuyên
- ✅ Cập nhật "Kinh nghiệm" khi có thành tích mới
- ✅ Giữ thông tin liên lạc cập nhật

### Khi xem Thu nhập:
- ✅ So sánh doanh thu các lớp
- ✅ Theo dõi buổi dạy từng lớp
- ✅ Lập kế hoạch tài chính

---

## ⚙️ Tính Năng Nâng Cao

### Hiện Có:
- ✅ Xem & sửa hồ sơ cá nhân
- ✅ Quản lý 3 lớp học (với mock data)
- ✅ Lịch dạy 3 buổi ví dụ
- ✅ 2 hợp đồng đang hoạt động
- ✅ Tính toán thu nhập tự động

### Có thể Thêm:
- [ ] Gửi tin nhắn học viên
- [ ] Xem đánh giá từ học viên
- [ ] Tải bảng lương
- [ ] Lịch dạy theo tuần/tháng nâng cao
- [ ] Tính năng upload tài liệu dạy

---

## ❓ FAQ

**Q: Làm sao để cập nhật trạng thái buổi dạy?**
A: Vào Tab "Lịch dạy" → tìm buổi cần cập nhật → click "✓ Dạy" hoặc "Nghỉ"

**Q: Thu nhập được tính như thế nào?**
A: Thu nhập/tháng × (Buổi dạy / Tổng buổi hợp đồng)

**Q: Có thể từ chối lớp sau khi nhận không?**
A: Hiện tại chưa có nút từ chối sau khi nhận. Cần liên hệ nhân viên.

**Q: Lịch rảnh dùng để gì?**
A: Giúp nhân viên và học viên biết thời gian bạn có thể dạy.

**Q: Nếu lớp bị từ chối, học viên sẽ biết không?**
A: Có, hệ thống sẽ thông báo cho học viên.

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
- 📧 Email: support@tutorcentral.com
- 💬 Hotline: 0900-000-001
- 📱 Chat: Trong ứng dụng

---

**Version:** 1.0.0
**Cập nhật:** 23 tháng 1, 2026
**Status:** ✅ Sẵn sàng sử dụng
