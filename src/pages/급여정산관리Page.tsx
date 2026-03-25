import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PayrollInputForm from '@/features/payroll/components/PayrollInputForm';
import SalarySlipPreview from '@/features/payroll/components/SalarySlipPreview';
import TaxComplianceStatus from '@/features/payroll/components/TaxComplianceStatus';
import ElectronicContractIntegration from '@/features/payroll/components/ElectronicContractIntegration';

const { Title } = Typography;

export default function PayrollManagementPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        급여 정퐖 m�:�
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <PayrollInputForm />
          </Col>
          <Col xs={24} lg={12}>
            <SalarySlipPreview />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <TaxComplianceStatus />
          </Col>
          <Col xs={24} lg={12}>
            <ElectronicContractIntegration />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
