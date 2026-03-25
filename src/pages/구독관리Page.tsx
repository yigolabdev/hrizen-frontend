import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';

const { Title } = Typography;

export default function SubscriptionPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        구慅 관리
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <SubscriptionStatusCard />
        <PlanSelector />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <UsageBillingSummary />
          </Col>
          <Col xs={24} lg={12}>
            <PaymentHistoryTable />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
