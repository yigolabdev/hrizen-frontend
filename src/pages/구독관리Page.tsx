import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';

const { Title } = Typography;

export default function 구독관리Page() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        구독 관리
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <SubscriptionStatusCard />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <PlanSelector />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <UsageBillingSummary />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <PaymentHistoryTable />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
