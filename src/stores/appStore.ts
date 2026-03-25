import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatarUrl?: string;
  tenantId: string;
}

interface AppState {
  // UI state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Auth / User
  currentUser: UserInfo | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Global loading
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // UI state
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Auth / User
  currentUser: null,
  isAuthenticated: false,
  authLoading: false,

  login: async (email: string, _password: string) => {
    set({ authLoading: true });
    try {
      // TODO: Replace with real API call
      // const res = await apiClient.post('/auth/login', { email, password: _password });
      await new Promise((r) => setTimeout(r, 800));
      const mockUser: UserInfo = {
        id: 'U001',
        name: '관리자',
        email,
        role: 'admin',
        tenantId: 'T001',
      };
      set({ currentUser: mockUser, isAuthenticated: true, authLoading: false });
    } catch {
      set({ authLoading: false });
      throw new Error('로그인 실패');
    }
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false, notifications: [], unreadNotificationCount: 0 });
  },

  fetchCurrentUser: async () => {
    set({ authLoading: true });
    try {
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 500));
      const mockUser: UserInfo = {
        id: 'U001',
        name: '관리청',
        email: 'admin@hrizen.com',
        role: 'admin',
        tenantId: 'T001',
      };
      set({ currentUser: mockUser, isAuthenticated: true, authLoading: false });
    } catch {
      set({ currentUser: null, isAuthenticated: false, authLoading: false });
    }
  },

  // Notifications
  notifications: [],
  unreadNotificationCount: 0,

  addNotification: (item) => {
    const newNotification: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    set((s) => ({
      notifications: [newNotification, ...s.notifications],
      unreadNotificationCount: s.unreadNotificationCount + 1,
    }));
  },

  markNotificationRead: (id) => {
    set((s) => {
      const updated = s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadNotificationCount: updated.filter((n) => !n.read).length,
      };
    });
  },

  clearNotifications: () => {
    set({ notifications: [], unreadNotificationCount: 0 });
  },

  // Global loading
  globalLoading: false,
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
