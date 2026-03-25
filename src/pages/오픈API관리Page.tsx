import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import APIKeyGenerator from '@/features/openAPI/components/APIKeyGenerator';
import IntegrationSettingsForm from '@/features/openAPI/components/IntegrationSettingsForm';
import UsageStatisticsChart from '@/features/openAPI/components/UsageStatisticsChart';

const { Title } = Typography;

export default function OpenAPIPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>플플 API 관리</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <APIKeyGenerator />
            <UsageStatisticsChart />
          </Space>
        </Col>
        <Col xs={24} lg={12}>
          <IntegrationSettingsForm />
        </Col>
      </Row>
    </Space>
  );
}
