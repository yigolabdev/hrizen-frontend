import { create } from 'zustand';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '@/features/attendance/types';
import {
  fetchAttendanceRecords,
  fetchLeaveRequests,
  fetchOvertimeStats,
  fetchAnomalies,
} from '@/features/attendance/api/attendanceApi';

// --- UI State ---
interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (val: boolean) => void;
}

// --- Attendance State ---
interface AttendanceState {
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  overtimeStats: OvertimeStats | null;
  anomalies: AnomalyItem[];
  attendanceLoading: boolean;
  attendanceError: string | null;
  loadAttendanceRecords: () => Promise<void>;
  loadLeaveRequests: () => Promise<void>;
  loadOvertimeStats: () => Promise<void>;
  loadAnomalies: () => Promise<void>;
}

// --- Payroll State ---
interface PayrollData {
  id: string;
  employeeName: string;
  baseSalary: number;
  overtimePay: number;
  deductions: number;
  netPay: number;
  status: 'pending' | 'completed' | 'error';
}

interface PayrollState {
  payrollData: PayrollData[];
  payrollLoading: boolean;
  payrollError: string | null;
  loadPayrollData: () => Promise<void>;
}

// --- AI Analytics State ---
interface AIAnalyticsInsight {
  id: string;
  text: string;
  type: 'positive' | 'warning' | 'neutral';
  createdAt: string;
}

interface AIAnalyticsState {
  aiInsights: AIAnalyticsInsight[];
  aiLoading: boolean;
  aiError: string | null;
  loadAIInsights: () => Promise<void>;
}

// --- Combined Store ---
type AppStore = UIState & AttendanceState & PayrollState & AIAnalyticsState;

export const useAppStore = create<AppStore>((set) => ({
  // --- UI ---
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (val: boolean) => set({ sidebarCollapsed: val }),

  // --- Attendance ---
  attendanceRecords: [],
  leaveRequests: [],
  overtimeStats: null,
  anomalies: [],
  attendanceLoading: false,
  attendanceError: null,

  loadAttendanceRecords: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const records = await fetchAttendanceRecords();
      set({ attendanceRecords: records, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '근태 기록 로딩 실패', attendanceLoading: false });
    }
  },

  loadLeaveRequests: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const requests = await fetchLeaveRequests();
      set({ leaveRequests: requests, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '�4가 요청 로딩 실패', attendanceLoading: false });
    }
  },

  loadOvertimeStats: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const stats = await fetchOvertimeStats();
      set({ overtimeStats: stats, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '초과근무 통계 로딩 실패', attendanceLoading: false });
    }
  },

  loadAnomalies: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const data = await fetchAnomalies();
      set({ anomalies: data, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '이상 징후 로딩 실패', attendanceLoading: false });
    }
  },

  // --- Payroll ---
  payrollData: [],
  payrollLoading: false,
  payrollError: null,

  loadPayrollData: async () => {
    set({ payrollLoading: true, payrollError: null });
    try {
      // API base URL 설정이 있으면 실제 API 호출, 없윴면 mock
      const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 800));
        const mockData: PayrollData[] = [
          { id: 'P001', employeeName: '김민수', baseSalary: 4000000, overtimePay: 350000, deductions: 450000, netPay: 3900000, status: 'completed' },
          { id: 'P002', employeeName: '이지은', baseSalary: 3800000, overtimePay: 200000, deductions: 420000, netPay: 3580000, status: 'completed' },
          { id: 'P003', employeeName: '박준형', baseSalary: 4500000, overtimePay: 500000, deductions: 500000, netPay: 4500000, status: 'pending' },
        ];
        set({ payrollData: mockData, payrollLoading: false });
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payroll`);
        if (!response.ok) throw new Error('Payroll API error');
        const data = await response.json();
        set({ payrollData: data, payrollLoading: false });
      }
    } catch (err) {
      set({ payrollError: '급여 데이터 로딩 실패', payrollLoading: false });
    }
  },

  // --- AI Analytics ---
  aiInsights: [],
  aiLoading: false,
  aiError: null,

  loadAIInsights: async () => {
    set({ aiLoading: true, aiError: null });
    try {
      const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 600));
        const mockInsights: AIAnalyticsInsight[] = [
          { id: '1', text: '개발팀 이직 위험이 전월 대비 12% 즞가했습니다. 1:1 면담을 권합啩니다.', type: 'warning', createdAt: new Date().toISOString() },
          { id: '2', text: '전사 근태 준수율이 93%로 목표(90%)을 달성했습니다.', type: 'positive', createdAt: new Date().toISOString() },
          { id: '3', text: '영업팀 시간외 수당이 예산 대비 23% 초과할 것으로 예측됩니다.', type: 'warning', createdAt: new Date().toISOString() },
          { id: '4', text: '신입 짡�l 온보딩 완료율이 95%로 양호합니다.', type: 'positive', createdAt: new Date().toISOString() },
          { id: '5', text: '다음 분기 인줄비 총액을 약 5.6억으로 예측됩니다.', type: 'neutral', createdAt: new Date().toISOString() },
        ];
        set({ aiInsights: mockInsights, aiLoading: false });
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/insights`);
        if (!response.ok) throw new Error('AI insights API error');
        const data = await response.json();
        set({ aiInsights: data, aiLoading: false });
      }
    } catch (err) {
      set({ aiError: 'AI 인사이트 로딩 실패', aiLoading: false });
    }
  },
}));
