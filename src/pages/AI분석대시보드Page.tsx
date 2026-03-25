import React from 'react';
import { Typography, Space, Row, Col } from 'antd';
import UsageAnalyticsPanel from '@/features/aiAnalytics/components/UsageAnalyticsPanel';
import TurnoverRiskGraph from '@/features/aiAnalytics/components/TurnoverRiskGraph';
import CostAnalysisChart from '@/features/aiAnalytics/components/CostAnalysisChart';
import AnomalyDetectionList from '@/features/aiAnalytics/components/AnomalyDetectionList';

const { Title } = Typography;

export default function AIAnalyticsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>AI 분섍 대시보드</Title>
      <UsageAnalyticsPanel />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <TurnoverRiskGraph />
        </Col>
        <Col xs={24} lg={12}>
          <CostAnalysisChart />
        </Col>
      </Row>
      <AnomalyDetectionList />
    </Space>
  );
}
