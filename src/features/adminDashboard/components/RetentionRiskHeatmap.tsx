import React from 'react';
import { Card, Typography } from 'antd';
import { Heatmap } from '@ant-design/plots';

const data = [
  { 부서: '개발팀', 위험도: 23 },
  { 부서: '영업팀', 위험도: 41 },
  { 부서: '인사팀', 위험도: 12 },
  { 부서: '재무팀', 위험도: 35 },
  { 부서: '품질관리팀', 위험도: 8 },
  { 부서: '고객지원팀', 위험도: 19 },
];

const config = {
  data: data.map((d) => ({
    x: d.부서,
    y: '리스크',
    value: d.위험도,
  })),
  xField: 'x',
  yField: 'y',
  colorField: 'value',
  color: ['#e0f3ff', '#007AFF', '#003d99'],
  height: 300,
  legend: { position: 'top-left' },
  tooltip: {
    formatter: (datum: { x: string; y: string; value: number }) => ({
      name: datum.x,
      value: `${datum.value} % 이직 위험도`,
    }),
  },
  meta: {
    value: { range: [0, 50] },
  },
};

export default function RetentionRiskHeatmap() {
  return (
    <Card
      title="AI 기반 이직 위험도"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      aria-label="이직 위험도 히트맵"
    >
      <Typography.Paragraph>
        부서별 이직 위험도를 AI가 분석하여 시각화한 결과입니다. 높은 %는 주의가 필요합니다.
      </Typography.Paragraph>
      <Heatmap {...config} />
    </Card>
  );
}
