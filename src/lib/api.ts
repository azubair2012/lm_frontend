import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Helper function to get the base URL without /api suffix for image URLs
export const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
  return baseUrl.replace('/api', '');
};

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
  saleprice?: string;
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
  minSalePrice?: number;
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

// Blog types
export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  links: BlogLink[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPostInput {
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  links: BlogLink[];
}

export interface ContentEntry {
  key: string;
  label: string;
  group: string;
  type: 'text' | 'textarea' | 'richtext' | 'json';
  value: string;
  isPublished: boolean;
  updatedAt: string;
  updatedBy?: string;
}

export interface ContentUpdateInput {
  label?: string;
  group?: string;
  type?: 'text' | 'textarea' | 'richtext' | 'json';
  value: string;
  isPublished?: boolean;
  updatedBy?: string;
}

const CONTENT_RETRYABLE_CODES = new Set(['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT']);

async function withContentRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const code = (error as { code?: string })?.code;
      const isRetryable = typeof code === 'string' && CONTENT_RETRYABLE_CODES.has(code);
      if (!isRetryable || attempt === maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 250));
    }
  }

  throw lastError;
}

// Blog API functions
export const blogApi = {
  // Get all blog posts
  getAllBlogs: async (): Promise<BlogPost[]> => {
    const response = await api.get<ApiResponse<BlogPost[]>>('/blogs');
    return response.data.data;
  },

  // Get a single blog post by ID
  getBlogById: async (id: number): Promise<BlogPost> => {
    const response = await api.get<ApiResponse<BlogPost>>(`/blogs/${id}`);
    return response.data.data;
  },

  // Create a new blog post
  createBlog: async (input: BlogPostInput): Promise<BlogPost> => {
    const response = await api.post<ApiResponse<BlogPost>>('/blogs', input);
    return response.data.data;
  },

  // Update an existing blog post
  updateBlog: async (id: number, input: Partial<BlogPostInput>): Promise<BlogPost> => {
    const response = await api.put<ApiResponse<BlogPost>>(`/blogs/${id}`, input);
    return response.data.data;
  },

  // Delete a blog post
  deleteBlog: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/blogs/${id}`);
  },
};

export const contentApi = {
  getContent: async (keys?: string[], includeUnpublished = false): Promise<ContentEntry[]> => {
    const params = new URLSearchParams();
    if (keys && keys.length > 0) {
      params.set('keys', keys.join(','));
    }
    if (includeUnpublished) {
      params.set('includeUnpublished', 'true');
    }

    const query = params.toString();
    const response = await withContentRetry(() =>
      api.get<ApiResponse<ContentEntry[]>>(`/content${query ? `?${query}` : ''}`)
    );
    return response.data.data;
  },

  updateContentByKey: async (key: string, input: ContentUpdateInput): Promise<ContentEntry> => {
    const encodedKey = encodeURIComponent(key);
    const response = await withContentRetry(() =>
      api.put<ApiResponse<ContentEntry>>(`/content/${encodedKey}`, input)
    );
    return response.data.data;
  },
};

export default rentmanApi;
