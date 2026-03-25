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
  { id: '9', employeeId: 'E006', employeeName: '한섌�v�', date: '2025-01-14', clockIn: '09:05', clockOut: '18:30', status: 'normal', overtimeMinutes: 30 },
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
    reason: '개인 사유로 인핉 신청',
    status: 'pending',
    requestedAt: '2025-01-15T09:00:00Z',
  },
  {
    id: 'LR002',
    employeeId: 'E002',
    employeeName: '이지은',
    department: '마케팅',
    leaveType: '빘가',
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
    employeeName: '정태웰',
    department: '영엄팀',
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
    { department: '재무팀', avgHours: 7.1, employeeCount: 18 },
    { department: '디자인팀', avgHours: 11.3, employeeCount: 20 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  {
    id: 'ANM-001',
    type: 'unusual_overtime',
    severity: 'high',
    employeeId: 'E003',
    employeeName: '박준형',
    department: '개발팀',
    description: '최근 2주읈 �C근 시간이 22시를 초과',
    detectedAt: '2025-01-14T18:00:00Z',
    confidence: 0.92,
  },
  {
    id: 'ANM-002',
    type: 'frequent_late',
    severity: 'medium',
    employeeId: 'E002',
    employeeName: '이지은',
    department: '마케팅',
    description: '최근 1개원 내 지각 회수가 4회로 증가',
    detectedAt: '2025-01-13T09:30:00Z',
    confidence: 0.85,
  },
  {
    id: 'ANM-003',
    type: 'pattern_change',
    severity: 'low',
    employeeId: 'E005',
    employeeName: '젔태우',
    department: '영업팀',
    description: '최근 조퇴 패턴이 감지 출근에서 지걨> 조퇴로 변경',
    detectedAt: '2025-01-12T12:00:00Z',
    confidence: 0.73,
  },
];

// --- API functions ---

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
    const request = mockLeaveRequests.find((r) => r.id === id);
    if (!request) throw new Error('Leave request not found');
    return { ...request, status };
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
