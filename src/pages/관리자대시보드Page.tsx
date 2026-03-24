import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import SummaryStatsCard from '@/features/adminDashboard/components/SummaryStatsCard';
import AttendanceChart from '@/features/adminDashboard/components/AttendanceChart';
import PayrollOverview from '@/features/adminDashboard/components/PayrollOverview';
import RetentionRiskHeatmap from '@/features/adminDashboard/components/RetentionRiskHeatmap';
import RecentActivitiesFeed from '@/features/adminDashboard/components/RecentActivitiesFeed';

const { Title } = Typography;

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '24px', maxWidth: 1440, margin: '0 auto' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Title level={3} style={{ margin: 0, color: '#1a1a1a', fontWeight: 700 }}>
            관리자 대시보드
          </Title>
          <Typography.Text type="secondary" style={{ fontSize: 14 }}>
            기업 전체 인사 현황을 한눈에 모니터링하세요
          </Typography.Text>
        </div>

        <SummaryStatsCard />

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <AttendanceChart />
          </Col>
          <Col xs={24} lg={10}>
            <PayrollOverview />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <RetentionRiskHeatmap />
          </Col>
          <Col xs={24} lg={10}>
            <RecentActivitiesFeed />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
