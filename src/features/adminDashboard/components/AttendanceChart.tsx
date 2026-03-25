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
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        border: 'none',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, fontSize: 12 }}>{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ margin: '2px 0', fontSize: 11, color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

export default function AttendanceChart() {
  const [period, setPeriod] = useState<Period>('월간');
  const data = dataMap[period];

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
    >
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>근태 현황</span>
        <Segmented
          options={['주간', '월간', '분기']}
          value={period}
          onChange={(value) => setPeriod(value as Period)}
          style={{ backgroundColor: '#f5f5f5' }}
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
          <XAxis dataKey="label" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="attendance" fill="#34C759" name="출석" />
          <Bar dataKey="late" fill="#FF9500" name="지각" />
          <Bar dataKey="absent" fill="#FF3B30" name="결석" />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}
