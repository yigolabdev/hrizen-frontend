import React, { useEffect, useState } from 'react';
import { Table, Button, Tooltip, Modal, Space, Typography } from 'antd';
import { EditOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { apiClient } from '@/lib/api';
import LanguageCurrencySelector from './LanguageCurrencySelector';

const { confirm } = Modal;
const { Text } = Typography;

export interface Tenant {
  id: string;
  name: string;
  country: string;
  usersCount: number;
  permissionsCount: number;
  subscriptionStatus: 'active' | 'trial' | 'expired';
  language: string;
  currency: string;
}

export default function TenantListTable() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [languageCurrencyModalVisible, setLanguageCurrencyModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTenants() {
      setLoading(true);
      // Mock API
      const response: Tenant[] = [
        {
          id: 'tn001',
          name: '서울HQ',
          country: 'KR',
          usersCount: 120,
          permissionsCount: 5,
          subscriptionStatus: 'active',
          language: 'ko',
          currency: 'KRW',
        },
        {
          id: 'tn002',
          name: '뉴욕지사',
          country: 'US',
          usersCount: 82,
          permissionsCount: 4,
          subscriptionStatus: 'trial',
          language: 'en',
          currency: 'USD',
        },
        {
          id: 'tn003',
          name: '도쿄지사',
          country: 'JP',
          usersCount: 45,
          permissionsCount: 3,
          subscriptionStatus: 'expired',
          language: 'ja',
          currency: 'JPY',
        },
      ];
      // 실제 api 호출 시: const response = await apiClient.get('/admin/tenants');
      setTenants(response);
      setLoading(false);
    }
    fetchTenants();
  }, []);

  function handleEditLanguageCurrency(tenant: Tenant) {
    setSelectedTenant(tenant);
    setLanguageCurrencyModalVisible(true);
  }

  function handleDeleteTenant(id: string) {
    confirm({
      title: '테넌트를 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '삭제된 데이터는 복구할 수 없습니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        setTenants(prev => prev.filter(t => t.id !== id));
      },
    });
  }

  const columns = [
    {
      title: '테넌트명',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (value: string, record: Tenant) => (
        <Tooltip title={value} placement="topLeft">
          <Text strong>{value}</Text>
        </Tooltip>
      ),
      sorter: (a: Tenant, b: Tenant) => a.name.localeCompare(b.name),
      width: 150,
    },
    {
      title: '국가',
      dataIndex: 'country',
      key: 'country',
      width: 90,
      render: (country: string) => {
        const flag = {
          KR: '🇰🇷',
          US: '🇺🇸',
          JP: '🇯🇵',
        }[country] || country;
        return <span>{flag}</span>;
      },
      filters: [
        { text: '한국', value: 'KR' },
        { text: '미국', value: 'US' },
        { text: '일본', value: 'JP' },
      ],
      onFilter: (value: string | number | boolean, record: Tenant) => record.country === value,
    },
    {
      title: '사용자 수',
      dataIndex: 'usersCount',
      key: 'usersCount',
      width: 120,
      sorter: (a: Tenant, b: Tenant) => a.usersCount - b.usersCount,
    },
    {
      title: '권한 그룹 수',
      dataIndex: 'permissionsCount',
      key: 'permissionsCount',
      width: 130,
      sorter: (a: Tenant, b: Tenant) => a.permissionsCount - b.permissionsCount,
    },
    {
      title: '구독 상태',
      dataIndex: 'subscriptionStatus',
      key: 'subscriptionStatus',
      width: 120,
      filters: [
        { text: '활성', value: 'active' },
        { text: '체험', value: 'trial' },
        { text: '만료', value: 'expired' },
      ],
      onFilter: (value: string | number | boolean, record: Tenant) => record.subscriptionStatus === value,
      render: (status: Tenant['subscriptionStatus']) => {
        const colorMap = {
          active: '#007AFF',
          trial: '#FF9500',
          expired: '#FF3B30',
        };
        const labelMap = {
          active: '활성',
          trial: '체험',
          expired: '만료',
        };
        return <Text style={{ color: colorMap[status], fontWeight: 'bold' }}>{labelMap[status]}</Text>;
      },
    },
    {
      title: '언어/통화',
      key: 'langCurr',
      width: 140,
      render: (_, record: Tenant) => (
        <Text>{record.language.toUpperCase()} / {record.currency.toUpperCase()}</Text>
      ),
    },
    {
      title: '관리',
      key: 'actions',
      width: 110,
      fixed: 'right',
      render: (_: any, record: Tenant) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditLanguageCurrency(record)}
            type="text"
            style={{ color: '#007AFF' }}
            aria-label="언어 및 통화 수정"
          />
          <Button
            danger
            size="small"
            onClick={() => handleDeleteTenant(record.id)}
            type="text"
            aria-label="테넌트 삭제"
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tenants}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 900 }}
        bordered
        size="middle"
        style={{ backgroundColor: '#FFFFFF', borderRadius: 12 }}
        title={() => (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              const newTenant: Tenant = {
                id: `tn${String(tenants.length + 1).padStart(3, '0')}`,
                name: `새 테넌트 ${tenants.length + 1}`,
                country: 'KR',
                usersCount: 0,
                permissionsCount: 0,
                subscriptionStatus: 'trial',
                language: 'ko',
                currency: 'KRW',
              };
              setTenants(prev => [newTenant, ...prev]);
            }}
            style={{ borderRadius: 6 }}
          >
            새 테넌트 추가
          </Button>
        )}
      />

      <Modal
        title={`언어 및 통화 설정 - ${selectedTenant?.name ?? ''}`}
        open={languageCurrencyModalVisible}
        footer={null}
        onCancel={() => setLanguageCurrencyModalVisible(false)}
        destroyOnClose
        centered
      >
        {selectedTenant && (
          <LanguageCurrencySelector
            tenant={selectedTenant}
            onClose={() => setLanguageCurrencyModalVisible(false)}
            onSave={(updated) => {
              setTenants(prev =>
                prev.map(t => (t.id === updated.id ? { ...t, language: updated.language, currency: updated.currency } : t))
              );
              setLanguageCurrencyModalVisible(false);
            }}
          />
        )}
      </Modal>
    </>
  );
}
