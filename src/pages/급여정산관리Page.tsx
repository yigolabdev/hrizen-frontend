import React from 'react';
import { Typography, Space } from 'antd';
import PayrollInputForm from '@/features/payroll/components/PayrollInputForm';
import SalarySlipPreview from '@/features/payroll/components/SalarySlipPreview';
import TaxComplianceStatus from '@/features/payroll/components/TaxComplianceStatus';
import ElectronicContractIntegration from '@/features/payroll/components/ElectronicContractIntegration';

const { Title } = Typography;

export default function PayrollManagementPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>급여 정햠 관리</Title>
      <PayrollInputForm />
      <SalarySlipPreview />
      <TaxComplianceStatus />
      <ElectronicContractIntegration />
    </Space>
  );
}
