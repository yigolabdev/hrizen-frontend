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
      <Title level={2}>구䅩 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <PlanSelector />
            <PaymentHistoryTable />
          </Space>
        </Col>
        <Col xs={24} lg={8}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SubscriptionStatusCard />
            <UsageBillingSummary />
          </Space>
        </Col>
      </Row>
    </Space>
  );
}
