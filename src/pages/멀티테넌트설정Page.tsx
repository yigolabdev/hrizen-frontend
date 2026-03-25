import React from 'react';
import { Typography, Row, Col } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>멀티 테넌트 설정</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <TenantListTable />
        </Col>
        <Col xs={24} lg={8}>
          <SubscriptionStatusCard />
          <div style={{ marginTop: 16 }}>
            <LanguageCurrencySelector />
          </div>
        </Col>
        <Col xs={24}>
          <TenantSettingsForm />
        </Col>
      </Row>
    </div>
  );
}
