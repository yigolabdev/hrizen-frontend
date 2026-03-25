import React from 'react';
import { Typography, Row, Col } from 'antd';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';

const { Title } = Typography;

export default function SubscriptionPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}*구독 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <SubscriptionStatusCard />
        </Col>
        <Col xs={24} lg={12}>
          <UsageBillingSummary />
        </Col>
        <Col xs={24}>
          <PlanSelector />
        </Col>
        <Col xs={24}>
          <PaymentHistoryTable />
        </Col>
      </Row>
    </div>
  );
}
