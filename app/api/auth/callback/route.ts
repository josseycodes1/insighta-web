import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL(`/login?error=${error || "Authentication failed"}`, request.url),
    );
  }

  try {
    // Exchange code for token with your deployed backend
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/v1/auth/github/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Authentication failed");
    }

    const { access, refresh, user } = data;

    const redirectResponse = NextResponse.redirect(
      new URL("/dashboard", request.url),
    );

    // Set HTTP-only cookies
    redirectResponse.cookies.set("access_token", access, {
      httpOnly: true,
      secure: true, // Set to true for HTTPS (deployed)
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    redirectResponse.cookies.set("refresh_token", refresh, {
      httpOnly: true,
      secure: true, // Set to true for HTTPS (deployed)
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Store user role in a non-HttpOnly cookie for client access
    redirectResponse.cookies.set("user_role", user.role, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    return redirectResponse;
  } catch (err) {
    console.error("GitHub login error:", err);
    return NextResponse.redirect(
      new URL("/login?error=Authentication failed", request.url),
    );
  }
}
