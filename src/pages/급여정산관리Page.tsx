import React from 'react';
import { Typography, Row, Col } from 'antd';
import PayrollInputForm from '@/features/payroll/components/PayrollInputForm';
import SalarySlipPreview from '@/features/payroll/components/SalarySlipPreview';
import TaxComplianceStatus from '@/features/payroll/components/TaxComplianceStatus';
import ElectronicContractIntegration from '@/features/payroll/components/ElectronicContractIntegration';

const { Title } = Typography;

export default function PayrollManagementPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>���여 정산 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <PayrollInputForm />
        </Col>
        <Col xs={24} lg={12}>
          <SalarySlipPreview />
        </Col>
        <Col xs={24} lg={12}>
          <TaxComplianceStatus />
        </Col>
        <Col xs={24} lg={12}>
          <ElectronicContractIntegration />
        </Col>
      </Row>
    </div>
  );
}
