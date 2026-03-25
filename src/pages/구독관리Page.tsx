import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';

const { Title } = Typography;

export default function SubscriptionPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>구독 관리</Title>
      <SubscriptionStatusCard />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <PlanSelector />
        </Col>
        <Col xs={24} lg={10}>
          <UsageBillingSummary />
        </Col>
      </Row>
      <PaymentHistoryTable />
    </Space>
  );
}
