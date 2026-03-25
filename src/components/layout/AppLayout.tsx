import React from 'react';
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
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();
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
          {!sidebarCollapsed && (
            <Title level={4} style={{ margin: 0, color: '#007AFF' }}>
              HRiZen
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
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
            background: token.colorBgContainer,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
          <Title level={4} style={{ margin: 0, marginLeft: 8 }}>
            HRiZen
          </Title>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
