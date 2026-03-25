import React from 'react';
import { Typography, Row, Col } from 'antd';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        멀티 테넌트 설정
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <TenantListTable />
        </Col>
        <Col xs={24} lg={8}>
          <SubscriptionStatusCard />
        </Col>
        <Col xs={24} lg={12}>
          <TenantSettingsForm />
        </Col>
        <Col xs={24} lg={12}>
          <LanguageCurrencySelector />
        </Col>
      </Row>
    </div>
  );
}
