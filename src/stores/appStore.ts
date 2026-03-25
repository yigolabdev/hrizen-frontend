import { create } from 'zustand';

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Attendance State
  attendanceLoading: boolean;
  setAttendanceLoading: (loading: boolean) => void;

  // Payroll State
  payrollLoading: boolean;
  setPayrollLoading: (loading: boolean) => void;

  // AI Analytics State
  aiAnalyticsLoading: boolean;
  setAiAnalyticsLoading: (loading: boolean) => void;

  // Global error
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
  clearGlobalError: () => void;

  // Current tenant
  currentTenantId: string | null;
  setCurrentTenantId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Attendance State
  attendanceLoading: false,
  setAttendanceLoading: (loading) => set({ attendanceLoading: loading }),

  // Payroll State
  payrollLoading: false,
  setPayrollLoading: (loading) => set({ payrollLoading: loading }),

  // AI Analytics State
  aiAnalyticsLoading: false,
  setAiAnalyticsLoading: (loading) => set({ aiAnalyticsLoading: loading }),

  // Global error
  globalError: null,
  setGlobalError: (error) => set({ globalError: error }),
  clearGlobalError: () => set({ globalError: null }),

  // Current tenant
  currentTenantId: null,
  setCurrentTenantId: (id) => set({ currentTenantId: id }),
}));
