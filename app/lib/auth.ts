const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

/**
 * Parse a named value from document.cookie.
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const regex = new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`);
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Set a cookie for the authenticated web session.
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    maxAge?: number;
    sameSite?: "Lax" | "Strict" | "None";
    secure?: boolean;
  } = {},
): void {
  if (typeof document === "undefined") return;

  const opts = {
    path: "/",
    sameSite: "Lax",
    secure: window.location.protocol === "https:",
    ...options,
  };

  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
  if (opts.maxAge != null) parts.push(`Max-Age=${Math.floor(opts.maxAge)}`);
  parts.push(`Path=${opts.path}`);
  parts.push(`SameSite=${opts.sameSite}`);
  if (opts.secure) parts.push("Secure");

  document.cookie = parts.join("; ");
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie =
    `${encodeURIComponent(name)}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax` +
    (window.location.protocol === "https:" ? "; Secure" : "");
}

/**
 * Wrapper around fetch that:
 * - Always sends credentials (httpOnly cookies) — no Authorization header
 * - Prepends API_BASE if a relative path is given
 * - Accepts the same signature as native fetch
 *
 * For web: the browser automatically attaches the access_token httpOnly cookie.
 * For CLI: tokens are stored in ~/.insighta/credentials.json and attached
 *          manually in the CLI codebase — this helper is web-only.
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

/**
 * Returns the user's role for UI display only.
 */
export function getRole(): string {
  if (typeof window === "undefined") return "analyst";
  return getCookie("role") || "analyst";
}

export function setRoleCookie(role: string): void {
  setCookie("role", role, { maxAge: 60 * 60 * 24 * 7 });
}

export function clearRoleCookie(): void {
  deleteCookie("role");
}
