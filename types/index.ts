export interface Profile {
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

export interface User {
  id: string;
  email: string;
  role: "admin" | "analyst";
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface ProfilesResponse {
  status: string;
  data: Profile[];
  total: number;
}

export interface SearchResponse {
  status: string;
  data: Profile[];
}
