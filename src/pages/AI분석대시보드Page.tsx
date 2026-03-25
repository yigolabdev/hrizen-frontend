import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import AnomalyDetectionList from '@/features/aiAnalytics/components/AnomalyDetectionList';
import CostAnalysisChart from '@/features/aiAnalytics/components/CostAnalysisChart';
import TurnoverRiskGraph from '@/features/aiAnalytics/components/TurnoverRiskGraph';
import UsageAnalyticsPanel from '@/features/aiAnalytics/components/UsageAnalyticsPanel';

const { Title } = Typography;

export default function AIAnalyticsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        AI 분석 대시보드
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <UsageAnalyticsPanel />
          </Col>
          <Col xs={24} lg={12}>
            <CostAnalysisChart />
          </Col>
        </Row>
        <TurnoverRiskGraph />
        <AnomalyDetectionList />
      </Space>
    </div>
  );
}
