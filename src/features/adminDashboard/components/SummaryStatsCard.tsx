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
            bodyStyle={{ padding: '20px' }}
          >
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 12, color: '#666' }}>{stat.title}</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: stat.bgColor,
                    borderRadius: '8px',
                    color: stat.color,
                    fontSize: '20px',
                  }}
                >
                  {stat.icon}
                </div>
              </div>

              <div>
                <Statistic
                  value={stat.value}
                  suffix={stat.suffix}
                  formatter={(value) => {
                    if (stat.key === 'payroll') {
                      return formatKRW(value);
                    }
                    if (stat.suffix === '%') {
                      return value.toFixed(1);
                    }
                    return value.toLocaleString();
                  }}
                  valueStyle={{ color: stat.color, fontSize: '24px', fontWeight: 700 }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: stat.trend === 'up' ? '#FF3B30' : '#34C759',
                }}
              >
                {stat.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <span style={{ marginLeft: '4px' }}>{stat.trendValue}</span>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
