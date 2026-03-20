import React from 'react';
import { Card, Carousel, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'HRiZen 도입 후 인사 업무가 획기적으로 간소화되어 업무 효율이 크게 향상되었습니다.',
    author: '김민수',
    position: '인사팀장',
    company: '스타트업 A',
  },
  {
    quote: 'AI 분석 덕분에 직원 이직 위험을 미리 감지하고 전략을 수립할 수 있었습니다.',
    author: '이정은',
    position: 'HR 매니저',
    company: '중견기업 B',
  },
  {
    quote: '간단하고 직관적인 UI로 직원들 모두가 쉽게 사용할 수 있어 만족도가 높습니다.',
    author: '박준호',
    position: '재무팀장',
    company: 'IT기업 C',
  },
];

export default function CustomerTestimonials() {
  return (
    <section aria-label="고객 후기" style={{ marginBottom: 64, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#007AFF', marginBottom: 40 }}>
        고객 후기
      </Title>
      <Carousel
        autoplay
        dots={{ className: 'custom-carousel-dots' }}
        accessibility
        adaptiveHeight
        autoplaySpeed={7000}
        pauseOnHover
        aria-live="polite"
      >
        {testimonials.map(({ quote, author, position, company }, index) => (
          <Card
            key={index}
            bordered={false}
            style={{ borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', padding: 32, textAlign: 'center', backgroundColor: '#F2F2F7' }}
            tabIndex={0}
            aria-label={`고객 후기 ${index + 1}: ${author}님`}
          >
            <Paragraph style={{ fontSize: 18, fontStyle: 'italic', color: '#444', marginBottom: 24 }}>
              “{quote}”
            </Paragraph>
            <Paragraph style={{ fontWeight: 700, color: '#007AFF', marginBottom: 4 }}>
              {author}
            </Paragraph>
            <Text type="secondary" style={{ fontSize: 14 }}>
              {position} / {company}
            </Text>
          </Card>
        ))}
      </Carousel>
    </section>
  );
}
