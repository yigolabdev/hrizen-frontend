import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function BillingPage() {
  return (
    <div style={{ padding: '0 0 40px 0' }}>
      <Space direction="vertical" size={32} style={{ width: '100%' }}>
        <div>
          <Title
            level={2}
            style={{
              margin: 0,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            결제 및 청구 관리
          </Title>
          <Typography.Text type="secondary" style={{ fontSize: 15 }}>
            결제 수단 등록, 청구서 조회 및 결제 상태를 한눈에 관리하세요.
          </Typography.Text>
        </div>

        <PaymentStatusTracker />

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <PaymentMethodForm />
          </Col>
          <Col xs={24} lg={14}>
            <InvoiceList />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
