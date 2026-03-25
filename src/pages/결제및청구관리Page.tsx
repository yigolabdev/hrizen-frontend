import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function BillingPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>결제 및 첬군 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <PaymentStatusTracker />
            <InvoiceList />
          </Space>
        </Col>
        <Col xs={24} lg={8}>
          <PaymentMethodForm />
        </Col>
      </Row>
    </Space>
  );
}
