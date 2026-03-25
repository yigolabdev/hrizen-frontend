import React from 'react';
import { Typography, Row, Col } from 'antd';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';

const { Title } = Typography;

export default function SubscriptionPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        구독 관리
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <SubscriptionStatusCard />
        </Col>
        <Col xs={24} lg={16}>
          <PlanSelector />
        </Col>
        <Col xs={24} lg={12}>
          <UsageBillingSummary />
        </Col>
        <Col xs={24} lg={12}>
          <PaymentHistoryTable />
        </Col>
      </Row>
    </div>
  );
}
