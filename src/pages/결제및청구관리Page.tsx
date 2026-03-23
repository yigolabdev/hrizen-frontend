import React from 'react';
import { Typography, Card, Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

const { Title } = Typography;

export default function 결제밌청杭瀱리Page() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">핈</Link> },
          { title: '결제 및 청굠 관리' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16, color: '#007AFF' }}>
        결제 및 청한 관리
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={24}>
          <Card
            title="청구서 목록"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 24 }}
          >
            <InvoiceList />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="결제 수단 관리"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 24 }}
          >
            <PaymentMethodForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="결제 상태 추적"
            bordered={false}
            style={{ borderRadius: 12, marginBottom: 24 }}
          >
            <PaymentStatusTracker />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
