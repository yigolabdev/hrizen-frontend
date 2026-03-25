import { apiClient } from '@/lib/api';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock data (will be replaced by real API calls when backend is ready) ---

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: 'E001', employeeName: '김민수', date: '2025-01-13', clockIn: '08:55', clockOut: '18:05', status: 'normal', overtimeMinutes: 5 },
  { id: '2', employeeId: 'E002', employeeName: '이지은', date: '2025-01-13', clockIn: '09:15', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '3', employeeId: 'E003', employeeName: '박준형', date: '2025-01-13', clockIn: '08:50', clockOut: '21:30', status: 'normal', overtimeMinutes: 210 },
  { id: '4', employeeId: 'E004', employeeName: '최수진', date: '2025-01-13', clockIn: null, clockOut: null, status: 'leave', overtimeMinutes: 0 },
  { id: '5', employeeId: 'E005', employeeName: '정태� ', date: '2025-01-13', clockIn: '09:00', clockOut: '16:30', status: 'early_leave', overtimeMinutes: 0 },
  { id: '6', employeeId: 'E001', employeeName: '김민수', date: '2025-01-14', clockIn: '08:58', clockOut: '18:10', status: 'normal', overtimeMinutes: 10 },
  { id: '7', employeeId: 'E002', employeeName: '이지은', date: '2025-01-14', clockIn: '09:20', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '8', employeeId: 'E003', employeeName: '박준형', date: '2025-01-14', clockIn: '08:45', clockOut: '22:00', status: 'normal', overtimeMinutes: 240 },
  { id: '9', employeeId: 'E006', employeeName: '한소희', date: '2025-01-14', clockIn: '08:50', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '10', employeeId: 'E007', employeeName: '윤도현', date: '2025-01-14', clockIn: null, clockOut: null, status: 'absent', overtimeMinutes: 0 },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E004', employeeName: '최수진', department: '인사팀', leaveType: '연차', startDate: '2025-01-13', endDate: '2025-01-14', days: 2, reason: '개인 사유', status: 'approved' },
  { id: 'L002', employeeId: 'E005', employeeName: '정태우', department: '영엄팀', leaveType: '반차(오전)', startDate: '2025-01-15', endDate: '2025-01-15', days: 0.5, reason: '병원 받문', status: 'pending' },
  { id: 'L003', employeeId: 'E008', employeeName: '강예릚', department: '디자인팀', leaveType: '별가', startDate: '2025-01-16', endDate: '2025-01-17', days: 2, reason: '괐감 치료', status: 'pending' },
  { id: 'L004', employeeId: 'E001', employeeName: '김민수', department: '개발팀', leaveType: '연차', startDate: '2025-01-20', endDate: '2025-01-22', days: 3, reason: '가족여행', status: 'pending' },
];

const mockOvertimeStats: OvertimeStats = {
  totalEmployees: 42,
  avgOvertimeHours: 12.5,
  maxOvertimeEmployee: '박준형',
  maxOvertimeHours: 38,
  departmentStats: [
    { department: '개발팀', avgHours: 18, employeeCount: 15 },
    { department: '영업팀', avgHours: 12, employeeCount: 10 },
    { department: '디자인팀', avgHours: 8, employeeCount: 8 },
    { department: '인사팀', avgHours: 5, employeeCount: 6 },
    { department: '재무팀', avgHours: 3, employeeCount: 4 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  {
    id: 'A001',
    employeeId: 'E002',
    employeeName: '이지은',
    type: 'frequent_late',
    severity: 'medium',
    description: '최근 3 주간 지각 5회원 이상 감지됨.',
    detectedAt: '2025-01-14T09:00:00Z',
    confidence: 0.85,
  },
  {
    id: 'A002',
    employeeId: 'E003',
    employeeName: '박준형',
    type: 'unusual_overtime',
    severity: 'high',
    description: '주군 초과근무 시간이 38시간으로 범정기준 초과.',
    detectedAt: '2025-01-14T10:30:00Z',
    confidence: 0.92,
  },
  {
    id: 'A003',
    employeeId: 'E007',
    employeeName: '유도현',
    type: 'consecutive_absence',
    severity: 'high',
    description: '연속 2일 무단결 결근. 사전 확인 필요.',
    detectedAt: '2025-01-14T11:00:00Z',
    confidence: 0.95,
  },
];

// --- API Functions with fallback to mock ---

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export async function fetchAttendanceRecords(): Promise<AttendanceRecord[]> {
  if (USE_MOCK) {
    await delay(500);
    return mockAttendanceRecords;
  }
  return apiClient.get<AttendanceRecord[]>('/attendance/records');
}

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  if (USE_MOCK) {
    await delay(400);
    return mockLeaveRequests;
  }
  return apiClient.get<LeaveRequest[]>('/attendance/leave-requests');
}

export async function updateLeaveStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<LeaveRequest> {
  if (USE_MOCK) {
    await delay(300);
    const req = mockLeaveRequests.find((r) => r.id === id);
    if (!req) throw new Error('휴가 신청을 찾을 수 없습니다.');
    return { ...req, status };
  }
  return apiClient.patch<LeaveRequest>(`/attendance/leave-requests/${id}`, { status });
}

export async function fetchOvertimeStats(): Promise<OvertimeStats> {
  if (USE_MOCK) {
    await delay(600);
    return mockOvertimeStats;
  }
  return apiClient.get<OvertimeStats>('/attendance/overtime-stats');
}

export async function fetchAnomalies(): Promise<AnomalyItem[]> {
  if (USE_MOCK) {
    await delay(700);
    return mockAnomalies;
  }
  return apiClient.get<AnomalyItem[]>('/attendance/anomalies');
}
