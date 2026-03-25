import { create } from 'zustand';

interface AppState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (val: boolean) => void;

  // Auth
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo | null) => void;

  // Tenant
  currentTenantId: string | null;
  setCurrentTenantId: (id: string | null) => void;

  // Global loading
  globalLoading: boolean;
  setGlobalLoading: (val: boolean) => void;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
  tenantId?: string;
}

export const useAppStore = create<AppState>((set) => ({
  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),

  // Auth
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // Tenant
  currentTenantId: null,
  setCurrentTenantId: (id) => set({ currentTenantId: id }),

  // Global loading
  globalLoading: false,
  setGlobalLoading: (val) => set({ globalLoading: val }),
}));

export type { UserInfo };
