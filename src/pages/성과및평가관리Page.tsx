import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import OKRSetupWizard from '@/features/performance/components/OKRSetupWizard';
import PerformanceReviewList from '@/features/performance/components/PerformanceReviewList';
import GoalProgressChart from '@/features/performance/components/GoalProgressChart';
import AIRecommendationPanel from '@/features/performance/components/AIRecommendationPanel';

const { Title } = Typography;

export default function PerformancePage() {
  return (
    <div style={{ padding: '0 4px' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
            성과 및 평가 관리
          </Title>
          <Typography.Text type="secondary" style={{ fontSize: 15 }}>
            OKR 설정, 성과 리뷰 및 평가 결과를 기록하고 AI 기반 인재 진단을 확인하세요.
          </Typography.Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <GoalProgressChart />
          </Col>
          <Col xs={24} lg={10}>
            <AIRecommendationPanel />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} xl={10}>
            <OKRSetupWizard />
          </Col>
          <Col xs={24} xl={14}>
            <PerformanceReviewList />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
