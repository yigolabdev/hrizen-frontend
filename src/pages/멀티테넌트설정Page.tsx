import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>멀티 테넌트 설정</Title>
      <SubscriptionStatusCard />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <TenantListTable />
        </Col>
        <Col xs={24} lg={8}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <TenantSettingsForm />
            <LanguageCurrencySelector />
          </Space>
        </Col>
      </Row>
    </Space>
  );
}
