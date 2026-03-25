import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import AnomalyDetectionList from '@/features/aiAnalytics/components/AnomalyDetectionList';
import CostAnalysisChart from '@/features/aiAnalytics/components/CostAnalysisChart';
import TurnoverRiskGraph from '@/features/aiAnalytics/components/TurnoverRiskGraph';
import UsageAnalyticsPanel from '@/features/aiAnalytics/components/UsageAnalyticsPanel';

const { Title } = Typography;

export default function AIAnalyticsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>AI 분섍 대시보드</Title>
      <UsageAnalyticsPanel />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <CostAnalysisChart />
        </Col>
        <Col xs={24} lg={12}>
          <TurnoverRiskGraph />
        </Col>
      </Row>
      <AnomalyDetectionList />
    </Space>
  );
}
