import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default function AttendancePage() {
  return (
    <Card>
      <Title level={2}>근태 관리</Title>
      <p>근태 관리 페이지입니다.</p>
    </Card>
  );
}