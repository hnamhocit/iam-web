import { Sparkles, Code2, Terminal } from "lucide-react";

export const MASTER_AI_INTEGRATION_PROMPT = `Bạn là AI chuyên gia bảo mật và fullstack developer. Hãy tích hợp tính năng đăng nhập Single Sign-On (SSO) bằng VNTEZ ID qua giao thức chuẩn OAuth 2.0 PKCE (RFC 7636 & RFC 6749) vào dự án này theo quy trình dưới đây:

=== 1. YÊU CẦU BẮT BUỘC TRƯỚC KHI TÍCH HỢP ===
- Client ID (và Client Secret nếu là ứng dụng server bí mật) BẮT BUỘC phải được tạo và quản lý tại VNTEZ Console: https://vntez-console.vercel.app
- Khi tạo Client trên VNTEZ Console, bạn phải đăng ký đúng Redirect URI của ứng dụng (ví dụ: https://your-domain.com/auth/callback hoặc http://localhost:3000/auth/callback khi phát triển local).
- Điền Client ID đã được cấp vào biến môi trường VNTEZ_CLIENT_ID. KHÔNG ĐƯỢC để lộ Client Secret ở frontend/client.

=== 2. CỔNG XÁC THỰC VNTEZ ID & CÁC ENDPOINT OAUTH 2.0 ===
Cổng xác thực định danh VNTEZ ID Gateway:
- Gateway Base URL: https://vntez-id.vercel.app

1. Endpoint Chuyển hướng Xác thực (GET):
   URL: https://vntez-id.vercel.app/oauth/authorize
   Tham số: client_id, redirect_uri, response_type="code", state, code_challenge (SHA-256 base64url), code_challenge_method="S256"

2. Endpoint Đổi Token (POST):
   URL: https://vntez-id.vercel.app/oauth/token
   Payload: { grant_type: "authorization_code", code, client_id, code_verifier, redirect_uri }
   Response: { access_token, token_type: "Bearer", expires_in: 3600, scope: "openid profile email" }

3. Endpoint Lấy Thông Tin Người Dùng (GET):
   URL: https://vntez-id.vercel.app/oauth/userinfo
   Header: Authorization: Bearer <access_token>
   Response: { sub, email, name, avatar }

4. OpenID Connect Discovery:
   URL: https://vntez-id.vercel.app/.well-known/openid-configuration

=== 3. QUY TRÌNH 4 BƯỚC THỰC HIỆN ===
Bước 1: Sinh 'code_verifier' ngẫu nhiên (43-128 ký tự) và băm SHA-256 để sinh 'code_challenge'. Sinh 'state' ngẫu nhiên (32 ký tự).
Bước 2: Chuyển hướng trình duyệt tới https://vntez-id.vercel.app/oauth/authorize kèm các tham số trên.
Bước 3: Tại callback URL, kiểm tra 'state' khớp với session/cookie, sau đó gửi POST tới https://vntez-id.vercel.app/oauth/token kèm 'code' và 'code_verifier'.
Bước 4: Gửi GET tới https://vntez-id.vercel.app/oauth/userinfo với Bearer token để lấy thông tin hồ sơ và tạo session đăng nhập cho ứng dụng.`;

export const CODE_EXAMPLES = {
  aiPrompt: {
    label: "AI Prompt",
    icon: Sparkles,
    filename: "prompt-cursor-claude.md",
    code: MASTER_AI_INTEGRATION_PROMPT,
  },
  typescript: {
    label: "TypeScript / Next.js",
    icon: Code2,
    filename: "vntez-auth.ts",
    code: `// 1. Tạo URL đăng nhập OAuth 2.0 PKCE
import { generateCodeVerifier, generateCodeChallenge } from './pkce';

export async function getVntezLoginUrl(redirectUri: string) {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = crypto.randomUUID();

  // Lưu verifier & state vào secure HTTP-only cookie
  cookies().set('vntez_verifier', verifier, { httpOnly: true, secure: true });
  cookies().set('vntez_state', state, { httpOnly: true, secure: true });

  const params = new URLSearchParams({
    client_id: process.env.VNTEZ_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
    state: state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  return \`https://vntez-id.vercel.app/oauth/authorize?\${params.toString()}\`;
}

// 2. Đổi auth code lấy JWT access token tại route callback
export async function exchangeCodeForToken(code: string, verifier: string, redirectUri: string) {
  const res = await fetch('https://vntez-id.vercel.app/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.VNTEZ_CLIENT_ID!,
      code,
      code_verifier: verifier,
      redirect_uri: redirectUri,
    }),
  });

  return res.json(); // { access_token, expires_in, scope }
}`,
  },
  curl: {
    label: "cURL (REST API)",
    icon: Terminal,
    filename: "endpoints.sh",
    code: `# 1. Đổi Authorization Code lấy Access Token
curl -X POST https://vntez-id.vercel.app/oauth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "authorization_code",
    "client_id": "vntez_c18f43a315d368109d4d8aca",
    "code": "AUTH_CODE_RECEIVED",
    "code_verifier": "ORIGINAL_CODE_VERIFIER",
    "redirect_uri": "https://your-app.com/callback"
  }'

# 2. Truy vấn thông tin người dùng với Bearer Token
curl -X GET https://vntez-id.vercel.app/oauth/userinfo \\
  -H "Authorization: Bearer <access_token>"

# 3. Khám phá cấu hình OpenID Connect
curl -X GET https://vntez-id.vercel.app/.well-known/openid-configuration`,
  },
};
