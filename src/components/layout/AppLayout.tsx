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
  { key: '/', label: 'Home', icon: <HomeOutlined />, path: '/' },
  { key: '/admin/dashboard', label: 'Admin Dashboard', icon: <DashboardOutlined />, path: '/admin/dashboard' },
  { key: '/admin/tenants', label: 'Multi-Tenant', icon: <SettingOutlined />, path: '/admin/tenants' },
  { key: '/admin/permissions', label: 'Permissions', icon: <TeamOutlined />, path: '/admin/permissions' },
  { key: '/attendance', label: 'Attendance', icon: <ScheduleOutlined />, path: '/attendance' },
  { key: '/payroll', label: 'Payroll', icon: <PayCircleOutlined />, path: '/payroll' },
  { key: '/performance', label: 'Performance', icon: <TrophyOutlined />, path: '/performance' },
  { key: '/ess', label: 'ESS', icon: <CustomerServiceOutlined />, path: '/ess' },
  { key: '/analytics/ai-dashboard', label: 'AI Analytics', icon: <RobotOutlined />, path: '/analytics/ai-dashboard' },
  { key: '/api-management', label: 'API Management', icon: <ApiOutlined />, path: '/api-management' },
  { key: '/subscription', label: 'Subscription', icon: <DollarCircleOutlined />, path: '/subscription' },
  { key: '/billing', label: 'Billing', icon: <CreditCardOutlined />, path: '/billing' },
  { key: '/my-page', label: 'My Page', icon: <UserOutlined />, path: '/my-page' },
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const screens = useBreakpoint();

  const handleMenuClick = (e: { key: string }) => {
    const item = menuItems.find((m) => m.key === e.key);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={screens.md ? 80 : 0}
        style={{
          background: colorBgContainer,
          borderRight: '1px solid #f0f0f0',
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
          <Title level={4} style={{ margin: 0, fontSize: collapsed ? 14 : 18 }}>
            {collapsed ? 'HR' : 'HR Platform'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ borderRight: 'none' }}
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
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          style={{
            margin: 16,
            padding: 24,
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 64px - 32px)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
