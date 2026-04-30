"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch("/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.detail || "Invalid credentials");
        return;
      }

      // Do NOT store tokens or role in localStorage.
      // The backend sets httpOnly cookies.
      // Role is fetched from /api/v1/auth/user/ on the dashboard.
      router.push("/dashboard");
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    // Full page redirect — backend sets cookies and redirects to /auth/callback
    window.location.href = `${API_BASE}/auth/github`;
  };

  return (
    <main
      className="min-h-screen bg-[#080A0F] flex items-center justify-center px-4"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00CCFF]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-5 h-5 border border-[#00FF88] rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#00FF88]" />
          </div>
          <span className="text-xs tracking-[0.3em] text-white/60 uppercase">
            Insighta<span className="text-[#00FF88]">+</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-xs text-white/30 tracking-wide">
            Sign in to access your intelligence dashboard
          </p>
        </div>

        {/* GitHub OAuth button */}
        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 bg-white/3 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/5 transition-all text-xs text-white/60 hover:text-white tracking-widest uppercase mb-6 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
          <span className="text-[#00FF88] group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">
            or
          </span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Email/password form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <label className="block text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              required
              className="w-full bg-white/3 border px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
              style={{
                borderColor:
                  focused === "email" ? "#00FF88" : "rgba(255,255,255,0.08)",
              }}
              placeholder="analyst@company.com"
            />
          </div>

          <div className="relative">
            <label className="block text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              required
              className="w-full bg-white/3 border px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
              style={{
                borderColor:
                  focused === "password" ? "#00FF88" : "rgba(255,255,255,0.08)",
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20">
              <span className="text-red-400 text-xs">⚠</span>
              <span className="text-red-400 text-xs">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="relative mt-2 py-3 bg-[#00FF88] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00FF88]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
          >
            <span className="relative z-10">
              {loading ? "Authenticating..." : "Sign In"}
            </span>
            {!loading && (
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-[10px] text-white/20">
          No account?{" "}
          <Link
            href="/signup"
            className="text-[#00FF88]/60 hover:text-[#00FF88] transition-colors"
          >
            Request access
          </Link>
        </p>
        <p className="mt-2 text-center text-[10px] text-white/20">
          <Link href="/" className="hover:text-white/40 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
      `}</style>
    </main>
  );
}
