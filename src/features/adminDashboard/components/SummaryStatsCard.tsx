import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { ClockCircleOutlined, DollarOutlined, ProfileOutlined, RiseOutlined } from '@ant-design/icons';

interface SummaryStat {
  title: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
  color: string;
}

const stats: SummaryStat[] = [
  {
    title: '근태 현황(출근율)',
    value: 92.5,
    suffix: '%',
    icon: <ClockCircleOutlined style={{ fontSize: 24, color: '#007AFF' }} />, 
    color: '#007AFF',
  },
  {
    title: '월 급여 총액',
    value: 35400000,
    suffix: '원',
    icon: <DollarOutlined style={{ fontSize: 24, color: '#FF9500' }} />, 
    color: '#FF9500',
  },
  {
    title: '등록 직원 수',
    value: 183,
    icon: <ProfileOutlined style={{ fontSize: 24, color: '#007AFF' }} />, 
    color: '#007AFF',
  },
  {
    title: '성과 평가 완료율',
    value: 87,
    suffix: '%',
    icon: <RiseOutlined style={{ fontSize: 24, color: '#FF9500' }} />, 
    color: '#FF9500',
  },
];

export default function SummaryStatsCard() {
  return (
    <Card
      title="요약 통계"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      aria-label="요약 통계 카드"
    >
      <Row gutter={[16, 16]} justify="space-between">
        {stats.map(({ title, value, suffix, icon, color }) => (
          <Col key={title} span={24} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div aria-hidden="true">{icon}</div>
            <div style={{ flexGrow: 1 }}>
              <Statistic
                title={title}
                value={value}
                precision={typeof value === 'number' && suffix === '%' ? 1 : 0}
                suffix={suffix}
                valueStyle={{ color, fontWeight: 600, fontSize: 22 }}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
