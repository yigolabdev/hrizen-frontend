import { apiClient } from '@/lib/api';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

// --- Mock data ---

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: 'E001', employeeName: '김민수', date: '2025-01-13', clockIn: '08:55', clockOut: '18:05', status: 'normal', overtimeMinutes: 5 },
  { id: '2', employeeId: 'E002', employeeName: '이지은', date: '2025-01-13', clockIn: '09:15', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '3', employeeId: 'E003', employeeName: '박준형', date: '2025-01-13', clockIn: '08:50', clockOut: '21:30', status: 'normal', overtimeMinutes: 210 },
  { id: '4', employeeId: 'E004', employeeName: '최수진', date: '2025-01-13', clockIn: null, clockOut: null, status: 'leave', overtimeMinutes: 0 },
  { id: '5', employeeId: 'E005', employeeName: '정태우', date: '2025-01-13', clockIn: '09:00', clockOut: '16:30', status: 'early_leave', overtimeMinutes: 0 },
  { id: '6', employeeId: 'E001', employeeName: '김민수', date: '2025-01-14', clockIn: '08:58', clockOut: '18:10', status: 'normal', overtimeMinutes: 10 },
  { id: '7', employeeId: 'E002', employeeName: '이지읨<', date: '2025-01-14', clockIn: '09:20', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '8', employeeId: 'E003', employeeName: '박준형', date: '2025-01-14', clockIn: '08:45', clockOut: '22:00', status: 'normal', overtimeMinutes: 240 },
  { id: '9', employeeId: 'E006', employeeName: '한서연', date: '2025-01-14', clockIn: '09:05', clockOut: '18:30', status: 'normal', overtimeMinutes: 30 },
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: 'E001',
    employeeName: '김민수',
    department: '개발팀',
    leaveType: '연차',
    startDate: '2025-01-20',
    endDate: '2025-01-21',
    days: 2,
    reason: '개인 사유로 인한 신청',
    status: 'pending',
    requestedAt: '2025-01-15T09:00:00Z',
  },
  {
    id: 'LR002',
    employeeId: 'E002',
    employeeName: '이지은',
    department: '마케팅',
    leaveType: '병가',
    startDate: '2025-01-16',
    endDate: '2025-01-17',
    days: 2,
    reason: '병원 치료, 진단서 첨부',
    status: 'approved',
    requestedAt: '2025-01-14T14:30:00Z',
  },
  {
    id: 'LR003',
    employeeId: 'E005',
    employeeName: '정태욀',
    department: '영업팀',
    leaveType: '반차(오전)',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    days: 0.5,
    reason: '개인 용무',
    status: 'pending',
    requestedAt: '2025-01-15T11:00:00Z',
  },
];

const mockOvertimeStats: OvertimeStats = {
  totalEmployees: 1248,
  avgOvertimeHours: 12.5,
  maxOvertimeHours: 45,
  overLimitCount: 23,
  departmentStats: [
    { department: '개발팀', avgHours: 18.2, employeeCount: 42 },
    { department: '영엄팀', avgHours: 14.5, employeeCount: 35 },
    { department: '마케팅', avgHours: 9.8, employeeCount: 28 },
    { department: '인사팀', avgHours: 6.2, employeeCount: 15 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  {
    id: 'ANM-001',
    employeeId: 'E003',
    employeeName: '박준형',
    type: 'unusual_overtime',
    severity: 'high',
    description: '최근 2주간 일일 평균근제 시간 12시간 초과, 주말 근무가 4회 이상 감지되었습니다.',
    detectedAt: '2025-01-14T10:00:00Z',
    confidence: 92,
  },
  {
    id: 'ANM-002',
    employeeId: 'E002',
    employeeName: '이록은',
    type: 'frequent_late',
    severity: 'medium',
    description: '최근 1개월 내 지각 횘수가 7회로, 이전 3개월 평균(1회) 대비 크게 즁가했습니다.',
    detectedAt: '2025-01-14T08:00:00Z',
    confidence: 89,
  },
  {
    id: 'ANM-003',
    employeeId: 'E005',
    employeeName: '정태우',
    type: 'pattern_change',
    severity: 'low',
    description: '최근 1주일 근무 패턴이 변경되었습니다. 조기 퍴부 빈도가 증가했습니다.',
    detectedAt: '2025-01-13T16:00:00Z',
    confidence: 75,
  },
];

// --- API functions ---

export async function fetchAttendanceRecords(): Promise<AttendanceRecord[]> {
  if (USE_MOCK) {
    await delay(600);
    return mockAttendanceRecords;
  }
  return apiClient.get<AttendanceRecord[]>('/api/attendance/records');
}

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  if (USE_MOCK) {
    await delay(500);
    return mockLeaveRequests;
  }
  return apiClient.get<LeaveRequest[]>('/api/attendance/leave-requests');
}

export async function updateLeaveStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<LeaveRequest> {
  if (USE_MOCK) {
    await delay(400);
    const request = mockLeaveRequests.find((r) => r.id === id);
    if (!request) throw new Error('Leave request not found');
    return { ...request, status };
  }
  return apiClient.patch<LeaveRequest>(`/api/attendance/leave-requests/${id}`, { status });
}

export async function fetchOvertimeStats(): Promise<OvertimeStats> {
  if (USE_MOCK) {
    await delay(700);
    return mockOvertimeStats;
  }
  return apiClient.get<OvertimeStats>('/api/attendance/overtime-stats');
}

export async function fetchAnomalies(): Promise<AnomalyItem[]> {
  if (USE_MOCK) {
    await delay(800);
    return mockAnomalies;
  }
  return apiClient.get<AnomalyItem[]>('/api/attendance/anomalies');
}
