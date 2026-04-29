// Get access token from cookie
export const getAccessToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/access_token=([^;]+)/);
  return match ? match[1] : null;
};

// Get refresh token from cookie
export const getRefreshToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/refresh_token=([^;]+)/);
  return match ? match[1] : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("access_token="));
};

// Get user role from cookie
export const getUserRole = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/user_role=([^;]+)/);
  return match ? match[1] : null;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  return getUserRole() === "admin";
};

// Clear all auth tokens from cookies
export const clearAuthTokens = (): void => {
  if (typeof document === "undefined") return;

  const cookies = ["access_token", "refresh_token", "user_role"];
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

// Set auth tokens in cookies
export const setAuthTokens = (
  access: string,
  refresh: string,
  role: string,
): void => {
  if (typeof document === "undefined") return;

  document.cookie = `access_token=${access}; path=/; max-age=${15 * 60}; samesite=lax`;
  document.cookie = `refresh_token=${refresh}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`;
  document.cookie = `user_role=${role}; path=/; max-age=${15 * 60}; samesite=lax`;
};
