import React from 'react';
import { PageHeader, Row, Col, Card } from 'antd';
import OKRSetupWizard from '@/features/performance/components/OKRSetupWizard';
import PerformanceReviewList from '@/features/performance/components/PerformanceReviewList';
import GoalProgressChart from '@/features/performance/components/GoalProgressChart';
import AIRecommendationPanel from '@/features/performance/components/AIRecommendationPanel';

export default function 성과및평가관리Page() {
  return (
    <div style={{ backgroundColor: '#F2F2F7', minHeight: '100vh', padding: 24 }}>
      <PageHeader
        title="성과 및 평가 관리"
        subTitle="OKR 설정, 성과 리뷰 및 인재 진단을 한눈에"
        style={{ backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 24 }}
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title="OKR 설정 마법사"
            bordered={false}
            style={{ borderRadius: 12, minHeight: 360 }}
          >
            <OKRSetupWizard />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="목표 달성 진행 현황"
            bordered={false}
            style={{ borderRadius: 12, minHeight: 360 }}
          >
            <GoalProgressChart />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="성과 리뷰 목록"
            bordered={false}
            style={{ borderRadius: 12, minHeight: 360 }}
          >
            <PerformanceReviewList />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="AI 기반 인재 추천"
            bordered={false}
            style={{ borderRadius: 12, minHeight: 360 }}
          >
            <AIRecommendationPanel />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
