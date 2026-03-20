import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Row, Col, message } from 'antd';
import RoleAssignmentTable from '@/features/permissions/components/RoleAssignmentTable';
import PermissionMatrix from '@/features/permissions/components/PermissionMatrix';
import UserSearchFilter from '@/features/permissions/components/UserSearchFilter';
import { apiClient } from '@/lib/api';
import { Role, Permission, User } from '@/features/permissions/types';

const { Title, Text } = Typography;

export default function 권한관리Page() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // mock async fetch
    Promise.all([
      apiClient.get('/mock/roles'),
      apiClient.get('/mock/permissions'),
      apiClient.get('/mock/users'),
    ])
      .then(([rolesRes, permsRes, usersRes]) => {
        setRoles(rolesRes.data as Role[]);
        setPermissions(permsRes.data as Permission[]);
        setUsers(usersRes.data as User[]);
        setFilteredUsers(usersRes.data as User[]);
      })
      .catch(() => {
        message.error('데이터를 불러오는 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUserFilter = (keyword: string, roleIds: string[]) => {
    let result = users;
    if (keyword.trim()) {
      const lower = keyword.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lower) ||
          user.email.toLowerCase().includes(lower) ||
          user.username.toLowerCase().includes(lower)
      );
    }
    if (roleIds.length) {
      result = result.filter((user) => roleIds.includes(user.roleId));
    }
    setFilteredUsers(result);
  };

  const handleRoleChange = (userId: string, newRoleId: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, roleId: newRoleId } : user))
    );
    setFilteredUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, roleId: newRoleId } : user))
    );
    message.success('사용자 권한이 성공적으로 변경되었습니다.');
  };

  return (
    <main style={{ padding: 24, background: '#F2F2F7', minHeight: '100vh' }}>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>
        권한 관리
      </Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card
          style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          bodyStyle={{ padding: 16 }}
          bordered={false}
        >
          <UserSearchFilter
            roles={roles}
            onFilter={handleUserFilter}
          />
        </Card>

        <Row gutter={[24, 24]} wrap>
          <Col xs={24} lg={14}>
            <Card
              title={<Text strong style={{ color: '#007AFF' }}>사용자별 역할 할당</Text>}
              style={{ borderRadius: 8, minHeight: 400 }}
              bodyStyle={{ padding: 12 }}
              bordered={false}
            >
              <RoleAssignmentTable
                users={filteredUsers}
                roles={roles}
                loading={loading}
                onRoleChange={handleRoleChange}
              />
            </Card>
          </Col>
          <Col xs={24} lg={10}>
            <Card
              title={<Text strong style={{ color: '#007AFF' }}>권한 매트릭스</Text>}
              style={{ borderRadius: 8, minHeight: 400 }}
              bodyStyle={{ padding: 12 }}
              bordered={false}
            >
              <PermissionMatrix
                roles={roles}
                permissions={permissions}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </main>
  );
}
