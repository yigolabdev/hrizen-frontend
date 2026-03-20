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

  // 반응형: md 이하일 때 자동으로 사이더 접힘
  const isMobile = !screens.md;

  // 모바일에서는 초기 collapsed 상태를 true로 유지, 데스크탑에서는 false
  React.useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  // 현재 경로에 가장 가까운 매칭된 메뉴키
  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key || '/';

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
          borderRight: '1px solid #F2F2F7',
        }}
        trigger={null}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
          aria-label="홈으로 이동"
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') navigate('/');
          }}
        >
          <img
            src="/logo192.png"
            alt="HRiZen 로고"
            style={{
              height: 32,
              width: 32,
              borderRadius: 8,
              marginRight: collapsed ? 0 : 12,
              transition: 'margin 0.3s ease',
            }}
          />
          {!collapsed && (
            <Title level={5} style={{ color: '#007AFF', margin: 0, userSelect: 'none' }}>
              HRiZen
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems.map(({ key, label, icon, path }) => ({ key, label, icon }))}
          onClick={({ key }) => {
            const item = menuItems.find(i => i.key === key);
            if (item && item.path !== location.pathname) {
              navigate(item.path);
            }
          }}
          style={{ flex: 1, borderRight: 'none', background: '#FFFFFF' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: '#FFFFFF',
            borderBottom: '1px solid #F2F2F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          {isMobile && (
            <div
              onClick={() => setCollapsed(v => !v)}
              style={{ fontSize: 20, color: '#007AFF', cursor: 'pointer' }}
              aria-label={collapsed ? '사이드바 열기' : '사이드바 닫기'}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') setCollapsed(v => !v);
              }}
            >
              {/* 햄버거 아이콘: 기본 MenuFoldOutlined과 MenuUnfoldOutlined 변경없이 사용 가능 */}
              {collapsed ? <DashboardOutlined /> : <DashboardOutlined />}
            </div>
          )}
          <Title level={4} style={{ margin: 0, color: '#007AFF', userSelect: 'none' }}>
            HRiZen
          </Title>
          <div />
        </Header>
        <Content style={{ margin: 24, backgroundColor: '#FFFFFF', borderRadius: 8, minHeight: 360, padding: 24, boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
