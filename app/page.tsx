"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      gridRef.current.style.setProperty("--mx", `${x}%`);
      gridRef.current.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#080A0F] text-white overflow-hidden font-mono">
      {/* Animated grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(0,255,136,0.06)_0%,transparent_70%)]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-[#00FF88] rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#00FF88]" />
          </div>
          <span className="text-sm tracking-[0.3em] text-white/80 uppercase">
            Insighta Labs<span className="text-[#00FF88]">+</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/40 tracking-widest uppercase">
          <span className="hover:text-white/70 cursor-pointer transition-colors">
            Docs
          </span>
          <Link href="/login">
            <button className="px-4 py-2 border border-white/10 hover:border-[#00FF88]/50 hover:text-[#00FF88] transition-all text-white/60">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-8 text-center">
        {/* Status tag */}
        <div className="mb-8 flex items-center gap-2 px-3 py-1.5 border border-[#00FF88]/20 bg-[#00FF88]/5">
          <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.4em] text-[#00FF88] uppercase">
            System Online — v1.0
          </span>
        </div>

        <h1
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="text-white">Profile</span>
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #00FF88 0%, #00CCFF 50%, #00FF88 100%)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            Intelligence
          </span>
          <br />
          <span className="text-white/20">Engine</span>
        </h1>

        <p className="max-w-xl text-sm text-white/40 leading-relaxed tracking-wide mb-12">
          Unified identity resolution platform. Ingest names, resolve
          demographics across external sources, query in natural language.
          Role-gated. Audit-logged. Built for analysts.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/signup">
            <button className="group relative px-8 py-3 bg-[#00FF88] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00FF88]/90 transition-all overflow-hidden">
              <span className="relative z-10">Get Access</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </button>
          </Link>
          <Link href="/login">
            <button className="px-8 py-3 border border-white/10 text-white/50 text-xs tracking-[0.2em] uppercase hover:border-white/30 hover:text-white/80 transition-all">
              Sign In →
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-20 flex items-center gap-12 text-center">
          {[
            { value: "JWT", label: "Auth" },
            { value: "2", label: "Role Tiers" },
            { value: "NLP", label: "Search" },
            { value: "CSV", label: "Export" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-2xl font-black text-[#00FF88]">
                {s.value}
              </span>
              <span className="text-[10px] text-white/30 tracking-widest uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative z-10 px-8 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {[
            {
              icon: "◈",
              title: "GitHub OAuth",
              desc: "PKCE-secured social login. Roles assigned on first auth. Tokens scoped per session.",
            },
            {
              icon: "⬡",
              title: "Natural Language Search",
              desc: 'Query profiles with plain English. "Young males from Lagos" resolves to filtered results.',
            },
            {
              icon: "◻",
              title: "Role Enforcement",
              desc: "Admin and Analyst tiers. Every endpoint gated. Delete requires Admin. Export requires Admin.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-[#0D1117] p-8 hover:bg-[#111820] transition-colors group"
            >
              <div className="text-2xl text-[#00FF88] mb-4 group-hover:scale-110 transition-transform inline-block">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-3">
                {f.title}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-8 py-6 flex items-center justify-between">
        <span className="text-[10px] text-white/20 tracking-widest uppercase">
          Insighta Labs+ © 2026
        </span>
        <span className="text-[10px] text-white/20">
          Profile Intelligence System — Stage 3
        </span>
      </footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </main>
  );
}
