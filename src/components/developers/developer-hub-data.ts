export const CANONICAL_GATEWAY_URL = "https://vntez-id.vercel.app";

export const MASTER_PROMPT = `Bạn là AI chuyên gia bảo mật và fullstack developer. Hãy tích hợp tính năng đăng nhập Single Sign-On (SSO) bằng VNTEZ ID qua giao thức chuẩn OAuth 2.0 PKCE (RFC 7636 & RFC 6749) vào dự án này theo quy trình dưới đây:

=== 1. YÊU CẦU BẮT BUỘC TRƯỚC KHI TÍCH HỢP ===
- Client ID (và Client Secret nếu là ứng dụng server bí mật) BẮT BUỘC phải được tạo và quản lý tại VNTEZ Console: https://vntez-console.vercel.app
- Khi tạo Client trên VNTEZ Console, bạn phải đăng ký đúng Redirect URI của ứng dụng (ví dụ: https://your-domain.com/auth/callback hoặc http://localhost:3000/auth/callback khi phát triển local).
- Điền Client ID đã được cấp vào biến môi trường VNTEZ_CLIENT_ID (thay thế placeholder <YOUR_VNTEZ_CLIENT_ID>). KHÔNG ĐƯỢC để lộ Client Secret ở ứng dụng client/frontend.

=== 2. CỔNG XÁC THỰC VNTEZ ID & CÁC ENDPOINT OAUTH 2.0 ===
Cổng xác thực định danh VNTEZ ID Gateway:
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
     "scope": "openid profile email"
   }

3. Endpoint Lấy Thông Tin Người Dùng (GET):
   URL: ${CANONICAL_GATEWAY_URL}/oauth/userinfo
   Header: Authorization: Bearer <access_token>
   Response (200 OK):
   {
     "sub": "user-uuid",
     "email": "user@example.com",
     "name": "Nguyễn Văn A",
     "avatar": "https://..."
   }

4. OpenID Connect Discovery:
   URL: ${CANONICAL_GATEWAY_URL}/.well-known/openid-configuration

=== 3. QUY TRÌNH 4 BƯỚC CẦN THỰC HIỆN ===
Bước 1: Viết hàm sinh 'code_verifier' ngẫu nhiên (43-128 ký tự base64url) và băm SHA-256 để sinh 'code_challenge'. Sinh thêm 'state' ngẫu nhiên (32 ký tự).
Bước 2: Khi người dùng bấm "Đăng nhập bằng VNTEZ ID":
   - Lưu 'state' và 'code_verifier' vào HTTP-only cookie (hoặc session bảo mật).
   - Chuyển hướng trình duyệt tới URL xác thực của VNTEZ ID:
     ${CANONICAL_GATEWAY_URL}/oauth/authorize?client_id=<YOUR_VNTEZ_CLIENT_ID>&redirect_uri=<REDIRECT_URI>&response_type=code&state=<STATE>&code_challenge=<CODE_CHALLENGE>&code_challenge_method=S256
Bước 3: Tạo route callback nhận 'code' và 'state' từ URL query:
   - So khớp 'state' với state đã lưu trong cookie (nếu không khớp -> từ chối request để chống CSRF).
   - Đọc 'code_verifier' đã lưu.
   - Gửi POST request tới ${CANONICAL_GATEWAY_URL}/oauth/token để nhận 'access_token'.
Bước 4: Gửi GET request tới ${CANONICAL_GATEWAY_URL}/oauth/userinfo với header Authorization: Bearer <access_token> để lấy hồ sơ { sub, email, name, avatar }, sau đó khởi tạo session đăng nhập cho ứng dụng của bạn.`;
