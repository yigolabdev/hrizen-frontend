import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { CrownOutlined, ClockCircleOutlined, PieChartOutlined, ApiOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ClockCircleOutlined style={{ fontSize: 40, color: '#007AFF' }} />,
    title: '근태·급여 자동화',
    description: '출퇴근 기록부터 급여 계산까지 자동 처리하여 업무 효율을 극대화합니다.',
  },
  {
    icon: <PieChartOutlined style={{ fontSize: 40, color: '#007AFF' }} />,
    title: '성과 분석 & OKR',
    description: '실시간 성과 데이터로 목표 진행 상황을 한 눈에 확인할 수 있습니다.',
  },
  {
    icon: <CrownOutlined style={{ fontSize: 40, color: '#007AFF' }} />,
    title: 'AI 인재 유지 예측',
    description: '퇴사 위험을 선제적 분석하여 인재 유출을 방지합니다.',
  },
  {
    icon: <ApiOutlined style={{ fontSize: 40, color: '#007AFF' }} />,
    title: '오픈 API 연동',
    description: 'ERP 및 그룹웨어와 즉시 연동되어 중복 입력을 제거합니다.',
  },
];

export default function FeatureHighlightSection() {
  return (
    <section aria-label="주요 기능 소개" style={{ marginBottom: 64 }}>
      <Title level={2} style={{ textAlign: 'center', color: '#007AFF', marginBottom: 40 }}>
        HRiZen 주요 기능
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {features.map(({ icon, title, description }) => (
          <Col xs={24} sm={12} md={12} lg={6} key={title}>
            <Card
              bordered={false}
              style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', minHeight: 220, textAlign: 'center' }}
              bodyStyle={{ padding: 32 }}
              hoverable
              tabIndex={0}
              aria-label={title}
            >
              <div style={{ marginBottom: 16 }}>{icon}</div>
              <Title level={4} style={{ color: '#007AFF', marginBottom: 12 }}>
                {title}
              </Title>
              <Paragraph style={{ color: '#555555', fontSize: 14, lineHeight: 1.5 }}>
                {description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
