// API Configuration
// Uses Lovable Cloud (Supabase) for backend functionality

// Supabase URLs from environment variables
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;

// Legacy API URL support (for external backends if needed)
const getApiUrl = (): string => {
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl && envApiUrl.trim() !== '') {
    return envApiUrl.trim();
  }
  return '';
};

export const API_URL = getApiUrl();

// Helper function to get full API endpoint URL
export const getApiEndpoint = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!API_URL) {
    return cleanEndpoint;
  }
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  return `${baseUrl}${cleanEndpoint}`;
};

// Type definitions for API responses
export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
}

export interface TestReport {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  is_public: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
