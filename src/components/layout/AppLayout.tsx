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
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        style={{ background: colorBgContainer }}
        trigger={null}
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
          <Title level={4} style={{ margin: 0, color: '#007AFF' }}>
            {collapsed ? 'HR' : 'HR Platform'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.path),
          }))}
          style={{ borderInlineEnd: 'none' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16 }}
          />
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: '#f5f5f5',
            minHeight: 280,
            borderRadius: 12,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
