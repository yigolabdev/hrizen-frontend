import React from 'react';
import { Typography, Row, Col, Space, Grid, Divider } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Title, Link } = Typography;
const { useBreakpoint } = Grid;

export default function LandingFooter() {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const footerLinkStyle: React.CSSProperties = {
    color: '#8E8E93',
    fontSize: 14,
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  return (
    <footer
      style={{
        background: '#1C1C1E',
        padding: screens.md ? '60px 60px 40px' : '40px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} md={8}>
            <Title
              level={4}
              style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 12, fontSize: 22 }}
            >
              HRiZen
            </Title>
            <Text style={{ color: '#8E8E93', fontSize: 14, lineHeight: '1.7' }}>
              HR의 모든 것을 하나의 플랫폼에서.
              <br />
              스마트한 인사 관리의 새로운 기준.
            </Text>
          </Col>

          <Col xs={12} md={4}>
            <Text strong style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 16 }}>
              제품
            </Text>
            <Space direction="vertical" size={10}>
              <Text style={footerLinkStyle} onClick={() => navigate('/attendance')}>근태 관리</Text>
              <Text style={footerLinkStyle} onClick={() => navigate('/payroll')}>급여 정산</Text>
              <Text style={footerLinkStyle} onClick={() => navigate('/performance')}>성과 관리</Text>
              <Text style={footerLinkStyle} onClick={() => navigate('/analytics/ai-dashboard')}>AI 분석</Text>
            </Space>
          </Col>

          <Col xs={12} md={4}>
            <Text strong style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 16 }}>
              지원
            </Text>
            <Space direction="vertical" size={10}>
              <Text style={footerLinkStyle} onClick={() => navigate('/api-management')}>API 문서</Text>
              <Text style={footerLinkStyle} onClick={() => navigate('/subscription')}>요금제</Text>
              <Text style={footerLinkStyle}>고객 지원</Text>
              <Text style={footerLinkStyle}>FAQ</Text>
            </Space>
          </Col>

          <Col xs={12} md={4}>
            <Text strong style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 16 }}>
              회사
            </Text>
            <Space direction="vertical" size={10}>
              <Text style={footerLinkStyle}>소개</Text>
              <Text style={footerLinkStyle}>채용</Text>
              <Text style={footerLinkStyle}>블로그</Text>
              <Text style={footerLinkStyle}>연락처</Text>
            </Space>
          </Col>

          <Col xs={12} md={4}>
            <Text strong style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 16 }}>
              법적 고지
            </Text>
            <Space direction="vertical" size={10}>
              <Text style={footerLinkStyle}>이용약관</Text>
              <Text style={footerLinkStyle}>개인정보처리방침</Text>
              <Text style={footerLinkStyle}>보안 정책</Text>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#3A3A3C', margin: '40px 0 24px' }} />

        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: '#636366', fontSize: 13 }}>
              © 2025 HRiZen. All rights reserved.
            </Text>
          </Col>
          <Col>
            <Space size={20}>
              <TwitterOutlined style={{ color: '#636366', fontSize: 18, cursor: 'pointer' }} />
              <LinkedinOutlined style={{ color: '#636366', fontSize: 18, cursor: 'pointer' }} />
              <GithubOutlined style={{ color: '#636366', fontSize: 18, cursor: 'pointer' }} />
              <MailOutlined style={{ color: '#636366', fontSize: 18, cursor: 'pointer' }} />
            </Space>
          </Col>
        </Row>
      </div>
    </footer>
  );
}
