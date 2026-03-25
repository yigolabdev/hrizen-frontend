import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>권한 관리</Title>
      <UserSearchFilter />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <RoleAssignmentTable />
        </Col>
        <Col xs={24} lg={10}>
          <PermissionMatrix />
        </Col>
      </Row>
    </Space>
  );
}
