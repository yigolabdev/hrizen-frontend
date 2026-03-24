import React, { useState } from 'react';
import { Card, Space, Segmented, Typography } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import type { GoalProgress } from '@/features/performance/types';

const { Text } = Typography;

const monthlyData: GoalProgress[] = [
  { month: '1월', achieved: 62, target: 80 },
  { month: '2월', achieved: 68, target: 80 },
  { month: '3월', achieved: 73, target: 82 },
  { month: '4월', achieved: 78, target: 85 },
  { month: '5월', achieved: 82, target: 85 },
  { month: '6월', achieved: 85, target: 88 },
  { month: '7월', achieved: 88, target: 90 },
];

const quarterlyData: GoalProgress[] = [
  { month: '2024 Q3', achieved: 72, target: 80 },
  { month: '2024 Q4', achieved: 78, target: 82 },
  { month: '2025 Q1', achieved: 85, target: 88 },
  { month: '2025 Q2', achieved: 88, target: 90 },
];

type ViewType = '월별' | '분기별';
type ChartType = '영역' | '막대';

export default function GoalProgressChart() {
  const [view, setView] = useState<ViewType>('월별');
  const [chartType, setChartType] = useState<ChartType>('영역');

  const data = view === '월별' ? monthlyData : quarterlyData;

  const latestAchieved = data[data.length - 1]?.achieved ?? 0;
  const latestTarget = data[data.length - 1]?.target ?? 0;
  const achieveRate = latestTarget > 0 ? Math.round((latestAchieved / latestTarget) * 100) : 0;

  return (
    <Card
      title={
        <Space>
          <LineChartOutlined style={{ color: '#007AFF' }} />
          <span>목표 달성 현황</span>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      extra={
        <Space size={8} wrap>
          <Segmented
            options={['월별', '분기별']}
            value={view}
            onChange={(val) => setView(val as ViewType)}
            size="small"
          />
          <Segmented
            options={['영역', '막대']}
            value={chartType}
            onChange={(val) => setChartType(val as ChartType)}
            size="small"
          />
        </Space>
      }
    >
      <Space size={24} style={{ marginBottom: 16 }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>현재 달성률</Text>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#007AFF' }}>{achieveRate}%</div>
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>달성 / 목표</Text>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            {latestAchieved}% / {latestTarget}%
          </div>
        </div>
      </Space>

      <ResponsiveContainer width="100%" height={280}>
        {chartType === '영역' ? (
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9500" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FF9500" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[50, 100]} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="target"
              name="목표"
              stroke="#FF9500"
              fill="url(#colorTarget)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Area
              type="monotone"
              dataKey="achieved"
              name="달성"
              stroke="#007AFF"
              fill="url(#colorAchieved)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[50, 100]} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Bar dataKey="target" name="목표" fill="#FF9500" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="achieved" name="달성" fill="#007AFF" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
