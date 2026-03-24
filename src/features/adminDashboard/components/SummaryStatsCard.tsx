import React from 'react';
import { Row, Col, Card, Statistic, Typography, Space } from 'antd';
import {
  TeamOutlined,
  ScheduleOutlined,
  PayCircleOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

interface StatItem {
  key: string;
  title: string;
  value: number;
  suffix?: string;
  prefix?: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend: 'up' | 'down';
  trendValue: string;
}

const stats: StatItem[] = [
  {
    key: 'employees',
    title: '전체 직원 수',
    value: 1248,
    suffix: '명',
    icon: <TeamOutlined />,
    color: '#007AFF',
    bgColor: 'rgba(0, 122, 255, 0.08)',
    trend: 'up',
    trendValue: '3.2%',
  },
  {
    key: 'attendance',
    title: '금일 출근율',
    value: 94.5,
    suffix: '%',
    icon: <ScheduleOutlined />,
    color: '#34C759',
    bgColor: 'rgba(52, 199, 89, 0.08)',
    trend: 'up',
    trendValue: '1.8%',
  },
  {
    key: 'payroll',
    title: '이번 달 급여 총액',
    value: 4820000000,
    icon: <PayCircleOutlined />,
    color: '#FF9500',
    bgColor: 'rgba(255, 149, 0, 0.08)',
    trend: 'up',
    trendValue: '5.1%',
  },
  {
    key: 'risk',
    title: '이직 위험 인원',
    value: 23,
    suffix: '명',
    icon: <WarningOutlined />,
    color: '#FF3B30',
    bgColor: 'rgba(255, 59, 48, 0.08)',
    trend: 'down',
    trendValue: '2.4%',
  },
];

function formatKRW(value: number): string {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(1)}억원`;
  }
  if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}만원`;
  }
  return value.toLocaleString();
}

export default function SummaryStatsCard() {
  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => (
        <Col xs={12} sm={12} md={6} key={stat.key}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              height: '100%',
            }}
            bodyStyle={{ padding: '20px 24px' }}
            aria-label={`${stat.title} 통계`}
          >
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: stat.trend === 'up' ? '#34C759' : '#FF3B30',
                  }}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUpOutlined style={{ fontSize: 10 }} />
                  ) : (
                    <ArrowDownOutlined style={{ fontSize: 10 }} />
                  )}
                  {stat.trendValue}
                </div>
              </div>
              <div>
                <Typography.Text
                  type="secondary"
                  style={{ fontSize: 13, display: 'block', marginBottom: 4 }}
                >
                  {stat.title}
                </Typography.Text>
                <Typography.Title
                  level={4}
                  style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}
                >
                  {stat.key === 'payroll'
                    ? formatKRW(stat.value)
                    : `${stat.value.toLocaleString()}${stat.suffix || ''}`}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
