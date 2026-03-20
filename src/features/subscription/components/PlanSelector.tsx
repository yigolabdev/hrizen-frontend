import React, { useEffect, useState } from 'react';
import { Card, Radio, Typography, Button, Space, message } from 'antd';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

type Plan = {
  id: string;
  name: string;
  priceMonthly: number; // 원 단위
  description: string;
  features: string[];
};

const mockPlans: Plan[] = [
  {
    id: 'basic',
    name: '베이식',
    priceMonthly: 55000,
    description: '근태·급여 자동화, 기본 리포팅 제공',
    features: ['근태 관리', '급여 자동 계산', '기본 리포트'],
  },
  {
    id: 'professional',
    name: '프로페셔널',
    priceMonthly: 85000,
    description: 'OKR·성과 분석, AI 예측 포함',
    features: ['OKR 관리', '성과 분석', 'AI 인재 유지 예측'],
  },
  {
    id: 'enterprise',
    name: '엔터프라이즈',
    priceMonthly: 150000,
    description: '전체 기능 및 맞춤형 지원 포함',
    features: ['전체 기능', '맞춤형 대시보드', '전담 고객 지원'],
  },
];

export default function PlanSelector() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('basic');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // mock api 호출 시뮬레이션
    async function fetchPlans() {
      setLoading(true);
      try {
        // 실제 apiClient.get 호출 대신 mock 데이터 사용
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPlans(mockPlans);
        setSelectedPlanId(mockPlans[0].id);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlanId(e.target.value);
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // mock 업그레이드 API 호출
      await new Promise((resolve) => setTimeout(resolve, 700));
      message.success('구독 플랜이 성공적으로 변경되었습니다.');
    } catch {
      message.error('플랜 변경에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="구독 플랜 선택" loading={loading} style={{ borderRadius: 12, boxShadow: '0 2px 10px rgb(0 122 255 / 0.1)' }}>
      <Radio.Group onChange={handleChange} value={selectedPlanId} style={{ width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {plans.map((plan) => (
            <Card
              key={plan.id}
              type={plan.id === selectedPlanId ? 'inner' : 'default'}
              size="small"
              style={{ borderColor: plan.id === selectedPlanId ? '#007AFF' : undefined, borderRadius: 10 }}
              bodyStyle={{ padding: 16 }}
            >
              <Radio value={plan.id} style={{ width: '100%', display: 'block', cursor: 'pointer' }}>
                <Title level={4} style={{ marginBottom: 4, color: '#007AFF' }}>
                  {plan.name}
                </Title>
                <Text strong style={{ fontSize: 20, color: '#007AFF' }}>
                  {plan.priceMonthly.toLocaleString()} 원 / 월
                </Text>
                <div style={{ marginTop: 8, marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>{plan.description}</div>
                <ul style={{ marginTop: 0, color: 'rgba(0,0,0,0.45)', paddingLeft: 20 }}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </Radio>
            </Card>
          ))}
        </Space>
      </Radio.Group>
      <Button
        type="primary"
        block
        style={{ marginTop: 24, borderRadius: 6, backgroundColor: '#007AFF', borderColor: '#007AFF' }}
        onClick={handleUpgrade}
        loading={loading}
      >
        플랜 업그레이드 / 변경
      </Button>
    </Card>
  );
}
