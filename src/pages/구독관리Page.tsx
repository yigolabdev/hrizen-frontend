import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function 구독관리Page() {
  return (
    <div style={{ padding: 24, backgroundColor: '#F2F2F7', minHeight: '100vh' }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 32 }}>
        구독 관리
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <SubscriptionStatusCard />
        </Col>
        <Col xs={24} lg={16}>
          <PlanSelector />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <PaymentHistoryTable />
        </Col>
        <Col xs={24} lg={8}>
          <UsageBillingSummary />
        </Col>
      </Row>
    </div>
  );
}
