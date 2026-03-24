import React, { useState } from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PayrollInputForm from '@/features/payroll/components/PayrollInputForm';
import SalarySlipPreview from '@/features/payroll/components/SalarySlipPreview';
import TaxComplianceStatus from '@/features/payroll/components/TaxComplianceStatus';
import ElectronicContractIntegration from '@/features/payroll/components/ElectronicContractIntegration';
import type { PayrollRecord } from '@/features/payroll/types';

const { Title } = Typography;

export default function PayrollManagementPage() {
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);

  return (
    <div style={{ padding: '0 4px' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
            급여 정산 관리
          </Title>
          <Typography.Text type="secondary" style={{ fontSize: 14 }}>
            급여 계산, 수당·공제 내역 입력 및 자동 정산 결과를 확인하세요.
          </Typography.Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} xl={14}>
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
              <PayrollInputForm onRecordCreated={setSelectedRecord} />
              <TaxComplianceStatus />
            </Space>
          </Col>
          <Col xs={24} xl={10}>
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
              <SalarySlipPreview record={selectedRecord} />
              <ElectronicContractIntegration />
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
