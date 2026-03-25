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

const { Text } = Typography;

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
    title: '이번 달 급여액',
    value: 4820,
    suffix: '만�',
    icon: <PayCircleOutlined />,
    color: '#FF9500',
    bgColor: 'rgba(255, 149, 0, 0.08)',
    trend: 'up',
    trendValue: '5.1%',
  },
  {
    key: 'risk',
    title: '이퇍 위험 인원',
    value: 23,
    suffix: '명',
    icon: <WarningOutlined />,
    color: '#FF3B30',
    bgColor: 'rgba(255, 59, 48, 0.08)',
    trend: 'down',
    trendValue: '2.4%',
  },
];

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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: stat.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  fontSize: 20,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>{stat.title}</Text>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>
                  {stat.value.toLocaleString()}{stat.suffix || ''}
                </div>
                <Space size={4}>
                  {stat.trend === 'up' ? (
                    <ArrowUpOutlined style={{ color: '#34C759', fontSize: 11 }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: '#FF3B30', fontSize: 11 }} />
                  )}
                  <Text
                    style={{
                      fontSize: 11,
                      color: stat.trend === 'up' ? '#34C759' : '#FF3B30',
                    }}
                  >
                    {stat.trendValue}
                  </Text>
                </Space>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
