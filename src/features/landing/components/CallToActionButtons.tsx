import React from 'react';
import { Typography, Button, Space, Grid, Row, Col } from 'antd';
import { RocketOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function CallToActionButtons() {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #007AFF 0%, #003CB3 100%)',
        padding: screens.md ? '100px 60px' : '60px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }}
      />

      <Row justify="center" style={{ position: 'relative', zIndex: 1 }}>
        <Col xs={24} md={16} lg={12} style={{ textAlign: 'center' }}>
          <Title
            level={2}
            style={{
              color: '#FFFFFF',
              fontSize: screens.md ? 40 : 28,
              fontWeight: 800,
              marginBottom: 16,
              lineHeight: 1.3,
            }}
          >
            지금 바로 HRiZen을
            <br />
            경험해 보세요
          </Title>
          <Paragraph
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: screens.md ? 18 : 16,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: '0 auto 40px',
            }}
          >
            14일 무료 체험으로 부담 없이 시작하세요.
            <br />
            전문 컨설턴트가 도입을 도와드립니다.
          </Paragraph>

          <Space size={16} wrap style={{ justifyContent: 'center' }}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate('/admin/dashboard')}
              style={{
                height: 56,
                paddingInline: 40,
                borderRadius: 14,
                fontSize: 17,
                fontWeight: 700,
                background: '#FF9500',
                borderColor: '#FF9500',
                boxShadow: '0 8px 28px rgba(255,149,0,0.4)',
              }}
            >
              무료 체험 시작하기
            </Button>
            <Button
              size="large"
              icon={<PhoneOutlined />}
              onClick={() => navigate('/subscription')}
              style={{
                height: 56,
                paddingInline: 40,
                borderRadius: 14,
                fontSize: 17,
                fontWeight: 700,
                background: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#FFFFFF',
                backdropFilter: 'blur(10px)',
              }}
            >
              도입 상담 받기
            </Button>
          </Space>

          <div style={{ marginTop: 32 }}>
            <Space split={<span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>} size={16}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>✓ 설치 불필요</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>✓ 즉시 시작</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>✓ 언제든 해지</span>
            </Space>
          </div>
        </Col>
      </Row>
    </section>
  );
}
