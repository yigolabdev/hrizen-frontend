import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <Card>
      <Title level={2}>권한 관리</Title>
      <p>권한 관리 페이지입니다.</p>
    </Card>
  );
}