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
} from 'recharts';

type Period = '주간' | '월간' | '월간';

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
  { label: '��', attendance: 97, late: 2, absent: 1 },
  { label: '금', attendance: 93, late: 5, absent: 2 },
];

const monthlyData: DataPoint[] = [
  { label: '1월', attendance: 95, late: 3, absent: 2 },
  { label: '2월', attendance: 94, late: 4, absent: 2 },
  { label: '3월', attendance: 96, late: 2, absent: 2 },
  { label: '4월', attendance: 93, late: 5, absent: 2 },
  { label: '5월', attendance: 95, late: 3, absent: 2 },
  { label: '6월', attendance: 94, late: 4, absent: 2 },
  { label: '7월', attendance: 96, late: 3, absent: 1 },
  { label: '8월', attendance: 95, late: 3, absent: 2 },
  { label: '9월', attendance: 94, late: 4, absent: 2 },
  { label: '10월', attendance: 95, late: 3, absent: 2 },
  { label: '11월', attendance: 96, late: 2, absent: 2 },
  { label: '12월', attendance: 95, late: 3, absent: 2 },
];

const yearlyData: DataPoint[] = [
  { label: '2021', attendance: 93, late: 4, absent: 3 },
  { label: '2022', attendance: 94, late: 4, absent: 2 },
  { label: '2023', attendance: 95, late: 3, absent: 2 },
  { label: '2024', attendance: 96, late: 3, absent: 1 },
];

const dataMap: Record<Period, DataPoint[]> = {
  '㽼간': weeklyData,
  '월간': monthlyData,
  '유간': earlyData,
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
        borderRadius: 10,
        padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ margin: '4px 0 0', fontSize: 12, color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

export default function AttendanceChart() {
  const [period, setPeriod] = useState<Period>('㽼간');
  const data = dataMap[period] || weeklyData;

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>태근 쥸석 차트</span>
        <Segmented
          options={['주간', '월간', '월간']}
          value={period}
          onChange={(val) => setPeriod(val as Period)}
          size="small"
        />
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[80, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="late" fill="#FF9500" barSize={20} radius={[4, 4, 0, 0]} name="지각" />
            <Bar dataKey="absent" fill="#FF3B30" barSize={20} radius={[4, 4, 0, 0]} name="결근" />
            <Line type="monotone" dataKey="attendance" stroke="#007AFF" strokeWidth={2} dot={{ r: 4 }} name="출근잨" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
