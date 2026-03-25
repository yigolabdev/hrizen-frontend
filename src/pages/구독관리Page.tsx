import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';

const { Title } = Typography;

export default function SubscriptionPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>���독 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <SubscriptionStatusCard />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <UsageBillingSummary />
          </Card>
        </Col>
        <Col xs={24}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <PlanSelector />
          </Card>
        </Col>
        <Col xs={24}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <PaymentHistoryTable />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
