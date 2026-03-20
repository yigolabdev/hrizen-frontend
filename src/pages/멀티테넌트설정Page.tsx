import React from 'react';
import { Typography, Divider, Row, Col, Card } from 'antd';
import TenantListTable from '@/features/tenants/components/TenantListTable';
import TenantSettingsForm from '@/features/tenants/components/TenantSettingsForm';
import SubscriptionStatusCard from '@/features/tenants/components/SubscriptionStatusCard';

const { Title } = Typography;

export default function 멀티테넌트설정Page() {
  return (
    <div style={{ padding: 24, backgroundColor: '#F2F2F7', minHeight: '100vh' }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        멀티테넌트 설정
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card size="large" bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgb(0 122 255 / 0.1)' }}>
            <TenantListTable />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Card
                size="large"
                title="테넌트 구독 상태"
                bordered={false}
                style={{ borderRadius: 12, boxShadow: '0 2px 8px rgb(0 122 255 / 0.1)' }}
                headStyle={{ color: '#007AFF', fontWeight: 'bold' }}
              >
                <SubscriptionStatusCard />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                size="large"
                title="테넌트 설정"
                bordered={false}
                style={{ borderRadius: 12, boxShadow: '0 2px 8px rgb(0 122 255 / 0.1)' }}
                headStyle={{ color: '#007AFF', fontWeight: 'bold' }}
              >
                <TenantSettingsForm />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
