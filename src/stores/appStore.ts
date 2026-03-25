import { create } from 'zustand';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  tenantId: string;
  avatar?: string;
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

interface AppState {
  // User
  user: UserInfo | null;
  isAuthenticated: boolean;
  setUser: (user: UserInfo | null) => void;
  logout: () => void;

  // Global UI
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Tenant
  currentTenantId: string | null;
  setCurrentTenantId: (id: string | null) => void;

  // Loading
  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false, notifications: [] }),

  // Global UI
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Tenant
  currentTenantId: null,
  setCurrentTenantId: (id) => set({ currentTenantId: id }),

  // Loading
  globalLoading: false,
  setGlobalLoading: (value) => set({ globalLoading: value }),
}));

export default useAppStore;
