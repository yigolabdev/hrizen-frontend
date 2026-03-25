import { apiClient } from '@/lib/api';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: 'E001', employeeName: '김민수', date: '2025-01-13', clockIn: '08:55', clockOut: '18:05', status: 'normal', overtimeMinutes: 5 },
  { id: '2', employeeId: 'E002', employeeName: '이지은', date: '2025-01-13', clockIn: '09:15', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '3', employeeId: 'E003', employeeName: '박준형', date: '2025-01-13', clockIn: '08:50', clockOut: '21:30', status: 'normal', overtimeMinutes: 210 },
  { id: '4', employeeId: 'E004', employeeName: '최수진', date: '2025-01-13', clockIn: null, clockOut: null, status: 'leave', overtimeMinutes: 0 },
  { id: '5', employeeId: 'E005', employeeName: '정태우', date: '2025-01-13', clockIn: '09:00', clockOut: '16:30', status: 'early_leave', overtimeMinutes: 0 },
  { id: '6', employeeId: 'E001', employeeName: '김민수', date: '2025-01-14', clockIn: '08:58', clockOut: '18:10', status: 'normal', overtimeMinutes: 10 },
  { id: '7', employeeId: 'E002', employeeName: '이지은', date: '2025-01-14', clockIn: '09:20', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '8', employeeId: 'E003', employeeName: '박준형', date: '2025-01-14', clockIn: '08:45', clockOut: '22:00', status: 'normal', overtimeMinutes: 240 },
  { id: '9', employeeId: 'E006', employeeName: '한소희', date: '2025-01-14', clockIn: '08:50', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '10', employeeId: 'E007', employeeName: '윤도현', date: '2025-01-14', clockIn: null, clockOut: null, status: 'absent', overtimeMinutes: 0 },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E004', employeeName: '최수진', department: '원옉수수', leaveType: '연차', startDate: '2025-01-13', endDate: '2025-01-14', days: 2, reason: '개인 사유', status: 'approved' },
  { id: 'L002', employeeId: 'E005', employeeName: '정태우', department: '영업케', leaveType: '발차(오전)', startDate: '2025-01-15', endDate: '2025-01-15', days: 0.5, reason: '병원 방문', status: 'pending' },
  { id: 'L003', employeeId: 'E008', employeeName: '강예린', department: '디자인팀', leaveType: '병가', startDate: '2025-01-16', endDate: '2025-01-17', days: 2, reason: '독감 치료', status: 'pending' },
  { id: 'L004', employeeId: 'E001', employeeName: '김민수', department: '개발팀', leaveType: '연차', startDate: '2025-01-20', endDate: '2025-01-22', days: 3, reason: '가졀여행', status: 'pending' },
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
    { department: '원옉수수', avgHours: 5, employeeCount: 5 },
    { department: '재무팀', avgHours: 4, employeeCount: 4 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  {
    id: 'ANM-001',
    employeeId: 'E002',
    employeeName: '이지은',
    type: 'frequent_late',
    severity: 'medium',
    description: '최근 2주간 3회 지각 발생',
    detectedAt: '2025-01-14T09:00:00Z',
    recommendation: '직원과 :1 멯봄을 권장합니다.',
  },
  {
    id: 'ANM-002',
    employeeId: 'E003',
    employeeName: '박준형',
    type: 'unusual_overtime',
    severity: 'high',
    description: '죴 03시 음을 초과하는 초과차업비 감지됨',
    detectedAt: '2025-01-14T22:00:00Z',
    recommendation: '근로기준법 준수 여부 확인 밠갈만습니다.',
  },
  {
    id: 'ANM-003',
    employeeId: 'E007',
    employeeName: '윬도현',
    type: 'consecutive_absence',
    severity: 'high',
    description: '묻단사유없쉬 결근 ؈가<-',
    detectedAt: '2025-01-14T10:00:00Z',
    recommendation: '인사팀옐 혴활하여 사유를 확인하세요.',
  },
];

/**
 * Fetch attendance records.
 * Tries real API first, falls back to mock data.
 */
export async function fetchAttendanceRecords(): Promise<AttendanceRecord[]> {
  try {
    const data = await apiClient.get<AttendanceRecord[]>('/attendance/records');
    return data;
  } catch {
    await delay(500);
    return mockAttendanceRecords;
  }
}

/**
 * Fetch leave requests.
 */
export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  try {
    const data = await apiClient.get<LeaveRequest[]>('/attendance/leave-requests');
    return data;
  } catch {
    await delay(400);
    return mockLeaveRequests;
  }
}

/**
 * Update leave request status.
 */
export async function updateLeaveStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<LeaveRequest> {
  try {
    const data = await apiClient.patch<LeaveRequest>(`/attendance/leave-requests/${id}`, { status });
    return data;
  } catch {
    await delay(500);
    const request = mockLeaveRequests.find((r) => r.id === id);
    if (!request) throw new Error('Not found');
    return { ...request, status };
  }
}

/**
 * Fetch overtime stats.
 */
export async function fetchOvertimeStats(): Promise<OvertimeStats> {
  try {
    const data = await apiClient.get<OvertimeStats>('/attendance/overtime-stats');
    return data;
  } catch {
    await delay(400);
    return mockOvertimeStats;
  }
}

/**
 * Fetch AI anomalies.
 */
export async function fetchAnomalies(): Promise<AnomalyItem[]> {
  try {
    const data = await apiClient.get<AnomalyItem[]>('/attendance/anomalies');
    return data;
  } catch {
    await delay(600);
    return mockAnomalies;
  }
}
