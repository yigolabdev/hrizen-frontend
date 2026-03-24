import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import APIKeyGenerator from '@/features/openAPI/components/APIKeyGenerator';
import UsageStatisticsChart from '@/features/openAPI/components/UsageStatisticsChart';
import IntegrationSettingsForm from '@/features/openAPI/components/IntegrationSettingsForm';

const { Title, Text } = Typography;

export default function OpenAPIPage() {
  return (
    <div style={{ padding: '0 4px' }}>
      <Space direction="vertical" size={8} style={{ marginBottom: 28 }}>
        <Title
          level={2}
          style={{
            margin: 0,
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: -0.5,
          }}
        >
          오픈 API 관리
        </Title>
        <Text style={{ color: '#8E8E93', fontSize: 15 }}>
          외부 시스템 연동을 위한 API 키 발급, 호출량 모니터링 및 통합 설정을 관리합니다.
        </Text>
      </Space>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <APIKeyGenerator />
            <UsageStatisticsChart />
          </Space>
        </Col>
        <Col xs={24} lg={10}>
          <IntegrationSettingsForm />
        </Col>
      </Row>
    </div>
  );
}
