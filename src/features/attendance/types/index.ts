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
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DepartmentOvertimeStat {
  department: string;
  avgHours: number;
  employeeCount: number;
}

export interface OvertimeStats {
  totalEmployees: number;
  avgOvertimeHours: number;
  maxOvertimeEmployee: string;
  maxOvertimeHours: number;
  departmentStats: DepartmentOvertimeStat[];
}

export interface AnomalyItem {
  id: string;
  employeeName: string;
  department: string;
  type: 'frequent_late' | 'unusual_overtime' | 'pattern_change' | 'consecutive_absence';
  severity: 'high' | 'medium' | 'low';
  description: string;
  detectedAt: string;
  confidence: number;
}
