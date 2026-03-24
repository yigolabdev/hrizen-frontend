export interface OKRObjective {
  id: string;
  title: string;
  description: string;
  quarter: string;
  keyResults: KeyResult[];
  status: 'draft' | 'active' | 'completed';
  progress: number;
  owner: string;
  createdAt: string;
}

export interface KeyResult {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  progress: number;
}

export interface PerformanceReview {
  id: string;
  employeeName: string;
  department: string;
  position: string;
  reviewPeriod: string;
  selfScore: number;
  managerScore: number;
  finalScore: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  status: 'pending' | 'in_progress' | 'completed';
  updatedAt: string;
}

export interface GoalProgress {
  month: string;
  achieved: number;
  target: number;
}

export interface AIRecommendation {
  id: string;
  type: 'warning' | 'suggestion' | 'insight';
  title: string;
  description: string;
  confidence: number;
  employeeName?: string;
  actionLabel?: string;
}
