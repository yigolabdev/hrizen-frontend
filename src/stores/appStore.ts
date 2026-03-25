import { create } from 'zustand';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

interface AppState {
  // UI state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (val: boolean) => void;

  // Auth / User state
  currentUser: UserInfo | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: UserInfo | null) => void;
  logout: () => void;

  // Tenant state
  currentTenantId: string | null;
  setCurrentTenantId: (id: string | null) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (item: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Global loading
  globalLoading: boolean;
  setGlobalLoading: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // UI state
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),

  // Auth / User state
  currentUser: null,
  isAuthenticated: false,
  setCurrentUser: (user) =>
    set({ currentUser: user, isAuthenticated: user !== null }),
  logout: () =>
    set({ currentUser: null, isAuthenticated: false, currentTenantId: null }),

  // Tenant state
  currentTenantId: null,
  setCurrentTenantId: (id) => set({ currentTenantId: id }),

  // Notifications
  notifications: [],
  addNotification: (item) =>
    set((s) => ({
      notifications: [
        {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...s.notifications,
      ],
    })),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Global loading
  globalLoading: false,
  setGlobalLoading: (val) => set({ globalLoading: val }),
}));
