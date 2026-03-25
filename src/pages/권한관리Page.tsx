import React from 'react';
import { Typography, Space } from 'antd';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>濃한 관리</Title>
      <UserSearchFilter />
      <RoleAssignmentTable />
      <PermissionMatrix />
    </Space>
  );
}
