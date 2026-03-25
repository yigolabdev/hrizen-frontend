import React from 'react';
import { Typography, Row, Col } from 'antd';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24, color: '#007AFF' }}>
        권한 관리
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <UserSearchFilter />
        </Col>
        <Col xs={24} lg={16}>
          <RoleAssignmentTable />
        </Col>
        <Col xs={24} lg={8}>
          <PermissionMatrix />
        </Col>
      </Row>
    </div>
  );
}
