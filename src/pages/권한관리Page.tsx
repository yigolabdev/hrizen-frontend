import React from 'react';
import { Typography, Space } from 'antd';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import { PermissionsProvider } from '@/features/permissions/context/PermissionsContext';

const { Title, Text } = Typography;

export default function PermissionsPage() {
  return (
    <PermissionsProvider>
      <div style={{ padding: '0 0 40px 0' }}>
        <div style={{ marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 4, color: '#1a1a1a', fontWeight: 700 }}>
            권한 관리
          </Title>
          <Text style={{ color: '#8e8e93', fontSize: 15 }}>
            역할 기반 접근 제어(RBAC)를 통해 사용자별 접속 권한과 역할을 설정하고, 인사 및 급여 데이터를 안전하게 관리합니다.
          </Text>
        </div>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <UserSearchFilter />
          <RoleAssignmentTable />
          <PermissionMatrix />
        </Space>
      </div>
    </PermissionsProvider>
  );
}
