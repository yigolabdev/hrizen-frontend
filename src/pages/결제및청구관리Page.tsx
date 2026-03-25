import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function BillingPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        결제 및 청�서 관리
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PaymentStatusTracker />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <InvoiceList />
          </Col>
          <Col xs={24} lg={10}>
            <PaymentMethodForm />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
