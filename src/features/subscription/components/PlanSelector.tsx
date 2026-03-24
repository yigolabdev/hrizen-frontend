import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Tag, List, Switch, Space, Modal } from 'antd';
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  seats: string;
  features: string[];
  popular: boolean;
  icon: React.ReactNode;
  color: string;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: '소규모 팀을 위한 기본 플랜',
    monthlyPrice: 290000,
    yearlyPrice: 2900000,
    seats: '최대 10명',
    features: [
      '근태 관리 기본',
      '급여 정산',
      '직원 셀프 서비스(ESS)',
      '이메일 지원',
      '기본 리포트',
    ],
    popular: false,
    icon: <StarOutlined />,
    color: '#8c8c8c',
  },
  {
    id: 'business',
    name: 'Business Pro',
    description: '성장하는 중소기업에 최적화',
    monthlyPrice: 990000,
    yearlyPrice: 9900000,
    seats: '최대 50명',
    features: [
      'Starter 모든 기능 포함',
      'OKR·성과 분석',
      'AI 이직 예측 기본',
      '오픈 API 접근',
      '우선 지원',
      '맞춤 리포트',
    ],
    popular: true,
    icon: <RocketOutlined />,
    color: '#007AFF',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: '대규모 조직을 위한 올인원',
    monthlyPrice: 2900000,
    yearlyPrice: 29000000,
    seats: '무제한',
    features: [
      'Business Pro 모든 기능 포함',
      'AI 인재 유지 고급 분석',
      '멀티테넌트 지원',
      '노무·세무 컴플라이언스',
      '전용 계정 매니저',
      'SLA 99.9% 보장',
      'SSO / SAML 지원',
    ],
    popular: false,
    icon: <CrownOutlined />,
    color: '#FF9500',
  },
];

export default function PlanSelector() {
  const [isYearly, setIsYearly] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; plan: Plan | null }>({
    open: false,
    plan: null,
  });

  const currentPlanId = 'business';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleSelectPlan = (plan: Plan) => {
    if (plan.id === currentPlanId) return;
    setUpgradeModal({ open: true, plan });
  };

  const handleConfirmUpgrade = () => {
    setUpgradeModal({ open: false, plan: null });
  };

  return (
    <>
      <Card
        bordered={false}
        style={{ borderRadius: 16, backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        title={
          <Space size={16} align="center">
            <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
              플랜 선택
            </Title>
            <Space size={8} align="center">
              <Text type={!isYearly ? undefined : 'secondary'} style={{ fontWeight: !isYearly ? 600 : 400 }}>
                월간
              </Text>
              <Switch
                checked={isYearly}
                onChange={setIsYearly}
                style={{ backgroundColor: isYearly ? '#007AFF' : undefined }}
              />
              <Text type={isYearly ? undefined : 'secondary'} style={{ fontWeight: isYearly ? 600 : 400 }}>
                연간
              </Text>
              {isYearly && (
                <Tag color="#FF9500" style={{ borderRadius: 12, fontWeight: 600 }}>
                  2개월 무료
                </Tag>
              )}
            </Space>
          </Space>
        }
      >
        <Row gutter={[20, 20]}>
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? '년' : '월';

            return (
              <Col xs={24} md={8} key={plan.id}>
                <Card
                  bordered
                  hoverable={!isCurrent}
                  style={{
                    borderRadius: 16,
                    border: plan.popular ? '2px solid #007AFF' : '1px solid #f0f0f0',
                    position: 'relative',
                    height: '100%',
                    transition: 'all 0.3s ease',
                  }}
                  bodyStyle={{ padding: 24 }}
                >
                  {plan.popular && (
                    <Tag
                      color="#007AFF"
                      style={{
                        position: 'absolute',
                        top: -12,
                        right: 16,
                        borderRadius: 12,
                        fontWeight: 700,
                        padding: '2px 12px',
                      }}
                    >
                      인기
                    </Tag>
                  )}

                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    <Space align="center" size={8}>
                      <span style={{ fontSize: 24, color: plan.color }}>{plan.icon}</span>
                      <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
                        {plan.name}
                      </Title>
                    </Space>

                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {plan.description}
                    </Text>

                    <div>
                      <Text strong style={{ fontSize: 28, color: '#1a1a1a' }}>
                        ₩{formatPrice(price)}
                      </Text>
                      <Text type="secondary"> / {period}</Text>
                    </div>

                    <Tag style={{ borderRadius: 8, backgroundColor: '#F2F2F7', border: 'none', color: '#666' }}>
                      {plan.seats}
                    </Tag>

                    <List
                      dataSource={plan.features}
                      renderItem={(feature) => (
                        <List.Item style={{ padding: '6px 0', border: 'none' }}>
                          <Space size={8}>
                            <CheckOutlined style={{ color: plan.color, fontSize: 14 }} />
                            <Text style={{ fontSize: 13 }}>{feature}</Text>
                          </Space>
                        </List.Item>
                      )}
                      style={{ marginBottom: 16 }}
                    />

                    <Button
                      type={isCurrent ? 'default' : 'primary'}
                      block
                      size="large"
                      disabled={isCurrent}
                      onClick={() => handleSelectPlan(plan)}
                      style={{
                        borderRadius: 10,
                        fontWeight: 600,
                        height: 44,
                        backgroundColor: isCurrent ? '#F2F2F7' : '#007AFF',
                        borderColor: isCurrent ? '#F2F2F7' : '#007AFF',
                      }}
                    >
                      {isCurrent ? '현재 플랜' : '선택하기'}
                    </Button>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      <Modal
        title="플랜 변경 확인"
        open={upgradeModal.open}
        onOk={handleConfirmUpgrade}
        onCancel={() => setUpgradeModal({ open: false, plan: null })}
        okText="변경하기"
        cancelText="취소"
        okButtonProps={{ style: { backgroundColor: '#007AFF', borderColor: '#007AFF' } }}
      >
        {upgradeModal.plan && (
          <Space direction="vertical" size={12}>
            <Text>
              <Text strong>{upgradeModal.plan.name}</Text> 플랜으로 변경하시겠습니까?
            </Text>
            <Text type="secondary">
              변경된 플랜은 다음 결제 주기부터 적용됩니다.
              업그레이드의 경우 일할 계산으로 즉시 차액이 청구될 수 있습니다.
            </Text>
          </Space>
        )}
      </Modal>
    </>
  );
}
