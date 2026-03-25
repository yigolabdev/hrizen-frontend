import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>근태 관리</Title>
      <AIAnomalyAlert />
      <OvertimeSummary />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <AttendanceCalendar />
        </Col>
        <Col xs={24} lg={10}>
          <LeaveRequestList />
        </Col>
      </Row>
    </Space>
  );
}
