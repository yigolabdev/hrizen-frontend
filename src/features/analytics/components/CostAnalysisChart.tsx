import React, { useEffect, useState } from 'react';
import { Card, Statistic, Typography, Spin } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface CostDataPoint {
  month: string; // YYYY-MM
  personnelCost: number; // 인력 비용
  otherCost: number; // 기타 비용
}

export function CostAnalysisChart() {
  const [data, setData] = useState<CostDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));
      const mockData: CostDataPoint[] = [
        { month: '2023-11', personnelCost: 12500000, otherCost: 2300000 },
        { month: '2023-12', personnelCost: 13000000, otherCost: 2500000 },
        { month: '2024-01', personnelCost: 12800000, otherCost: 2700000 },
        { month: '2024-02', personnelCost: 13500000, otherCost: 2900000 },
        { month: '2024-03', personnelCost: 13700000, otherCost: 3000000 },
        { month: '2024-04', personnelCost: 14000000, otherCost: 3100000 },
        { month: '2024-05', personnelCost: 14500000, otherCost: 3200000 },
      ];
      setData(mockData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const latestMonth = data.length > 0 ? data[data.length - 1] : null;

  return (
    <>
      <Typography.Title level={4} style={{ marginBottom: 24, color: '#007AFF' }}>
        인력 비용 분석
      </Typography.Title>
      {latestMonth && (
        <Statistic
          title={`${latestMonth.month} 기준 총 인력 비용`}
          value={latestMonth.personnelCost}
          precision={0}
          suffix="원"
          valueStyle={{ color: '#007AFF' }}
          style={{ marginBottom: 24 }}
          formatter={(value) => value ? Number(value).toLocaleString() : '-'}
        />
      )}
      {loading ? (
        <div style={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis
              tickFormatter={(v: number) => `${(v / 10000).toFixed(0)}만`}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${Number(value).toLocaleString()} �`,
                name === 'personnelCost' ? '인력 비용' : '기타 비용',
              ]}
            />
            <Legend />
            <Line type="monotone" dataKey="personnelCost" stroke="#007AFF" name="인력 비용" strokeWidth={2} />
            <Line type="monotone" dataKey="otherCost" stroke="#FF9500" name="기타 비용" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
