import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import ContractDocuments from '@/features/ess/components/ContractDocuments';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import PayslipViewer from '@/features/ess/components/PayslipViewer';

const { Title } = Typography;

export default function ESSPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        직워 셀프 서비스 포�  
    </Title>
      <Space direction="vertical" size={(24} style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <AttendanceSummary />
          </Col>
          <Col xs={24} lg={12}>
            <PayslipViewer />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <LeaveApplicationForm />
          </Col>
          <Col xs={24} lg={12}>
            <ContractDocuments />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
