import React from 'react';
import { Typography, Space, Divider } from 'antd';
import { APIKeyGenerator } from '@/features/apiManagement/components/APIKeyGenerator';
import { IntegrationSettingsForm } from '@/features/apiManagement/components/IntegrationSettingsForm';
import { UsageStatisticsChart } from '@/features/apiManagement/components/UsageStatisticsChart';

const { Title } = Typography;

export default function OpenAPIPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>오픈 API 관리</Title>
      <APIKeyGenerator />
      <Divider />
      <UsageStatisticsChart />
      <Divider />
      <IntegrationSettingsForm />
    </Space>
  );
}
