import React from 'react';
import { Typography, Row, Col, Card, Breadcrumb } from 'antd';
import { HomeOutlined, RobotOutlined } from '@ant-design/icons';
import { AnomalyDetectionList } from '@/features/analytics/components/AnomalyDetectionList';
import { CostAnalysisChart } from '@/features/analytics/components/CostAnalysisChart';
import { TurnoverRiskGraph } from '@/features/analytics/components/TurnoverRiskGraph';
import { UsageAnalyticsPanel } from '@/features/analytics/components/UsageAnalyticsPanel';
import styles from './AI\ubd84\uc11d\ub300\uc2dc\ubcf4\ub4dcPage.module.css';

const { Title } = Typography;

export default function AI분석팀시보드Page() {
  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[
          { title: <><HomeOutlined /><span>분석</span></> },
          { title: <><RobotOutlined /><span>AI 분석 대시보드</span></> },
        ]}
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: '#007AFF' }}>
          <RobotOutlined style={{ marginRight: 8 }} />
          AI 분석 대시보드
        </Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          AI기반 분석 결과와 이상 징후 탐지, 비용 분석, 이직 위험도 분석 결과를 한눈에 보여드림니다.
        </Typography.Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, minHeight: 360 }}>
            <AnomalyDetectionList />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, minHeight: 360 }}>
            <CostAnalysisChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, minHeight: 360 }}>
            <TurnoverRiskGraph />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, minHeight: 360 }}>
            <UsageAnalyticsPanel />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
