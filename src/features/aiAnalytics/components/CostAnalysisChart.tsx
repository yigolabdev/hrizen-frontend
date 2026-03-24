import React, { useState } from 'react';
import { Card, Segmented, Statistic, Row, Col, Tooltip as AntTooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
  { month: '4월', 인건비: 50100, 복리후생: 8600, 교육비: 4200, 총비용: 62900 },
  { month: '5월', 인건비: 49800, 복리후생: 8500, 교육비: 3800, 총비용: 62100 },
  { month: '6월', 인건비: 51200, 복리후생: 8900, 교육비: 4100, 총비용: 64200 },
  { month: '7월', 인건비: 52400, 복리후생: 9100, 교육비: 3600, 총비용: 65100 },
  { month: '8월', 인건비: 51800, 복리후생: 9000, 교육비: 3900, 총비용: 64700 },
  { month: '9월', 인건비: 53100, 복리후생: 9200, 교육비: 4300, 총비용: 66600 },
  { month: '10월', 인건비: 54200, 복리후생: 9400, 교육비: 4000, 총비용: 67600 },
  { month: '11월', 인건비: 53800, 복리후생: 9300, 교육비: 4500, 총비용: 67600 },
  { month: '12월', 인건비: 55100, 복리후생: 9600, 교육비: 4800, 총비용: 69500 },
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

  const latestTotal = data[data.length - 1].총비용;
  const previousTotal = data[data.length - 2].총비용;
  const changeRate = ((latestTotal - previousTotal) / previousTotal) * 100;
  const isIncrease = changeRate > 0;

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, color: '#007AFF', fontSize: 16 }}>인력 비용 분석</span>
          <AntTooltip title="AI가 분석한 인력 비용 추세입니다. 인건비, 복리후생비, 교육비를 포함합니다.">
            <InfoCircleOutlined style={{ color: '#8E8E93', fontSize: 14 }} />
          </AntTooltip>
        </div>
      }
      extra={
        <Segmented
          options={['월별', '분기별']}
          value={period}
          onChange={(val) => setPeriod(val as PeriodType)}
          size="small"
        />
      }
    >
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Statistic
            title="최근 총비용"
            value={latestTotal}
            suffix="만원"
            valueStyle={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="전기 대비"
            value={Math.abs(changeRate)}
            precision={1}
            suffix="%"
            prefix={isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            valueStyle={{
              fontSize: 20,
              fontWeight: 700,
              color: isIncrease ? '#FF3B30' : '#34C759',
            }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="AI 예측 (다음기)"
            value={Math.round(latestTotal * 1.023)}
            suffix="만원"
            valueStyle={{ fontSize: 20, fontWeight: 700, color: '#FF9500' }}
          />
        </Col>
      </Row>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorIngeon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBokri" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34C759" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34C759" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorGyoyuk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9500" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF9500" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8E8E93' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: '#8E8E93' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatCurrency(v)}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
            formatter={(value: number, name: string) => [`${value.toLocaleString()}만원`, name]}
          />
          <Legend />
          <Area type="monotone" dataKey="인건비" stroke="#007AFF" fill="url(#colorIngeon)" strokeWidth={2} />
          <Area type="monotone" dataKey="복리후생" stroke="#34C759" fill="url(#colorBokri)" strokeWidth={2} />
          <Area type="monotone" dataKey="교육비" stroke="#FF9500" fill="url(#colorGyoyuk)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
