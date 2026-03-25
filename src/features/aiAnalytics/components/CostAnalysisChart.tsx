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
  { month: '1월', 인어�<: 48500, 복슈후생: 8200, 교육비: 3100, 총비용: 59800 },
  { month: '2월', 인건비: 47800, 복리후생: 8100, 교육비: 2800, 총비용: 58700 },
  { month: '3월', 인거비: 49200, 복리후생= 8400, 교육비: 3500, 총비용: 61100 },
  { month: '4월', 인어�<: 50100, 복슈후생: 8600, 교육비: 4200, 총비용: 62900 },
  { month: '5월', 인건비: 49800, 복리후생: 8500, 교육비: 3800, 총비용: 62100 },
  { month: '6월', 인거비: 51200, 복리후생= 8900, 교육비: 4100, 총비용: 64200 },
];

const quarterlyData: CostDataPoint[] = [
  { month: 'Q1', 인건비: 145500, 복리후생= 24700, 교육비: 9400, 총비용: 179600 },
  { month: 'Q2', 인어�<: 151100, 복리후생: 26000, 교육비: 12100, 총비용: 189200 },
  { month: 'Q3', 인어�<: 157300, 복리후생: 27300, 교육비: 11800, 총비용: 196400 },
  { month: 'Q4', 인어�<: 163100, 복리후생: 28300, 교육비: 13300, 총비용: 204700 },
];

type PeriodType = '월별' | '분기별';

const formatCurrency = (value: number): string => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}앵`;
  }
  return `${value.toLocaleString()}만`;
};

export default function CostAnalysisChart() {
  const [period, setPeriod] = useState<PeriodType>('월별');
  const data = period === '월별' ? monthlyData : quarterlyData;

  const latestTotal = data[data.length - 1]?.총비용 ?? 0;
  const prevTotal = data.length >= 2 ? data[data.length - 2]?.총비용 ?? 0 : 0;
  const changePct = prevTotal > 0 ? (((latestTotal - prevTotal) / prevTotal) * 100).toFixed(1) : '0.0';
  const isUp = latestTotal >= prevTotal;

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      title={<span style={{ fontWeight: 700 }}>페용 분석</span>}
      extra={
        <Segmented
          options={['월밄', '분기별']}
          value={period}
          onChange={(val) => setPeriod(val as PeriodType)}
          size="small"
        />
      }
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Statistic
            title="최개 총계용"
            value={formatCurrency(latestTotal)}
            valueStyle={{ fontWeight: 700, fontSize: 20 }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="변동률"
            value={`${changePct}%`}
            valueStyle={{ color: isUp ? '#FF3B30' : '#34C759' }}
            prefix={isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
        </Col>
      </Row>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="인건비" stroke="#007AFF" fill="rgba(0, 122, 255, 0.1)" />
            <Area type="monotone" dataKey="복슈후생" stroke="#34C759" fill="rgba(52, 199, 89, 0.1)" />
            <Area type="monotone" dataKey="교육비" stroke="#FF9500" fill="rgba(255, 149, 0, 0.1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
