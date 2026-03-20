import React from 'react';
import { Card, Col, Row, Tabs, Typography } from 'antd';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import PayslipViewer from '@/features/ess/components/PayslipViewer';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import ContractDocuments from '@/features/ess/components/ContractDocuments';

const { Title } = Typography;
const { TabPane } = Tabs;

export default function 직원셀프서비스포털ESSPage() {
  return (
    <main style={{
      backgroundColor: '#F2F2F7',
      minHeight: '100vh',
      padding: '24px 16px',
      boxSizing: 'border-box',
      fontFamily: 'Apple SD Gothic Neo, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <Row justify="center" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Col xs={24} sm={22} md={22} lg={20} xl={18} xxl={16}>
          <Title level={2} style={{ color: '#007AFF', marginBottom: 24, textAlign: 'center' }}>
            직원 셀프 서비스 포털
          </Title>
          <Card
            style={{ borderRadius: 12, boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}
            bodyStyle={{ padding: '16px 24px' }}
          >
            <Tabs
              defaultActiveKey="attendance"
              size="large"
              tabBarGutter={32}
              tabBarStyle={{ fontWeight: 600 }}
              centered
              items={[
                {
                  key: 'attendance',
                  label: '근태 현황',
                  children: <AttendanceSummary />,
                },
                {
                  key: 'payslip',
                  label: '급여명세서',
                  children: <PayslipViewer />,
                },
                {
                  key: 'leave',
                  label: '휴가 신청',
                  children: <LeaveApplicationForm />,
                },
                {
                  key: 'contract',
                  label: '전자계약',
                  children: <ContractDocuments />,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </main>
  );
}
