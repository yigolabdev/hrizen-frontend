import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PayrollInputForm from '@/features/payroll/components/PayrollInputForm';
import SalarySlipPreview from '@/features/payroll/components/SalarySlipPreview';
import TaxComplianceStatus from '@/features/payroll/components/TaxComplianceStatus';
import ElectronicContractIntegration from '@/features/payroll/components/ElectronicContractIntegration';

const { Title } = Typography;

export default function PayrollManagementPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>���여 정� 관리</Title>
      <TaxComplianceStatus />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <PayrollInputForm />
        </Col>
        <Col xs={24} lg={10}>
          <SalarySlipPreview />
        </Col>
      </Row>
      <ElectronicContractIntegration />
    </Space>
  );
}
