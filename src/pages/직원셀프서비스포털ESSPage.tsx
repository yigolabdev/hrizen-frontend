import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import ContractDocuments from '@/features/ess/components/ContractDocuments';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import PayslipViewer from '@/features/ess/components/PayslipViewer';

const { Title } = Typography;

export default function ESSPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        직원 셀프 서비스 (ESS)
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <AttendanceSummary />
        </Col>
        <Col xs={24} lg={12}>
          <PayslipViewer />
        </Col>
        <Col xs={24} lg={12}>
          <LeaveApplicationForm />
        </Col>
        <Col xs={24} lg={12}>
          <ContractDocuments />
        </Col>
      </Row>
    </div>
  );
}
