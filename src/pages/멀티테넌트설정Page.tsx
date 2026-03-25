import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function MultiTenantSettingsPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>멀티 테넌트 설정</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <TenantListTable />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <SubscriptionStatusCard />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <TenantSettingsForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <LanguageCurrencySelector />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
