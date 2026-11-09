import { Sparkles, Code2, Terminal } from "lucide-react";
import { MASTER_PROMPT } from "@/components/developers/developer-hub-data";

export const MASTER_AI_INTEGRATION_PROMPT = MASTER_PROMPT;

export const CODE_EXAMPLES = {
  aiPrompt: {
    label: "AI Prompt",
    icon: Sparkles,
    filename: "prompt-cursor-claude.md",
    code: MASTER_PROMPT,
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

  return \`https://vntez-iam.vercel.app/oauth/authorize?\${params.toString()}\`;
}

// 2. Đổi auth code lấy JWT access token tại route callback
export async function exchangeCodeForToken(code: string, verifier: string, redirectUri: string) {
  const res = await fetch('https://vntez-iam.vercel.app/oauth/token', {
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

  return res.json(); // { access_token, expires_in, scope: "openid profile email roles permissions" }
}

// 3. Truy vấn hồ sơ & ma trận quyền hạn (RBAC) theo app_id
export async function getUserInfo(accessToken: string, appId?: string) {
  const url = appId
    ? \`https://vntez-iam.vercel.app/oauth/userinfo?app_id=\${encodeURIComponent(appId)}\`
    : 'https://vntez-iam.vercel.app/oauth/userinfo';

  const res = await fetch(url, {
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
      ...(appId ? { 'X-App-Id': appId } : {}),
    },
  });

  return res.json(); // { sub, email, email_verified, name, avatar, picture, app_id, role, roles, permissions }
}`,
  },
  curl: {
    label: "cURL (REST API)",
    icon: Terminal,
    filename: "endpoints.sh",
    code: `# 1. Đổi Authorization Code lấy Access Token
curl -X POST "https://vntez-iam.vercel.app/oauth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "authorization_code",
    "client_id": "vntez_c18f43a315d368109d4d8aca",
    "code": "AUTH_CODE_RECEIVED",
    "code_verifier": "ORIGINAL_CODE_VERIFIER",
    "redirect_uri": "https://your-app.com/callback"
  }'

# 2. Truy vấn thông tin người dùng & phân quyền RBAC
curl -X GET "https://vntez-iam.vercel.app/oauth/userinfo" \\
  -H "Authorization: Bearer <access_token>"

# 2b. Truy vấn quyền hạn chuyên biệt cho app vệ tinh
curl -X GET "https://vntez-iam.vercel.app/oauth/userinfo?app_id=solotype" \\
  -H "Authorization: Bearer <access_token>"

# 3. Khám phá cấu hình OpenID Connect
curl -X GET "https://vntez-iam.vercel.app/.well-known/openid-configuration"`,
  },
};
