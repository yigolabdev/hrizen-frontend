import React from 'react';
import { Typography, Row, Col, Grid } from 'antd';
import CostAnalysisChart from '@/features/aiAnalytics/components/CostAnalysisChart';
import TurnoverRiskGraph from '@/features/aiAnalytics/components/TurnoverRiskGraph';
import AnomalyDetectionList from '@/features/aiAnalytics/components/AnomalyDetectionList';
import UsageAnalyticsPanel from '@/features/aiAnalytics/components/UsageAnalyticsPanel';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function AIAnalyticsPage() {
  const screens = useBreakpoint();

  return (
    <div style={{ padding: screens.md ? 32 : 16 }}>
      <div style={{ marginBottom: 32 }}>
        <Title
          level={3}
          style={{ margin: 0, color: '#1A1A1A', fontWeight: 700 }}
        >
          AI 분석 대시보드
        </Title>
        <Text style={{ color: '#8E8E93', fontSize: 14, marginTop: 4, display: 'block' }}>
          인력 비용, 이직 위험도, 근태 이상 징후 등 AI 기반 분석 결과를 한눈에 확인하세요.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={12}>
          <CostAnalysisChart />
        </Col>
        <Col xs={24} xl={12}>
          <TurnoverRiskGraph />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <AnomalyDetectionList />
        </Col>
        <Col xs={24} lg={10}>
          <UsageAnalyticsPanel />
        </Col>
      </Row>
    </div>
  );
}
