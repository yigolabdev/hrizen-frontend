import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;

interface Plan {
  name: string;
  price: string;
  features: string[];
  isRecommended?: boolean;
}

const plans: Plan[] = [
  {
    name: '스타터',
    price: '₩50,000 /월',
    features: ['기본 근태 관리', '급여 자동 계산', 'ESS 기능'],
  },
  {
    name: '스탠다드',
    price: '₩100,000 /월',
    features: ['스타터 기능 포함', 'OKR 및 성과 분석', 'AI 인재 유지 예측'],
    isRecommended: true,
  },
  {
    name: '프리미엄',
    price: '별도 문의',
    features: ['스탠다드 기능 포함', '오픈 API 연동', '맞춤형 모듈 리포팅 및 대시보드'],
  },
];

export default function PricingOverview() {
  return (
    <section aria-label="요금제 안내" style={{ marginBottom: 64, maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#007AFF', marginBottom: 40 }}>
        요금제 안내
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {plans.map(({ name, price, features, isRecommended }) => (
          <Col xs={24} sm={12} md={8} key={name}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: isRecommended
                  ? '0 8px 20px rgba(0, 122, 255, 0.3)'
                  : '0 4px 12px rgba(0,0,0,0.05)',
                border: isRecommended ? '2px solid #007AFF' : 'none',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
              }}
              aria-label={`${name} 요금제`}
            >
              <div>
                <Title level={3} style={{ color: '#007AFF', marginBottom: 10 }}>
                  {name}
                </Title>
                <Paragraph style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
                  {price}
                </Paragraph>
                <ul style={{ color: '#555555', paddingLeft: 20, marginBottom: 24 }}>
                  {features.map((feature) => (
                    <li key={feature} style={{ marginBottom: 8, fontSize: 14 }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                type={isRecommended ? 'primary' : 'default'}
                size="large"
                style={{ borderRadius: 8 }}
                block
                aria-label={`${name} 요금제 선택`}
              >
                선택하기
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
