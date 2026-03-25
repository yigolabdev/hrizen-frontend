import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#007AFF', marginBottom: 24 }}>
        권한 관리
      </Title>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <UserSearchFilter />
        <RoleAssignmentTable />
        <PermissionMatrix />
      </Space>
    </div>
  );
}
