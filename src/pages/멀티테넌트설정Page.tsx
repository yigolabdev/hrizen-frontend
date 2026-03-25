import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        며티 테나트 설젅  
    </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <SubscriptionStatusCard />
        <TenantListTable />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <TenantSettingsForm />
          </Col>
          <Col xs={24} lg={12}>
            <LanguageCurrencySelector />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
