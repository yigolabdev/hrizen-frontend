import React from 'react';
import { Typography, Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import SummaryStatsCard from '@/features/adminDashboard/components/SummaryStatsCard';
import AttendanceChart from '@/features/adminDashboard/components/AttendanceChart';
import PayrollOverview from '@/features/adminDashboard/components/PayrollOverview';
import RecentActivitiesFeed from '@/features/adminDashboard/components/RecentActivitiesFeed';
import RetentionRiskHeatmap from '@/features/adminDashboard/components/RetentionRiskHeatmap';

const { Title } = Typography;

export default function 관리자대시보드Page() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">홈</Link> },
          { title: '관리자 대시보드' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16, color: '#007AFF' }}>
        관리자 대시보드
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <SummaryStatsCard />
        </Col>
        <Col xs={24} lg={12}>
          <AttendanceChart />
        </Col>
        <Col xs={24} lg={12}>
          <PayrollOverview />
        </Col>
        <Col xs={24} lg={12}>
          <RetentionRiskHeatmap />
        </Col>
        <Col xs={24}>
          <RecentActivitiesFeed />
        </Col>
      </Row>
    </div>
  );
}
