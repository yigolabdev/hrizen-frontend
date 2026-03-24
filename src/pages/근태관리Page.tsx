import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF' }}>근태 관리</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <AttendanceCalendar />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <OvertimeSummary />
          </Card>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <AIAnomalyAlert />
          </Card>
        </Col>
        <Col xs={24}>
          <Card style={{ borderRadius: 12 }}>
            <LeaveRequestList />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
