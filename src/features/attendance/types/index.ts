export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: 'normal' | 'late' | 'early_leave' | 'absent' | 'holiday' | 'leave';
  overtimeMinutes: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: '연차' | '반차(오전)' | '반차(오후)' | '병가' | '경조사' | '공가' | '특별휴가';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface OvertimeStats {
  totalEmployees: number;
  avgOvertimeHours: number;
  maxOvertimeHours: number;
  overLimitCount: number;
  weeklyTrend: { week: string; hours: number }[];
}

export interface AnomalyItem {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  type: 'frequent_late' | 'unusual_overtime' | 'pattern_change' | 'consecutive_absence';
  severity: 'high' | 'medium' | 'low';
  description: string;
  detectedAt: string;
}
