# IAM Web (`iam-web`)

Ứng dụng Web Độc lập (Standalone Next.js Web Application) cho Cổng Định danh Tập trung (Identity & Access Management) & Môi trường Giả lập Hệ điều hành Desktop (Desktop OS Sandbox).

---

## 1. Công nghệ sử dụng
- **Framework**: Next.js 16.4.2 (App Router, Turbopack, React 19).
- **Cấu trúc**: Standalone Web App (Toàn bộ source code nằm trực tiếp tại `src/` và static assets tại `public/`).
- **Backend & Database**: Supabase SSR (`@supabase/ssr`, `@supabase/supabase-js`), REST Actions.
- **Tiêu chuẩn Auth**: OAuth 2.0 PKCE (RFC 7636), OpenID Connect (OIDC), JWT (`jose`, `jsonwebtoken`).
- **Giao diện & Hiệu ứng**: `framer-motion` v14, Web Audio API Sound Synth, Shadcn UI (`src/components/ui/`).
- **Styling**: Tailwind CSS v4 (`src/app/globals.css`).
- **Package Manager**: Bun 1.4+.

---

## 2. Cấu trúc thư mục (Standalone Structure)

```text
iam-web/
├── public/                 # Static assets, icons, fonts, favicon
├── src/
│   ├── app/                # Next.js App Router (Pages, Layout, Routes, APIs)
│   ├── components/         # Giao diện modular
│   │   ├── desktop/        # Desktop OS Sandbox (Canvas, Modals, Dock, Icons)
│   │   ├── developers/     # Developer Hub & OAuth Interactive Specs
│   │   ├── landing/        # Landing Page Sections
│   │   ├── oauth/          # OAuth Consent & Screens
│   │   └── ui/             # Core Shadcn UI Components (button, card, badge, logo...)
│   ├── lib/                # Utilities, Supabase Clients, OAuth Helpers
│   ├── stores/             # Zustand State Stores
│   └── proxy.ts            # Next.js 16 Edge Proxy (Middleware)
├── components.json         # Shadcn configuration
├── next.config.mjs         # Standalone Next.js config
├── package.json            # Scripts & dependencies
├── postcss.config.mjs      # Tailwind CSS v4 PostCSS plugin
├── tsconfig.json           # Path alias (@/* -> ./src/*)
└── README.md
```

---

## 3. Các trang & Chức năng chính
- **`/` (Môi trường Desktop OS Ảo)**:
  - Giao diện mô phỏng macOS/Windows với hệ thống lưới 2D (`CELL_W=96, CELL_H=104`).
  - Kéo thả tự do bất kỳ icon nào (Máy tính, Thùng rác, App hệ thống, App người dùng, Tệp tin, Thư mục).
  - Thanh Dock với hiệu ứng phóng to lò xo (`DockMagnify`), hỗ trợ ghim/bỏ ghim app.
  - Cửa sổ ứng dụng:
    - `FileEditorModal`: Trình soạn thảo ghi chú Notepad (hỗ trợ phím tắt Ctrl+S, tải file .txt).
    - `TrashWindow`: Thùng rác với tính năng khôi phục vị trí cũ hoặc dọn sạch.
    - `FolderWindow`: Cửa sổ duyệt thư mục kèm kéo thả icon ra vào.
    - `MyPcModal`: Thông tin phần cứng vui nhộn & châm ngôn dev ngẫu nhiên.
    - `WallpaperModal`: Đổi hình nền Desktop (Aurora, Sequoia, Ocean, Minimal).
    - `AddAppModal`: Thêm lối tắt ứng dụng web lưu vào Supabase.
  - Menu chuột phải (Context Menu) tương ứng theo từng đối tượng.
  - Âm thanh hiệu ứng tổng hợp bằng Web Audio API (Click, Pop, Trash, Restore) không phụ thuộc file mp3 ngoài.
- **`/developers` (Developer Hub & Playground)**:
  - Sơ đồ tương tác luồng OAuth 2.0 PKCE S256.
  - Đặc tả các endpoint Authorize, Token, Userinfo, Discovery.
  - AI Prompts Tab (Cursor Composer & Claude Code).
- **OAuth Endpoints**:
  - `/oauth/authorize`: Tiếp nhận yêu cầu đăng nhập và tạo mã code.
  - `/oauth/token`: Xác thực PKCE S256 verifier và cấp phát JWT.
  - `/oauth/userinfo`: Trả về claims của người dùng.
  - `/.well-known/openid-configuration`: OIDC Discovery metadata.

---

## 4. Phát triển & Triển khai

```bash
# Cài đặt dependencies
bun install

# Khởi chạy dev server
bun run dev

# Kiểm tra TypeScript
bun run typecheck

# Build production
bun run build
```
