import React, { useEffect, useState } from 'react';
import { Card, Statistic, Typography, Divider, Skeleton } from 'antd';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

type UsageBilling = {
  usagePeriod: string; // YYYY-MM
  monthlyBaseCharge: number; // 원
  usageOverageCharge: number; // 원 (초과 사용 요금)
  totalCharge: number; // 원
  details: {
    item: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
};

const mockUsageBilling: UsageBilling = {
  usagePeriod: '2024-05',
  monthlyBaseCharge: 85000,
  usageOverageCharge: 12000,
  totalCharge: 97000,
  details: [
    { item: '기본 사용자수(100명)', quantity: 100, unitPrice: 500, amount: 50000 },
    { item: '추가 API 호출량', quantity: 14000, unitPrice: 1, amount: 14000 },
    { item: '프리미엄 기능 추가', quantity: 1, unitPrice: 21000, amount: 21000 },
  ],
};

export default function UsageBillingSummary() {
  const [usageBilling, setUsageBilling] = useState<UsageBilling | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsageBilling() {
      setLoading(true);
      try {
        // mock api 호출
        await new Promise((resolve) => setTimeout(resolve, 600));
        setUsageBilling(mockUsageBilling);
      } finally {
        setLoading(false);
      }
    }
    fetchUsageBilling();
  }, []);

  if (loading || !usageBilling) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  return (
    <Card title={<Title level={4} style={{ color: '#007AFF' }}>Usage 기반 청구 내역</Title>} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgb(0 122 255 / 0.12)' }}>
      <Text style={{ display: 'block', marginBottom: 8 }}>기간: {usageBilling.usagePeriod}</Text>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
        <Statistic title="기본 요금" value={usageBilling.monthlyBaseCharge} precision={0} suffix="원" valueStyle={{ color: '#007AFF' }} />
        <Statistic title="추가 사용 요금" value={usageBilling.usageOverageCharge} precision={0} suffix="원" valueStyle={{ color: '#FF9500' }} />
        <Statistic title="총 청구 금액" value={usageBilling.totalCharge} precision={0} suffix="원" valueStyle={{ color: '#389e0d', fontWeight: 'bold' }} />
      </div>
      <Divider />
      <div style={{ maxHeight: 180, overflowY: 'auto' }}>
        {usageBilling.details.map(({ item, quantity, unitPrice, amount }) => (
          <div
            key={item}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '4px 0',
              borderBottom: '1px solid #f0f0f0',
              fontSize: 14,
              color: 'rgba(0,0,0,0.65)',
            }}
          >
            <div>{item}</div>
            <div>
              {quantity.toLocaleString()} × {unitPrice.toLocaleString()} 원 = <b>{amount.toLocaleString()} 원</b>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
