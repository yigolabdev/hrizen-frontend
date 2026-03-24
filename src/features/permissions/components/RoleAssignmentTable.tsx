import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Select,
  Switch,
  Typography,
  Space,
  Tooltip,
  Modal,
  message,
  Badge,
  Avatar,
  Grid,
} from 'antd';
import {
  UserOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  SolutionOutlined,
  IdcardOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { usePermissions, type UserRecord, type RoleType } from '@/features/permissions/context/PermissionsContext';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const roleColorMap: Record<RoleType, string> = {
  최고관리자: '#FF3B30',
  관리자: '#FF9500',
  HR담당자: '#007AFF',
  팀장: '#34C759',
  일반직원: '#8e8e93',
};

const roleIconMap: Record<RoleType, React.ReactNode> = {
  최고관리자: <CrownOutlined />,
  관리자: <SafetyCertificateOutlined />,
  HR담당자: <SolutionOutlined />,
  팀장: <TeamOutlined />,
  일반직원: <IdcardOutlined />,
};

const roleSelectOptions: { label: string; value: RoleType }[] = [
  { label: '최고관리자', value: '최고관리자' },
  { label: '관리자', value: '관리자' },
  { label: 'HR담당자', value: 'HR담당자' },
  { label: '팀장', value: '팀장' },
  { label: '일반직원', value: '일반직원' },
];

export default function RoleAssignmentTable() {
  const { filteredUsers, updateUserRole, updateUserStatus } = usePermissions();
  const screens = useBreakpoint();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRoleChange = (user: UserRecord, newRole: RoleType) => {
    if (user.role === '최고관리자' && newRole !== '최고관리자') {
      Modal.confirm({
        title: '최고관리자 권한 변경',
        icon: <ExclamationCircleOutlined />,
        content: `${user.name}님의 역할을 "${newRole}"(으)로 변경하시겠습니까? 최고관리자 권한이 해제됩니다.`,
        okText: '변경',
        cancelText: '취소',
        okButtonProps: { danger: true },
        onOk() {
          updateUserRole(user.id, newRole);
          messageApi.success(`${user.name}님의 역할이 "${newRole}"(으)로 변경되었습니다.`);
        },
      });
    } else {
      updateUserRole(user.id, newRole);
      messageApi.success(`${user.name}님의 역할이 "${newRole}"(으)로 변경되었습니다.`);
    }
  };

  const handleStatusChange = (user: UserRecord, checked: boolean) => {
    const newStatus = checked ? '활성' : '비활성';
    if (user.role === '최고관리자' && !checked) {
      messageApi.warning('최고관리자 계정은 비활성화할 수 없습니다.');
      return;
    }
    updateUserStatus(user.id, newStatus);
    messageApi.info(`${user.name}님의 상태가 "${newStatus}"(으)로 변경되었습니다.`);
  };

  const columns: ColumnsType<UserRecord> = [
    {
      title: '사번',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id: string) => <Text style={{ color: '#8e8e93', fontSize: 13 }}>{id}</Text>,
    },
    {
      title: '직원 정보',
      key: 'info',
      width: 240,
      render: (_, record) => (
        <Space size={12}>
          <Avatar
            style={{ backgroundColor: roleColorMap[record.role], flexShrink: 0 }}
            icon={<UserOutlined />}
            size={screens.md ? 40 : 32}
          />
          <div style={{ minWidth: 0 }}>
            <Text strong style={{ display: 'block', fontSize: 14, lineHeight: '20px' }}>
              {record.name}
            </Text>
            <Text style={{ fontSize: 12, color: '#8e8e93', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '부서',
      dataIndex: 'department',
      key: 'department',
      width: 100,
      render: (dept: string) => <Tag style={{ borderRadius: 6 }}>{dept}</Tag>,
    },
    {
      title: '역할',
      dataIndex: 'role',
      key: 'role',
      width: 170,
      render: (role: RoleType, record) => (
        <Select
          value={role}
          onChange={(val) => handleRoleChange(record, val)}
          style={{ width: 150 }}
          size="middle"
          options={roleSelectOptions.map((opt) => ({
            ...opt,
            label: (
              <Space size={6}>
                <span style={{ color: roleColorMap[opt.value] }}>{roleIconMap[opt.value]}</span>
                <span>{opt.label}</span>
              </Space>
            ),
          }))}
        />
      ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status: '활성' | '비활성', record) => (
        <Tooltip title={status === '활성' ? '비활성화하기' : '활성화하기'}>
          <Switch
            checked={status === '활성'}
            onChange={(checked) => handleStatusChange(record, checked)}
            checkedChildren="활성"
            unCheckedChildren="비활성"
            style={{ minWidth: 70 }}
          />
        </Tooltip>
      ),
    },
    {
      title: '최근 로그인',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 150,
      responsive: ['md'],
      render: (date: string) => <Text style={{ fontSize: 13, color: '#636366' }}>{date}</Text>,
    },
  ];

  return (
    <Card
      title={
        <Space>
          <TeamOutlined style={{ color: '#007AFF' }} />
          <span style={{ fontWeight: 700 }}>사용자 역할 배정</span>
          <Badge
            count={filteredUsers.length}
            style={{ backgroundColor: '#007AFF', fontSize: 11 }}
            overflowCount={999}
          />
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      bodyStyle={{ padding: 0 }}
    >
      {contextHolder}
      <Table<UserRecord>
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}명`,
          style: { padding: '12px 24px' },
        }}
        scroll={{ x: 800 }}
        style={{ borderRadius: '0 0 12px 12px', overflow: 'hidden' }}
        size={screens.md ? 'middle' : 'small'}
      />
    </Card>
  );
}
