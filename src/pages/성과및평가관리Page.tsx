import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PerformanceReviewList from '@/features/performance/components/PerformanceReviewList';
import GoalProgressChart from '@/features/performance/components/GoalProgressChart';
import OKRSetupWizard from '@/features/performance/components/OKRSetupWizard';
import AIRecommendationPanel from '@/features/performance/components/AIRecommendationPanel';

const { Title } = Typography;

export default function PerformancePage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        성과 및 폈가 관리
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <AIRecommendationPanel />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <PerformanceReviewList />
          </Col>
          <Col xs={24} lg={12}>
            <GoalProgressChart />
          </Col>
        </Row>
        <OKRSetupWizard />
      </Space>
    </div>
  );
}
