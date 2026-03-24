import React from 'react';
import { Row, Col, Typography } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 32, fontWeight: 700 }}>
        멀티테넌트 설정
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <SubscriptionStatusCard />
        </Col>
        <Col xs={24} lg={8}>
          <LanguageCurrencySelector />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <TenantListTable />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <TenantSettingsForm />
        </Col>
      </Row>
    </div>
  );
}
