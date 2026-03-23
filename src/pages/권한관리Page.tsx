import React from 'react';
import { Typography, Row, Col, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { RoleAssignmentTable } from '@/features/permissions/components/RoleAssignmentTable';
import { PermissionMatrix } from '@/features/permissions/components/PermissionMatrix';
import { UserSearchFilter } from '@/features/permissions/components/UserSearchFilter';

const { Title } = Typography;

export default function 권한관리Page() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">핈</Link> },
          { title: '권한 관리' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16, color: '#007AFF' }}>
        권한 관리
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="사용자 검색" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <UserSearchFilter />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="역할 발정" bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
            <RoleAssignmentTable />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="권한 매트릭스" bordered={false} style={{ borderRadius: 12 }}>
            <PermissionMatrix />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
