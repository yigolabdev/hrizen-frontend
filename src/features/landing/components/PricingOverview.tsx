import React, { useState } from 'react';
import { Typography, Row, Col, Card, Button, Grid, Switch, Space, Tag } from 'antd';
import { CheckCircleFilled, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    monthlyPrice: 29000,
    yearlyPrice: 24000,
    description: '소규모 팀에 적합한 기본 HR 관리',
    features: [
      '직원 50명까지',
      '근태 관리',
      '급여 정산 기본',
      '직원 셀프 서비스',
      '이메일 지원',
    ],
    isPopular: false,
    buttonText: '시작하기',
  },
  {
    name: 'Professional',
    monthlyPrice: 79000,
    yearlyPrice: 65000,
    description: '성장하는 기업을 위한 종합 솔루션',
    features: [
      '직원 300명까지',
      'Starter 모든 기능 포함',
      'OKR · 성과 관리',
      'AI 인재 분석',
      '노무 컴플라이언스',
      '오픈 API 연동',
      '우선 지원',
    ],
    isPopular: true,
    buttonText: '무료 체험 시작',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 199000,
    yearlyPrice: 169000,
    description: '대규모 조직을 위한 맞춤형 플랜',
    features: [
      '직원 수 무제한',
      'Professional 모든 기능 포함',
      '멀티 테넌트 지원',
      '커스텀 대시보드',
      '전담 매니저 배정',
      'SLA 99.9% 보장',
      'SSO / SAML 연동',
    ],
    isPopular: false,
    buttonText: '상담 요청',
  },
];

export default function PricingOverview() {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <section
      style={{
        background: '#F2F2F7',
        padding: screens.md ? '100px 60px' : '60px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(0,122,255,0.08)',
              borderRadius: 20,
              padding: '6px 18px',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: '#007AFF', fontSize: 14, fontWeight: 600 }}>
              요금제
            </Text>
          </div>
          <Title
            level={2}
            style={{
              fontSize: screens.md ? 40 : 28,
              fontWeight: 700,
              color: '#1C1C1E',
              marginBottom: 16,
            }}
          >
            합리적인 가격, 강력한 기능
          </Title>
          <Paragraph
            style={{
              fontSize: 17,
              color: '#8E8E93',
              maxWidth: 480,
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            기업 규모에 맞는 요금제를 선택하세요. 연간 결제 시 최대 20% 할인됩니다.
          </Paragraph>

          <Space align="center" size={12}>
            <Text style={{ color: !isYearly ? '#1C1C1E' : '#8E8E93', fontWeight: 600 }}>월간</Text>
            <Switch
              checked={isYearly}
              onChange={setIsYearly}
              style={{ backgroundColor: isYearly ? '#007AFF' : undefined }}
            />
            <Text style={{ color: isYearly ? '#1C1C1E' : '#8E8E93', fontWeight: 600 }}>연간</Text>
            {isYearly && (
              <Tag
                color="#FF9500"
                style={{ borderRadius: 10, fontWeight: 600, border: 'none' }}
              >
                20% 할인
              </Tag>
            )}
          </Space>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 20,
                    height: '100%',
                    background: plan.isPopular ? '#FFFFFF' : '#FFFFFF',
                    boxShadow: plan.isPopular
                      ? '0 12px 40px rgba(0,122,255,0.15)'
                      : '0 2px 12px rgba(0,0,0,0.04)',
                    border: plan.isPopular ? '2px solid #007AFF' : '2px solid transparent',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                  bodyStyle={{ padding: 32 }}
                >
                  {plan.isPopular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -14,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#007AFF',
                        color: '#FFFFFF',
                        padding: '4px 20px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      <CrownOutlined style={{ marginRight: 4 }} />
                      가장 인기
                    </div>
                  )}

                  <Title
                    level={4}
                    style={{
                      color: '#1C1C1E',
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {plan.name}
                  </Title>
                  <Paragraph style={{ color: '#8E8E93', fontSize: 14, marginBottom: 24 }}>
                    {plan.description}
                  </Paragraph>

                  <div style={{ marginBottom: 28 }}>
                    <span style={{ fontSize: 40, fontWeight: 800, color: '#1C1C1E' }}>
                      ₩{formatPrice(price)}
                    </span>
                    <Text style={{ color: '#8E8E93', fontSize: 15 }}> / 월 (인당)</Text>
                  </div>

                  <Button
                    type={plan.isPopular ? 'primary' : 'default'}
                    block
                    size="large"
                    onClick={() => navigate('/subscription')}
                    style={{
                      height: 48,
                      borderRadius: 12,
                      fontWeight: 600,
                      fontSize: 15,
                      ...(plan.isPopular
                        ? {
                            background: '#007AFF',
                            borderColor: '#007AFF',
                            boxShadow: '0 4px 16px rgba(0,122,255,0.3)',
                          }
                        : {
                            borderColor: '#D1D1D6',
                            color: '#1C1C1E',
                          }),
                    }}
                  >
                    {plan.buttonText}
                  </Button>

                  <div style={{ marginTop: 28 }}>
                    {plan.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          marginBottom: 12,
                        }}
                      >
                        <CheckCircleFilled style={{ color: '#34C759', fontSize: 16 }} />
                        <Text style={{ color: '#3A3A3C', fontSize: 14 }}>{feature}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
}
