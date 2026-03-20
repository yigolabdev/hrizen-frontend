import React, { useState } from 'react';
import { Layout, theme, Typography, Grid, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  ScheduleOutlined,
  PayCircleOutlined,
  TrophyOutlined,
  CustomerServiceOutlined,
  RobotOutlined,
  ApiOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  HomeOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { key: '/', label: '렩딩 페이지', icon: <HomeOutlined />, path: '/' },
  { key: '/admin/dashboard', label: '관리자 대시보드', icon: <DashboardOutlined />, path: '/admin/dashboard' },
  { key: '/admin/tenants', label: '멀티테넔 트 설정', icon: <SettingOutlined />, path: '/admin/tenants' },
  { key: '/admin/permissions', label: '권한 관리', icon: <TeamOutlined />, path: '/admin/permissions' },
  { key: '/attendance', label: '근태 관리', icon: <ScheduleOutlined />, path: '/attendance' },
  { key: '/payroll', label: '급여 정샀 관리', icon: <PayCircleOutlined />, path: '/payroll' },
  { key: '/performance', label: '성과 및 평가 관리', icon: <TrophyOutlined />, path: '/performance' },
  { key: '/ess', label: '지원 셀프 서비스 (ESS)', icon: <CustomerServiceOutlined />, path: '/ess' },
  { key: '/analytics/ai-dashboard', label: 'AI 분석 대시보드', icon: <RobotOutlined />, path: '/analytics/ai-dashboard' },
  { key: '/api-management', label: '오픈 API 관리', icon: <ApiOutlined />, path: '/api-management' },
  { key: '/subscription', label: '구�  관리', icon: <DollarCircleOutlined />, path: '/subscription' },
  { key: '/billing', label: '결제 반 �8�구 관리', icon: <CreditCardOutlined />, path: '/billing' },
  { key: '/my-page', label: '개인 마이페이지', icon: <UserOutlined />, path: '/my-page' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuItems.find((m) => m.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  const antMenuItems = menuItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(inlineCollapsed) => setCollapsed(inlineCollapsed)}
        breakpoint="lg"
        style={{
          background: colorBgContainer,
          borderRight: '1px solid #E6E6E6',
        }}
        theme="light"
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
          <Title
            level={4}
            style={{
              margin: 0,
              color: '#007AFF',
              whiteSpace: 'nowrap',
            }}
          >
            {collapsed ? 'HR' : 'HRiZen'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={antMenuItems}
          onClick={handleMenuClick}
          style={{ borderInlineEnd: 'none' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #E6E6E6',
            height: 64,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: 18, cursor: 'pointer', color: '#007AFF' },
            }
          )}
          <Title level={5} style={{ margin: 0, color: '#333' }}>
            HRiZen - HR 관리 시스템
          </Title>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
