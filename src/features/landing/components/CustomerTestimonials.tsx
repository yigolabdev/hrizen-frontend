import React from 'react';
import { Typography, Row, Col, Card, Avatar, Rate, Grid } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: '김지현',
    role: 'HR 팀장',
    company: '테크스타트 주식회사',
    content:
      'HRiZen 도입 후 급여 정산 시간이 80% 단축되었습니다. 특히 AI 이직 예측 기능 덕분에 핵심 인재 관리가 훨씬 수월해졌어요.',
    rating: 5,
    avatarColor: '#007AFF',
  },
  {
    name: '박민수',
    role: 'COO',
    company: '그로우업 Inc.',
    content:
      'SaaS 배포가 정말 2분이면 끝납니다. 멀티 테넌트 구조로 여러 법인을 한 번에 관리할 수 있어서 효율이 극대화되었습니다.',
    rating: 5,
    avatarColor: '#FF9500',
  },
  {
    name: '이수연',
    role: '경영지원 실장',
    company: '블루오션 컴퍼니',
    content:
      '노무 컴플라이언스 자동 업데이트가 가장 마음에 듭니다. 법령 변경에 따른 리스크 걱정 없이 안심하고 운영할 수 있어요.',
    rating: 5,
    avatarColor: '#34C759',
  },
  {
    name: '최동혁',
    role: 'CTO',
    company: '이노베이트 랩스',
    content:
      '오픈 API가 잘 설계되어 있어 기존 사내 시스템과 연동이 매우 수월했습니다. 개발팀 모두 만족하고 있습니다.',
    rating: 4,
    avatarColor: '#AF52DE',
  },
  {
    name: '정유나',
    role: '인사 담당자',
    company: '스마트워크 주식회사',
    content:
      '직원 셀프 서비스 포털 덕분에 반복 문의가 70% 줄었어요. 직원들도 필요한 정보를 스스로 찾을 수 있어 만족도가 높습니다.',
    rating: 5,
    avatarColor: '#FF2D55',
  },
  {
    name: '한승우',
    role: '대표이사',
    company: '넥스트레벨 코퍼레이션',
    content:
      'OKR 기반 성과 관리 시스템이 팀의 목표 의식을 크게 높여주었습니다. 분기별 리뷰가 데이터 중심으로 바뀌었어요.',
    rating: 5,
    avatarColor: '#5856D6',
  },
];

export default function CustomerTestimonials() {
  const screens = useBreakpoint();

  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: screens.md ? '100px 60px' : '60px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,149,0,0.08)',
              borderRadius: 20,
              padding: '6px 18px',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: '#FF9500', fontSize: 14, fontWeight: 600 }}>
              고객 후기
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
            고객이 직접 전하는 HRiZen 경험
          </Title>
          <Paragraph
            style={{
              fontSize: 17,
              color: '#8E8E93',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            다양한 규모의 기업에서 HRiZen을 선택한 이유를 확인하세요.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {testimonials.map((item, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  height: '100%',
                  background: '#F2F2F7',
                  boxShadow: 'none',
                }}
                bodyStyle={{ padding: 28 }}
              >
                <Rate
                  disabled
                  defaultValue={item.rating}
                  style={{ fontSize: 16, color: '#FF9500', marginBottom: 16 }}
                />
                <Paragraph
                  style={{
                    color: '#3A3A3C',
                    fontSize: 15,
                    lineHeight: 1.7,
                    minHeight: 80,
                    marginBottom: 24,
                  }}
                >
                  "{item.content}"
                </Paragraph>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar
                    size={44}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: item.avatarColor }}
                  />
                  <div>
                    <Text strong style={{ color: '#1C1C1E', fontSize: 15, display: 'block' }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: '#8E8E93', fontSize: 13 }}>
                      {item.role} · {item.company}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
