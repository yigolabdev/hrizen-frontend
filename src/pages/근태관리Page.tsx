import React from 'react';
import { Row, Col, Typography, Grid } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function AttendancePage() {
  const screens = useBreakpoint();

  return (
    <div style={{ padding: screens.xs ? 16 : 24 }}>
      <Title
        level={3}
        style={{
          color: '#007AFF',
          marginBottom: 24,
          fontWeight: 700,
        }}
      >
        근태 관리
      </Title>

      {/* AI 이상 징후 알림 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <AIAnomalyAlert />
        </Col>
      </Row>

      {/* 초과근무 요약 카드 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <OvertimeSummary />
        </Col>
      </Row>

      {/* 출퇴근 캘린더 + 휴가 신청 목록 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <AttendanceCalendar />
        </Col>
        <Col xs={24} lg={10}>
          <LeaveRequestList />
        </Col>
      </Row>
    </div>
  );
}
