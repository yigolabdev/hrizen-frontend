import React from 'react';
import { Card, Typography, Button, Space } from 'antd';

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  return (
    <Card>
      <Title level={2}>HRMS 관리 시스템</Title>
      <Paragraph>
        인사 관리 시스템에 오신 것을 환영합니다.
      </Paragraph>
      <Space>
        <Button type="primary">시작하기</Button>
        <Button>더 알아보기</Button>
      </Space>
    </Card>
  );
}