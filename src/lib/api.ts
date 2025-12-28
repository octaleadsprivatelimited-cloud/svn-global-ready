// API Configuration
// For production, this should point to your backend API
// When using Lovable Cloud (Supabase), this is handled automatically

const getApiUrl = (): string => {
  // Check for environment variable first
  const envApiUrl = import.meta.env.VITE_API_URL;
  
  if (envApiUrl && envApiUrl.trim() !== '') {
    return envApiUrl.trim();
  }
  
  // Default to relative URLs (same origin)
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
  title: string;
  description: string;
  image?: string;
  features?: string[];
  applications?: string[];
  category?: string;
}

export interface TestReport {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  file?: string;
  certifications?: string[];
  parameters?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
