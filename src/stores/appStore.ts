import { create } from 'zustand';
import { apiClient } from '@/lib/api';

// --- Attendance Types ---
interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: string;
  overtimeMinutes: number;
}

// --- Payroll Types ---
interface PayrollSummary {
  totalEmployees: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  month: string;
}

// --- AI Analytics Types ---
interface AIInsight {
  id: string;
  text: string;
  type: 'positive' | 'warning' | 'neutral';
  createdAt: string;
}

// --- App Store ---
interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  attendanceLoading: boolean;
  attendanceError: string | null;
  fetchAttendanceRecords: () => Promise<void>;

  // Payroll
  payrollSummary: PayrollSummary | null;
  payrollLoading: boolean;
  payrollError: string | null;
  fetchPayrollSummary: (month?: string) => Promise<void>;

  // AI Analytics
  aiInsights: AIInsight[];
  aiInsightsLoading: boolean;
  aiInsightsError: string | null;
  fetchAIInsights: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (value: boolean) => set({ sidebarCollapsed: value }),

  // Attendance
  attendanceRecords: [],
  attendanceLoading: false,
  attendanceError: null,
  fetchAttendanceRecords: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const response = await apiClient.get<AttendanceRecord[]>('/attendance/records');
      set({ attendanceRecords: response, attendanceLoading: false });
    } catch (error) {
      set({
        attendanceError: error instanceof Error ? error.message : '근태 데이터 로딩 실패',
        attendanceLoading: false,
      });
    }
  },

  // Payroll
  payrollSummary: null,
  payrollLoading: false,
  payrollError: null,
  fetchPayrollSummary: async (month?: string) => {
    set({ payrollLoading: true, payrollError: null });
    try {
      const params = month ? `?month=${month}` : '';
      const response = await apiClient.get<PayrollSummary>(`/payroll/summary${params}`);
      set({ payrollSummary: response, payrollLoading: false });
    } catch (error) {
      set({
        payrollError: error instanceof Error ? error.message : '급여 데이터 로드 실패',
        payrollLoading: false,
      });
    }
  },

  // AI Analytics
  aiInsights: [],
  aiInsightsLoading: false,
  aiInsightsError: null,
  fetchAIInsights: async () => {
    set({ aiInsightsLoading: true, aiInsightsError: null });
    try {
      const response = await apiClient.get<AIInsight[]>('/ai-analytics/insights');
      set({ aiInsights: response, aiInsightsLoading: false });
    } catch (error) {
      set({
        aiInsightsError: error instanceof Error ? error.message : 'AI 분석 데이터 로딩 실패',
        aiInsightsLoading: false,
      });
    }
  },
}));
