"use client";

import { useRouter } from "next/navigation";
import {
  isAuthenticated,
  isAdmin,
  getUserRole,
  clearAuthTokens,
} from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  const role = getUserRole();

  const handleLogout = () => {
    clearAuthTokens();
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Insighta Labs+</h1>
            {authenticated && (
              <span
                className={`px-2 py-1 text-xs rounded-full ${admin ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
              >
                {role}
              </span>
            )}
          </div>

          {authenticated && (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
