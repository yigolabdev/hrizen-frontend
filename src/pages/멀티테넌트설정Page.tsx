import React from 'react';
import { Typography, Row, Col, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import TenantListTable from '@/features/tenants/components/TenantListTable';
import TenantSettingsForm from '@/features/tenants/components/TenantSettingsForm';
import SubscriptionStatusCard from '@/features/tenants/components/SubscriptionStatusCard';
import LanguageCurrencySelector from '@/features/tenants/components/LanguageCurrencySelector';

const { Title } = Typography;

export default function 멀티톌(트설정Page() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">홈</Link> },
          { title: '멀티 테널트 설정' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16, color: '#007AFF' }}>
        멀티 테넌트 설정
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="테널트 목록" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <TenantListTable />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="테널트 설정" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <TenantSettingsForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="구럡 상태" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <SubscriptionStatusCard />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="言詞/통화 설정" bordered={false} style={{ borderRadius: 12 }}>
            <LanguageCurrencySelector />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
