import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        근태 관리
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <AIAnomalyAlert />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <AttendanceCalendar />
          </Col>
          <Col xs={24} lg={8}>
            <OvertimeSummary />
          </Col>
        </Row>
        <LeaveRequestList />
      </Space>
    </div>
  );
}
