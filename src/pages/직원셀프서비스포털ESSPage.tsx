import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import ContractDocuments from '@/features/ess/components/ContractDocuments';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import PayslipViewer from '@/features/ess/components/PayslipViewer';

const { Title } = Typography;

export default function ESSPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        직원 셀프 서비스 포턌(ESSYi
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <AttendanceSummary />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <LeaveApplicationForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <PayslipViewer />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <ContractDocuments />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
