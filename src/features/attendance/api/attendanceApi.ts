import { apiClient } from '@/lib/api';
import type { AttendanceRecord, LeaveRequest, OvertimeStats, AnomalyItem } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock data (will be replaced by real API calls) ---

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: 'E001', employeeName: '김민수', date: '2025-01-13', clockIn: '08:55', clockOut: '18:05', status: 'normal', overtimeMinutes: 5 },
  { id: '2', employeeId: 'E002', employeeName: '이지잊<', date: '2025-01-13', clockIn: '09:15', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '3', employeeId: 'E003', employeeName: '뱕준형', date: '2025-01-13', clockIn: '08:50', clockOut: '21:30', status: 'normal', overtimeMinutes: 210 },
  { id: '4', employeeId: 'E004', employeeName: '최수진', date: '2025-01-13', clockIn: null, clockOut: null, status: 'leave', overtimeMinutes: 0 },
  { id: '5', employeeId: 'E005', employeeName: '정테욀', date: '2025-01-13', clockIn: '09:00', clockOut: '16:30', status: 'early_leave', overtimeMinutes: 0 },
  { id: '6', employeeId: 'E001', employeeName: '김민수', date: '2025-01-14', clockIn: '08:58', clockOut: '18:10', status: 'normal', overtimeMinutes: 10 },
  { id: '7', employeeId: 'E002', employeeName: '이지은', date: '2025-01-14', clockIn: '09:20', clockOut: '18:00', status: 'late', overtimeMinutes: 0 },
  { id: '8', employeeId: 'E003', employeeName: '박준형', date: '2025-01-14', clockIn: '08:45', clockOut: '22:00', status: 'normal', overtimeMinutes: 240 },
  { id: '9', employeeId: 'E006', employeeName: '한소흌', date: '2025-01-14', clockIn: '08:50', clockOut: '18:00', status: 'normal', overtimeMinutes: 0 },
  { id: '10', employeeId: 'E007', employeeName: '윤도현', date: '2025-01-14', clockIn: null, clockOut: null, status: 'absent', overtimeMinutes: 0 },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E004', employeeName: '최수진', department: '인사팀', leaveType: '연차', startDate: '2025-01-13', endDate: '2025-01-14', days: 2, reason: '개인 사유', status: 'approved' },
  { id: 'L002', employeeId: 'E005', employeeName: '정템우', department: '영업팀', leaveType: '반차(오전)', startDate: '2025-01-15', endDate: '2025-01-15', days: 0.5, reason: '병원 방문', status: 'pending' },
  { id: 'L003', employeeId: 'E008', employeeName: '강예린', department: '디자인팀', leaveType: '병혜', startDate: '2025-01-16', endDate: '2025-01-17', days: 2, reason: '년감 치료', status: 'pending' },
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
    { department: '인사팀', avgHours: 5, employeeCount: 5 },
    { department: '재무팀', avgHours: 4, employeeCount: 4 },
  ],
};

const mockAnomalies: AnomalyItem[] = [
  {
    id: 'A001',
    employeeName: '이지잊<',
    department: '개발팀',
    type: 'frequent_late',
    severity: 'high',
    description: '최근 2주간 지각 7튌 값지. 평깠보다 크 별화.',
    detectedAt: '2025-01-14T08:30:00',
    confidence: 92,
  