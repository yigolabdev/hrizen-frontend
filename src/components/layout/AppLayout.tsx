import React, { useState } from 'react';
import { Layout, theme, Typography, Grid, Menu, Button } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
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
  { key: '/', label: '홈', icon: <HomeOutlined />, path: '/' },
  { key: '/admin/dashboard', label: '관리자 대시보드', icon: <DashboardOutlined />, path: '/admin/dashboard' },
  { key: '/admin/tenants', label: '멀티테넌트 설정', icon: <SettingOutlined />, path: '/admin/tenants' },
  { key: '/admin/permissions', label: '권한 관리', icon: <TeamOutlined />, path: '/admin/permissions' },
  { key: '/attendance', label: '근태 관리', icon: <ScheduleOutlined />, path: '/attendance' },
  { key: '/payroll', label: '급여 정산 관리', icon: <PayCircleOutlined />, path: '/payroll' },
  { key: '/performance', label: '성과 및 평가 관리', icon: <TrophyOutlined />, path: '/performance' },
  { key: '/ess', label: '직원 셀프 서비스', icon: <CustomerServiceOutlined />, path: '/ess' },
  { key: '/analytics/ai-dashboard', label: 'AI 분석 대시보드', icon: <RobotOutlined />, path: '/analytics/ai-dashboard' },
  { key: '/api-management', label: 'API 관리', icon: <ApiOutlined />, path: '/api-management' },
  { key: '/subscription', label: '구독 관리', icon: <DollarCircleOutlined />, path: '/subscription' },
  { key: '/billing', label: '결제 및 청구', icon: <CreditCardOutlined />, path: '/billing' },
  { key: '/my-page', label: '마이페이지', icon: <UserOutlined />, path: '/my-page' },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const { theme: appTheme } = useAppStore();

  const { token } = theme.useToken();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const currentKey = menuItems.find(item => item.path === location.pathname)?.key || '/';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        style={{
          backgroundColor: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
            HR System
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => handleMenuClick(item.path),
          }))}
          style={{ border: 'none' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: token.colorBgContainer,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div>
            <span style={{ marginRight: '16px' }}>Welcome</span>
          </div>
        </Header>
        <Content
          style={{
            margin: '16px',
            padding: '16px',
            background: token.colorBgLayout,
            borderRadius: '8px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
