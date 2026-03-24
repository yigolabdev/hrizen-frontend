import React, { useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Progress, Modal, Space, Statistic } from 'antd';
import {
  CrownOutlined,
  CalendarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface SubscriptionInfo {
  planName: string;
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  billingCycle: string;
  nextBillingDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  seats: number;
  usedSeats: number;
  monthlyPrice: number;
  autoRenew: boolean;
}

const subscriptionData: SubscriptionInfo = {
  planName: 'Business Pro',
  status: 'active',
  billingCycle: '월간',
  nextBillingDate: '2025-02-15',
  currentPeriodStart: '2025-01-15',
  currentPeriodEnd: '2025-02-14',
  seats: 50,
  usedSeats: 37,
  monthlyPrice: 990000,
  autoRenew: true,
};

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: '#52c41a', label: '활성' },
  trial: { color: '#007AFF', label: '체험판' },
  expired: { color: '#ff4d4f', label: '만료' },
  cancelled: { color: '#8c8c8c', label: '해지됨' },
};

export default function SubscriptionStatusCard() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const data = subscriptionData;
  const statusInfo = statusConfig[data.status];
  const seatPercentage = Math.round((data.usedSeats / data.seats) * 100);

  const handleCancelSubscription = () => {
    setCancelModalOpen(false);
  };

  return (
    <>
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" size={8}>
              <Space align="center" size={8}>
                <CrownOutlined style={{ fontSize: 24, color: '#FF9500' }} />
                <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
                  {data.planName}
                </Title>
              </Space>
              <Tag
                color={statusInfo.color}
                style={{ borderRadius: 12, padding: '2px 12px', fontWeight: 600 }}
              >
                {statusInfo.label}
              </Tag>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {data.billingCycle} 결제 · 자동갱신 {data.autoRenew ? '활성' : '비활성'}
              </Text>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Statistic
              title={
                <Space size={4}>
                  <CalendarOutlined />
                  <span>다음 결제일</span>
                </Space>
              }
              value={data.nextBillingDate}
              valueStyle={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              현재 기간: {data.currentPeriodStart} ~ {data.currentPeriodEnd}
            </Text>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <Space size={4}>
                <TeamOutlined />
                <Text type="secondary">좌석 사용량</Text>
              </Space>
              <Text strong style={{ fontSize: 18 }}>
                {data.usedSeats} / {data.seats}석
              </Text>
              <Progress
                percent={seatPercentage}
                strokeColor={seatPercentage > 80 ? '#FF9500' : '#007AFF'}
                trailColor="#F2F2F7"
                showInfo={false}
                style={{ marginBottom: 0 }}
              />
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" size={4}>
              <Statistic
                title={
                  <Space size={4}>
                    <ThunderboltOutlined />
                    <span>월 청구 금액</span>
                  </Space>
                }
                value={data.monthlyPrice}
                suffix="원"
                valueStyle={{ fontSize: 18, fontWeight: 700, color: '#007AFF' }}
              />
              <Button
                danger
                type="text"
                size="small"
                onClick={() => setCancelModalOpen(true)}
                style={{ padding: 0, fontSize: 12 }}
              >
                구독 해지
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
            <span>구독 해지 확인</span>
          </Space>
        }
        open={cancelModalOpen}
        onOk={handleCancelSubscription}
        onCancel={() => setCancelModalOpen(false)}
        okText="해지하기"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <Space direction="vertical" size={12}>
          <Text>
            정말로 <Text strong>{data.planName}</Text> 구독을 해지하시겠습니까?
          </Text>
          <Text type="secondary">
            현재 결제 기간({data.currentPeriodEnd})까지는 서비스를 계속 이용할 수 있습니다.
            해지 후에는 무료 플랜으로 전환되며 일부 기능이 제한됩니다.
          </Text>
        </Space>
      </Modal>
    </>
  );
}
