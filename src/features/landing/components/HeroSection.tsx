import React from 'react';
import { Typography, Button, Space, Grid, Row, Col } from 'antd';
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function HeroSection() {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #007AFF 0%, #0055D4 50%, #003CB3 100%)',
        padding: screens.md ? '120px 60px 100px' : '80px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -80,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }}
      />

      <Row
        justify="center"
        align="middle"
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <Col xs={24} md={16} style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 20,
              padding: '6px 20px',
              marginBottom: 24,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography.Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>
              🚀 SaaS 2분 배포 · 무료 체험 시작
            </Typography.Text>
          </div>

          <Title
            level={1}
            style={{
              color: '#FFFFFF',
              fontSize: screens.md ? 56 : 36,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            HR의 모든 것,
            <br />
            <span style={{ color: '#FF9500' }}>HRiZen</span>으로 완성하세요
          </Title>

          <Paragraph
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: screens.md ? 20 : 16,
              lineHeight: 1.7,
              maxWidth: 640,
              margin: '0 auto 48px',
              fontWeight: 400,
            }}
          >
            근태·급여 자동화부터 AI 인재 분석, OKR 성과 관리까지.
            <br />
            복잡한 인사 업무를 하나의 플랫폼에서 간편하게 관리하세요.
          </Paragraph>

          <Space size={16} wrap style={{ justifyContent: 'center' }}>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate('/admin/dashboard')}
              style={{
                height: 52,
                paddingInline: 36,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                background: '#FF9500',
                borderColor: '#FF9500',
                boxShadow: '0 8px 24px rgba(255,149,0,0.35)',
              }}
            >
              무료로 시작하기
            </Button>
            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={() => navigate('/admin/dashboard')}
              style={{
                height: 52,
                paddingInline: 36,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                background: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#FFFFFF',
                backdropFilter: 'blur(10px)',
              }}
            >
              데모 보기
            </Button>
          </Space>

          <div style={{ marginTop: 48 }}>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
              ✓ 신용카드 불필요 &nbsp;&nbsp; ✓ 14일 무료 체험 &nbsp;&nbsp; ✓ 2분 내 배포 완료
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </section>
  );
}
