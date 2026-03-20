import React, { useEffect, useState } from 'react';
import { Typography, Select, Spin } from 'antd';
import { apiClient } from '@/lib/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const { Title } = Typography;
const { Option } = Select;

type UsageDataPoint = {
  date: string;
  count: number;
};

export function UsageStatisticsChart() {
  const [range, setRange] = useState<'7' | '30' | '90'>('30');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UsageDataPoint[]>([]);

  const fetchUsageData = async (days: number) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise((r) => setTimeout(r, 800));

      const generatedData: UsageDataPoint[] = [];
      const today = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        generatedData.push({
          date: date.toISOString().slice(0, 10),
          count: Math.floor(Math.random() * 100) + 20,
        });
      }

      setData(generatedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageData(Number(range));
  }, [range]);

  return (
    <section>
      <Title level={4} style={{ color: '#007AFF' }}>API 호출량 모니터링</Title>
      <Select
        value={range}
        onChange={(value) => setRange(value as '7' | '30' | '90')}
        style={{ width: 120, marginBottom: 12, borderRadius: 8 }}
        options={
          [
            { label: '최근 7일', value: '7' },
            { label: '최근 30일', value: '30' },
            { label: '최근 90일', value: '90' },
          ]
        }
      />
      {loading ? (
        <div style={{ height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 15, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) => {
                const date = new Date(str);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
              stroke="#666"
              tickLine={false}
            />
            <YAxis stroke="#666" allowDecimals={false} />
            <Tooltip
              labelFormatter={(label) => {
                const date = new Date(label);
                return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
              }}
              formatter={(value: number) => [`${value}회`, '호출량']}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#007AFF"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
