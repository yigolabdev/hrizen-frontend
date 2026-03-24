import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import TenantListTable from '@/features/tenants/components/TenantListTable';
import TenantSettingsForm from '@/features/tenants/components/TenantSettingsForm';
import LanguageCurrencySelector from '@/features/tenants/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/tenants/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF' }}>멀티 테뀠트 설정</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <TenantListTable />
          </Card>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <TenantSettingsForm />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <LanguageCurrencySelector />
          </Card>
          <Card style={{ borderRadius: 12 }}>
            <SubscriptionStatusCard />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
