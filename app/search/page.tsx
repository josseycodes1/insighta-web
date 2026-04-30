"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
}

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("access_token")
    : null;
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const token = getToken();
      const res = await fetch(
        `${API_BASE}/api/profiles/search/?q=${encodeURIComponent(query)}`,
        {
          headers: {
            "X-API-Version": "1",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        },
      );
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Search failed");
      setProfiles(data.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080A0F] text-white font-mono px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className="text-xs text-white/40">
            Back to dashboard
          </Link>
          <Link href="/account" className="text-xs text-white/40">
            Account
          </Link>
        </div>

        <h1 className="text-3xl font-black mb-2">Search</h1>
        <p className="text-sm text-white/40 mb-8">
          Natural language profile search.
        </p>

        <div className="flex gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none"
            placeholder='e.g. "young males from Nigeria"'
          />
          <button
            onClick={runSearch}
            disabled={loading}
            className="px-6 py-3 bg-[#00FF88] text-black text-xs font-bold uppercase disabled:opacity-50"
          >
            {loading ? "Searching" : "Search"}
          </button>
        </div>

        {error && <p className="text-sm text-red-400 mb-6">{error}</p>}

        <section className="border border-white/10">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/profiles/${profile.id}`}
              className="grid grid-cols-5 gap-4 border-b border-white/10 p-4 text-sm hover:bg-white/5"
            >
              <span className="capitalize text-white/80">{profile.name}</span>
              <span className="capitalize text-white/40">{profile.gender}</span>
              <span className="text-white/40">{profile.age}</span>
              <span className="capitalize text-white/40">{profile.age_group}</span>
              <span className="uppercase text-white/40">{profile.country_id}</span>
            </Link>
          ))}
          {!loading && profiles.length === 0 && (
            <div className="p-8 text-sm text-white/30">No results yet.</div>
          )}
        </section>
      </div>
    </main>
  );
}
