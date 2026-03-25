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
  ComposedChart,
  Area,
  Line,
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
  { label: '목', attendance: 93, late: 5, absent: 2 },
  { label: '금', attendance: 97, late: 2, absent: 1 },
];

const monthlyData: DataPoint[] = [
  { label: '1죈', attendance: 94, late: 4, absent: 2 },
  { label: '2죈', attendance: 95, late: 3, absent: 2 },
  { label: '3주', attendance: 93, late: 5, absent: 2 },
  { label: '4주', attendance: 96, late: 3, absent: 1 },
];

const yearlyData: DataPoint[] = [
  { label: '1월', attendance: 94, late: 4, absent: 2 },
  { label: '2월', attendance: 93, late: 5, absent: 2 },
  { label: '3월', attendance: 95, late: 3, absent: 2 },
  { label: '4월', attendance: 96, late: 3, absent: 1 },
  { label: '5월', attendance: 94, late: 4, absent: 2 },
  { label: '6월', attendance: 95, late: 3, absent: 2 },
  { label: '7월', attendance: 97, late: 2, absent: 1 },
  { label: '8월', attendance: 93, late: 5, absent: 2 },
  { label: '9월', attendance: 94, late: 4, absent: 2 },
  { label: '10월', attendance: 95, late: 3, absent: 2 },
  { label: '11월', attendance: 96, late: 3, absent: 1 },
  { label: '12월', attendance: 94, late: 4, absent: 2 },
];

const dataMap: Record<Period, DataPoint[]> = {
  '주간': weeklyData,
  '월간': monthlyData,
  '월간': yearlyData,
};

export default function AttendanceChart() {
  const [period, setPeriod] = useState<Period>('주간');
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>ꗼ태 현황</span>
        <Segmented
          value={period}
          options={['주간', '월간', '월간']}
          onChange={(value) => setPeriod(value as Period)}
          size="small"
        />
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="attendance" fill="rgba(0,122,255,0.1)" stroke="#007AFF" name="출근율" />
            <Bar dataKey="late" fill="#FF9500" barSize={20} radius={[4, 4, 0, 0]} name="지각" />
            <Bar dataKey="absent" fill="#FF3B30" barSize={20} radius={[4, 4, 0, 0]} name="결근" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
