
  # 🎓 Hệ Thống Ghép Đôi Gia Sư

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Nền tảng web toàn diện kết nối gia sư chuyên nghiệp với học viên đang tìm kiếm giáo dục cá nhân hóa. Được xây dựng với công nghệ React hiện đại để mang lại trải nghiệm người dùng liền mạch trên mọi thiết bị.

## 🌟 Tổng Quan

Hệ Thống Ghép Đôi Gia Sư là nền tảng giáo dục đầy đủ tính năng kết nối giữa gia sư chuyên gia và học viên nhiệt huyết. Nền tảng của chúng tôi cung cấp:

- **Ghép Đôi Thông Minh**: Ghép đôi gia sư-học viên dựa trên AI theo môn học, địa điểm và mục tiêu học tập
- **Quản Lý Đa Vai Trò**: Bảng điều khiển riêng biệt cho quản trị viên, nhân viên, gia sư và học viên
- **Giao Tiếp Thời Gian Thực**: Hệ thống nhắn tin tích hợp để phối hợp liền mạch
- **Theo Dõi Tiến Độ**: Quản lý phiên học toàn diện và phân tích hiệu suất
- **Lập Lịch Linh Hoạt**: Hệ thống lịch thông minh để quản lý thời gian tối ưu

## ✨ Tính Năng Chính

### 👨‍🎓 Dành Cho Học Viên
- **Khám Phá Gia Sư**: Tìm kiếm và lọc nâng cao theo môn học, địa điểm, đánh giá và giá cả
- **Quản Lý Lớp Học**: Đặt lịch, dời lịch và theo dõi các phiên học
- **Theo Dõi Tiến Độ**: Xem lịch sử phiên học chi tiết và tiến độ học tập
- **Hệ Thống Đánh Giá**: Đánh giá và nhận xét gia sư để giúp người khác đưa ra quyết định sáng suốt
- **Tích Hợp Thanh Toán**: Xử lý thanh toán an toàn cho các lớp học

### 👨‍🏫 Dành Cho Gia Sư
- **Quản Lý Hồ Sơ**: Giới thiệu chuyên môn, kinh nghiệm và phong cách giảng dạy
- **Lập Lịch Lớp Học**: Quản lý lịch linh hoạt với giải quyết xung đột tự động
- **Theo Dõi Thu Nhập**: Bảng điều khiển thu nhập thời gian thực với phân tích chi tiết
- **Giao Tiếp Với Học Viên**: Nhắn tin trực tiếp với học viên đã đăng ký
- **Phân Tích Hiệu Suất**: Thông tin chi tiết về hiệu quả giảng dạy và sự hài lòng của học viên

### 👨‍💼 Dành Cho Nhân Viên
- **Quản Lý Học Viên**: Giám sát tài khoản học viên và tiến độ học tập
- **Xác Minh Gia Sư**: Xem xét và phê duyệt đơn đăng ký gia sư
- **Phối Hợp Lớp Học**: Quản lý phân công lớp học và giải quyết xung đột lịch trình
- **Đảm Bảo Chất Lượng**: Giám sát chất lượng giảng dạy và xử lý phản hồi
- **Báo Cáo**: Tạo báo cáo toàn diện về hiệu suất nền tảng

### 👑 Dành Cho Quản Trị Viên
- **Giám Sát Hệ Thống**: Quản lý và cấu hình nền tảng hoàn chỉnh
- **Quản Lý Người Dùng**: Quản trị tất cả tài khoản và quyền người dùng
- **Bảng Điều Khiển Phân Tích**: Số liệu toàn diện và thông tin kinh doanh
- **Quản Lý Nội Dung**: Kiểm soát nội dung nền tảng và tài nguyên giáo dục
- **Giám Sát Tài Chính**: Giám sát doanh thu, thanh toán và sức khỏe tài chính

## 🚀 Bắt Đầu Nhanh

### Yêu Cầu Hệ Thống

- **Node.js** (phiên bản 18.0.0 trở lên)
- **npm** hoặc **yarn** trình quản lý gói
- **Git** để kiểm soát phiên bản

### Cài Đặt

1. **Sao chép kho lưu trữ**
   ```bash
   git clone https://github.com/chung445/tutor.git
   cd tutor-matching-system
   ```

2. **Cài đặt các gói phụ thuộc**
   ```bash
   npm install
   ```

3. **Khởi động máy chủ phát triển**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt**
   ```
   http://localhost:5184
   ```

### Xây Dựng Cho Sản Xuất

```bash
# Tạo bản xây dựng sản xuất được tối ưu hóa
npm run build

# Xem trước bản xây dựng sản xuất cục bộ
npm run preview
```

## 📋 Tài Khoản Demo

| Vai Trò | Email | Mật Khẩu |
|---------|-------|----------|
| **Quản Trị Viên** | admin@tutorcentral.com | admin123 |
| **Nhân Viên** | manager@tutorcentral.com | password123 |
| **Gia Sư** | tutor@tutorcentral.com | password123 |
| **Học Viên** | student1@tutorcentral.com | student123 |

## 🛠️ Ngăn Xếp Công Nghệ

### Khung Frontend
- **React 18** - React hiện đại với các tính năng đồng thời
- **TypeScript** - Phát triển JavaScript an toàn kiểu
- **Vite** - Công cụ xây dựng và máy chủ phát triển nhanh

### UI & Phong Cách
- **Tailwind CSS** - Khung CSS ưu tiên tiện ích
- **Radix UI** - Các thành phần UI không có kiểu dáng, có thể truy cập
- **Lucide React** - Thư viện biểu tượng đẹp
- **Framer Motion** - Hoạt hình và chuyển tiếp mượt mà

### Quản Lý Trạng Thái
- **React Context** - Quản lý trạng thái tích hợp
- **Custom Hooks** - Logic trạng thái có thể tái sử dụng

### Công Cụ Phát Triển
- **ESLint** - Kiểm tra và định dạng mã
- **PostCSS** - Xử lý và tối ưu hóa CSS
- **Autoprefixer** - Thêm tiền tố nhà cung cấp CSS

## 📁 Cấu Trúc Dự Án

```
tutor-matching-system/
├── public/                    # Tài sản tĩnh
├── src/
│   ├── app/
│   │   ├── components/        # Các thành phần UI có thể tái sử dụng
│   │   │   ├── admin-dashboard.tsx
│   │   │   ├── staff-dashboard.tsx
│   │   │   ├── tutor-dashboard.tsx
│   │   │   ├── student-dashboard-new.tsx
│   │   │   ├── login-register.tsx
│   │   │   └── ui/            # Thư viện thành phần UI
│   │   ├── context/           # Nhà cung cấp React Context
│   │   │   ├── AuthContext.tsx
│   │   │   └── AdminContext.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Các hàm tiện ích
│   ├── styles/                # Phong cách và chủ đề toàn cục
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── main.tsx               # Điểm nhập ứng dụng
├── package.json               # Phụ thuộc và tập lệnh
├── vite.config.ts            # Cấu hình Vite
├── tailwind.config.js        # Cấu hình Tailwind CSS
└── README.md                 # Tài liệu dự án
```

## 🎯 Kiến Trúc Cốt Lõi

### Kiến Trúc Thành Phần
- **Tách Biệt Quan Tâm**: Các thành phần UI tập trung hoàn toàn vào trình bày
- **Sự Kết Hợp Trên Kế Thừa**: Thiết kế thành phần linh hoạt, có thể tái sử dụng
- **An Toàn Kiểu**: Phạm vi TypeScript đầy đủ để đảm bảo độ tin cậy

### Quản Lý Trạng Thái
- **Context API**: Quản lý trạng thái tập trung cho xác thực người dùng
- **Trạng Thái Cục Bộ**: Trạng thái cấp thành phần cho tương tác UI
- **Cập Nhật Tối Ưu**: Phản hồi UI ngay lập tức với xử lý lỗi

### Hệ Thống Thiết Kế
- **Phong Cách Nhất Quán**: Ngôn ngữ thiết kế thống nhất trên tất cả các thành phần
- **Thiết Kế Phản Ứng**: Cách tiếp cận ưu tiên thiết bị di động với quản lý điểm ngắt
- **Khả Năng Truy Cập**: Các thành phần và tương tác tuân thủ WCAG

## 🔧 Cấu Hình

### Biến Môi Trường

Tạo tệp `.env` trong thư mục gốc:

```env
# Phát triển
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Hệ Thống Ghép Đôi Gia Sư

# Sản xuất
VITE_API_BASE_URL=https://api.tutormatch.com/api
```

### Cấu Hình Tailwind

Dự án sử dụng cấu hình Tailwind tùy chỉnh để tạo chủ đề nhất quán:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

## 📊 Tập Lệnh Có Sẵn

| Lệnh | Mô Tả |
|------|--------|
| `npm run dev` | Khởi động máy chủ phát triển |
| `npm run build` | Xây dựng cho sản xuất |
| `npm run preview` | Xem trước bản xây dựng sản xuất |
| `npm run lint` | Chạy ESLint |
| `npm run type-check` | Chạy kiểm tra kiểu TypeScript |

## 🤝 Đóng Góp

Chúng tôi hoan nghênh sự đóng góp! Vui lòng làm theo các bước sau:

1. **Fork kho lưu trữ**
2. **Tạo nhánh tính năng**: `git checkout -b feature/tinh-nang-tuyet-voi`
3. **Cam kết thay đổi của bạn**: `git commit -m 'Thêm tính năng tuyệt vời'`
4. **Đẩy lên nhánh**: `git push origin feature/tinh-nang-tuyet-voi`
5. **Mở Pull Request**

### Nguyên Tắc Phát Triển

- Tuân thủ phong cách mã và mẫu kiến trúc hiện có
- Viết thông điệp cam kết rõ ràng, súc tích
- Thêm kiểm tra cho các tính năng mới
- Cập nhật tài liệu khi cần
- Đảm bảo tất cả kiểm tra vượt qua trước khi gửi PR

## 📝 Giấy Phép

Dự án này được cấp phép theo Giấy phép MIT - xem tệp [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Lời Cảm Ơn

- **Thiết Kế Figma**: Thiết kế gốc được tạo trong Figma
- **Cộng Đồng Mã Nguồn Mở**: Cảm ơn tất cả những người đóng góp và người bảo trì
- **Đối Tác Giáo Dục**: Lời biết ơn đến gia sư và học viên đã cung cấp phản hồi có giá trị

## 📞 Hỗ Trợ

Để được hỗ trợ, gửi email đến support@tutormatch.com hoặc tham gia cộng đồng Discord của chúng tôi.

---

**Được tạo với ❤️ cho giáo dục tốt hơn**
  