import React from 'react';
import { Typography, Space } from 'antd';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import PayslipViewer from '@/features/ess/components/PayslipViewer';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import ContractDocuments from '@/features/ess/components/ContractDocuments';

const { Title } = Typography;

export default function ESSPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>직원 셀프#��s비스(ESS)</Title>
      <AttendanceSummary />
      <PayslipViewer />
      <LeaveApplicationForm />
      <ContractDocuments />
    </Space>
  );
}
