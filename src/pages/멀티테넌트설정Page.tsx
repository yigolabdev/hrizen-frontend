import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import TenantListTable from '@/features/multiTenant/components/TenantListTable';
import TenantSettingsForm from '@/features/multiTenant/components/TenantSettingsForm';
import LanguageCurrencySelector from '@/features/multiTenant/components/LanguageCurrencySelector';
import SubscriptionStatusCard from '@/features/multiTenant/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function 메티테난트설정Page() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        멀티 테날트 설정
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <TenantListTable />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <TenantSettingsForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <LanguageCurrencySelector />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <SubscriptionStatusCard />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
