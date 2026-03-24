import React, { useState, useCallback } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Typography,
  Tooltip,
  Popconfirm,
  message,
  Badge,
} from 'antd';
import {
  PlusOutlined,
  CopyOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  KeyOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Text, Paragraph } = Typography;

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  permissions: string[];
  createdAt: string;
  expiresAt: string;
  lastUsed: string;
  callCount: number;
}

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'ERP 연동 키',
    key: 'hrz_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    status: 'active',
    permissions: ['read', 'write'],
    createdAt: '2024-01-15',
    expiresAt: '2025-01-15',
    lastUsed: '2024-12-20',
    callCount: 45230,
  },
  {
    id: '2',
    name: '그룹웨어 연동 키',
    key: 'hrz_live_q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    status: 'active',
    permissions: ['read'],
    createdAt: '2024-03-10',
    expiresAt: '2025-03-10',
    lastUsed: '2024-12-19',
    callCount: 12870,
  },
  {
    id: '3',
    name: '재무 시스템 키',
    key: 'hrz_live_g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8',
    status: 'inactive',
    permissions: ['read', 'write', 'admin'],
    createdAt: '2024-05-20',
    expiresAt: '2025-05-20',
    lastUsed: '2024-11-05',
    callCount: 8450,
  },
  {
    id: '4',
    name: '테스트 키',
    key: 'hrz_test_w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4',
    status: 'expired',
    permissions: ['read'],
    createdAt: '2023-06-01',
    expiresAt: '2024-06-01',
    lastUsed: '2024-05-30',
    callCount: 320,
  },
];

const permissionOptions = [
  { label: '읽기 (Read)', value: 'read' },
  { label: '쓰기 (Write)', value: 'write' },
  { label: '관리자 (Admin)', value: 'admin' },
];

const expiryOptions = [
  { label: '30일', value: '30' },
  { label: '90일', value: '90' },
  { label: '180일', value: '180' },
  { label: '1년', value: '365' },
  { label: '무제한', value: 'unlimited' },
];

export default function APIKeyGenerator() {
  const [keys, setKeys] = useState<APIKey[]>(mockAPIKeys);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [form] = Form.useForm();

  const toggleKeyVisibility = useCallback((id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleCopyKey = useCallback((key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      message.success('API 키가 클립보드에 복사되었습니다.');
    }).catch(() => {
      message.error('복사에 실패했습니다.');
    });
  }, []);

  const handleCreateKey = useCallback(() => {
    form.validateFields().then((values: { name: string; permissions: string[]; expiry: string }) => {
      const now = new Date();
      const expiresAt = values.expiry === 'unlimited'
        ? '무제한'
        : new Date(now.getTime() + parseInt(values.expiry) * 86400000)
            .toISOString()
            .split('T')[0];

      const randomStr = Array.from({ length: 32 }, () =>
        'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(
          Math.floor(Math.random() * 36)
        )
      ).join('');

      const newKey: APIKey = {
        id: String(Date.now()),
        name: values.name,
        key: `hrz_live_${randomStr}`,
        status: 'active',
        permissions: values.permissions,
        createdAt: now.toISOString().split('T')[0],
        expiresAt,
        lastUsed: '-',
        callCount: 0,
      };

      setKeys((prev) => [newKey, ...prev]);
      setIsModalOpen(false);
      form.resetFields();
      message.success('새 API 키가 성공적으로 생성되었습니다.');
    });
  }, [form]);

  const handleDeleteKey = useCallback((id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    message.success('API 키가 삭제되었습니다.');
  }, []);

  const handleRegenerateKey = useCallback((id: string) => {
    const randomStr = Array.from({ length: 32 }, () =>
      'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(
        Math.floor(Math.random() * 36)
      )
    ).join('');

    setKeys((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, key: `hrz_live_${randomStr}` } : k
      )
    );
    message.success('API 키가 재발급되었습니다.');
  }, []);

  const statusConfig: Record<
    APIKey['status'],
    { color: string; text: string; icon: React.ReactNode }
  > = {
    active: {
      color: '#52C41A',
      text: '활성',
      icon: <CheckCircleFilled style={{ color: '#52C41A' }} />,
    },
    inactive: {
      color: '#8E8E93',
      text: '비활성',
      icon: <CloseCircleFilled style={{ color: '#8E8E93' }} />,
    },
    expired: {
      color: '#FF3B30',
      text: '만료',
      icon: <CloseCircleFilled style={{ color: '#FF3B30' }} />,
    },
  };

  const permissionColorMap: Record<string, string> = {
    read: '#007AFF',
    write: '#FF9500',
    admin: '#FF3B30',
  };

  const permissionLabelMap: Record<string, string> = {
    read: '읽기',
    write: '쓰기',
    admin: '관리자',
  };

  const columns: ColumnsType<APIKey> = [
    {
      title: '키 이름',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      render: (name: string) => (
        <Space>
          <KeyOutlined style={{ color: '#007AFF' }} />
          <Text strong style={{ color: '#1A1A1A' }}>{name}</Text>
        </Space>
      ),
    },
    {
      title: 'API 키',
      dataIndex: 'key',
      key: 'key',
      width: 320,
      render: (key: string, record: APIKey) => {
        const isVisible = visibleKeys[record.id];
        const displayKey = isVisible ? key : `${key.substring(0, 12)}${'•'.repeat(24)}`;
        return (
          <Space>
            <Text
              code
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                color: '#636366',
                backgroundColor: '#F2F2F7',
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
              {displayKey}
            </Text>
            <Tooltip title={isVisible ? '숨기기' : '보기'}>
              <Button
                type="text"
                size="small"
                icon={isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => toggleKeyVisibility(record.id)}
              />
            </Tooltip>
            <Tooltip title="복사">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopyKey(key)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: APIKey['status']) => {
        const config = statusConfig[status];
        return (
          <Badge
            status={status === 'active' ? 'success' : status === 'inactive' ? 'default' : 'error'}
            text={<Text style={{ color: config.color, fontWeight: 500 }}>{config.text}</Text>}
          />
        );
      },
    },
    {
      title: '권한',
      dataIndex: 'permissions',
      key: 'permissions',
      width: 180,
      render: (permissions: string[]) => (
        <Space size={4} wrap>
          {permissions.map((p) => (
            <Tag
              key={p}
              style={{
                borderRadius: 6,
                border: 'none',
                backgroundColor: `${permissionColorMap[p]}14`,
                color: permissionColorMap[p],
                fontWeight: 500,
                fontSize: 12,
              }}
            >
              {permissionLabelMap[p]}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '호출 수',
      dataIndex: 'callCount',
      key: 'callCount',
      width: 110,
      render: (count: number) => (
        <Text style={{ fontWeight: 600, color: '#007AFF' }}>
          {count.toLocaleString()}
        </Text>
      ),
    },
    {
      title: '만료일',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      width: 120,
      render: (date: string) => <Text style={{ color: '#636366' }}>{date}</Text>,
    },
    {
      title: '관리',
      key: 'action',
      width: 120,
      render: (_: unknown, record: APIKey) => (
        <Space size={4}>
          <Tooltip title="키 재발급">
            <Popconfirm
              title="API 키 재발급"
              description="기존 키는 즉시 무효화됩니다. 계속하시겠습니까?"
              onConfirm={() => handleRegenerateKey(record.id)}
              okText="재발급"
              cancelText="취소"
              okButtonProps={{ style: { backgroundColor: '#FF9500', borderColor: '#FF9500' } }}
            >
              <Button type="text" size="small" icon={<ReloadOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="삭제">
            <Popconfirm
              title="API 키 삭제"
              description="삭제된 키는 복구할 수 없습니다. 계속하시겠습니까?"
              onConfirm={() => handleDeleteKey(record.id)}
              okText="삭제"
              cancelText="취소"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <KeyOutlined style={{ color: '#007AFF' }} />
            <span>API 키 관리</span>
          </Space>
        }
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF', borderBottom: '1px solid #F2F2F7' }}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#007AFF',
              borderColor: '#007AFF',
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            새 API 키 생성
          </Button>
        }
      >
        <Table<APIKey>
          dataSource={keys}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5, showSizeChanger: false }}
          scroll={{ x: 1100 }}
          style={{ marginTop: 4 }}
          locale={{ emptyText: '등록된 API 키가 없습니다.' }}
        />
      </Card>

      <Modal
        title="새 API 키 생성"
        open={isModalOpen}
        onOk={handleCreateKey}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        okText="생성"
        cancelText="취소"
        okButtonProps={{
          style: { backgroundColor: '#007AFF', borderColor: '#007AFF', borderRadius: 8 },
        }}
        cancelButtonProps={{ style: { borderRadius: 8 } }}
        styles={{ body: { paddingTop: 20 } }}
        width={520}
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item
            name="name"
            label="키 이름"
            rules={[{ required: true, message: 'API 키 이름을 입력해주세요.' }]}
          >
            <Input
              placeholder="예: ERP 연동 키"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="권한 설정"
            rules={[{ required: true, message: '최소 하나의 권한을 선택해주세요.' }]}
          >
            <Select
              mode="multiple"
              placeholder="권한을 선택하세요"
              options={permissionOptions}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="expiry"
            label="유효 기간"
            rules={[{ required: true, message: '유효 기간을 선택해주세요.' }]}
          >
            <Select
              placeholder="유효 기간을 선택하세요"
              options={expiryOptions}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
