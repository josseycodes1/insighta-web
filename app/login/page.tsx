"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleGitHubLogin = () => {
    // Redirect to GitHub with backend callback URL
    const clientId = "Ov23liSRCvImYzQ6VkXj";
    const redirectUri =
      "https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev/accounts/github/login/callback/";
    const scope = "read:user user:email";

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Insighta Labs+</h2>
          <p className="mt-2 text-gray-600">Sign in to access the platform</p>
        </div>

        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FaGithub className="w-5 h-5" />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
