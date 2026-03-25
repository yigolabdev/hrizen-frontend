import React from 'react';
import { Typography, Row, Col } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>근태 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AIAnomalyAlert />
        </Col>
        <Col xs={24}>
          <AttendanceCalendar />
        </Col>
        <Col xs={24} lg={12}>
          <OvertimeSummary />
        </Col>
        <Col xs={24} lg={12}>
          <LeaveRequestList />
        </Col>
      </Row>
    </div>
  );
}
