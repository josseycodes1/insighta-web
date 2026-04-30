"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password1: "", password2: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password1 !== form.password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // dj-rest-auth registration endpoint
      const res = await fetch(`${API_BASE}/api/v1/auth/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password1: form.password1,
          password2: form.password2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const messages = Object.values(data).flat().join(" ");
        setError(messages || "Registration failed.");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignup = () => {
    window.location.href = `${API_BASE}/accounts/github/login/?process=login`;
  };

  const fields = [
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "analyst@company.com",
    },
    {
      key: "password1",
      label: "Password",
      type: "password",
      placeholder: "Min. 8 characters",
    },
    {
      key: "password2",
      label: "Confirm Password",
      type: "password",
      placeholder: "Repeat password",
    },
  ];

  return (
    <main
      className="min-h-screen bg-[#080A0F] flex items-center justify-center px-4 py-12"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00CCFF]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#00FF88]/3 rounded-full blur-3xl" />
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

        <div className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">
            Request access
          </h1>
          <p className="text-xs text-white/30 tracking-wide">
            New accounts are assigned Analyst role by default
          </p>
        </div>

        {/* GitHub signup */}
        <button
          onClick={handleGitHubSignup}
          className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 bg-white/3 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/5 transition-all text-xs text-white/60 hover:text-white tracking-widest uppercase mb-6 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Sign up with GitHub
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

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">
                {f.label}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={handleChange(f.key)}
                onFocus={() => setFocused(f.key)}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-white/3 border px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                style={{
                  borderColor:
                    focused === f.key ? "#00FF88" : "rgba(255,255,255,0.08)",
                }}
                placeholder={f.placeholder}
              />
            </div>
          ))}

          {/* Role notice */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#00FF88]/5 border border-[#00FF88]/15">
            <span className="text-[#00FF88] text-xs">ℹ</span>
            <span className="text-[10px] text-[#00FF88]/60">
              Default role:{" "}
              <strong className="text-[#00FF88]/80">Analyst</strong>. Admin
              access requires promotion.
            </span>
          </div>

          {error && (
            <div className="flex items-start gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20">
              <span className="text-red-400 text-xs mt-0.5">⚠</span>
              <span className="text-red-400 text-xs">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="relative mt-2 py-3 bg-[#00FF88] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00FF88]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
          >
            <span className="relative z-10">
              {loading ? "Creating account..." : "Create Account"}
            </span>
            {!loading && (
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-white/20">
          Already have access?{" "}
          <Link
            href="/login"
            className="text-[#00FF88]/60 hover:text-[#00FF88] transition-colors"
          >
            Sign in
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
