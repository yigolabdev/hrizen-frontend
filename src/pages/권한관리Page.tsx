import React from 'react';
import { Typography, Row, Col } from 'antd';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>권한 관리</Title>
      <UserSearchFilter />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <RoleAssignmentTable />
        </Col>
        <Col xs={24} lg={12}>
          <PermissionMatrix />
        </Col>
      </Row>
    </div>
  );
}
