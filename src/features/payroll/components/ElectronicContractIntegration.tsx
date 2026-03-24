import React from 'react';
import { Card, List, Typography, Tag } from 'antd';

const { Title } = Typography;

export function ElectronicContractIntegration() {
  const contracts = [
    { id: '1', name: '근로계약서 2024', status: '서명 완료' },
    { id: '2', name: '비밀 위반서른', status: '서명 대기' },
  ];

  return (
    <div>
      <Title level={4} style={{ color: '#007AFF' }}>전자계약 연동</Title>
      <List
        dataSource={contracts}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
            <Tag color={item.status === '서명 완료' ? 'green' : 'orange'}>{item.status}</Tag>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ElectronicContractIntegration;
