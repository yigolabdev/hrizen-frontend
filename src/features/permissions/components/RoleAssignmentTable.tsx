import React, { useMemo } from 'react';
import { Table, Select, Avatar, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { User, Role } from '@/features/permissions/types';

const { Text } = Typography;

interface RoleAssignmentTableProps {
  users: User[];
  roles: Role[];
  loading: boolean;
  onRoleChange: (userId: string, newRoleId: string) => void;
}

export default function RoleAssignmentTable({ users, roles, loading, onRoleChange }: RoleAssignmentTableProps) {
  const roleOptions = useMemo(
    () => roles.map((r) => ({ label: r.name, value: r.id })),
    [roles]
  );

  const columns: ColumnsType<User> = [
    {
      title: '사용자',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size={32} style={{ backgroundColor: '#007AFF', marginRight: 12 }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </div>
      ),
      width: 240,
      fixed: 'left',
    },
    {
      title: '역할',
      dataIndex: 'roleId',
      key: 'role',
      render: (roleId: string, record: User) => {
        return (
          <Select
            value={roleId}
            options={roleOptions}
            onChange={(value) => onRoleChange(record.id, value)}
            style={{ width: 160 }}
            popupClassName="role-select-popup"
          />
        );
      },
      width: 180,
      align: 'center',
    },
  ];

  return (
    <Table<User>
      columns={columns}
      dataSource={users}
      rowKey={(record) => record.id}
      loading={loading}
      pagination={{ pageSize: 8 }}
      scroll={{ x: 600 }}
      bordered={false}
      size="middle"
    />
  );
}
