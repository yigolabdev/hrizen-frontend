import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import PayslipViewer from '@/features/ess/components/PayslipViewer';
import ContractDocuments from '@/features/ess/components/ContractDocuments';

const { Title } = Typography;

export default function ESSPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>치원 셀프 서비스 (ESS)</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <AttendanceSummary />
            <LeaveApplicationForm />
          </Space>
        </Col>
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <PayslipViewer />
            <ContractDocuments />
          </Space>
        </Col>
      </Row>
    </Space>
  );
}
