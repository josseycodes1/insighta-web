"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev";

interface Profile {
  id: string;
  name: string;
  gender: string;
  gender_probability: number;
  age: number;
  age_group: string;
  country_id: string;
  country_name: string;
  country_probability: number;
  created_at: string;
}

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("access_token")
    : null;
}

export default function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    fetch(`${API_BASE}/api/profiles/${id}/`, {
      headers: {
        "X-API-Version": "1",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then((data) => {
        if (data) setProfile(data.data ?? data);
      })
      .catch((err: Error) => setError(err.message));
  }, [id, router]);

  return (
    <main className="min-h-screen bg-[#080A0F] text-white font-mono px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-xs text-white/40">
          Back to dashboard
        </Link>

        <h1 className="text-3xl font-black mt-8 mb-8">Profile Detail</h1>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {!error && !profile && <p className="text-sm text-white/40">Loading...</p>}

        {profile && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {[
              ["Name", profile.name],
              ["Gender", profile.gender],
              ["Gender probability", profile.gender_probability],
              ["Age", profile.age],
              ["Age group", profile.age_group],
              ["Country", `${profile.country_name} (${profile.country_id})`],
              ["Country probability", profile.country_probability],
              ["Created", new Date(profile.created_at).toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#0D1117] p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
                  {label}
                </div>
                <div className="text-sm text-white/80 capitalize">{value}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
