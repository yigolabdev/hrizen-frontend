import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function PermissionsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: '#007AFF' }}>권한 관리</Title>
      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <UserSearchFilter />
      </Card>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 12 }}>
            <RoleAssignmentTable />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 12 }}>
            <PermissionMatrix />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
