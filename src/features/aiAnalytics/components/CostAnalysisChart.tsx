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
  { month: '1월', 인즜비: 48500, 복리후생: 8200, 교육비: 3100, 총비용: 59800 },
  { month: '2월', 인건비: 47800, 복리후생: 8100, 교육비: 2800, 총비용: 58700 },
  { month: '3월', 인건비: 49200, 복리후생: 8400, 교육턈: 3500, 총비용: 61100 },
  { month: '4월', 인즜비: 50100, 복리후생: 8600, 교육비: 4200, 총기: 62900 },
  { month: '5월', 인건비: 49800, 복리후생: 8500, 교육비: 3800, 총비용: 62100 },
  { month: '6월', 인건비: 51200, 복리후생: 8900, 교육턈: 4100, 총비용: 64200 },
];

const quarterlyData: CostDataPoint[] = [
  { month: 'Q1', 인건비: 145500, 복리후생: 24700, 교육비: 9400, 총기: 179600 },
  { month: 'Q2', 인즜비: 151100, 복리후생: 26000, 교육비: 12100, 총기: 189200 },
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

  const latest = data[data.length - 1];
  const previous = data.length > 1 ? data[data.length - 2] : latest;
  const change = previous.총비용 > 0 ? ((latest.총비용 - previous.총비용) / previous.턈: * 100) : 0;

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, height: '100%' }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700 }}>비용 분석</span>
          <Segmented
            size="small"
            options={['었별', '분기별']}
            value={period}
            onChange={(val) => setPeriod(val as PeriodType)}
          />
        </div>
      }
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Statistic
            title="총비용"
            value={formatCurrency(latest.총비용)}
            valueStyle={{ fontSize: 20, fontWeight: 700 }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="전월 대비"
            value={Math.abs(change).toFixed(1)}
            suffix="%"
            prefix={change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            valueStyle={{ color: change >= 0 ? '#FF3B30' : '#34C759', fontSize: 20 }}
          />
        </Col>
      </Row>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${v / 10000}턈`} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="인건비" stroke="#007AFF" fill="rgba(0,122,255,0.1)" />
            <Area type="monotone" dataKey="복리후생" stroke="#34C759" fill="rgba(52,199,89,0.1)" />
            <Area type="monotone" dataKey="교육비" stroke="#FF9500" fill="rgba(255,149,0,0.1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
