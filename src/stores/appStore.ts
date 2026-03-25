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
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Auth / User
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  setUser: (user: UserInfo | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Global Loading
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Tenant
  currentTenantId: string | null;
  setCurrentTenantId: (tenantId: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Auth / User
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email: string, _password: string) => {
    set({ isLoadingAuth: true });
    try {
      // TODO: Replace with actual API call
      await new Promise((r) => setTimeout(r, 800));
      const mockUser: UserInfo = {
        id: 'U001',
        name: '관리자',
        email,
        role: 'admin',
        tenantId: 'T001',
      };
      set({ user: mockUser, isAuthenticated: true, currentTenantId: mockUser.tenantId });
    } finally {
      set({ isLoadingAuth: false });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false, currentTenantId: null }),

  // Notifications
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => {
      const newItem: NotificationItem = {
        ...notification,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        read: false,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...state.notifications].slice(0, 50);
      return { notifications: updated, unreadCount: updated.filter((n) => !n.read).length };
    }),
  markNotificationRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      return { notifications: updated, unreadCount: updated.filter((n) => !n.read).length };
    }),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

  // Global Loading
  globalLoading: false,
  setGlobalLoading: (loading) => set({ globalLoading: loading }),

  // Tenant
  currentTenantId: null,
  setCurrentTenantId: (tenantId) => set({ currentTenantId: tenantId }),
}));
