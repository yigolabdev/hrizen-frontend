const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorBody);
      if (parsed.message) errorMessage = parsed.message;
    } catch {
      // not JSON
    }
    throw new Error(errorMessage);
  }
  const text = await response.text();
  if (!text) return undefined as unknown as T;
  return JSON.parse(text) as T;
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const apiClient = {
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const response = await fetch(buildUrl(path, params), {
      method: 'GET',
      headers: getAuthHeaders(),
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  async post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const response = await fetch(buildUrl(path, params), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  async put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const response = await fetch(buildUrl(path, params), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  async patch<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const response = await fetch(buildUrl(path, params), {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const response = await fetch(buildUrl(path, params), {
      method: 'DELETE',
      headers: getAuthHeaders(),
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },
};

export default apiClient;
