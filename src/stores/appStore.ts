import { create } from 'zustand';
import { apiClient } from '@/lib/api';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '@/features/attendance/types';

// --- UI State ---
interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
}

// --- Attendance State ---
interface AttendanceState {
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  overtimeStats: OvertimeStats | null;
  anomalies: AnomalyItem[];
  attendanceLoading: boolean;
  attendanceError: string | null;
  fetchAttendanceRecords: () => Promise<void>;
  fetchLeaveRequests: () => Promise<void>;
  fetchOvertimeStats: () => Promise<void>;
  fetchAnomalies: () => Promise<void>;
}

// --- Payroll State ---
interface PayrollItem {
  id: string;
  employeeName: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'completed' | 'error';
}

interface PayrollState {
  payrollItems: PayrollItem[];
  payrollLoading: boolean;
  payrollError: string | null;
  fetchPayrollItems: () => Promise<void>;
}

// --- AI Analytics State ---
interface AIAnalyticsState {
  aiInsights: AIInsight[];
  aiLoading: boolean;
  aiError: string | null;
  fetchAIInsights: () => Promise<void>;
}

interface AIInsight {
  id: string;
  type: 'risk' | 'anomaly' | 'cost' | 'performance';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  createdAt: string;
}

// --- Combined Store Type ---
type AppStore = UIState & AttendanceState & PayrollState & AIAnalyticsState;

export const useAppStore = create<AppStore>((set, get) => ({
  // --- UI ---
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (value: boolean) => set({ sidebarCollapsed: value }),

  // --- Attendance ---
  attendanceRecords: [],
  leaveRequests: [],
  overtimeStats: null,
  anomalies: [],
  attendanceLoading: false,
  attendanceError: null,

  fetchAttendanceRecords: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const res = await apiClient.get<AttendanceRecord[]>('/attendance/records');
      set({ attendanceRecords: res.data, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '근태 기록 조회에 실패했습니다.', attendanceLoading: false });
    }
  },

  fetchLeaveRequests: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const res = await apiClient.get<LeaveRequest[]>('/attendance/leave-requests');
      set({ leaveRequests: res.data, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '휴가 신청 목록 조회에 실패했습니다.', attendanceLoading: false });
    }
  },

  fetchOvertimeStats: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const res = await apiClient.get<OvertimeStats>('/attendance/overtime-stats');
      set({ overtimeStats: res.data, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '초과근무 통요 조회에 실패했습니다.', attendanceLoading: false });
    }
  },

  fetchAnomalies: async () => {
    set({ attendanceLoading: true, attendanceError: null });
    try {
      const res = await apiClient.get<AnomalyItem[]>('/attendance/anomalies');
      set({ anomalies: res.data, attendanceLoading: false });
    } catch (err) {
      set({ attendanceError: '이상 즥후 조회에 실패했습니다.', attendanceLoading: false });
    }
  },

  // --- Payroll ---
  payrollItems: [],
  payrollLoading: false,
  payrollError: null,

  fetchPayrollItems: async () => {
    set({ payrollLoading: true, payrollError: null });
    try {
      const res = await apiClient.get<PayrollItem[]>('/payroll/items');
      set({ payrollItems: res.data, payrollLoading: false });
    } catch (err) {
      set({ payrollError: '급여 정보 조회에 실패했습니다.', payrollLoading: false });
    }
  },

  // --- AI Analytics ---
  aiInsights: [],
  aiLoading: false,
  aiError: null,

  fetchAIInsights: async () => {
    set({ aiLoading: true, aiError: null });
    try {
      const res = await apiClient.get<AIInsight[]>('/ai/insights');
      set({ aiInsights: res.data, aiLoading: false });
    } catch (err) {
      set({ aiError: 'AI 분석 데이터 조회에 실패했습니다.', aiLoading: false });
    }
  },
}));

export type { AIInsight, PayrollItem };
