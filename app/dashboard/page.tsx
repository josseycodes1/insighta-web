"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, isAdmin } from "@/lib/auth";
import { profilesAPI } from "@/lib/api";
import { Profile } from "@/types";
import SearchBar from "@/components/Dashboard/SearchBar";
import Header from "@/components/Layout/Header";
import FilterBar from "@/components/Dashboard/FilterBar";
import ProfileTable from "@/components/Dashboard/ProfileTable";
import ExportButton from "@/components/Dashboard/ExportButton";

export default function DashboardPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    gender: "",
    country_id: "",
    age_group: "",
    page: 1,
    limit: 10,
  });
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuthenticatedState(authenticated);
      if (!authenticated) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // Fetch profiles when authenticated and filters change
  useEffect(() => {
    if (!isAuthenticatedState) return;

    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await profilesAPI.getAll(filters);
        setProfiles(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [filters, isAuthenticatedState]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilters((prev) => ({ ...prev, page: 1 }));
      return;
    }

    setLoading(true);
    try {
      const response = await profilesAPI.search(
        query,
        filters.page,
        filters.limit,
      );
      setProfiles(response.data.data);
      setTotal(response.data.data.length);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  // Show nothing while checking auth
  if (!isAuthenticatedState) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Profile Intelligence
            </h1>
            {isAdmin() && <ExportButton />}
          </div>

          <SearchBar onSearch={handleSearch} />

          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <ProfileTable
          profiles={profiles}
          loading={loading}
          total={total}
          currentPage={filters.page}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
      </main>
    </>
  );
}
