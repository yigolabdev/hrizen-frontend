import React from 'react';
import { Typography, Row, Col } from 'antd';
import SummaryStatsCard from '@/features/adminDashboard/components/SummaryStatsCard';
import AttendanceChart from '@/features/adminDashboard/components/AttendanceChart';
import PayrollOverview from '@/features/adminDashboard/components/PayrollOverview';
import RecentActivitiesFeed from '@/features/adminDashboard/components/RecentActivitiesFeed';
import RetentionRiskHeatmap from '@/features/adminDashboard/components/RetentionRiskHeatmap';

const { Title } = Typography;

export default function AdminDashboardPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        관리자 대시보드
      </Title>
      <SummaryStatsCard />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <AttendanceChart />
        </Col>
        <Col xs={24} lg={12}>
          <PayrollOverview />
        </Col>
        <Col xs={24} lg={12}>
          <RetentionRiskHeatmap />
        </Col>
        <Col xs={24} lg={12}>
          <RecentActivitiesFeed />
        </Col>
      </Row>
    </div>
  );
}
