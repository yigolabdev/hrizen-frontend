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
  Legend,
} from 'recharts';

type Period = '주간' | '월간' | '오늘';

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
  { label: '4월', attendance: 95, late: 3, absent: 2 },
  { label: '5월', attendance: 94, late: 4, absent: 2 },
  { label: '6월', attendance: 96, late: 2, absent: 2 },
  { label: '7월', attendance: 97, late: 2, absent: 1 },
  { label: '8월', attendance: 95, late: 3, absent: 2 },
  { label: '9월', attendance: 94, late: 4, absent: 2 },
  { label: '10월', attendance: 95, late: 3, absent: 2 },
  { label: '11월', attendance: 94, late: 4, absent: 2 },
  { label: '12월', attendance: 96, late: 2, absent: 2 },
];

const todayData: DataPoint[] = [
  { label: '09:00', attendance: 88, late: 8, absent: 4 },
  { label: '10:00', attendance: 95, late: 3, absent: 2 },
  { label: '11:00', attendance: 96, late: 2, absent: 2 },
  { label: '14:00', attendance: 94, late: 4, absent: 2 },
];

export default function AttendanceChart() {
  const [period, setPeriod] = useState<Period>('주간');

  const getData = (): DataPoint[] => {
    switch (period) {
      case '주간':
        return weeklyData;
      case '월간':
        return monthlyData;
      case '오늘':
        return todayData;
      default:
        return weeklyData;
    }
  };

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
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>태근 현황�䫍</span>
        <Segmented
          options={['오늘', '주간', '월간']}
          value={period}
          onChange={(val) => setPeriod(val as Period)}
          size="small"
        />
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#007AFF" name="출근" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" fill="#FF9500" name="지각" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" fill="#FF3B30" name="결근" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
