import React from "react";
import { PageHeader, Row, Col, Card } from "antd";
import { CostAnalysisChart } from "@/features/analytics/components/CostAnalysisChart";
import { TurnoverRiskGraph } from "@/features/analytics/components/TurnoverRiskGraph";
import { AnomalyDetectionList } from "@/features/analytics/components/AnomalyDetectionList";
import { UsageAnalyticsPanel } from "@/features/analytics/components/UsageAnalyticsPanel";
import styles from "./AI분석대시보드Page.module.css";

export default function AI분석대시보드Page() {
  return (
    <main className={styles.container}>
      <PageHeader
        className={styles.pageHeader}
        title="AI 분석 대시보드"
        subTitle="인력 비용, 이직 위험도, 근태 이상 징후 등 AI 기반 분석 결과를 한눈에 확인하세요"
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} className={styles.card}>
            <CostAnalysisChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} className={styles.card}>
            <TurnoverRiskGraph />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} className={styles.card} style={{ minHeight: 360 }}>
            <AnomalyDetectionList />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} className={styles.card} style={{ minHeight: 360 }}>
            <UsageAnalyticsPanel />
          </Card>
        </Col>
      </Row>
    </main>
  );
}
