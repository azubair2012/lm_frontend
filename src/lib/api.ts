import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

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
  id: string;
  address: string;
  price: string;
  rentMonth: number;
  type: string;
  beds: number;
  singles: number;
  doubles: number;
  baths: number;
  receptions: number;
  furnished: string;
  heating: string;
  available: string;
  status: string;
  rating: number;
  age: string;
  description: string;
  strapline: string;
  postcode: string;
  area: string;
  url: string;
  images: {
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
    const response = await api.get<ApiResponse<any[]>>(`/media/${propertyId}`);
    return response.data.data;
  },

  // Get featured properties
  getFeaturedProperties: async (): Promise<Property[]> => {
    const response = await api.get<ApiResponse<Property[]>>('/properties/featured');
    return response.data.data;
  },

  // Get gallery images for a property (lazy loading)
  getPropertyGallery: async (propertyId: string): Promise<Property['images']['gallery']> => {
    const response = await api.get<ApiResponse<Property['images']['gallery']>>(`/properties/${propertyId}/gallery`);
    return response.data.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get<ApiResponse<any>>('/health');
    return response.data;
  },
};

export default rentmanApi;
