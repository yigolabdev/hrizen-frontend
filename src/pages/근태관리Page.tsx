import React from 'react';
import { Card, Row, Col, Typography, theme } from 'antd';
import AttendanceCalendar from '@/features/attendance/components/AttendanceCalendar';
import LeaveRequestList from '@/features/attendance/components/LeaveRequestList';
import OvertimeSummary from '@/features/attendance/components/OvertimeSummary';
import AIAnomalyAlert from '@/features/attendance/components/AIAnomalyAlert';

const { Title } = Typography;

export default function 근태관리Page() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div style={{ padding: 24, minHeight: '100vh', backgroundColor: colorBgContainer }}>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        근태 관리
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 12 }} bodyStyle={{ padding: 16 }}>
            <AttendanceCalendar />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Card
                title="휴가 신청 및 승인 현황"
                bordered={false}
                style={{ borderRadius: 12, minHeight: 280 }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <LeaveRequestList />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="초과근무 요약"
                bordered={false}
                style={{ borderRadius: 12, minHeight: 160 }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <OvertimeSummary />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="AI 이상 징후 탐지"
                bordered={false}
                style={{ borderRadius: 12, minHeight: 160 }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <AIAnomalyAlert />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
