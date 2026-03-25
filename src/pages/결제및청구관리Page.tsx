import React from 'react';
import { Typography, Row, Col } from 'antd';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function BillingPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}*겧제 및 청구 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <InvoiceList />
        </Col>
        <Col xs={24} lg={12}>
          <PaymentStatusTracker />
        </Col>
        <Col xs={24}>
          <PaymentMethodForm />
        </Col>
      </Row>
    </div>
  );
}
