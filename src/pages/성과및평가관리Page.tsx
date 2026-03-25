import React from 'react';
import { Typography, Row, Col } from 'antd';
import PerformanceReviewList from '@/features/performance/components/PerformanceReviewList';
import GoalProgressChart from '@/features/performance/components/GoalProgressChart';
import OKRSetupWizard from '@/features/performance/components/OKRSetupWizard';
import AIRecommendationPanel from '@/features/performance/components/AIRecommendationPanel';

const { Title } = Typography;

export default function PerformancePage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>성과 및 평가 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <PerformanceReviewList />
        </Col>
        <Col xs={24} lg={12}>
          <GoalProgressChart />
        </Col>
        <Col xs={24} lg={12}>
          <OKRSetupWizard />
        </Col>
        <Col xs={24} lg={12}>
          <AIRecommendationPanel />
        </Col>
      </Row>
    </div>
  );
}
