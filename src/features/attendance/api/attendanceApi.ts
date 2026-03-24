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
  { id: '11', employeeId: 'E001', employeeName: '김민수', date: '2025-01-15', clockIn: '09:00', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '12', employeeId: 'E002', employeeName: '이지은', date: '2025-01-15', clockIn: '08:50', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '13', employeeId: 'E003', employeeName: '박준형', date: '2025-01-15', clockIn: '08:55', clockOut: '20:00', status: 'normal', overtimeMinutes: 120 },
  { id: '14', employeeId: 'E004', employeeName: '최수진', date: '2025-01-15', clockIn: null, clockOut: null, status: 'leave', overtimeMinutes: 0 },
  { id: '15', employeeId: 'E005', employeeName: '정태우', date: '2025-01-15', clockIn: '09:05', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '16', employeeId: 'E008', employeeName: '강예린', date: '2025-01-06', clockIn: '08:50', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '17', employeeId: 'E008', employeeName: '강예린', date: '2025-01-07', clockIn: '09:00', clockOut: '18:05', status: 'normal', overtimeMinutes: 5 },
  { id: '18', employeeId: 'E008', employeeName: '강예린', date: '2025-01-08', clockIn: '08:55', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '19', employeeId: 'E009', employeeName: '서진우', date: '2025-01-13', clockIn: '09:30', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '20', employeeId: 'E009', employeeName: '서진우', date: '2025-01-14', clockIn: '09:25', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E004', employeeName: '최수진', department: '마케팅팀', leaveType: '연차', startDate: '2025-01-13', endDate: '2025-01-15', days: 3, reason: '개인 사유', status: 'approved', requestedAt: '2025-01-10T09:00:00' },
  { id: 'L002', employeeId: 'E010', employeeName: '오승현', department: '개발팀', leaveType: '반차(오전)', startDate: '2025-01-16', endDate: '2025-01-16', days: 0.5, reason: '병원 방문', status: 'pending', requestedAt: '2025-01-14T14:30:00' },
  { id: 'L003', employeeId: 'E011', employeeName: '배수연', department: '인사팀', leaveType: '경조사', startDate: '2025-01-20', endDate: '2025-01-22', days: 3, reason: '결혼식 참석', status: 'pending', requestedAt: '2025-01-14T10:15:00' },
  { id: 'L004', employeeId: 'E006', employeeName: '한소희', department: '디자인팀', leaveType: '병가', startDate: '2025-01-17', endDate: '2025-01-17', days: 1, reason: '감기 몸살', status: 'pending', requestedAt: '2025-01-15T08:00:00' },
  { id: 'L005', employeeId: 'E012', employeeName: '임채원', department: '영업팀', leaveType: '연차', startDate: '2025-01-23', endDate: '2025-01-24', days: 2, reason: '가족 여행', status: 'rejected', requestedAt: '2025-01-12T11:00:00' },
  { id: 'L006', employeeId: 'E013', employeeName: '노은지', department: '재무팀', leaveType: '반차(오후)', startDate: '2025-01-16', endDate: '2025-01-16', days: 0.5, reason: '자녀 학교 행사', status: 'pending', requestedAt: '2025-01-15T09:20:00' },
  { id: 'L007', employeeId: 'E001', employeeName: '김민수', department: '개발팀', leaveType: '특별휴가', startDate: '2025-01-27', endDate: '2025-01-28', days: 2, reason: '리프레시 휴가', status: 'pending', requestedAt: '2025-01-15T10:00:00' },
];

const mockOvertimeStats: OvertimeStats = {
  totalEmployees: 48,
  avgOvertimeHours: 12.5,
  maxOvertimeHours: 38.2,
  overLimitCount: 5,
  weeklyTrend: [
    { week: '1주차', hours: 10.2 },
    { week: '2주차', hours: 14.8 },
    { week: '3주차', hours: 11.5 },
    { week: '4주차', hours: 13.1 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  { id: 'A001', employeeId: 'E002', employeeName: '이지은', department: '개발팀', type: 'frequent_late', severity: 'medium', description: '최근 5일간 3회 지각이 감지되었습니다. 평소 패턴과 다른 출근 시간이 반복되고 있습니다.', detectedAt: '2025-01-15T06:00:00' },
  { id: 'A002', employeeId: 'E003', employeeName: '박준형', department: '개발팀', type: 'unusual_overtime', severity: 'high', description: '이번 주 초과근무 시간이 주 52시간 제한에 근접하고 있습니다. 현재 주 48.5시간 근무 중입니다.', detectedAt: '2025-01-15T06:00:00' },
  { id: 'A003', employeeId: 'E007', employeeName: '윤도현', department: '영업팀', type: 'consecutive_absence', severity: 'high', description: '사전 휴가 신청 없이 2일 연속 결근이 감지되었습니다. 즉시 확인이 필요합니다.', detectedAt: '2025-01-15T06:00:00' },
  { id: 'A004', employeeId: 'E009', employeeName: '서진우', department: '기획팀', type: 'pattern_change', severity: 'low', description: '최근 2주간 출근 시간이 평균 25분 늦어지는 패턴 변화가 감지되었습니다.', detectedAt: '2025-01-14T06:00:00' },
];

export async function fetchAttendanceRecords(month?: string): Promise<AttendanceRecord[]> {
  await delay(500);
  return mockAttendanceRecords;
}

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  await delay(400);
  return mockLeaveRequests;
}

export async function updateLeaveStatus(id: string, status: 'approved' | 'rejected'): Promise<LeaveRequest> {
  await delay(300);
  const req = mockLeaveRequests.find((r) => r.id === id);
  if (!req) throw new Error('요청을 찾을 수 없습니다.');
  req.status = status;
  return { ...req };
}

export async function fetchOvertimeStats(): Promise<OvertimeStats> {
  await delay(350);
  return mockOvertimeStats;
}

export async function fetchAnomalies(): Promise<AnomalyItem[]> {
  await delay(300);
  return mockAnomalies;
}
