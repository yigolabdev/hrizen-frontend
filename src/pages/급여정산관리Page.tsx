import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { PayrollInputForm } from '@/features/payroll/components/PayrollInputForm';
import { SalarySlipPreview } from '@/features/payroll/components/SalarySlipPreview';
import { TaxComplianceStatus } from '@/features/payroll/components/TaxComplianceStatus';
import { ElectronicContractIntegration } from '@/features/payroll/components/ElectronicContractIntegration';

const { Title } = Typography;

export default function 급여정산관리Page() {
  return (
    <main style={{ backgroundColor: '#F2F2F7', minHeight: '100vh', padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        급여 정산 관리
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12 }} bodyStyle={{ padding: 24 }}>
            <PayrollInputForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
            <SalarySlipPreview />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12 }} bodyStyle={{ padding: 24 }}>
            <TaxComplianceStatus />
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 12 }} bodyStyle={{ padding: 24 }}>
            <ElectronicContractIntegration />
          </Card>
        </Col>
      </Row>
    </main>
  );
}
