"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  apiFetch,
  getCurrentUser,
  logout,
  type CurrentUser,
} from "../lib/auth";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

interface Profile {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  age_group?: string;
  country_id?: string;
  created_at?: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const isAdmin = user?.role === "admin";

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  const [createName, setCreateName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState("");

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Profile[] | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const limit = 10;

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUser(u);
      setUserLoading(false);
    });
  }, [router]);

  useEffect(() => {
    if (userLoading) return;

    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (genderFilter) params.set("gender", genderFilter);

        const res = await apiFetch(`/api/profiles/?${params}`, {
          headers: { "X-API-Version": "1" },
        });
        if (cancelled) return;
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setProfiles(data.data ?? []);
        setTotal(data.total ?? 0);
      } catch {
        if (!cancelled)
          setError("Failed to load profiles. Is the backend running?");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [page, genderFilter, refreshTick, router, userLoading]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    setError("");
    try {
      const res = await apiFetch(
        `/api/profiles/search/?q=${encodeURIComponent(query)}`,
        { headers: { "X-API-Version": "1" } },
      );
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      const data = await res.json();
      setSearchResults(data.data ?? []);
    } catch {
      setError("Search failed.");
    } finally {
      setSearching(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    setCreating(true);
    setCreateMsg("");
    try {
      const res = await apiFetch(`/api/profiles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Version": "1",
        },
        body: JSON.stringify({ name: createName.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreateMsg(`✓ "${data.data?.name}" added`);
        setCreateName("");
        setPage(1);
        setRefreshTick((t) => t + 1);
      } else {
        setCreateMsg(data.message || `Error ${res.status}`);
      }
    } catch {
      setCreateMsg("Network error — is the backend running?");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    setDeletingId(id);
    try {
      await apiFetch(`/api/profiles/${id}/`, {
        method: "DELETE",
        headers: { "X-API-Version": "1" },
      });
      setRefreshTick((t) => t + 1);
    } catch {
      setError("Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = async () => {
    if (!isAdmin) return;
    try {
      const res = await apiFetch(`/api/profiles/export/csv/`, {
        headers: { "X-API-Version": "1" },
      });
      if (!res.ok) {
        setError("Export failed.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "profiles.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Export error.");
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    router.push("/login");
  };

  if (userLoading) {
    return (
      <>
        <style>{`
          @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
          * { box-sizing: border-box; }
          body { margin: 0; background: #080A0F; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <main
          style={{
            minHeight: "100vh",
            background: "#080A0F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 16,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              border: "2px solid #00FF88",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Loading session...
          </span>
        </main>
      </>
    );
  }

  const role = user?.role ?? "analyst";
  const displayedProfiles = searchResults ?? profiles;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
        * { box-sizing: border-box; }
        body { margin: 0; background: #080A0F; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <main
        style={{
          minHeight: "100vh",
          background: "#080A0F",
          color: "white",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        {/* Nav */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(8,10,15,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  border: "1px solid #00FF88",
                  transform: "rotate(45deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 6, height: 6, background: "#00FF88" }} />
              </div>
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
              {user?.username && (
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                  }}
                >
                  · @{user.username}
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  padding: "4px 8px",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  border: isAdmin
                    ? "1px solid rgba(0,255,136,0.3)"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: isAdmin
                    ? "rgba(0,255,136,0.1)"
                    : "rgba(255,255,255,0.05)",
                  color: isAdmin ? "#00FF88" : "rgba(255,255,255,0.4)",
                }}
              >
                {role}
              </span>
              {isAdmin && (
                <button
                  onClick={handleExportCSV}
                  style={{
                    padding: "6px 12px",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(0,204,255,0.3)",
                    background: "transparent",
                    color: "rgba(0,204,255,0.6)",
                    cursor: "pointer",
                  }}
                >
                  ↓ CSV
                </button>
              )}
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "rgba(255,255,255,0.05)",
              marginBottom: 32,
            }}
          >
            {[
              { label: "Total Profiles", value: total },
              { label: "Page", value: page },
              { label: "Per Page", value: limit },
              { label: "Role", value: role },
            ].map((s) => (
              <div
                key={s.label}
                style={{ background: "#0D1117", padding: "20px 24px" }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#00FF88",
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {/* Create — admin only */}
            {isAdmin ? (
              <form
                onSubmit={handleCreate}
                style={{
                  padding: 20,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0D1117",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Create Profile
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    placeholder="Enter full name..."
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "10px 12px",
                      fontSize: 13,
                      color: "white",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={creating}
                    style={{
                      padding: "10px 16px",
                      background: "#00FF88",
                      color: "black",
                      fontSize: 12,
                      fontWeight: 700,
                      border: "none",
                      cursor: creating ? "not-allowed" : "pointer",
                      opacity: creating ? 0.5 : 1,
                      fontFamily: "inherit",
                    }}
                  >
                    {creating ? "..." : "+"}
                  </button>
                </div>
                {createMsg && (
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: createMsg.startsWith("✓") ? "#00FF88" : "#f87171",
                    }}
                  >
                    {createMsg}
                  </div>
                )}
              </form>
            ) : (
              <div
                style={{
                  padding: 20,
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "#0D1117",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Create requires admin role
                </span>
              </div>
            )}

            {/* Search */}
            <div
              style={{
                padding: 20,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#0D1117",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Natural Language Search
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder='e.g. "young males from Nigeria"'
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "10px 12px",
                    fontSize: 13,
                    color: "white",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  style={{
                    padding: "10px 16px",
                    background: "transparent",
                    border: "1px solid rgba(0,255,136,0.4)",
                    color: "#00FF88",
                    fontSize: 12,
                    cursor: searching ? "not-allowed" : "pointer",
                    opacity: searching ? 0.5 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {searching ? "..." : "→"}
                </button>
              </div>
              {searchResults !== null && (
                <button
                  onClick={() => {
                    setQuery("");
                    setSearchResults(null);
                  }}
                  style={{
                    marginTop: 8,
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  ✕ Clear ({searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""})
                </button>
              )}
            </div>
          </div>

          {/* Gender Filter */}
          {searchResults === null && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Filter:
              </span>
              {["", "male", "female"].map((g) => (
                <button
                  key={g || "all"}
                  onClick={() => {
                    setGenderFilter(g);
                    setPage(1);
                  }}
                  style={{
                    padding: "4px 12px",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    border:
                      genderFilter === g
                        ? "1px solid #00FF88"
                        : "1px solid rgba(255,255,255,0.1)",
                    background:
                      genderFilter === g
                        ? "rgba(0,255,136,0.1)"
                        : "transparent",
                    color:
                      genderFilter === g ? "#00FF88" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {g || "All"}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                marginBottom: 24,
              }}
            >
              <span style={{ color: "#f87171" }}>⚠ {error}</span>
              <button
                onClick={() => setError("")}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "rgba(248,113,113,0.5)",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Table */}
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isAdmin
                  ? "3fr 2fr 1fr 2fr 2fr 1fr"
                  : "3fr 2fr 1fr 2fr 2fr",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <div>Name</div>
              <div>Gender</div>
              <div>Age</div>
              <div>Age Group</div>
              <div>Country</div>
              {isAdmin && <div style={{ textAlign: "right" }}>Del</div>}
            </div>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 0",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    border: "2px solid #00FF88",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Loading...
                </span>
              </div>
            ) : displayedProfiles.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 0",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 36, color: "rgba(255,255,255,0.1)" }}>
                  ◈
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  No profiles found
                </span>
              </div>
            ) : (
              displayedProfiles.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isAdmin
                      ? "3fr 2fr 1fr 2fr 2fr 1fr"
                      : "3fr 2fr 1fr 2fr 2fr",
                    padding: "14px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background:
                      i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      textTransform: "capitalize",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "capitalize",
                    }}
                  >
                    {p.gender || "—"}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)" }}>
                    {p.age || "—"}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "capitalize",
                    }}
                  >
                    {p.age_group || "—"}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      fontSize: 11,
                    }}
                  >
                    {p.country_id || "—"}
                  </div>
                  {isAdmin && (
                    <div style={{ textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        style={{
                          background: "none",
                          border: "none",
                          color:
                            deletingId === p.id
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(239,68,68,0.4)",
                          cursor: "pointer",
                          fontSize: 12,
                        }}
                      >
                        {deletingId === p.id ? "..." : "✕"}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {searchResults === null && totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 24,
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                Page {page} of {totalPages} · {total} total
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.4)",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    opacity: page === 1 ? 0.3 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.4)",
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                    opacity: page === totalPages ? 0.3 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
