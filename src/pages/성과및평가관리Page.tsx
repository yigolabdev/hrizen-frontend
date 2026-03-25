import React from 'react';
import { Typography, Space } from 'antd';
import PerformanceReviewList from '@/features/performance/components/PerformanceReviewList';
import GoalProgressChart from '@/features/performance/components/GoalProgressChart';
import OKRSetupWizard from '@/features/performance/components/OKRSetupWizard';
import AIRecommendationPanel from '@/features/performance/components/AIRecommendationPanel';

const { Title } = Typography;

export default function PerformancePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>성과 및 평가 관리</Title>
      <PerformanceReviewList />
      <GoalProgressChart />
      <OKRSetupWizard />
      <AIRecommendationPanel />
    </Space>
  );
}
