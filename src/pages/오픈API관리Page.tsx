import React from 'react';
import { Typography, Card, Divider } from 'antd';
import { APIKeyGenerator } from '@/features/apiManagement/components/APIKeyGenerator';
import { IntegrationSettingsForm } from '@/features/apiManagement/components/IntegrationSettingsForm';
import { UsageStatisticsChart } from '@/features/apiManagement/components/UsageStatisticsChart';

const { Title } = Typography;

export default function OpenAPIPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        오픈 API 관리
      </Title>
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <APIKeyGenerator />
        <Divider />
        <IntegrationSettingsForm />
        <Divider />
        <UsageStatisticsChart />
      </Card>
    </div>
  );
}
