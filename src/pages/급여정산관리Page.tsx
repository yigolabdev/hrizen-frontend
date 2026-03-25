import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default function PayrollManagementPage() {
  return (
    <Card>
      <Title level={2}>급여 정산 관리</Title>
      <p>급여 정산 관리 페이지입니다.</p>
    </Card>
  );
}