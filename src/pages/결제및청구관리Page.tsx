import React from 'react';
import { PageHeader, Card, Divider, Row, Col } from 'antd';
import PaymentMethodForm from '@/features/billing/components/PaymentMethodForm';
import InvoiceList from '@/features/billing/components/InvoiceList';
import PaymentStatusTracker from '@/features/billing/components/PaymentStatusTracker';

export default function 결제및청구관리Page() {
  return (
    <div style={{ padding: 24, backgroundColor: '#F2F2F7', minHeight: '100vh' }}>
      <PageHeader
        title="결제 및 청구 관리"
        subTitle="월 구독 및 초과 사용 요금 결제 수단 등록, 청구서 발행 및 결제 내역 조회"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          marginBottom: 24,
          boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
        }}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card
            title="결제 수단 등록 및 관리"
            bordered={false}
            style={{ borderRadius: 8, boxShadow: '0 1px 3px rgb(0 0 0 / 0.05)' }}
          >
            <PaymentMethodForm />
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card
            title="청구서 및 결제 내역"
            bordered={false}
            style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 1px 3px rgb(0 0 0 / 0.05)' }}
          >
            <InvoiceList />
          </Card>

          <Card
            title="결제 상태 추적"
            bordered={false}
            style={{ borderRadius: 8, boxShadow: '0 1px 3px rgb(0 0 0 / 0.05)' }}
          >
            <PaymentStatusTracker />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
