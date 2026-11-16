import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://placeholder-vntez-iam.supabase.co";
const DEFAULT_SUPABASE_KEY = "placeholder-anon-key";

let _supabaseAdmin: SupabaseClient | null = null;
let _cachedUrl = "";

/**
 * Lấy hoặc khởi tạo Supabase Admin Client an toàn.
 * Tự động sử dụng SUPABASE_SERVICE_ROLE_KEY nếu có, hoặc fallback về PUBLISHABLE_KEY.
 * Phòng ngừa crash khi build tĩnh trên Vercel nếu biến môi trường chưa được nạp.
 */
export function getAdminClient(): SupabaseClient {
  const currentUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;

  const currentKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_KEY;

  if (!_supabaseAdmin || _cachedUrl !== currentUrl) {
    _cachedUrl = currentUrl;
    _supabaseAdmin = createSupabaseClient(currentUrl, currentKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _supabaseAdmin;
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getAdminClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

// Legacy support (Deprecated - Use AppRecord instead)
export interface OAuthClientRecord {
  client_id: string;
  client_secret_hash: string | null;
  name: string;
  redirect_uris: string[];
  logo_url?: string | null;
  description?: string | null;
  is_internal?: boolean;
  status?: "active" | "inactive";
  created_at?: string;
}

// New App Record structure (từ bảng apps)
export interface AppRecord {
  id: string; // ví dụ: 'vntez', 'solotype'
  client_id?: string; // alias client_id = id
  app_secret: string | null;
  client_secret_hash?: string | null;
  name: string;
  redirect_uris: string[];
  logo_url?: string | null;
  avatar_url?: string | null;
  description?: string | null;
  status: "active" | "inactive";
  is_internal: boolean;
  roles?: string[];
  permissions?: Record<string, string[]>;
  created_at?: string;
  updated_at?: string;
}

export interface OAuthCodeRecord {
  code: string;
  client_id: string;
  user_id: string;
  code_challenge: string | null;
  code_challenge_method: string | null;
  redirect_uri: string;
  expires_at: string;
  used: boolean;
  created_at?: string;
}

/**
 * Tìm App theo app_id / client_id từ bảng apps
 */
export async function getApp(
  appId: string,
): Promise<(AppRecord & { client_id: string }) | null> {
  const { data: appData, error: appErr } = await supabaseAdmin
    .from("apps")
    .select("*")
    .eq("id", appId)
    .maybeSingle<AppRecord>();

  if (!appErr && appData) {
    return {
      ...appData,
      client_id: appData.id,
      client_secret_hash: appData.app_secret,
    };
  }

  return null;
}

/**
 * Tìm ứng dụng OAuth theo client_id / app_id (Bảo lưu tương thích)
 */
export async function getOAuthClient(
  clientId: string,
): Promise<OAuthClientRecord | null> {
  const result = await getApp(clientId);
  if (result) {
    return {
      client_id: result.id,
      client_secret_hash: result.app_secret || null,
      name: result.name,
      redirect_uris: result.redirect_uris || [],
      logo_url: result.logo_url || result.avatar_url || null,
      description: result.description || null,
      is_internal: result.is_internal,
      status: result.status,
      created_at: result.created_at,
    };
  }
  return null;
}

/**
 * Lấy danh sách các ứng dụng đã đăng ký từ bảng apps
 */
export async function listOAuthClients(): Promise<OAuthClientRecord[]> {
  const { data, error } = await supabaseAdmin
    .from("apps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }
  return (data as any[]).map((app) => ({
    client_id: app.id,
    client_secret_hash: app.app_secret || null,
    name: app.name,
    redirect_uris: app.redirect_uris || [],
    logo_url: app.logo_url || app.avatar_url || null,
    description: app.description || null,
    is_internal: app.is_internal,
    status: app.status,
    created_at: app.created_at,
  }));
}

/**
 * Tạo mới App trong bảng apps (mới)
 */
export async function createApp(app: {
  id: string;
  name: string;
  redirect_uris: string[];
  app_secret?: string | null;
  logo_url?: string | null;
  description?: string | null;
  is_internal?: boolean;
  status?: "active" | "inactive";
  roles?: string[];
  permissions?: Record<string, string[]>;
}): Promise<{ data: AppRecord | null; error: string | null }> {
  const payload: Record<string, any> = {
    id: app.id,
    name: app.name,
    redirect_uris: app.redirect_uris,
    status: app.status || "active",
    is_internal: app.is_internal || false,
    roles: app.roles || ["user"],
    permissions: app.permissions || {},
  };

  if (app.app_secret) {
    payload.app_secret = app.app_secret;
  }
  if (app.logo_url) {
    payload.logo_url = app.logo_url;
  }
  if (app.description) {
    payload.description = app.description;
  }

  const attemptPayload = { ...payload };

  // Tự động retry loại bỏ cột nếu bảng Supabase chưa migrate cột đó
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, error } = await supabaseAdmin
      .from("apps")
      .insert([attemptPayload])
      .select()
      .single();

    if (!error && data) {
      return { data: data as AppRecord, error: null };
    }

    if (error) {
      // Bắt lỗi schema cache của PostgREST
      const match = error.message.match(
        /Could not find the '([^']+)' column of 'apps'/i,
      );
      if (match?.[1] && attemptPayload[match[1]] !== undefined) {
        delete attemptPayload[match[1]];
        continue;
      }
      return { data: null, error: error.message };
    }
  }

  return { data: null, error: "Không thể tạo ứng dụng" };
}

/**
 * Tạo mới ứng dụng OAuth client (DEPRECATED - dùng createApp thay thế)
 */
export async function deleteApp(appId: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("apps").delete().eq("id", appId);

  return !error;
}

/**
 * Tạo mới ứng dụng OAuth client (Chuyển tiếp tới createApp trên bảng apps)
 */
export async function createOAuthClient(client: {
  client_id: string;
  name: string;
  redirect_uris: string[];
  client_secret_hash?: string | null;
  logo_url?: string | null;
  description?: string | null;
  is_internal?: boolean;
}): Promise<{ data: OAuthClientRecord | null; error: string | null }> {
  const res = await createApp({
    id: client.client_id,
    name: client.name,
    redirect_uris: client.redirect_uris,
    app_secret: client.client_secret_hash,
    logo_url: client.logo_url,
    description: client.description,
    is_internal: client.is_internal,
  });

  if (res.data) {
    return {
      data: {
        client_id: res.data.id,
        name: res.data.name,
        redirect_uris: res.data.redirect_uris,
        client_secret_hash: res.data.app_secret,
        logo_url: res.data.logo_url,
        description: res.data.description,
        is_internal: res.data.is_internal,
        status: res.data.status,
        created_at: res.data.created_at,
      },
      error: null,
    };
  }

  return { data: null, error: res.error };
}

/**
 * Xóa ứng dụng OAuth / App theo id
 */
export async function deleteOAuthClient(clientId: string): Promise<boolean> {
  return deleteApp(clientId);
}

/**
 * Lưu Authorization Code tạm thời (hạn 5 phút)
 */
export async function saveOAuthCode(codeData: {
  code: string;
  client_id: string;
  user_id: string;
  code_challenge?: string | null;
  code_challenge_method?: string | null;
  redirect_uri: string;
  expires_at: string;
}): Promise<boolean> {
  const { error } = await supabaseAdmin.from("oauth_codes").insert([
    {
      ...codeData,
      used: false,
    },
  ]);

  if (error) {
    console.error("[saveOAuthCode] Lỗi ghi auth code:", error);
    return false;
  }
  return true;
}

/**
 * Tìm Auth Code hợp lệ (chưa dùng và chưa hết hạn)
 */
export async function getValidOAuthCode(
  code: string,
  clientId: string,
): Promise<OAuthCodeRecord | null> {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("oauth_codes")
    .select("*")
    .eq("code", code)
    .eq("client_id", clientId)
    .eq("used", false)
    .gt("expires_at", now)
    .maybeSingle();

  if (error || !data) {
    return null;
  }
  return data as OAuthCodeRecord;
}

/**
 * Đánh dấu Code đã dùng (chống Replay Attack)
 */
export async function markOAuthCodeUsed(code: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("oauth_codes")
    .update({ used: true })
    .eq("code", code);

  return !error;
}

/**
 * Lấy thông tin User theo ID từ Supabase Auth
 */
export async function getUserById(userId: string) {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (!error && data?.user) {
      return data.user;
    }
  }

  // Fallback nếu không có service_role_key: đọc từ public/users hoặc metadata
  return null;
}
