# Thông tin Quản lý Dự án Landing Page (chaobs.com)

File này lưu trữ toàn bộ thông tin quan trọng liên quan đến việc triển khai và quản lý tên miền cho trang Landing Page của dự án Hello Doctor.

## 1. Domain & DNS (Tên miền chính)
- **Tên miền:** `chaobs.com`
- **Quản lý tại:** Trang quản trị DNS của nhà cung cấp tên miền.
- **Cấu hình trỏ về Vercel:**
  - `A Record`: Host `@` ➔ Value `76.76.21.21` (hoặc IP đặc biệt mà Vercel cung cấp: `216.198.79.1`)
  - `CNAME`: Host `www` ➔ Value `cname.vercel-dns.com`

## 2. Mã nguồn (GitHub)
- **Repository URL:** [https://github.com/hungnguyen-arch/chaobs-landing](https://github.com/hungnguyen-arch/chaobs-landing)
- **Nhánh chính (Branch):** `main`
- **Quy trình cập nhật:** 
  - Toàn bộ mã nguồn HTML/CSS (Vanilla) được lưu tại đây.
  - Mỗi khi có thay đổi được push lên nhánh `main`, hệ thống sẽ tự động cập nhật lên website trực tiếp (CI/CD Auto-deploy).

## 3. Hosting (Vercel)
- **Vercel Dashboard:** Đăng nhập tại [https://vercel.com/](https://vercel.com/) (Sử dụng tài khoản GitHub).
- **Project Name:** `chaobs-landing`
- **Framework Preset:** `Other` (Website tĩnh HTML/CSS thuần).
- **Thư mục gốc:** `./`

## 4. Email Doanh Nghiệp (Liên hệ)
- **Địa chỉ Email:** `founder@chaobs.com`
- **Mục đích:** Dùng làm kênh liên lạc chính thức, đặt ở chân trang (Footer), và là email định danh bắt buộc để gửi hồ sơ xét duyệt lên **Microsoft for Startups (Azure)** và **AWS Activate**.

## 5. Thông tin Pháp nhân (Startup Verification)
- **Tên công ty:** SKTT COMPANY LIMITED (Pháp nhân vận hành nền tảng Hello Doctor)
- **Mã số doanh nghiệp (Tax ID):** 0318378996
- **Địa chỉ trụ sở:** 152/6 Thanh Thai Street, Ward 12, District 10, Ho Chi Minh City, 700000, Vietnam
- **Điện thoại:** +84 19001246
- **Ngày thành lập:** 03/2024
- **Ghi chú:** Thông tin này phải luôn được hiển thị ở Footer của website để đội ngũ kiểm duyệt của Microsoft/Amazon có thể đối chiếu chéo (Cross-check) với giấy phép đăng ký kinh doanh.
