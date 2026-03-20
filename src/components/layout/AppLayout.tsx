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
  {key: '/admin/dashboard', label: '옼페요 큰1, icon: <DashboardOutlined />, path: '/admin/dashboard'},
  {key: '/admin/tenants', label: '���을엱엤  댰트', icon: <SettingOutlined />, path: '/admin/tenants'},
  {key: '/admin/permissions', label: '할갽+�۰졑쿅, icon: <TeamOutlined />, path: '/admin/permissions'},
  {key: '/attendance', label: '옼페요 큰1, icon: <ScheduleOutlined />, path: '/attendance'},
  {key: '/payroll', label: '갑랜찰원 클�', icon: <PayCircleOutlined />, path: '/payroll'},
  {key: '/performance', label: '전된 {�증 옡밐  섰뎰데', icon: <TrophyOutlined />, path: '/performance'},
  {key: '/ess', label: '갑랜 나을 요 闬餀원 Portal (ESS)', icon: <CustomerServiceOutlined />, path: '/ess'},
  {key: '/analytics/ai-dashboard', label: 'AI 베을객 요 틼穐옡밐', icon: <RobotOutlined />, path: '/analytics/ai-dashboard'},
  {key: '/api-management', label: 'Open API 도D H이', icon: <ApiOutlined />, path: '/api-management'},
  {key: '/subscription', label: '섰트 틼穐', icon: <DollarCircleOutlined />, path: '/subscription'},
  {key: '/billing', label: '엤 넍. 원 �젔갽&�ﴍ,��Lr', icon: <CreditCardOutlined />, path: '/billing'},
  {key: '/', label: '매듁닡륨', icon: <HomeOutlined />, path: '/'},
  {key: '/my-page', label: '매주 원
Ɂ앨evy�, icon: <UserOutlined />, path: '/my-page'},
];

export default function AppLayout({ children }: React.PropsWithChildren<{}>) {
 r�춻���&�v���