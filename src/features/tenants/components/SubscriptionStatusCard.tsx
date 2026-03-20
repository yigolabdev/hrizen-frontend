import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Card, Progress, Typography } from 'antd';
import { apiClient } from '@/lib/api';

const { Text } = Typography;

interface SubscriptionInfo {
  totalTenants: number;
  activeCount: number;
  trialCount: number;
  expiredCount: number;
  totalActiveUsers: number;
  maxUsersAllowed: number;
}

export default function SubscriptionStatusCard() {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      setLoading(true);
      // Mock API
      const info: SubscriptionInfo = {
        totalTenants: 3,
        activeCount: 1,
        trialCount: 1,
        expiredCount: 1,
        totalActiveUsers: 247,
        maxUsersAllowed: 600,
      };
      // 실제 호출: const info = await apiClient.get('/admin/tenants/subscription-status');
      setSubscriptionInfo(info);
      setLoading(false);
    }
    fetchSubscription();
  }, []);

  if (!subscriptionInfo) return <div>구독 상태 정보를 불러오는 중입니다...</div>;

  const activePercent = (subscriptionInfo.activeCount / subscriptionInfo.totalTenants) * 100;
  const trialPercent = (subscriptionInfo.trialCount / subscriptionInfo.totalTenants) * 100;
  const expiredPercent = (subscriptionInfo.expiredCount / subscriptionInfo.totalTenants) * 100;

  const usersPercent = (subscriptionInfo.totalActiveUsers / subscriptionInfo.maxUsersAllowed) * 100;

  return (
    <Card bordered={false} style={{ backgroundColor: '#FFFFFF', borderRadius: 12 }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Text strong style={{ fontSize: 16, color: '#007AFF' }}>
            테넌트 총 개수: {subscriptionInfo.totalTenants}개
          </Text>
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="활성 테넌트"
            value={subscriptionInfo.activeCount}
            valueStyle={{ color: '#007AFF' }}
          />
          <Progress percent={activePercent} strokeColor="#007AFF" showInfo={false} />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="체험 테넌트"
            value={subscriptionInfo.trialCount}
            valueStyle={{ color: '#FF9500' }}
          />
          <Progress percent={trialPercent} strokeColor="#FF9500" showInfo={false} />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="만료 테넌트"
            value={subscriptionInfo.expiredCount}
            valueStyle={{ color: '#FF3B30' }}
          />
          <Progress percent={expiredPercent} strokeColor="#FF3B30" showInfo={false} />
        </Col>
      </Row>

      <Divider style={{ borderColor: '#F2F2F7' }} />

      <Row>
        <Col span={24}>
          <Text strong style={{ fontSize: 16, color: '#007AFF' }}>
            전체 활성 사용자 수 및 제한
          </Text>
          <Statistic
            value={`${subscriptionInfo.totalActiveUsers} / ${subscriptionInfo.maxUsersAllowed}`}
            style={{ marginBottom: 8 }}
          />
          <Progress
            percent={Math.min(usersPercent, 100)}
            strokeColor="#007AFF"
            format={(percent) => `${percent?.toFixed(1)}% 사용`}
          />
        </Col>
      </Row>
    </Card>
  );
}
