"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

function getRole() {
  return typeof window !== "undefined"
    ? localStorage.getItem("role") || "analyst"
    : "analyst";
}

export default function AccountPage() {
  const router = useRouter();
  const role = getRole();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      localStorage.clear();
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-[#080A0F] text-white font-mono px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className="text-xs text-white/40">
            Back to dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white/10 text-xs text-white/50"
          >
            Logout
          </button>
        </div>

        <h1 className="text-3xl font-black mb-2">Account</h1>
        <p className="text-sm text-white/40 mb-8">
          Current access level and session controls.
        </p>

        <section className="border border-white/10 bg-[#0D1117] p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
            Role
          </div>
          <div className="text-2xl font-bold text-[#00FF88] uppercase">
            {role}
          </div>
        </section>
      </div>
    </main>
  );
}
