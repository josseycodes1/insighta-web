const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

/**
 * Wrapper around fetch that:
 * - Always sends credentials (httpOnly cookies) — no Authorization header
 * - Prepends API_BASE if a relative path is given
 */
export async function apiFetch(
  input: string,
  init: RequestInit = {},
): Promise<Response> {
  const url = input.startsWith("http") ? input : `${API_BASE}${input}`;

  const { headers: rawHeaders, ...rest } = init;
  const headers = new Headers(rawHeaders as HeadersInit);
  headers.delete("Authorization");

  return fetch(url, {
    ...rest,
    headers,
    credentials: "include",
  });
}

export interface CurrentUser {
  id: string;
  github_id?: string;
  username: string;
  email: string;
  avatar_url?: string;
  role: string;
  is_active: boolean;
  last_login_at?: string;
  created_at?: string;
}

/**
 * Fetches the current authenticated user from the backend.
 * Role is read from the JWT on the server — never from localStorage
 * or a JS-readable cookie.
 * Returns null if unauthenticated (401) or on network error.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const res = await apiFetch("/api/users/me", {
      headers: { "X-API-Version": "1" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    // handle both {data: {...}} and flat response shapes
    return (json.data ?? json) as CurrentUser;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch {}
}
