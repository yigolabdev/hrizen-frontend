import React, { useState } from 'react';
import { Card, Space, Select, Statistic, Row, Col, Typography } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  BarChartOutlined,
  RiseOutlined,
  ApiOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

type ChartPeriod = '7d' | '30d' | '90d';

interface DailyUsage {
  date: string;
  calls: number;
  errors: number;
  latency: number;
}

const generateData = (period: ChartPeriod): DailyUsage[] => {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const now = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (days - 1 - i));
    const label =
      period === '90d'
        ? `${d.getMonth() + 1}/${d.getDate()}`
        : `${d.getMonth() + 1}/${d.getDate()}`;
    return {
      date: label,
      calls: Math.floor(Math.random() * 3000) + 500,
      errors: Math.floor(Math.random() * 50),
      latency: Math.floor(Math.random() * 200) + 50,
    };
  });
};

const periodOptions = [
  { label: '최근 7일', value: '7d' as ChartPeriod },
  { label: '최근 30일', value: '30d' as ChartPeriod },
  { label: '최근 90일', value: '90d' as ChartPeriod },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltipComponent({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #F2F2F7',
        borderRadius: 8,
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <Text strong style={{ display: 'block', marginBottom: 6, color: '#1A1A1A' }}>
        {label}
      </Text>
      {payload.map((entry, index) => (
        <div key={index} style={{ fontSize: 13, color: entry.color, marginBottom: 2 }}>
          {entry.name}: <strong>{entry.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
}

export default function UsageStatisticsChart() {
  const [period, setPeriod] = useState<ChartPeriod>('30d');
  const [data] = useState<Record<ChartPeriod, DailyUsage[]>>({
    '7d': generateData('7d'),
    '30d': generateData('30d'),
    '90d': generateData('90d'),
  });

  const currentData = data[period];
  const totalCalls = currentData.reduce((sum, d) => sum + d.calls, 0);
  const totalErrors = currentData.reduce((sum, d) => sum + d.errors, 0);
  const avgLatency = Math.round(
    currentData.reduce((sum, d) => sum + d.latency, 0) / currentData.length
  );
  const errorRate = totalCalls > 0 ? ((totalErrors / totalCalls) * 100).toFixed(2) : '0.00';

  return (
    <Card
      title={
        <Space>
          <BarChartOutlined style={{ color: '#007AFF' }} />
          <span>API 호출 통계</span>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF', borderBottom: '1px solid #F2F2F7' }}
      extra={
        <Select
          value={period}
          onChange={(v: ChartPeriod) => setPeriod(v)}
          options={periodOptions}
          style={{ width: 130 }}
        />
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <div
            style={{
              background: '#007AFF0A',
              borderRadius: 10,
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <Statistic
              title={
                <Space size={4}>
                  <ApiOutlined style={{ color: '#007AFF', fontSize: 13 }} />
                  <span style={{ color: '#8E8E93', fontSize: 13 }}>총 호출</span>
                </Space>
              }
              value={totalCalls}
              valueStyle={{ color: '#007AFF', fontWeight: 700, fontSize: 22 }}
              formatter={(val) => Number(val).toLocaleString()}
            />
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div
            style={{
              background: '#FF3B300A',
              borderRadius: 10,
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <Statistic
              title={
                <Space size={4}>
                  <ThunderboltOutlined style={{ color: '#FF3B30', fontSize: 13 }} />
                  <span style={{ color: '#8E8E93', fontSize: 13 }}>총 에러</span>
                </Space>
              }
              value={totalErrors}
              valueStyle={{ color: '#FF3B30', fontWeight: 700, fontSize: 22 }}
              formatter={(val) => Number(val).toLocaleString()}
            />
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div
            style={{
              background: '#FF95000A',
              borderRadius: 10,
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <Statistic
              title={
                <Space size={4}>
                  <RiseOutlined style={{ color: '#FF9500', fontSize: 13 }} />
                  <span style={{ color: '#8E8E93', fontSize: 13 }}>에러율</span>
                </Space>
              }
              value={errorRate}
              suffix="%"
              valueStyle={{ color: '#FF9500', fontWeight: 700, fontSize: 22 }}
            />
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div
            style={{
              background: '#52C41A0A',
              borderRadius: 10,
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <Statistic
              title={
                <Space size={4}>
                  <ThunderboltOutlined style={{ color: '#52C41A', fontSize: 13 }} />
                  <span style={{ color: '#8E8E93', fontSize: 13 }}>평균 지연</span>
                </Space>
              }
              value={avgLatency}
              suffix="ms"
              valueStyle={{ color: '#52C41A', fontWeight: 700, fontSize: 22 }}
            />
          </div>
        </Col>
      </Row>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ color: '#1A1A1A', fontSize: 14 }}>호출량 추이</Text>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={currentData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007AFF" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#007AFF" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#8E8E93', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#F2F2F7' }}
            interval={period === '7d' ? 0 : period === '30d' ? 4 : 13}
          />
          <YAxis
            tick={{ fill: '#8E8E93', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltipComponent />} />
          <Area
            type="monotone"
            dataKey="calls"
            name="API 호출"
            stroke="#007AFF"
            strokeWidth={2}
            fill="url(#callsGradient)"
          />
          <Area
            type="monotone"
            dataKey="errors"
            name="에러"
            stroke="#FF3B30"
            strokeWidth={1.5}
            fill="#FF3B3010"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ marginTop: 28, marginBottom: 16 }}>
        <Text strong style={{ color: '#1A1A1A', fontSize: 14 }}>응답 지연 시간 (ms)</Text>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={currentData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#8E8E93', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#F2F2F7' }}
            interval={period === '7d' ? 0 : period === '30d' ? 4 : 13}
          />
          <YAxis
            tick={{ fill: '#8E8E93', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltipComponent />} />
          <Line
            type="monotone"
            dataKey="latency"
            name="지연 시간"
            stroke="#FF9500"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
