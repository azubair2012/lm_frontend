import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lm-backend-omega.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased to 60 seconds for media fetching
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface Property {
  // Raw API fields
  propref: string;
  displayaddress: string;
  displayprice: string;
  rentmonth: string;
  rentorbuy: number;
  number: string;
  street: string;
  address3: string;
  address4: string;
  postcode: string;
  area: string;
  nearesttsation: string;
  TYPE: string;
  nonres: number;
  commercial: number;
  beds: string;
  singles: string;
  doubles: string;
  baths: string;
  receps: string;
  furnished: number;
  bullets: string;
  FLOOR: string;
  heating: string;
  available: string;
  STATUS: string;
  servicecharges: string;
  leaselength: string;
  tenure: number;
  shortlet: number;
  rating: string;
  age: string;
  DESCRIPTION: string;
  comments: string;
  strapline: string;
  thoughts: string;
  floorplan: string;
  url: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  photo6: string;
  photo7: string;
  photo8: string;
  photo9: string;
  epc: string;
  branch: string | null;
  branchtel: string | null;
  evt: string;
  featured: number;
  brochure: string;
  geolocation: string;
  negotiatorname: string;
  negotiatoremail: string;
  negotiatormobile: string;
  category: string | null;
  
  // Optional transformed fields for backward compatibility
  id?: string;
  address?: string;
  price?: string;
  rentMonth?: number;
  type?: string;
  bedsNum?: number;
  singlesNum?: number;
  doublesNum?: number;
  bathsNum?: number;
  receptionsNum?: number;
  furnishedText?: string;
  status?: string;
  ratingNum?: number;
  description?: string;
  images?: {
    main: {
      thumb: string;
      medium: string;
      large: string;
      original: string;
    };
    floorplan?: {
      thumb: string;
      medium: string;
      large: string;
      original: string;
    };
    gallery: Array<{
      id: string;
      caption: string;
      order: number;
      urls: {
        thumb: string;
        medium: string;
        large: string;
        original: string;
      };
    }>;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface SearchParams {
  q?: string;
  area?: string;
  type?: string;
  beds?: number;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    areas: string[];
    types: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export const rentmanApi = {
  // Get all properties
  getProperties: async (params: SearchParams = {}): Promise<Property[]> => {
    const response = await api.get<ApiResponse<Property[]>>('/properties', { params });
    return response.data.data;
  },

  // Get single property
  getProperty: async (id: string): Promise<Property> => {
    const response = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  },

  // Search properties
  searchProperties: async (params: SearchParams): Promise<SearchResponse> => {
    // Filter out empty string parameters, but keep search query even if it's empty
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([key, value]) => {
        // Always keep the search query (q) parameter
        if (key === 'q') return true;
        // Filter out empty strings, undefined, and null for other parameters
        return value !== '' && value !== undefined && value !== null;
      })
    );
    console.log('🔍 API: Cleaned search params:', cleanParams);
    const response = await api.get<ApiResponse<SearchResponse>>('/properties/search', { params: cleanParams });
    return response.data.data;
  },

  // Get property media
  getPropertyMedia: async (propertyId: string) => {
    const response = await api.get<ApiResponse<unknown[]>>(`/media/${propertyId}`);
    return response.data.data;
  },

  // Get featured properties
  getFeaturedProperties: async (): Promise<Property[]> => {
    const response = await api.get<ApiResponse<Property[]>>('/properties/featured');
    return response.data.data;
  },

  // Get gallery images for a property (lazy loading)
  getPropertyGallery: async (propertyId: string): Promise<Property['images']> => {
    const response = await api.get<ApiResponse<Property['images']>>(`/properties/${propertyId}/gallery`);
    return response.data.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get<ApiResponse<unknown>>('/health');
    return response.data;
  },
};

export default rentmanApi;
