import type { AppNode } from "./types";
import type { SystemApp } from "@/lib/app-actions";

export const WELCOME_TXT = `Chào mừng bạn đến với VNTEZ Desktop! 🚀
----------------------------------------
Màn hình làm việc trực quan mô phỏng hệ điều hành với đầy đủ tính năng:

1. 🧭 Lưới căn chỉnh (Grid System):
   - Kéo thả tự do bất kỳ biểu tượng nào vào vị trí ngẫu nhiên trên màn hình
   - Xếp thành cột dọc (hàng dọc) hoặc hàng ngang tùy ý
   - Bật / tắt lưới căn chỉnh từ Menubar hoặc menu chuột phải

2. 🚀 OAuth 2.0 Identity Provider & Developer Hub:
   - Quản lý ứng dụng Client, tạo Client ID & Secret
   - Trình kiểm thử OAuth 2.0 PKCE trực quan tại /developers
   - Tích hợp đăng nhập một lần (SSO) an toàn cho toàn bộ hệ sinh thái

3. 🗑️ Thùng rác thông minh:
   - Kéo thả bất kỳ Ứng dụng, Tệp tin hoặc Thư mục vào Thùng rác để xóa
   - Hiển thị badge số lượng mục trong thùng rác
   - Chuột phải vào Thùng rác để Khôi phục mục vừa xóa hoặc Dọn sạch

4. 🖱️ Menu chuột phải:
   - Tạo tệp ghi chú mới (.txt)
   - Tạo thư mục mới
   - Sắp xếp nhanh thành 1 cột dọc hoặc 1 hàng ngang

5. 📄 Trình soạn thảo văn bản:
   - Nhấp đúp vào tệp tin để đọc & chỉnh sửa trực tiếp
   - Lưu trữ và tải tệp về máy tính (.txt)

6. 🌓 Giao diện thích ứng (Light & Dark Mode):
   - Trải nghiệm giao diện Sáng tinh tế và Tối huyền ảo đồng bộ với hệ thống.

Chúc bạn có một ngày làm việc hiệu quả!`;

export const FALLBACK_SYSTEM_APPS: SystemApp[] = [
  {
    id: "sys-dev-hub",
    name: "Developer Hub",
    url: "/developers",
    icon_url: null,
    is_pinned: true,
    dock_order: 0,
    grid_col: 0,
    grid_row: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "sys-oauth-tester",
    name: "OAuth Tester",
    url: "/developers",
    icon_url: null,
    is_pinned: true,
    dock_order: 1,
    grid_col: null,
    grid_row: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "sys-pomoduo",
    name: "Pomoduo",
    url: "https://pomoduo.vntez.cloud",
    icon_url: null,
    is_pinned: true,
    dock_order: 2,
    grid_col: null,
    grid_row: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "sys-bonsai",
    name: "Bonsai Reader",
    url: "https://bonsai-reader.vntez.cloud",
    icon_url: null,
    is_pinned: true,
    dock_order: 3,
    grid_col: null,
    grid_row: null,
    created_at: new Date().toISOString(),
  },
];

export const SYS_MYPC_NODE: AppNode = {
  id: "sys-mypc",
  src: "sys-mypc",
  kind: "app",
  name: "Máy của tôi",
  url: "#",
  icon: "",
  emoji: "🖥️",
  gradient: "from-sky-500 to-blue-600",
  disabled: false,
  isSystem: true,
  isPinned: true,
  dockOrder: 0,
};

export const SYS_TRASH_NODE: AppNode = {
  id: "sys-trash",
  src: "sys-trash",
  kind: "app",
  name: "Thùng rác",
  url: "#",
  icon: "",
  emoji: "🗑️",
  gradient: "from-rose-500 to-pink-600",
  disabled: false,
  isSystem: true,
  isPinned: true,
  dockOrder: 999,
};
