import React from 'react';
import { Typography, Space, Tabs } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>근텀 관리</Title>
      <Tabs
        defaultActiveKey="calendar"
        items={[
          { key: 'calendar', label: '근태 현황', children: <AttendanceCalendar /> },
          { key: 'leave', label: '휘가 신청', children: <LeaveRequestList /> },
          { key: 'overtime', label: '초과근무 현황', children: <OvertimeSummary /> },
          { key: 'anomaly', label: 'AI 이상 뻴지', children: <AIAnomalyAlert /> },
        ]}
      />
    </Space>
  );
}
