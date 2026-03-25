import React from 'react';
import { Typography, Space, Divider } from 'antd';
import { APIKeyGenerator } from '@/features/apiManagement/components/APIKeyGenerator';
import { IntegrationSettingsForm } from '@/features/apiManagement/components/IntegrationSettingsForm';
import { UsageStatisticsChart } from '@/features/apiManagement/components/UsageStatisticsChart';

const { Title } = Typography;

export default function OpenAPIPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        오픐 API 관리
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <APIKeyGenerator />
        <Divider />
        <UsageStatisticsChart />
        <Divider />
        <IntegrationSettingsForm />
      </Space>
    </div>
  );
}
