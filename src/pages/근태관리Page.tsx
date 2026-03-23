import React from 'react';
import { Typography, Row, Col, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function 근타관리Page() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">홈</Link> },
          { title: '근텀 관리' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16, color: '#007AFF' }}>
        근텀 관리
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="근태 캘린0를" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <AttendanceCalendar />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="초과근무 요약" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <OvertimeSummary />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="휴가 신청 목록" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <LeaveRequestList />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="AI 이상 징훌 알림" bordered={false} style={{ borderRadius: 12 }}>
            <AIAnomalyAlert />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
