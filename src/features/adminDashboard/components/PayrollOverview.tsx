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
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
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
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>
              {totalPayroll.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>만원</div>
          </div>
        </div>
      </div>

      <Divider />

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {payrollData.map((item) => (
          <div key={item.name}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: '#666' }}>{item.name}</span>
              <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
                {item.value.toLocaleString()}만원
              </span>
            </div>
            <Progress
              percent={(item.value / totalPayroll) * 100}
              strokeColor={item.color}
              showInfo={false}
            />
          </div>
        ))}
      </Space>
    </Card>
  );
}
