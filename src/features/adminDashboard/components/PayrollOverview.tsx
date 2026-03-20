import React from 'react';
import { Card, List, Typography, Progress } from 'antd';

interface PayrollItem {
  name: string;
  amount: number;
  progress: number; // % 지급 완료율
}

const payrolls: PayrollItem[] = [
  { name: '급여 지급', amount: 25600000, progress: 100 },
  { name: '연차수당', amount: 3200000, progress: 86 },
  { name: '퇴직금 충당', amount: 6600000, progress: 75 },
];

export default function PayrollOverview() {
  return (
    <Card
      title="급여 개요"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#FF9500' }}
      aria-label="급여 개요 카드"
    >
      <List<PayrollItem>
        dataSource={payrolls}
        renderItem={(item) => (
          <List.Item
            key={item.name}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}
          >
            <Typography.Text strong>{item.name}</Typography.Text>
            <div style={{ minWidth: 120, textAlign: 'right' }}>
              <Typography.Text style={{ fontSize: 18, color: '#FF9500', fontWeight: 600 }}>
                {item.amount.toLocaleString()} 원
              </Typography.Text>
              <Progress
                percent={item.progress}
                showInfo={false}
                strokeColor="#FF9500"
                style={{ marginTop: 4 }}
              />
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
