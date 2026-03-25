import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import AnomalyDetectionList from '@/features/aiAnalytics/components/AnomalyDetectionList';
import CostAnalysisChart from '@/features/aiAnalytics/components/CostAnalysisChart';
import TurnoverRiskGraph from '@/features/aiAnalytics/components/TurnoverRiskGraph';
import UsageAnalyticsPanel from '@/features/aiAnalytics/components/UsageAnalyticsPanel';

const { Title } = Typography;

export default function AI분석대시보드Page() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        AI 분섍 대시보드
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <UsageAnalyticsPanel />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <CostAnalysisChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <TurnoverRiskGraph />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <AnomalyDetectionList />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
