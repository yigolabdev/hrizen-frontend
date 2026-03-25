import React from 'react';
import { Typography, Row, Col } from 'antd';
import AnomalyDetectionList from '@/features/aiAnalytics/components/AnomalyDetectionList';
import CostAnalysisChart from '@/features/aiAnalytics/components/CostAnalysisChart';
import TurnoverRiskGraph from '@/features/aiAnalytics/components/TurnoverRiskGraph';
import UsageAnalyticsPanel from '@/features/aiAnalytics/components/UsageAnalyticsPanel';

const { Title } = Typography;

export default function AIAnalyticsPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>AI 분섍 대시보드</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <UsageAnalyticsPanel />
        </Col>
        <Col xs={24} lg={12}>
          <CostAnalysisChart />
        </Col>
        <Col xs={24} lg={12}>
          <TurnoverRiskGraph />
        </Col>
        <Col xs={24} lg={12}>
          <AnomalyDetectionList />
        </Col>
      </Row>
    </div>
  );
}
