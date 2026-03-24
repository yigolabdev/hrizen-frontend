import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import SubscriptionStatusCard from '@/features/subscription/components/SubscriptionStatusCard';
import PlanSelector from '@/features/subscription/components/PlanSelector';
import UsageBillingSummary from '@/features/subscription/components/UsageBillingSummary';
import PaymentHistoryTable from '@/features/subscription/components/PaymentHistoryTable';

const { Title } = Typography;

export default function SubscriptionPage() {
  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
          구독 관리
        </Title>

        {/* 구독 상태 카드 */}
        <SubscriptionStatusCard />

        {/* 플랜 선택 */}
        <PlanSelector />

        {/* 사용량 기반 청구 요약 */}
        <UsageBillingSummary />

        {/* 결제 내역 테이블 */}
        <PaymentHistoryTable />
      </Space>
    </div>
  );
}
