import axios from "axios";
import overlayService from "./overlayService";
import cacheService from "./cacheService";

// Production-ready API service with caching

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "https://sairaj-travels-v5-backend.onrender.com/api",
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});


let pending = 0;
let requestStartTime = null;

const showIfNeeded = (message = 'Loading...') => {
  overlayService.show(message, 'loading');
};

const hideIfNeeded = () => {
  if (pending <= 0) {
    overlayService.hide();
  }
};

// Request interceptor - Updated for production
api.interceptors.request.use(
  (config) => {
    pending += 1;
    requestStartTime = Date.now();
    
    // Show loading overlay for first request
    if (pending === 1) {
      const message = config.loadingMessage || 'Loading...';
      showIfNeeded(message);
    }
    
    // Add JWT token to all requests
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    pending = Math.max(0, pending - 1);
    hideIfNeeded();
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    pending = Math.max(0, pending - 1);
    
    // Calculate request duration
    const duration = requestStartTime ? Date.now() - requestStartTime : 0;
    
    // Show success message for important operations
    if (response.config.showSuccessMessage && response.status >= 200 && response.status < 300) {
      const message = response.config.successMessage || 'Operation completed successfully!';
      overlayService.showTemporary(message, 'success', 2000);
    }
    
    hideIfNeeded();
    return response;
  },
  (error) => {
    pending = Math.max(0, pending - 1);
    
    // Enhanced error handling
    let errorMessage = 'Something went wrong!';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      switch (status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          // Redirect to login if unauthorized
          if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
          }
          break;
        case 403:
          errorMessage = 'Access denied. You don\'t have permission.';
          break;
        case 404:
          errorMessage = 'Requested resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${status}: ${error.response.data?.message || 'Unknown error'}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network error. Please check your connection.';
    } else {
      // Other error
      errorMessage = error.message || 'An unexpected error occurred.';
    }
    
    // Show error message
    overlayService.showError(errorMessage);
    
    hideIfNeeded();
    return Promise.reject(error);
  }
);

// Enhanced API methods with caching
export const apiMethods = {
  // GET with loading message and caching
  get: (url, config = {}) => {
    const cacheKey = cacheService.generateKey(url, config.params);
    
    // Check cache first for GET requests
    if (!config.skipCache) {
      const cachedData = cacheService.get(cacheKey);
      if (cachedData) {
        return Promise.resolve({ data: cachedData });
      }
    }

    return api.get(url, {
      ...config,
      loadingMessage: config.loadingMessage || 'Loading data...'
    }).then(response => {
      // Cache successful GET responses
      if (!config.skipCache && response.status === 200) {
        const ttl = config.cacheTTL || (5 * 60 * 1000); // 5 minutes default
        cacheService.set(cacheKey, response.data, ttl);
      }
      return response;
    });
  },
  
  // POST with success message and cache invalidation
  post: (url, data, config = {}) => {
    return api.post(url, data, {
      ...config,
      loadingMessage: config.loadingMessage || 'Saving data...',
      showSuccessMessage: true,
      successMessage: config.successMessage || 'Data saved successfully!'
    }).then(response => {
      // Clear related cache entries after POST
      if (config.invalidateCache) {
        cacheService.clearByPattern(config.invalidateCache);
      }
      return response;
    });
  },
  
  // PUT with success message and cache invalidation
  put: (url, data, config = {}) => {
    return api.put(url, data, {
      ...config,
      loadingMessage: config.loadingMessage || 'Updating data...',
      showSuccessMessage: true,
      successMessage: config.successMessage || 'Data updated successfully!'
    }).then(response => {
      // Clear related cache entries after PUT
      if (config.invalidateCache) {
        cacheService.clearByPattern(config.invalidateCache);
      }
      return response;
    });
  },
  
  // DELETE with confirmation and cache invalidation
  delete: (url, config = {}) => {
    return api.delete(url, {
      ...config,
      loadingMessage: config.loadingMessage || 'Deleting data...',
      showSuccessMessage: true,
      successMessage: config.successMessage || 'Data deleted successfully!'
    }).then(response => {
      // Clear related cache entries after DELETE
      if (config.invalidateCache) {
        cacheService.clearByPattern(config.invalidateCache);
      }
      return response;
    });
  },

  // PATCH with success message and cache invalidation
  patch: (url, data, config = {}) => {
    return api.patch(url, data, {
      ...config,
      loadingMessage: config.loadingMessage || 'Updating data...',
      showSuccessMessage: true,
      successMessage: config.successMessage || 'Data updated successfully!'
    }).then(response => {
      // Clear related cache entries after PATCH
      if (config.invalidateCache) {
        cacheService.clearByPattern(config.invalidateCache);
      }
      return response;
    });
  },

  // Cache management methods
  clearCache: (pattern) => {
    if (pattern) {
      cacheService.clearByPattern(pattern);
    } else {
      cacheService.clearAll();
    }
  },

  getCacheStats: () => {
    return cacheService.getStats();
  }
};

export default api;
