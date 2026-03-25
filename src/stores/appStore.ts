import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  tenantId: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface AppState {
  // UI state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;

  // Auth state
  currentUser: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Global loading
  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // UI state
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (value: boolean) => set({ sidebarCollapsed: value }),

  // Auth state
  currentUser: null,
  isAuthenticated: false,
  authLoading: false,
  login: async (email: string, _password: string) => {
    set({ authLoading: true });
    try {
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 800));
      const mockUser: User = {
        id: 'usr-001',
        name: '관리자',
        email,
        role: 'admin',
        tenantId: 'tenant-001',
      };
      set({ currentUser: mockUser, isAuthenticated: true, authLoading: false });
    } catch {
      set({ authLoading: false });
      throw new Error('로그인 실패');
    }
  },
  logout: () => {
    set({ currentUser: null, isAuthenticated: false, notifications: [], unreadCount: 0 });
  },
  setUser: (user: User) => set({ currentUser: user, isAuthenticated: true }),

  // Notifications
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => {
    const newNotif: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
  markNotificationRead: (id: string) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    });
  },
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

  // Global loading
  globalLoading: false,
  setGlobalLoading: (value: boolean) => set({ globalLoading: value }),
}));
