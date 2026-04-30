const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

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

  // Strip any Authorization header that may have been passed — we use cookies.
  const { headers: rawHeaders, ...rest } = init;
  const headers = new Headers(rawHeaders as HeadersInit);
  headers.delete("Authorization");

  return fetch(url, {
    ...rest,
    headers,
    credentials: "include", // sends httpOnly cookies on every request
  });
}

/**
 * Returns the user's role for UI display only (e.g. showing/hiding admin buttons).
 * This is NOT used for access control — that is enforced server-side.
 * Falls back to "analyst" if nothing is stored.
 */
export function getRole(): string {
  if (typeof window === "undefined") return "analyst";
  return localStorage.getItem("role") || "analyst";
}
