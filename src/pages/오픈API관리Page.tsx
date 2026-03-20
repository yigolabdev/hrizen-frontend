import React from 'react';
import { Card, Typography, Divider, Row, Col } from 'antd';
import { APIKeyGenerator } from '@/features/apiManagement/components/APIKeyGenerator';
import { UsageStatisticsChart } from '@/features/apiManagement/components/UsageStatisticsChart';
import { IntegrationSettingsForm } from '@/features/apiManagement/components/IntegrationSettingsForm';

const { Title, Paragraph } = Typography;

export default function 오픈API관리Page() {
  return (
    <main style={{ backgroundColor: '#F2F2F7', minHeight: '100vh', padding: 24 }}>
      <Typography style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ color: '#007AFF', marginBottom: 8 }}>오픈 API 관리</Title>
        <Paragraph style={{ marginBottom: 24, maxWidth: 600, fontSize: 16, color: '#333' }}>
          ERP, 그룹웨어, 재무 시스템 등 외부 시스템과 연동을 위한 API 키 발급, 호출량 모니터링 및 사용 설정을 관리합니다.
        </Paragraph>
        <Divider />
      </Typography>

      <Row gutter={[24, 24]} justify="center" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Col xs={24} lg={16}>
          <Card
            bordered={false}
            style={{ borderRadius: 12, backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <APIKeyGenerator />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 12, backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%' }}
          >
            <UsageStatisticsChart />
          </Card>
        </Col>
        <Col xs={24}>
          <Card
            bordered={false}
            style={{ borderRadius: 12, backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <IntegrationSettingsForm />
          </Card>
        </Col>
      </Row>
    </main>
  );
}
