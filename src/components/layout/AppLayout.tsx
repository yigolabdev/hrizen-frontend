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
  { key: '/', label: '랜딩', icon: <HomeOutlined />, path: '/' },
  { key: '/admin/dashboard', label: '관리자 대시보드', icon: <DashboardOutlined />, path: '/admin/dashboard' },
  { key: '/admin/tenants', label: '멀티 테넌트 설정', icon: <SettingOutlined />, path: '/admin/tenants' },
  { key: '/admin/permissions', label: '권한 관리', icon: <TeamOutlined />, path: '/admin/permissions' },
  { key: '/attendance', label: '근태 관리', icon: <ScheduleOutlined />, path: '/attendance' },
  { key: '/payroll', label: '급여 정산 관리', icon: <PayCircleOutlined />, path: '/payroll' },
  { key: '/performance', label: '성과 및 평가 관리', icon: <TrophyOutlined />, path: '/performance' },
  { key: '/ess', label: '직원 셀프 서비스(ESS)', icon: <CustomerServiceOutlined />, path: '/ess' },
  { key: '/analytics/ai-dashboard', label: 'AI 분석 대시보드', icon: <RobotOutlined />, path: '/analytics/ai-dashboard' },
  { key: '/api-management', label: '오픈 API 관리', icon: <ApiOutlined />, path: '/api-management' },
  { key: '/subscription', label: '구독 관리', icon: <DollarCircleOutlined />, path: '/subscription' },
  { key: '/billing', label: '결제 및 청구 관리', icon: <CreditCardOutlined />, path: '/billing' },
  { key: '/my-page', label: '마이페이지', icon: <UserOutlined />, path: '/my-page' },
];

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const appStore = useAppStore();

  const { token } = theme.useToken();

  const handleMenuClick = (key: string) => {
    const item = menuItems.find((mi) => mi.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  const isMobile = !screens.md;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsed={isMobile ? true : collapsed}
        onCollapse={setCollapsed}
        width={240}
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <div
          style={{
            padding: '16px',
            textAlign: 'center',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            {collapsed ? 'HR' : 'HR System'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => handleMenuClick(item.key),
          }))}
          style={{ borderRight: 'none' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#FFFFFF',
            borderBottom: `1px solid ${token.colorBorder}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingInline: 24,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Typography.Text>사용자</Typography.Text>
          </div>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;