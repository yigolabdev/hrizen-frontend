import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function BillingPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>���제 및 청구 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <InvoiceList />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <PaymentStatusTracker />
          </Card>
        </Col>
        <Col xs={24}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <PaymentMethodForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
