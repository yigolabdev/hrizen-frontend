import React from 'react';
import { Typography, Space } from 'antd';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function BillingPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>결제 및 청구 관리</Title>
      <PaymentStatusTracker />
      <InvoiceList />
      <PaymentMethodForm />
    </Space>
  );
}
