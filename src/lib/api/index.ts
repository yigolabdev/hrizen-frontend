// mock api client

export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    // 실제 호출 대신 mock data
    return Promise.reject(new Error('Not implemented'));
  },
  post: async <T>(url: string, data?: unknown): Promise<T> => {
    return Promise.reject(new Error('Not implemented'));
  },
  put: async <T>(url: string, data?: unknown): Promise<T> => {
    return Promise.reject(new Error('Not implemented'));
  },
  delete: async <T>(url: string): Promise<T> => {
    return Promise.reject(new Error('Not implemented'));
  },
};
