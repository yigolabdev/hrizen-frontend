import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import SummaryStatsCard from '@/features/adminDashboard/components/SummaryStatsCard';
import AttendanceChart from '@/features/adminDashboard/components/AttendanceChart';
import PayrollOverview from '@/features/adminDashboard/components/PayrollOverview';
import RecentActivitiesFeed from '@/features/adminDashboard/components/RecentActivitiesFeed';
import RetentionRiskHeatmap from '@/features/adminDashboard/components/RetentionRiskHeatmap';

const { Title } = Typography;

export default function AdminDashboardPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} 스타일={{ color: '#007AFF' }}>관리자 대시보드</Title>
      <SummaryStatsCard />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <AttendanceChart />
        </Col>
        <Col xs={24} lg={10}>
          <PayrollOverview />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <RecentActivitiesFeed />
        </Col>
        <Col xs={24} lg={12}>
          <RetentionRiskHeatmap />
        </Col>
      </Row>
    </Space>
  );
}
