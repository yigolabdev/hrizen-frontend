import React from 'react';
import { Card, Col, Row, Typography, Divider } from 'antd';
import SummaryStatsCard from '@/features/adminDashboard/components/SummaryStatsCard';
import AttendanceChart from '@/features/adminDashboard/components/AttendanceChart';
import PayrollOverview from '@/features/adminDashboard/components/PayrollOverview';
import RetentionRiskHeatmap from '@/features/adminDashboard/components/RetentionRiskHeatmap';
import RecentActivitiesFeed from '@/features/adminDashboard/components/RecentActivitiesFeed';

const { Title } = Typography;

export default function 관리자대시보드Page() {
  return (
    <main style={{ backgroundColor: '#F2F2F7', minHeight: '100vh', padding: '24px' }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }} aria-label="관리자 대시보드 제목">관리자 대시보드</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={6}>
          <SummaryStatsCard />
        </Col>
        <Col xs={24} lg={18}>
          <Card bordered={false} style={{ borderRadius: 12, backgroundColor: '#FFFFFF', minHeight: 320 }}>
            <AttendanceChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <PayrollOverview />
          <RecentActivitiesFeed />
        </Col>
        <Col xs={24} md={12}>
          <RetentionRiskHeatmap />
        </Col>
      </Row>
    </main>
  );
}
