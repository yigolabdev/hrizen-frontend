import React from 'react';
import { Typography, Row, Col, Tabs } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        근태 관리
      </Title>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: '근태 달력', 
            children: <AttendanceCalendar />,
          },
          {
            key: '2',
            label: '찴가근무 현황',
            children: <OvertimeSummary />,
          },
          {
            key: '3',
            label: '휴가 신���',
            children: <LeaveRequestList />,
          },
          {
            key: '4',
            label: 'AI 이상 징후 분석', 
            children: <AIAnomalyAlert />,
          },
        ]}
      />
    </div>
  );
}
