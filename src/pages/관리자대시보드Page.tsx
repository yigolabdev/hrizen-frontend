import React from 'react';
import { Row, Col, Typography, Breadcrumb } from 'antd';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';
import SummaryStatsCard from '@/features/adminDashboard/components/SummaryStatsCard';
import AttendanceChart from '@/features/adminDashboard/components/AttendanceChart';
import PayrollOverview from '@/features/adminDashboard/components/PayrollOverview';
import RetentionRiskHeatmap from '@/features/adminDashboard/components/RetentionRiskHeatmap';
import RecentActivitiesFeed from '@/features/adminDashboard/components/RecentActivitiesFeed';

const { Title } = Typography;

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '0 0', maxWidth: 1400, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <Breadcrumb
          items={[
            { href: '/', title: <><HomeOutlined /><span>홈</span></> },
            { title: <><DashboardOutlined /><span>관리자 대시보놗</span></> },
          ]}
        />
        <Title level={2} style={{ marginTop: 8, marginBottom: 0, color: '#1a1a1a' }}>
          관리자 대시보논 📊

        </Title>
      </div>

      {/* Section 1: Summary Stats Cards */}
      <div style={{ marginBottom: 24 }}>
        <SummaryStatsCard />
      </div>

      {/* Section 2: Attendance Chart + Payroll Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={14}>
          <AttendanceChart />
        </Col>
        <Col xs={24} lg={10}>
          <PayrollOverview />
        </Col>
      </Row>

      {/* Section 3: Retention Risk Heatmap + Recent Activities Feed */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <RetentionRiskHeatmap />
        </Col>
        <Col xs={24} lg={10}>
          <RecentActivitiesFeed />
        </Col>
      </Row>
    </div>
  );
}
