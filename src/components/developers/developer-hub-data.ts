export const CANONICAL_GATEWAY_URL = "https://vntez-iam.vercel.app";

export const MASTER_PROMPT = `Bạn là AI chuyên gia bảo mật và fullstack developer. Hãy tích hợp tính năng đăng nhập Single Sign-On (SSO) bằng VNTEZ IAM qua giao thức chuẩn OAuth 2.0 PKCE (RFC 7636 & RFC 6749) vào dự án này theo quy trình dưới đây:

=== 1. YÊU CẦU BẮT BUỘC TRƯỚC KHI TÍCH HỢP ===
- Client ID (và Client Secret nếu là ứng dụng server bí mật) BẮT BUỘC phải được tạo và quản lý tại VNTEZ Console: https://vntez-console.vercel.app
- Khi tạo Client trên VNTEZ Console, bạn phải đăng ký đúng Redirect URI của ứng dụng (ví dụ: https://your-domain.com/auth/callback hoặc http://localhost:3000/auth/callback khi phát triển local).
- Điền Client ID đã được cấp vào biến môi trường VNTEZ_CLIENT_ID (thay thế placeholder <YOUR_VNTEZ_CLIENT_ID>). KHÔNG ĐƯỢC để lộ Client Secret ở ứng dụng client/frontend.

=== 2. CỔNG XÁC THỰC VNTEZ IAM & CÁC ENDPOINT OAUTH 2.0 ===
Cổng xác thực định danh VNTEZ IAM Gateway:
- Base Gateway URL: ${CANONICAL_GATEWAY_URL}

1. Endpoint Chuyển hướng Xác thực (GET):
   URL: ${CANONICAL_GATEWAY_URL}/oauth/authorize
   Tham số Query:
   * client_id: Client ID được cấp từ VNTEZ Console
   * redirect_uri: URL nhận callback đã đăng ký (phải khớp 100%)
   * response_type: "code"
   * state: Chuỗi ngẫu nhiên cryptographically secure (32 ký tự) chống tấn công CSRF
   * code_challenge: Chuỗi base64url của SHA-256(code_verifier)
   * code_challenge_method: "S256"

2. Endpoint Đổi Token (POST):
   URL: ${CANONICAL_GATEWAY_URL}/oauth/token
   Header: Content-Type: application/json (hoặc application/x-www-form-urlencoded)
   Payload Body:
   {
     "grant_type": "authorization_code",
     "code": "<auth_code_nhan_duoc_tu_redirect>",
     "client_id": "<YOUR_VNTEZ_CLIENT_ID>",
     "code_verifier": "<original_code_verifier>",
     "redirect_uri": "<redirect_uri_da_dang_ky>"
   }
   Response (200 OK):
   {
     "access_token": "eyJhbGciOi...",
     "token_type": "Bearer",
     "expires_in": 3600,
     "scope": "openid profile email roles permissions"
   }

3. Endpoint Lấy Thông Tin Người Dùng & Phân Quyền (GET):
   URL: ${CANONICAL_GATEWAY_URL}/oauth/userinfo
   Header: Authorization: Bearer <access_token>
   Optional Header: X-App-Id: <app_id> (hoặc query ?app_id=<app_id>)
   Response (200 OK):
   {
     "sub": "usr_94e21a8c-7f5b-42b1",
     "email": "developer@vntez.com",
     "email_verified": true,
     "name": "Hoàng Nam",
     "avatar": "https://avatars.githubusercontent.com/u/102873",
     "picture": "https://avatars.githubusercontent.com/u/102873",
     "app_id": null, // null nếu là Root Console, hoặc ID app vệ tinh (ví dụ: "solotype")
     "role": "admin", // Vai trò chính trong app này
     "roles": ["admin"], // Danh sách vai trò trong app này
     "permissions": ["*:*"] // Quyền hạn tương ứng trong app này
   }

4. Endpoint Đăng Xuất Tập Trung Single Sign-Out (GET hoặc POST):
   URL: ${CANONICAL_GATEWAY_URL}/auth/logout (hoặc /oauth/logout)
   Tham số Query hoặc Body JSON:
   * redirect_url (hoặc post_logout_redirect_uri): URL chuyển hướng sau khi đăng xuất
   * LƯU Ý BẢO MẬT: Ứng dụng vệ tinh TUYỆT ĐỐI KHÔNG kết nối trực tiếp vào Supabase để gọi supabase.auth.signOut(). Chỉ cần điều hướng người dùng hoặc gọi API tới ${CANONICAL_GATEWAY_URL}/auth/logout?redirect_url=<YOUR_APP_LOGIN_URL> để xóa phiên làm việc đồng bộ trên toàn bộ hệ thống SSO.

5. OpenID Connect Discovery:
   URL: ${CANONICAL_GATEWAY_URL}/.well-known/openid-configuration

=== 3. QUY TRÌNH 5 BƯỚC CẦN THỰC HIỆN ===
Bước 1: Viết hàm sinh 'code_verifier' ngẫu nhiên (43-128 ký tự base64url) và băm SHA-256 để sinh 'code_challenge'. Sinh thêm 'state' ngẫu nhiên (32 ký tự).
Bước 2: Khi người dùng bấm "Đăng nhập bằng VNTEZ IAM":
   - Lưu 'state' và 'code_verifier' vào HTTP-only cookie (hoặc session bảo mật).
   - Chuyển hướng trình duyệt tới URL xác thực của VNTEZ IAM:
     ${CANONICAL_GATEWAY_URL}/oauth/authorize?client_id=<YOUR_VNTEZ_CLIENT_ID>&redirect_uri=<REDIRECT_URI>&response_type=code&state=<STATE>&code_challenge=<CODE_CHALLENGE>&code_challenge_method=S256
Bước 3: Tạo route callback nhận 'code' và 'state' từ URL query:
   - So khớp 'state' với state đã lưu trong cookie (nếu không khớp -> từ chối request để chống CSRF).
   - Đọc 'code_verifier' đã lưu.
   - Gửi POST request tới ${CANONICAL_GATEWAY_URL}/oauth/token để nhận 'access_token'.
Bước 4: Gửi GET request tới ${CANONICAL_GATEWAY_URL}/oauth/userinfo với header Authorization: Bearer <access_token> (kèm query ?app_id=<app_id> hoặc header X-App-Id nếu cần phân quyền riêng cho app vệ tinh) để lấy hồ sơ { sub, email, name, avatar, app_id, role, roles, permissions }, sau đó khởi tạo session và phân quyền tính năng cho ứng dụng.
Bước 5: Xử lý Đăng xuất (Single Sign-Out):
   - Xóa session/cookie lưu access token ở app vệ tinh.
   - Chuyển hướng người dùng tới: ${CANONICAL_GATEWAY_URL}/auth/logout?redirect_url=<APP_LOGIN_OR_HOME_URL> (hoặc gọi POST) để huỷ sạch phiên SSO ở IAM.

=== 4. SDK TÍCH HỢP NHANH CHO FRONTEND/CLIENT ===
**Cách cài đặt SDK:**
\`\`\`bash
npm install github:vntez-labs/vntez-sdk-ts
\`\`\`

**Cấu hình môi trường (.env.local):**
\`\`\`
NEXT_PUBLIC_VNTEZ_CLIENT_ID=<app_id> (ví dụ: 'solotype')
NEXT_PUBLIC_VNTEZ_REDIRECT_URI=http://localhost:3000/auth/callback
\`\`\`

**Khởi tạo và sử dụng Auth:**
\`\`\`typescript
import { VntezClient } from '@vntez/sdk';

export const vntez = new VntezClient({
  appId: process.env.NEXT_PUBLIC_VNTEZ_CLIENT_ID!,
});

// 1. Đăng nhập
await vntez.auth.signIn();

// 2. Callback (/auth/callback)
const { user, accessToken } = await vntez.auth.handleCallback();

// 3. Đăng xuất
vntez.auth.signOut();
\`\`\`

**Upload File (R2 Storage):**
\`\`\`typescript
// Upload nhanh file nhỏ (< 5MB)
const res = await vntez.upload.single(file);

// Upload file lớn đa phần (Uppy adapter)
const companion = vntez.upload.getUppyCompanion();
\`\`\`

**Remote Config:**
\`\`\`typescript
const { enabled, config } = await vntez.config.get();
\`\`\``;
