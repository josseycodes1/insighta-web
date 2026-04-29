import axios from "axios";
import { Profile } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define proper types
interface ProfilesResponse {
  status: string;
  data: Profile[];
  total: number;
}

interface SearchResponse {
  status: string;
  data: Profile[];
}

interface GetAllParams {
  gender?: string;
  country_id?: string;
  age_group?: string;
  min_age?: number;
  max_age?: number;
  page?: number;
  limit?: number;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  githubLogin: (code: string) =>
    api.post<AuthResponse>("/v1/auth/github/", { code }),

  logout: () => api.post("/v1/auth/logout/"),
};

export const profilesAPI = {
  getAll: (params?: GetAllParams) =>
    api.get<ProfilesResponse>("/profiles/", { params }),

  search: (query: string, page?: number, limit?: number) =>
    api.get<SearchResponse>("/profiles/search/", {
      params: { q: query, page, limit },
    }),

  exportCSV: () => api.get("/profiles/export/csv/", { responseType: "blob" }),

  create: (name: string) => api.post("/profiles/", { name }),

  delete: (id: string) => api.delete(`/profiles/${id}/`),
};

export default api;
