import { apiClient } from '@/lib/api';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock data (will be replaced by real API calls) ---

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: 'E001', employeeName: '김민수', date: '2025-01-13', clockIn: '08:55', clockOut: '18:05', status: 'normal', overtimeMinutes: 5 },
  { id: '2', employeeId: 'E002', employeeName: '이지은', date: '2025-01-13', clockIn: '09:15', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '3', employeeId: 'E003', employeeName: '한준형', date: '2025-01-13', clockIn: '08:50', clockOut: '21:30', status: 'normal', overtimeMinutes: 210 },
  { id: '4', employeeId: 'E004', employeeName: '최수진', date: '2025-01-13', clockIn: null, clockOut: null, status: 'leave', overtimeMinutes: 0 },
  { id: '5', employeeId: 'E005', employeeName: '젔태우', date: '2025-01-13', clockIn: '09:00', clockOut: '16:30', status: 'early_leave', overtimeMinutes: 0 },
  { id: '6', employeeId: 'E001', employeeName: '김민수', date: '2025-01-14', clockIn: '08:58', clockOut: '18:10', status: 'normal', overtimeMinutes: 10 },
  { id: '7', employeeId: 'E002', employeeName: '이지은', date: '2025-01-14', clockIn: '09:20', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '8', employeeId: 'E003', employeeName: '박준형', date: '2025-01-14', clockIn: '08:45', clockOut: '22:00', status: 'normal', overtimeMinutes: 240 },
  { id: '9', employeeId: 'E006', employeeName: '한소희', date: '2025-01-14', clockIn: '08:50', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '10', employeeId: 'E007', employeeName: '유도현', date: '2025-01-14', clockIn: null, clockOut: null, status: 'absent', overtimeMinutes: 0 },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E004', employeeName: '최수진', department: '인사팀', leaveType: '연차', startDate: '2025-01-13', endDate: '2025-01-14', days: 2, reason: '개인 살육', status: 'approved' },
  { id: 'L002', employeeId: 'E005', employeeName: '정태�', department: '웁업팀', leaveType: '반연(오전)', startDate: '2025-01-15', endDate: '2025-01-15', days: 0.5, reason: '병� 방문', status: 'pending' },
  { id: 'L003', employeeId: 'E008', employeeName: '강예린', department: '땔자인팀', leaveType: '병가', startDate: '2025-01-16', endDate: '2025-01-17', days: 2, reason: '치감 치료', status: 'pending' },
  { id: 'L004', employeeId: 'E001', employeeName: '김민수', department: '개발팀', leaveType: '연차', startDate: '2025-01-20', endDate: '2025-01-22', days: 3, reason: '가족허행', status: 'pending' },
];

const mockOvertimeStats: OvertimeStats = {
  totalEmployees: 42,
  avgOvertimeHours: 12.5,
  maxOvertimeEmployee: '박준형',
  maxOvertimeHours: 38,
  departmentStats: [
    { department: '개발팀', avgHours: 18, employeeCount: 15 },
    { department: '영엄팀', avgHours: 12, employeeCount: 10 },
    { department: '디자인팀', avgHours: 8, employeeCount: 8 },
    { department: '인사팀', avgHours: 6, employeeCount: 9 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  { id: 'A001', type: 'frequent_late', severity: 'high', employeeId: 'E002', employeeName: '이지은', department: '마케팅', description: '최근 2주차이내 지각 5회이상 감지됨', detectedAt: '2025-01-14T09:30:00', confidence: 0.92 },
  { id: 'A002', type: 'unusual_overtime', severity: 'high', employeeId: 'E003', employeeName: '한준형', department: '개발팀', description: '3일 연속으로 있일 초과근무 시간이 50시간을 초과먨', detectedAt: '2025-01-14T10:00:00', confidence: 0.88 },
  { id: 'A003', type: 'pattern_change', severity: 'medium', employeeId: 'E005', employeeName: '젔태우', department: '웁업팀', description: '최근근 패턴이 이듼찀보다 출근이 완당하게오', detectedAt: '2025-01-13T16:00:00', confidence: 0.75 },
  { id: 'A004', type: 'consecutive_absence', severity: 'low', employeeId: 'E007', employeeName: '유도현', department: '인사팀', description: '2일 연속으로 휴가 잠이안고 결근이 감지됨', detectedAt: '2025-01-14T14:00:00', confidence: 0.68 },
];

// --- USE_MOCK flag: set to false when backend is ready ---
const USE_MOCK = true;

// --- Attendance Records ---
export async function fetchAttendanceRecords(params?: {
  startDate?: string;
  endDate?: string;
  employeeId?: string;
}): Promise<AttendanceRecord[]> {
  if (USE_MOCK) {
    await delay(500);
    let result = [...mockAttendanceRecords];
    if (params?.employeeId) {
      result = result.filter((r) => r.employeeId === params.employeeId);
    }
    return result;
  }
  return apiClient.get<AttendanceRecord[]>('/attendance/records', params as Record<string, string>);
}

// --- Leave Requests ---
export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  if (USE_MOCK) {
    await delay(400);
    return [...mockLeaveRequests];
  }
  return apiClient.get<LeaveRequest[]>('/attendance/leave-requests');
}

export async function updateLeaveStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<LeaveRequest> {
  if (USE_MOCK) {
    await delay(300);
    const request = mockLeaveRequests.find((r) => r.id === id);
    if (!request) throw new Error('Leave request not found');
    return { ...request, status };
  }
  return apiClient.patch<LeaveRequest>(`/attendance/leave-requests/${id}`, { status });
}

// --- Overtime Stats ---
export async function fetchOvertimeStats(): Promise<OvertimeStats> {
  if (USE_MOCK) {
    await delay(600);
    return { ...mockOvertimeStats };
  }
  return apiClient.get<OvertimeStats>('/attendance/overtime-stats');
}

// --- Anomalies ---
export async function fetchAnomalies(): Promise<AnomalyItem[]> {
  if (USE_MOCK) {
    await delay(700);
    return [...mockAnomalies];
  }
  return apiClient.get<AnomalyItem[]>('/attendance/anomalies');
}
