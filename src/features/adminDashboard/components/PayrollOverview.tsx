import React from 'react';
import { Card, Typography, Space, Progress, Divider } from 'antd';
import { DollarCircleOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PayrollItem {
  name: string;
  value: number;
  color: string;
}

const payrollData: PayrollItem[] = [
  { name: '기본급', value: 3200, color: '#007AFF' },
  { name: '수당', value: 680, color: '#34C759' },
  { name: '상여금', value: 520, color: '#FF9500' },
  { name: '공제', value: 420, color: '#FF3B30' },
];

const totalPayroll = 4820;

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: PayrollItem }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 10,
        padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        border: 'none',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{item.name}</p>
      <p style={{ margin: '4px 0 0', fontSize: 12, color: item.payload.color }}>
        {item.value.toLocaleString()}만원
      </p>
    </div>
  );
}

export default function PayrollOverview() {
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
      aria-label="급여 개요"
    >
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>급여 개요</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={payrollData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {payrollData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: 11, display: 'block' }}>
              이번 달 총액
            </Typography.Text>
            <Typography.Title level={5} style={{ margin: 0, fontWeight: 700 }}>
              {totalPayroll.toLocaleString()}
              <span style={{ fontSize: 12, fontWeight: 400 }}>만원</span>
            </Typography.Title>
          </div>
        </div>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {payrollData.map((item) => {
          const pct = Math.round((item.value / totalPayroll) * 100);
          return (
            <div key={item.name}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                    }}
                  />
                  <Typography.Text style={{ fontSize: 13 }}>{item.name}</Typography.Text>
                </div>
                <Typography.Text style={{ fontSize: 13, fontWeight: 600 }}>
                  {item.value.toLocaleString()}만원
                </Typography.Text>
              </div>
              <Progress
                percent={pct}
                showInfo={false}
                strokeColor={item.color}
                trailColor="#F2F2F7"
                size="small"
                style={{ margin: 0 }}
              />
            </div>
          );
        })}
      </Space>

      <Divider style={{ margin: '16px 0 12px' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <ArrowUpOutlined style={{ color: '#34C759', fontSize: 12 }} />
        <Typography.Text style={{ fontSize: 12, color: '#34C759', fontWeight: 600 }}>
          전월 대비 5.1% 증가
        </Typography.Text>
      </div>
    </Card>
  );
}
