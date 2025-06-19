
# NanaNail - Full-Stack Nail Salon Website

Chào mừng bạn đến với dự án NanaNail! Đây là một ứng dụng web full-stack hoàn chỉnh bao gồm một backend API mạnh mẽ được xây dựng bằng Express.js và một frontend hiện đại, tương tác được xây dựng bằng Vite + React.

**Cập nhật quan trọng:** Hệ thống quản lý hình ảnh đã được nâng cấp để sử dụng định dạng Base64 thay vì URL, cho phép admin tải ảnh trực tiếp lên từ máy tính.

## 1. Cấu trúc thư mục

Dự án được chia thành hai thư mục chính: `backend` và `frontend`.

```
nananail_project/
├── backend/
│   ├── controllers/      # Logic xử lý request
│   ├── routes/           # Định tuyến API
│   ├── database.js       # Khởi tạo và seeding DB
│   ├── index.js          # Entry point của server
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.cjs
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

- **backend/**: Chứa toàn bộ mã nguồn của Express server, chịu trách nhiệm xử lý logic nghiệp vụ, tương tác với cơ sở dữ liệu và cung cấp các API endpoints.
- **frontend/**: Chứa toàn bộ mã nguồn của ứng dụng React, chịu trách nhiệm cho giao diện người dùng và trải nghiệm khách hàng.

## 2. Cài đặt

Bạn cần cài đặt Node.js (phiên bản 16.x trở lên) và npm trên máy của mình.

### Backend

1.  Mở terminal và di chuyển vào thư mục `backend`:
    ```bash
    cd backend
    ```

2.  Cài đặt các dependencies cần thiết:
    ```bash
    npm install
    ```

### Frontend

1.  Mở một terminal **khác** và di chuyển vào thư mục `frontend`:
    ```bash
    cd frontend
    ```

2.  Cài đặt các dependencies cần thiết:
    ```bash
    npm install
    ```

## 3. Khởi tạo Cơ sở dữ liệu (SQLite)

Hệ thống được thiết kế để tự động hóa việc tạo cơ sở dữ liệu.

-   Khi bạn chạy backend server lần đầu tiên, file `database.js` sẽ tự động kiểm tra sự tồn tại của file `nananail.db`.
-   Nếu file **không** tồn tại, hệ thống sẽ:
    1.  Tạo file `nananail.db` mới.
    2.  Tạo tất cả các bảng cần thiết (users, services, reviews, v.v.).
    3.  Tự động "seed" (chèn) dữ liệu mẫu ban đầu, bao gồm tài khoản admin, các dịch vụ mặc định, và một vài đánh giá mẫu.

Bạn không cần phải thực hiện bất kỳ thao tác thủ công nào để tạo hay nhập dữ liệu ban đầu. Hình ảnh cho slider và bộ sưu tập có thể được tải lên qua trang quản trị.

**Tài khoản Admin mặc định:**
-   **Username:** `nananail`
-   **Password:** `tranconghuy@32`

## 4. Chạy Dự án

Để dự án hoạt động đầy đủ, bạn cần chạy cả server backend và client frontend cùng một lúc trên hai cửa sổ terminal riêng biệt.

### Chạy Backend Server

1.  Đảm bảo bạn đang ở trong thư mục `backend`.
2.  Khởi động server:
    ```bash
    npm start
    ```
    Server sẽ chạy trên `http://localhost:5000`.

### Chạy Frontend Client

1.  Đảm bảo bạn đang ở trong thư mục `frontend`.
2.  Khởi động ứng dụng React:
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ mở trong trình duyệt của bạn tại `http://localhost:5173` (hoặc một cổng khác nếu 5173 đang được sử dụng).

Bây giờ bạn có thể truy cập trang web và tương tác với tất cả các chức năng!
