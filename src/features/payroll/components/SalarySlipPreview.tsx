import React from 'react';
import { Card, Descriptions, Typography } from 'antd';

const { Title } = Typography;

export function SalarySlipPreview() {
  return (
    <div>
      <Title level={4} style={{ color: '#007AFF' }}>급여명세 미리보기</Title>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="직원명">홍길듑</Descriptions.Item>
        <Descriptions.Item label="지급기 간">2024년 6월</Descriptions.Item>
        <Descriptions.Item label="기본급">3,000,000 원</Descriptions.Item>
        <Descriptions.Item label="초과근��">150,000 원</Descriptions.Item>
        <Descriptions.Item label="상여금">500,000 원</Descriptions.Item>
        <Descriptions.Item label="공제얡">300,000 �</Descriptions.Item>
        <Descriptions.Item label="지급액">3,350,000 원</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default SalarySlipPreview;
