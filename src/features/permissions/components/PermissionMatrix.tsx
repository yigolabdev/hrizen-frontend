import React from 'react';
import { Table, Tooltip, Badge, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Role, Permission } from '@/features/permissions/types';

const { Text } = Typography;

interface PermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
}

export default function PermissionMatrix({ roles, permissions }: PermissionMatrixProps) {
  // 테이블의 행: 각 권한(permissions)
  // 테이블의 열: 역할(roles) + 권한 이름

  type RowData = {
    key: string;
    permissionName: string;
    description: string;
    [roleKey: string]: React.ReactNode | string;
  };

  const dataSource: RowData[] = permissions.map((permission) => {
    const row: RowData = {
      key: permission.id,
      permissionName: permission.name,
      description: permission.description,
    };

    roles.forEach((role) => {
      // 역할이 권한을 보유하면 true
      const hasPermission = role.permissionIds.includes(permission.id);
      row[role.id] = hasPermission ? (
        <Tooltip title="허용됨">
          <Badge status="success" />
        </Tooltip>
      ) : (
        <Tooltip title="허용 안 됨">
          <Badge status="default" />
        </Tooltip>
      );
    });

    return row;
  });

  const columns: ColumnsType<RowData> = [
    {
      title: '권한',
      dataIndex: 'permissionName',
      key: 'permissionName',
      fixed: 'left',
      width: 200,
      render: (text: string, record) => (
        <Tooltip title={record.description}>
          <Text strong style={{ cursor: 'help' }}>
            {text}
          </Text>
        </Tooltip>
      ),
    },
    ...roles.map((role) => ({
      title: role.name,
      dataIndex: role.id,
      key: role.id,
      width: 100,
      align: 'center' as const,
    })),
  ];

  return (
    <Table<RowData>
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      size="small"
      scroll={{ x: 'max-content' }}
      bordered={false}
    />
  );
}
