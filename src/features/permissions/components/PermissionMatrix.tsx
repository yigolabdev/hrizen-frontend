import React, { useState } from 'react';
import { Card, Table, Switch, Typography, Space, Tooltip, Tag, Grid, message, Modal } from 'antd';
import {
  LockOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CrownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { usePermissions, type PermissionItem, type RoleType } from '@/features/permissions/context/PermissionsContext';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const roles: RoleType[] = ['최고관리자', '관리자', 'HR담당자', '팀장', '일반직원'];

const roleColorMap: Record<RoleType, string> = {
  최고관리자: '#FF3B30',
  관리자: '#FF9500',
  HR담당자: '#007AFF',
  팀장: '#34C759',
  일반직원: '#8e8e93',
};

export default function PermissionMatrix() {
  const { permissions, togglePermission } = usePermissions();
  const screens = useBreakpoint();
  const [messageApi, contextHolder] = message.useMessage();

  const handleToggle = (record: PermissionItem, role: RoleType) => {
    if (role === '최고관리자') {
      messageApi.warning('최고관리자의 권한은 변경할 수 없습니다.');
      return;
    }

    const currentValue = record[role];
    const action = currentValue ? '제거' : '부여';

    Modal.confirm({
      title: '권한 변경 확인',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          <strong>{role}</strong> 역할에 대해 <strong>"{record.module}"</strong> 권한을 {action}하시겠습니까?
        </span>
      ),
      okText: action,
      cancelText: '취소',
      okButtonProps: currentValue ? { danger: true } : {},
      onOk() {
        togglePermission(record.key, role);
        messageApi.success(
          `"${record.module}" 권한이 ${role} 역할에서 ${action}되었습니다.`
        );
      },
    });
  };

  const columns: ColumnsType<PermissionItem> = [
    {
      title: '모듈',
      dataIndex: 'module',
      key: 'module',
      width: 180,
      fixed: 'left',
      render: (module: string) => (
        <Text strong style={{ fontSize: 13 }}>
          {module}
        </Text>
      ),
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description',
      width: 220,
      responsive: ['lg'],
      render: (desc: string) => (
        <Text style={{ fontSize: 12, color: '#636366' }}>{desc}</Text>
      ),
    },
    ...roles.map((role): ColumnsType<PermissionItem>[number] => ({
      title: (
        <div style={{ textAlign: 'center' }}>
          <Tag
            color={roleColorMap[role]}
            style={{
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
            }}
          >
            {role === '최고관리자' && <CrownOutlined style={{ marginRight: 3 }} />}
            {role}
          </Tag>
        </div>
      ),
      key: role,
      width: 110,
      align: 'center' as const,
      render: (_: unknown, record: PermissionItem) => {
        const hasPermission = record[role];
        const isSuper = role === '최고관리자';

        if (isSuper) {
          return (
            <Tooltip title="최고관리자는 모든 권한을 보유합니다">
              <CheckCircleFilled style={{ fontSize: 18, color: '#FF3B30' }} />
            </Tooltip>
          );
        }

        return (
          <Tooltip title={hasPermission ? '권한 제거' : '권한 부여'}>
            <Switch
              checked={hasPermission}
              onChange={() => handleToggle(record, role)}
              size="small"
              style={{
                backgroundColor: hasPermission ? '#007AFF' : '#d1d1d6',
              }}
            />
          </Tooltip>
        );
      },
    })),
  ];

  return (
    <Card
      title={
        <Space>
          <LockOutlined style={{ color: '#007AFF' }} />
          <span style={{ fontWeight: 700 }}>권한 매트릭스</span>
        </Space>
      }
      extra={
        <Text style={{ fontSize: 12, color: '#8e8e93' }}>
          역할별 모듈 접근 권한을 설정합니다
        </Text>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      bodyStyle={{ padding: 0 }}
    >
      {contextHolder}
      <Table<PermissionItem>
        dataSource={permissions}
        columns={columns}
        rowKey="key"
        pagination={false}
        scroll={{ x: 900 }}
        style={{ borderRadius: '0 0 12px 12px', overflow: 'hidden' }}
        size={screens.md ? 'middle' : 'small'}
        rowClassName={(_, index) => (index % 2 === 0 ? '' : 'ant-table-row-alt')}
      />
      <style>{`
        .ant-table-row-alt td {
          background-color: #FAFAFA !important;
        }
      `}</style>
    </Card>
  );
}
