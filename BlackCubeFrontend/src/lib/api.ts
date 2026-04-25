// API utility for making requests to the backend using axios

import axios, { AxiosInstance, AxiosError } from 'axios';

// Determine API base URL. If NEXT_PUBLIC_API_URL is set to a host (no /api path),
// append `/api` so frontend endpoints like `/auth/login` map to backend `/api/auth/login`.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!.replace(/\/+$/, '');
export const API_BASE_URL = `${BASE_URL}/api`;

// Utility function to get asset URLs (images, files, etc.)
export const getAssetUrl = (path?: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  // Ensure path starts with a slash for proper URL construction
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${sanitizedPath}`;
};


// Create axios instance with default config
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      console.error(`API Error [${error.config?.url}]:`, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error(`API Error [${error.config?.url}]: No response received`);
    } else {
      // Something else happened
      console.error(`API Error [${error.config?.url}]:`, error.message);
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  page: number;
  limit: number;
  total: number;
}

async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as any)?.message ||
        error.message ||
        'Request failed';
      throw new Error(errorMessage);
    }
    throw error;
  }
}

// Page API functions
export const pageApi = {
  // Get page by ID (e.g., 'home', 'career', 'about')
  get: async (pageId: string): Promise<ApiResponse> => {
    return apiRequest(`/pages/${pageId}`, 'GET');
  },

  // Get all pages
  list: async (): Promise<PaginatedResponse<any>> => {
    return apiRequest<PaginatedResponse<any>>('/pages', 'GET');
  },

  // Create a new page
  create: async (pageData: { id: string; title: string; fields?: any[] }): Promise<ApiResponse> => {
    return apiRequest('/pages', 'POST', pageData);
  },

  // Update an existing page
  update: async (pageId: string, pageData: any): Promise<ApiResponse> => {
    return apiRequest(`/pages/${pageId}`, 'PUT', pageData);
  },

  // Delete a page
  delete: async (pageId: string): Promise<ApiResponse> => {
    return apiRequest(`/pages/${pageId}`, 'DELETE');
  },
};

// Career/Job Posting API functions
export const careerApi = {
  list: async (): Promise<PaginatedResponse<any>> => {
    return apiRequest<PaginatedResponse<any>>('/careers', 'GET');
  },

  get: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/careers/${id}`, 'GET');
  },

  create: async (jobData: any): Promise<ApiResponse> => {
    return apiRequest('/careers', 'POST', jobData);
  },

  update: async (id: string, jobData: any): Promise<ApiResponse> => {
    return apiRequest(`/careers/${id}`, 'PUT', jobData);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/careers/${id}`, 'DELETE');
  },
};

// Service API functions
export const serviceApi = {
  list: async (): Promise<PaginatedResponse<any>> => {
    return apiRequest<PaginatedResponse<any>>('/services', 'GET');
  },

  get: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/services/${id}`, 'GET');
  },

  create: async (serviceData: any): Promise<ApiResponse> => {
    return apiRequest('/services', 'POST', serviceData);
  },

  update: async (id: string, serviceData: any): Promise<ApiResponse> => {
    return apiRequest(`/services/${id}`, 'PUT', serviceData);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/services/${id}`, 'DELETE');
  },
};

// Portfolio API functions
export const portfolioApi = {
  list: async (): Promise<PaginatedResponse<any>> => {
    return apiRequest<PaginatedResponse<any>>('/portfolio', 'GET');
  },

  get: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/portfolio/${id}`, 'GET');
  },

  create: async (portfolioData: any): Promise<ApiResponse> => {
    return apiRequest('/portfolio', 'POST', portfolioData);
  },

  update: async (id: string, portfolioData: any): Promise<ApiResponse> => {
    return apiRequest(`/portfolio/${id}`, 'PUT', portfolioData);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/portfolio/${id}`, 'DELETE');
  },
};

// Contact Submission API functions
export const contactSubmissionApi = {
  list: async (params?: { page?: number; limit?: number; q?: string }): Promise<PaginatedResponse<any>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.q) queryParams.append('q', params.q);
    const query = queryParams.toString();
    return apiRequest<PaginatedResponse<any>>(`/contact-submissions${query ? `?${query}` : ''}`, 'GET');
  },

  get: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/contact-submissions/${id}`, 'GET');
  },

  create: async (submissionData: any): Promise<ApiResponse> => {
    return apiRequest('/contact-submissions', 'POST', submissionData);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/contact-submissions/${id}`, 'DELETE');
  },
};

// Job Application API functions
export const jobApplicationApi = {
  list: async (params?: { page?: number; limit?: number; q?: string; status?: string }): Promise<PaginatedResponse<any>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.q) queryParams.append('q', params.q);
    if (params?.status) queryParams.append('status', params.status);
    const query = queryParams.toString();
    return apiRequest<PaginatedResponse<any>>(`/job-applications${query ? `?${query}` : ''}`, 'GET');
  },

  get: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/job-applications/${id}`, 'GET');
  },

  create: async (applicationData: any): Promise<ApiResponse> => {
    return apiRequest('/job-applications', 'POST', applicationData);
  },

  update: async (id: string, applicationData: any): Promise<ApiResponse> => {
    return apiRequest(`/job-applications/${id}`, 'PUT', applicationData);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return apiRequest(`/job-applications/${id}`, 'DELETE');
  },
};

// Upload API functions
export const uploadApi = {
  uploadImage: async (file: File): Promise<ApiResponse<{ url: string; filename: string }>> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axiosInstance.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as any)?.message ||
          error.message ||
          'Upload failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  uploadImages: async (files: File[]): Promise<ApiResponse<{ files: Array<{ url: string; filename: string }> }>> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axiosInstance.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as any)?.message ||
          error.message ||
          'Upload failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  uploadResume: async (file: File): Promise<ApiResponse<{ url: string; filename: string }>> => {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axiosInstance.post('/upload/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as any)?.message ||
          error.message ||
          'Upload failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },
};

