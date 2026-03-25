import React, { useState } from 'react';
import { Layout, theme, Typography, Grid, Menu, Button, Badge, Avatar, Dropdown } from 'antd';
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
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores/appStore';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface MenuItemDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItemDef[] = [
  { key: '/', label: '랜딩', icon: <HomeOutlined />, path: '/' },
  { key: '/admin/dashboard', label: '관리자 대시보드', icon: <DashboardOutlined />, path: '/admin/dashboard' },
  { key: '/admin/tenants', label: '맨티 테난트 설정', icon: <SettingOutlined />, path: '/admin/tenants' },
  { key: '/admin/permissions', label: '권한 관리', icon: <TeamOutlined />, path: '/admin/permissions' },
  { key: '/attendance', label: '근턀 관리', icon: <ScheduleOutlined />, path: '/attendance' },
  { key: '/payroll', label: '급�  정산 관리', icon: <PayCircleOutlined />, path: '/payroll' },
  { key: '/performance', label: '성과 및 폈가 관리', icon: <TrophyOutlined />, path: '/performance' },
  { key: '/ess', label: '직원 셀프 ผ跨스(ESS)', icon: <CustomerServiceOutlined />, path: '/ess' },
  { key: '/analytics/ai-dashboard', label: 'AI 분석 대시보냜', icon: <RobotOutlined />, path: '/analytics/ai-dashboard' },
  { key: '/api-management', label: '오픈 API 관리', icon: <ApiOutlined />, path: '/api-management' },
  { key: '/subscription', label: '구독 관리', icon: <DollarCircleOutlined />, path: '/subscription' },
  { key: '/billing', label: '결제 및 첬군 관리', icon: <CreditCardOutlined />, path: '/billing' },
  { key: '/my-page', label: '마이페이지', icon: <UserOutlined />, path: '/my-page' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed, currentUser, unreadNotificationCount, logout } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const handleMenuClick = (e: { key: string }) => {
    const item = menuItems.find((m) => m.key === e.key);
    if (item) {
      navigate(item.path);
    }
  };

  const userMenuItems = [
    {
      key: 'my-page',
      label: '마이페이지',
      icon: <UserOutlined />,
      onClick: () => navigate('/my-page'),
    },
    {
      key: 'logout',
      label: '로그아웃',
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
        navigate('/');
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        onCollapse={(val) => setSidebarCollapsed(val)}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
        }}
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
            {sidebarCollapsed ? 'H' : 'HRiZen'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: token.colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: 18 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Badge count={unreadNotificationCount} size="small">
              <Button type="text" icon={<BellOutlined />} style={{ fontSize: 18 }} />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar
                style={{ backgroundColor: '#007AFF', cursor: 'pointer' }}
                icon={<UserOutlined />}
              >
                {currentUser?.name?.charAt(0)}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: 360,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
