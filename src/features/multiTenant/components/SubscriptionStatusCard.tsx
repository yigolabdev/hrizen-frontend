import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Progress, Tag } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  UserOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useTenants } from '../hooks/useTenants';

const { Text } = Typography;

export default function SubscriptionStatusCard() {
  const { summary } = useTenants();

  const cards = [
    {
      title: '전체 테넌트',
      value: summary.totalTenants,
      icon: <TeamOutlined style={{ fontSize: 24, color: '#007AFF' }} />,
      suffix: '개',
      color: '#007AFF',
    },
    {
      title: '활성 테넌트',
      value: summary.activeTenants,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      suffix: '개',
      color: '#52c41a',
    },
    {
      title: '체험판',
      value: summary.trialTenants,
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: '#FF9500' }} />,
      suffix: '개',
      color: '#FF9500',
    },
    {
      title: '만료',
      value: summary.expiredTenants,
      icon: <WarningOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />,
      suffix: '개',
      color: '#ff4d4f',
    },
    {
      title: '전체 사용자',
      value: summary.totalUsers,
      icon: <UserOutlined style={{ fontSize: 24, color: '#007AFF' }} />,
      suffix: '명',
      color: '#007AFF',
    },
    {
      title: '월 매출(MRR)',
      value: summary.totalRevenue,
      icon: <DollarOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      prefix: '₩',
      color: '#52c41a',
      formatter: true,
    },
  ];

  const activePercent = Math.round((summary.activeTenants / summary.totalTenants) * 100);

  return (
    <Card
      title="구독 현황 요약"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      extra={
        <Space>
          <Tag color="blue">실시간</Tag>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        {cards.map((card) => (
          <Col xs={12} sm={8} key={card.title}>
            <div
              style={{
                backgroundColor: '#F2F2F7',
                borderRadius: 10,
                padding: '16px 12px',
                textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: 8 }}>{card.icon}</div>
              <Statistic
                title={
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {card.title}
                  </Text>
                }
                value={card.value}
                prefix={card.prefix}
                suffix={card.suffix}
                valueStyle={{ color: card.color, fontSize: 20, fontWeight: 700 }}
                formatter={card.formatter ? (val) => Number(val).toLocaleString() : undefined}
              />
            </div>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 20, padding: '0 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>테넌트 활성률</Text>
          <Text strong style={{ color: '#007AFF' }}>{activePercent}%</Text>
        </div>
        <Progress
          percent={activePercent}
          strokeColor={{ from: '#007AFF', to: '#52c41a' }}
          showInfo={false}
          size="small"
        />
      </div>
    </Card>
  );
}
