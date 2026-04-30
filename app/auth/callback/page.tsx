"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function CallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    // Tokens are delivered as httpOnly cookies by the backend redirect.
    // Do NOT read query params or write to localStorage — cookies are
    // automatically sent on every subsequent request when credentials: "include"
    // is used. Just proceed to the dashboard.
    router.replace("/dashboard");
  }, [router]);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080A0F; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
      <main
        style={{
          minHeight: "100vh",
          background: "#080A0F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 20,
              height: 20,
              border: "2px solid #00FF88",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}
          >
            Insighta<span style={{ color: "#00FF88" }}>+</span>
          </span>
        </div>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          Completing authentication...
        </p>
      </main>
    </>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={<main style={{ minHeight: "100vh", background: "#080A0F" }} />}
    >
      <CallbackHandler />
    </Suspense>
  );
}
