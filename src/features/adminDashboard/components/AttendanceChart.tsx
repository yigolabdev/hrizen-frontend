import React, { useState } from 'react';
import { Card, Segmented } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Area,
} from 'recharts';

type Period = '주간' | '월간' | '분기';

interface DataPoint {
  label: string;
  attendance: number;
  late: number;
  absent: number;
}

const weeklyData: DataPoint[] = [
  { label: '월', attendance: 96, late: 3, absent: 1 },
  { label: '화', attendance: 94, late: 4, absent: 2 },
  { label: '수', attendance: 95, late: 3, absent: 2 },
  { label: '목', attendance: 93, late: 5, absent: 2 },
  { label: '금', attendance: 91, late: 6, absent: 3 },
];

const monthlyData: DataPoint[] = [
  { label: '1월', attendance: 87, late: 8, absent: 5 },
  { label: '2월', attendance: 90, late: 6, absent: 4 },
  { label: '3월', attendance: 92, late: 5, absent: 3 },
  { label: '4월', attendance: 88, late: 7, absent: 5 },
  { label: '5월', attendance: 91, late: 6, absent: 3 },
  { label: '6월', attendance: 93, late: 4, absent: 3 },
  { label: '7월', attendance: 89, late: 7, absent: 4 },
  { label: '8월', attendance: 92, late: 5, absent: 3 },
  { label: '9월', attendance: 94, late: 4, absent: 2 },
  { label: '10월', attendance: 92, late: 5, absent: 3 },
  { label: '11월', attendance: 89, late: 7, absent: 4 },
  { label: '12월', attendance: 95, late: 3, absent: 2 },
];

const quarterlyData: DataPoint[] = [
  { label: 'Q1', attendance: 90, late: 6, absent: 4 },
  { label: 'Q2', attendance: 91, late: 6, absent: 3 },
  { label: 'Q3', attendance: 92, late: 5, absent: 3 },
  { label: 'Q4', attendance: 92, late: 5, absent: 3 },
];

const dataMap: Record<Period, DataPoint[]> = {
  '주간': weeklyData,
  '월간': monthlyData,
  '분기': quarterlyData,
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ margin: '4px 0 0', fontSize: 12, color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

export default function AttendanceChart() {
  const [period, setPeriod] = useState<Period>('월간');

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        height: '100%',
      }}
      bodyStyle={{ padding: '24px' }}
      aria-label="근태 추세 차트"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>근태 추세</span>
        <Segmented
          options={['주간', '월간', '분기']}
          value={period}
          onChange={(val) => setPeriod(val as Period)}
          style={{ borderRadius: 8 }}
        />
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={dataMap[period]} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#007AFF" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#007AFF" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" vertical={false} />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#8E8E93' }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#8E8E93' }}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="attendance"
            fill="url(#attendanceGradient)"
            stroke="none"
            name="출근율"
          />
          <Bar
            dataKey="attendance"
            fill="#007AFF"
            radius={[6, 6, 0, 0]}
            barSize={period === '주간' ? 40 : period === '분기' ? 48 : 24}
            name="출근율"
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke="#FF9500"
            strokeWidth={2}
            dot={{ r: 4, fill: '#FF9500' }}
            name="지각률"
          />
          <Line
            type="monotone"
            dataKey="absent"
            stroke="#FF3B30"
            strokeWidth={2}
            dot={{ r: 4, fill: '#FF3B30' }}
            name="결근률"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginTop: 12,
        }}
      >
        {[
          { label: '출근율', color: '#007AFF' },
          { label: '지각률', color: '#FF9500' },
          { label: '결근률', color: '#FF3B30' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: item.color,
              }}
            />
            <span style={{ fontSize: 12, color: '#8E8E93' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
