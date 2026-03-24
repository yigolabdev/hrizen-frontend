import React from 'react';
import { Typography, Row, Col, Card, Grid } from 'antd';
import {
  ScheduleOutlined,
  PayCircleOutlined,
  TrophyOutlined,
  RobotOutlined,
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  ApiOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ScheduleOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: '근태 자동화',
    description: '출퇴근 기록, 연차 관리, 초과근무 계산까지 실시간으로 자동 처리합니다.',
  },
  {
    icon: <PayCircleOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: '급여 정산 자동화',
    description: '세금, 4대 보험, 수당 계산을 자동화하여 정확하고 빠른 급여 지급을 보장합니다.',
  },
  {
    icon: <TrophyOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: 'OKR · 성과 관리',
    description: '목표 설정부터 성과 평가까지, 팀과 개인의 성장을 체계적으로 관리합니다.',
  },
  {
    icon: <RobotOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: 'AI 인재 분석',
    description: 'AI가 이직 위험 직원을 예측하고, 인재 유지를 위한 맞춤 전략을 제안합니다.',
  },
  {
    icon: <CustomerServiceOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: '직원 셀프 서비스',
    description: '급여 명세서, 증명서 발급, 연차 신청 등 직원이 직접 처리할 수 있습니다.',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: '노무 · 세무 컴플라이언스',
    description: '최신 법령에 맞춰 자동 업데이트되며, 법적 리스크를 사전에 방지합니다.',
  },
  {
    icon: <ApiOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: '오픈 API 연동',
    description: '기존 시스템과 유연하게 연동하여 데이터 흐름을 통합 관리합니다.',
  },
  {
    icon: <BarChartOutlined style={{ fontSize: 32, color: '#007AFF' }} />,
    title: '모듈형 대시보드',
    description: '필요한 지표만 골라 나만의 대시보드를 구성하고 리포트를 생성합니다.',
  },
];

export default function FeatureHighlightSection() {
  const screens = useBreakpoint();

  return (
    <section
      style={{
        background: '#F2F2F7',
        padding: screens.md ? '100px 60px' : '60px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(0,122,255,0.08)',
              borderRadius: 20,
              padding: '6px 18px',
              marginBottom: 16,
            }}
          >
            <Typography.Text style={{ color: '#007AFF', fontSize: 14, fontWeight: 600 }}>
              주요 기능
            </Typography.Text>
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
            HR 업무의 모든 영역을 커버합니다
          </Title>
          <Paragraph
            style={{
              fontSize: 17,
              color: '#8E8E93',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            복잡한 인사·노무 업무를 모듈형 시스템으로 간결하게 해결하세요.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                bordered={false}
                hoverable
                style={{
                  borderRadius: 16,
                  height: '100%',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: 28 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: 'rgba(0,122,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  {feature.icon}
                </div>
                <Title
                  level={5}
                  style={{
                    fontWeight: 700,
                    color: '#1C1C1E',
                    marginBottom: 8,
                  }}
                >
                  {feature.title}
                </Title>
                <Paragraph
                  style={{
                    color: '#8E8E93',
                    fontSize: 14,
                    lineHeight: 1.65,
                    marginBottom: 0,
                  }}
                >
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
