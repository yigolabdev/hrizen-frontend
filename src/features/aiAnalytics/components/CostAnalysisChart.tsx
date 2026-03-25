import React, { useState } from 'react';
import { Card, Segmented, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface CostDataPoint {
  month: string;
  인건비: number;
  복리후생: number;
  교육비: number;
  총비용: number;
}

const monthlyData: CostDataPoint[] = [
  { month: '1월', 인건비: 48500, 복리후생: 8200, 교육비: 3100, 총비용: 59800 },
  { month: '2월', 인건비: 47800, 복리후생: 8100, 교육비: 2800, 총비용: 58700 },
  { month: '3월', 인건비: 49200, 복리후생: 8400, 교육비: 3500, 총비용: 61100 },
  { month: '4월', 인건비: 50100, 복리후생: 4600, 교육비: 4200, 총비용: 62900 },
  { month: '5월', 인건비: 49800, 복리후생: 4500, 교육비: 3800, 총비용: 62100 },
  { month: '6월', 인건비: 51200, 복리후생: 4900, 교육비: 4100, 총비용: 64200 },
  { month: '7월', 인건비: 52400, 복리후생: 5100, 교육비: 3600, 총비용: 65100 },
  { month: '8월', 인건비: 51800, 복리후생: 5000, 교육비: 3900, 총비용: 64700 },
  { month: '9월', 인건비: 53100, 복리후생: 5200, 교육비: 4300, 총비용: 66600 },
  { month: '10월', 인건비: 54200, 복리후생: 5400, 교육비: 4000, 총비용: 67600 },
  { month: '11월', 인건비: 53800, 복리후생: 5300, 교육비: 4500, 총비용: 67600 },
  { month: '12월', 인건비: 55100, 복리후생: 5600, 교육비: 4800, 총비용: 69500 },
];

const quarterlyData: CostDataPoint[] = [
  { month: 'Q1', 인건비: 145500, 복리후생: 24700, 교육비: 9400, 총비용: 179600 },
  { month: 'Q2', 인건비: 151100, 복리후생: 26000, 교육비: 12100, 총비용: 189200 },
  { month: 'Q3', 인건비: 157300, 복리후생: 27300, 교육비: 11800, 총비용: 196400 },
  { month: 'Q4', 인건비: 163100, 복리후생: 28300, 교육비: 13300, 총비용: 204700 },
];

type PeriodType = '월별' | '분기별';

const formatCurrency = (value: number): string => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}억`;
  }
  return `${value.toLocaleString()}만`;
};

export default function CostAnalysisChart() {
  const [period, setPeriod] = useState<PeriodType>('월별');
  const data = period === '월별' ? monthlyData : quarterlyData;

  const latestTotal = data[data.length - 1]?.총비용 ?? 0;
  const prevTotal = data[data.length - 2]?.총비용 ?? 0;
  const changePct = prevTotal > 0 ? (((latestTotal - prevTotal) / prevTotal) * 100).toFixed(1) : '0';
  const isUp = Number(changePct) >= 0;

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={<span style={{ fontWeight: 700 }}>비용 분석</span>}
      extra={
        <Segmented
          value={period}
          options={['월별', '분기별']}
          onChange={(value) => setPeriod(value as PeriodType)}
          size="small"
        />
      }
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Statistic
            title="총비용"
            value={formatCurrency(latestTotal)}
            valueStyle={{ fontWeight: 700 }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="전기 대비"
            value={`${changePct}%`}
            prefix={isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            valueStyle={{ color: isUp ? '#FF3B30' : '#34C759' }}
          />
        </Col>
      </Row>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v: number) => formatCurrency(v)} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="인건비" stackId="1" stroke="#007AFF" fill="rgba(0,122,255,0.2)" />
            <Area type="monotone" dataKey="복리후생" stackId="1" stroke="#34C759" fill="rgba(52,199,89,0.2)" />
            <Area type="monotone" dataKey="교육비" stackId="1" stroke="#FF9500" fill="rgba(255,149,0,0.2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
