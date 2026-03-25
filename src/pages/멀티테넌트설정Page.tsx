import React from 'react';
import { Typography, Row, Col } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        멀티 테넌트 설정
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <TenantSettingsForm />
        </Col>
        <Col xs={24} lg={12}>
          <SubscriptionStatusCard />
        </Col>
        <Col xs={24} lg={12}>
          <LanguageCurrencySelector />
        </Col>
        <Col xs={24} lg={12}>
          <TenantListTable />
        </Col>
      </Row>
    </div>
  );
}
