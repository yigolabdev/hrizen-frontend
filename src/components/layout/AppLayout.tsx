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
  UserOutlined
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
  {
    key: '/admin/dashboard',
    label: '관리자 대시보드',
    icon: <DashboardOutlined />, 
    path: '/admin/dashboard'
  },
  {
    key: '/admin/tenants',
    label: '멀티테넌트 설정',
    icon: <SettingOutlined />, 
    path: '/admin/tenants'
  },
  {
    key: '/admin/permissions',
    label: '권한 관리',
    icon: <TeamOutlined />, 
    path: '/admin/permissions'
  },
  {
    key: '/attendance',
    label: '근태 관리',
    icon: <ScheduleOutlined />, 
    path: '/attendance'
  },
  {
    key: '/payroll',
    label: '급여 정산 관리',
    icon: <PayCircleOutlined />, 
    path: '/payroll'
  },
  {
    key: '/performance',
    label: '성과 및 평가 관리',
    icon: <TrophyOutlined />, 
    path: '/performance'
  },
  {
    key: '/ess',
    label: '직원 셀프 서비스 포털(ESS)',
    icon: <CustomerServiceOutlined />, 
    path: '/ess'
  },
  {
    key: '/analytics/ai-dashboard',
    label: 'AI 분석 대시보드',
    icon: <RobotOutlined />, 
    path: '/analytics/ai-dashboard'
  },
  {
    key: '/api-management',
    label: '오픈 API 관리',
    icon: <ApiOutlined />, 
    path: '/api-management'
  },
  {
    key: '/subscription',
    label: '구독 관리',
    icon: <DollarCircleOutlined />, 
    path: '/subscription'
  },
  {
    key: '/billing',
    label: '결제 및 청구 관리',
    icon: <CreditCardOutlined />, 
    path: '/billing'
  },
  {
    key: '/',
    label: '랜딩 페이지',
    icon: <HomeOutlined />, 
    path: '/'
  },
  {
    key: '/my-page',
    label: '개인 마이페이지',
    icon: <UserOutlined />, 
    path: '/my-page'
  },
];

export default function AppLayout({ children }: React.PropsWithChildren<{}>) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const { token } = theme.useToken();

  // 반응형: md 이하일 때 자동으로 사이더 접힘
  const isMobile = !screens.md;

  // 모바일에서는 초기 collapsed 상태를 true로 유지, 데스크탑에서는 false
  React.useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  // 현재 경로에 가장 가까운 매칭된 메뉴키
  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key || '/';

  const handleMenuClick = (key: string) => {
    const item = menuItems.find(m => m.key === key);
    if (item) {
      navigate(item.path);
      if (isMobile) {
        setCollapsed(true);
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"
        collapsedWidth={48}
        style={{
          background: '#FFFFFF',
          borderRight: `1px solid ${token.colorBorder}`,
        }}
        width={220}
      >
        <div style={{ padding: '16px', textAlign: 'center', borderBottom: `1px solid ${token.colorBorder}` }}>
          {!collapsed && (
            <Title level={3} style={{ margin: 0, color: '#007AFF' }}>
              HRiZen
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => handleMenuClick(item.key),
          }))}
          style={{ border: 'none' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: token.colorBgContainer,
            boxShadow: `0 1px 2px ${token.colorBorder}`,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Title level={4} style={{ margin: 0, color: '#007AFF' }}>
            HRiZen 관리 시스템
          </Title>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
            minHeight: 360,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
