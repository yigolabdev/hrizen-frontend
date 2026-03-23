import React from 'react';
import { Typography, Breadcrumb, Row, Col, Card } from 'antd';
import GoalProgressChart from '@/features/performance/components/GoalProgressChart';
import PerformanceReviewList from '@/features/performance/components/PerformanceReviewList';
import OKRSetupWizard from '@/features/performance/components/OKRSetupWizard';
import AIRecommendationPanel from '@/features/performance/components/AIRecommendationPanel';

const { Title } = Typography;

export default function 성과및평가관리Page() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        items={[
          { title: '홀' },
          { title: '성과 및 평가 관리' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        성과 및 평가 관리
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="목표 진햋;'가"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 16 }}
          >
            <GoalProgressChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="AI 추천 패널"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 16 }}
          >
            <AIRecommendationPanel />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="성과 평가 목록"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 16 }}
          >
            <PerformanceReviewList />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="OKR 설정"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 16 }}
          >
            <OKRSetupWizard />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
