import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { PayrollInputForm } from '@/features/payroll/components/PayrollInputForm';
import { SalarySlipPreview } from '@/features/payroll/components/SalarySlipPreview';
import { TaxComplianceStatus } from '@/features/payroll/components/TaxComplianceStatus';
import { ElectronicContractIntegration } from '@/features/payroll/components/ElectronicContractIntegration';

const { Title } = Typography;

export default function PayrollManagementPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF' }}>급여 정산 관리</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <PayrollInputForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <SalarySlipPreview />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <TaxComplianceStatus />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 12 }}>
            <ElectronicContractIntegration />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
