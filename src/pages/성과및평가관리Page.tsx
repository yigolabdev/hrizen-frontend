import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default function PerformancePage() {
  return (
    <Card>
      <Title level={2}>성과 및 평가 관리</Title>
      <p>성과 및 평가 관리 페이지입니다.</p>
    </Card>
  );
}