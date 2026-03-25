import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { APIKeyGenerator } from '@/features/apiManagement/components/APIKeyGenerator';
import { IntegrationSettingsForm } from '@/features/apiManagement/components/IntegrationSettingsForm';
import { UsageStatisticsChart } from '@/features/apiManagement/components/UsageStatisticsChart';

const { Title } = Typography;

export default function 오픐API관리Page() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        오픈 API 관리
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <APIKeyGenerator />
          </Card>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <IntegrationSettingsForm />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16 }}>
            <UsageStatisticsChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
