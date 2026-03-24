import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Popconfirm,
  Typography,
  Tooltip,
  Progress,
  Modal,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  GlobalOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useTenants } from '../hooks/useTenants';
import type { Tenant } from '../types';
import TenantSettingsForm from './TenantSettingsForm';

const { Text } = Typography;

const statusMap: Record<string, { color: string; label: string }> = {
  active: { color: '#52c41a', label: '활성' },
  trial: { color: '#FF9500', label: '체험판' },
  expired: { color: '#ff4d4f', label: '만료' },
  suspended: { color: '#d9d9d9', label: '정지' },
};

const planColorMap: Record<string, string> = {
  Free: 'default',
  Starter: 'blue',
  Professional: 'geekblue',
  Enterprise: 'purple',
};

const languageLabelMap: Record<string, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
  vi: 'Tiếng Việt',
  de: 'Deutsch',
};

export default function TenantListTable() {
  const { tenants, loading, deleteTenant, updateTenant, addTenant } = useTenants();
  const [searchText, setSearchText] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchText.toLowerCase()) ||
      t.country.includes(searchText) ||
      t.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setEditModalOpen(true);
  };

  const columns: ColumnsType<Tenant> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: '테넌트명',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record: Tenant) => (
        <Space>
          <GlobalOutlined style={{ color: '#007AFF' }} />
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.country} · {record.businessType}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '언어/통화',
      key: 'langCurrency',
      width: 140,
      render: (_: unknown, record: Tenant) => (
        <div>
          <Tag>{languageLabelMap[record.language] || record.language}</Tag>
          <Tag color="cyan">{record.currency}</Tag>
        </div>
      ),
    },
    {
      title: '사용자',
      key: 'users',
      width: 160,
      sorter: (a, b) => a.userCount - b.userCount,
      render: (_: unknown, record: Tenant) => {
        const percent = Math.round((record.userCount / record.maxUsers) * 100);
        return (
          <Tooltip title={`${record.userCount} / ${record.maxUsers}명`}>
            <Progress
              percent={percent}
              size="small"
              strokeColor={percent > 90 ? '#ff4d4f' : '#007AFF'}
              format={() => `${record.userCount}/${record.maxUsers}`}
            />
          </Tooltip>
        );
      },
    },
    {
      title: '구독 플랜',
      dataIndex: 'subscriptionPlan',
      key: 'subscriptionPlan',
      width: 120,
      filters: [
        { text: 'Free', value: 'Free' },
        { text: 'Starter', value: 'Starter' },
        { text: 'Professional', value: 'Professional' },
        { text: 'Enterprise', value: 'Enterprise' },
      ],
      onFilter: (value, record) => record.subscriptionPlan === value,
      render: (plan: string) => <Tag color={planColorMap[plan]}>{plan}</Tag>,
    },
    {
      title: '상태',
      dataIndex: 'subscriptionStatus',
      key: 'subscriptionStatus',
      width: 90,
      filters: [
        { text: '활성', value: 'active' },
        { text: '체험판', value: 'trial' },
        { text: '만료', value: 'expired' },
        { text: '정지', value: 'suspended' },
      ],
      onFilter: (value, record) => record.subscriptionStatus === value,
      render: (status: string) => {
        const s = statusMap[status];
        return s ? <Tag color={s.color}>{s.label}</Tag> : <Tag>{status}</Tag>;
      },
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 110,
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: '관리',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_: unknown, record: Tenant) => (
        <Space>
          <Tooltip title="설정 편집">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#007AFF' }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="테넌트 삭제"
            description={`"${record.name}" 테넌트를 삭제하시겠습니까?`}
            onConfirm={() => deleteTenant(record.id)}
            okText="삭제"
            cancelText="취소"
            icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
          >
            <Tooltip title="삭제">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="테넌트 목록"
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
        extra={
          <Space>
            <Input
              placeholder="검색 (이름, 국가, ID)"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 220, borderRadius: 8 }}
              allowClear
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: 8, backgroundColor: '#007AFF' }}
              onClick={() => setAddModalOpen(true)}
            >
              테넌트 추가
            </Button>
          </Space>
        }
      >
        <Table<Tenant>
          columns={columns}
          dataSource={filteredTenants}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `총 ${total}개` }}
          scroll={{ x: 1000 }}
          size="middle"
        />
      </Card>

      <Modal
        title="테넌트 설정 편집"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        width={720}
        destroyOnClose
      >
        {selectedTenant && (
          <TenantSettingsForm
            tenant={selectedTenant}
            onSubmit={(values) => {
              updateTenant({ ...values, tenantId: selectedTenant.id });
              setEditModalOpen(false);
            }}
            onCancel={() => setEditModalOpen(false)}
          />
        )}
      </Modal>

      <Modal
        title="새 테넌트 추가"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        footer={null}
        width={720}
        destroyOnClose
      >
        <TenantSettingsForm
          onSubmit={(values) => {
            addTenant(values);
            setAddModalOpen(false);
          }}
          onCancel={() => setAddModalOpen(false)}
        />
      </Modal>
    </>
  );
}
