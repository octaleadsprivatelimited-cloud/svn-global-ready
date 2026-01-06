// API Configuration
// Supports both Supabase direct mode and backend API proxy mode
// Set VITE_USE_BACKEND_API=true to use backend API endpoints

// Supabase URLs from environment variables
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;

// Backend API configuration
const getApiUrl = (): string => {
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl && envApiUrl.trim() !== '') {
    return envApiUrl.trim();
  }
  // Default to same origin if no API URL specified
  return window.location.origin;
};

export const API_URL = getApiUrl();

// Check if backend API should be used
export const USE_BACKEND_API = import.meta.env.VITE_USE_BACKEND_API === 'true' || 
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim() !== '');

// Helper function to get full API endpoint URL
export const getApiEndpoint = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!API_URL) {
    return cleanEndpoint;
  }
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  return `${baseUrl}${cleanEndpoint}`;
};

// Helper function to make API requests with authentication
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = getApiEndpoint(endpoint);
    const token = localStorage.getItem('supabase.auth.token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
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
