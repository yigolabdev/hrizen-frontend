import React from 'react';
import { Card, Typography } from 'antd';
import { Bar } from '@ant-design/plots';

const data = [
  { 출근일: '1월', 출근율: 92 },
  { 출근일: '2월', 출근율: 89 },
  { 출근일: '3월', 출근율: 94 },
  { 출근일: '4월', 출근율: 91 },
  { 출근일: '5월', 출근율: 93 },
  { 출근일: '6월', 출근율: 95 },
];

export default function AttendanceChart() {
  const config = {
    data,
    xField: '출근일',
    yField: '출근율',
    maxBarWidth: 32,
    color: '#007AFF',
    label: {
      position: 'middle',
      style: { fill: '#fff', fontWeight: 'bold' },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: '출근율 (%)',
        style: { fontWeight: 'bold' },
        position: 'end',
      },
    },
    padding: 'auto',
    height: 280,
    interactions: [{ type: 'active-region' }],
    renderer: 'svg' as const,
  };

  return (
    <section aria-label="월별 출근율 차트">
      <Typography.Title level={4} style={{ marginBottom: 16, color: '#007AFF' }}>
        최근 6개월 근태 출근율
      </Typography.Title>
      <Bar {...config} />
    </section>
  );
}
