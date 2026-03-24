export interface Allowance {
  id: string;
  name: string;
  amount: number;
}

export interface Deduction {
  id: string;
  name: string;
  amount: number;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  baseSalary: number;
  allowances: Allowance[];
  deductions: Deduction[];
  grossPay: number;
  totalDeductions: number;
  netPay: number;
  payPeriod: string;
  payDate: string;
  status: 'draft' | 'calculated' | 'confirmed' | 'paid';
}

export interface TaxComplianceItem {
  id: string;
  name: string;
  status: 'compliant' | 'warning' | 'non_compliant' | 'pending';
  description: string;
  lastChecked: string;
  regulation: string;
}

export interface ElectronicContract {
  id: string;
  employeeName: string;
  contractType: string;
  status: 'draft' | 'sent' | 'signed' | 'expired';
  createdAt: string;
  signedAt: string | null;
}
