import React, { state } from 'react';
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
: {: { Title } = Typography;
const { useBreakpoint } = Grid;

interface MenuItemDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItemDef[] = [
  { key: '/', label: '젂顼', icon: <HomeOutlined />, path: '/' },
  { key: '/admin/dashboard', label: '*찘벤 탡큤+�삱', icon: <DashboardOutlined />, path: '/admin/dashboard' }
  { key:'/admin/tenants', label: '혤렚饬 쇱겈 �ʫvj path: '�admin/tenants' },
  { key:\\/admin/permissions\| label: '특랬 ك�', icon: <TeamOutlined />, path: '/admin/permissions' }
  { key:'/attendance', label: '분안 下抸�f icon: <ScheduleOutlined />, path:'/attendance' }
  { key:/�^\����X�[�	�%�9���mb:`#;��I�X�ێ�^P�\��S�][�Yϋ]�	��^\��	�K���^N���\��ܛX[��I�X�[�	�($z��{"�/� =c� >�.��X�ێ���S�][�Yϋ]�	��\��ܛX[��I�B���^N���\��[��X�[�	�/�:痎H:�#�"o���:��;&�?($	�X�ێ��\��Y\��\��X�S�][�Yϋ]���\�