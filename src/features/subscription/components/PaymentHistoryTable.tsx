import React, { useState } from 'react';
import { Card, Table, Tag, Typography, Space, Button, Input, DatePicker, Row, Col, Tooltip, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface PaymentRecord {
  key: string;
  invoiceId: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'failed' | 'pending' | 'refunded';
  method: string;
  receiptUrl: string;
}

const paymentData: PaymentRecord[] = [
  {
    key: '1',
    invoiceId: 'INV-2025-0115',
    date: '2025-01-15',
    description: 'Business Pro 월간 구독료',
    amount: 990000,
    status: 'paid',
    method: '신용카드 ****-1234',
    receiptUrl: '#',
  },
  {
    key: '2',
    invoiceId: 'INV-2025-0115-U',
    date: '2025-01-15',
    description: 'AI 분석 요청 초과 사용료 (20회)',
    amount: 200,
    status: 'paid',
    method: '신용카드 ****-1234',
    receiptUrl: '#',
  },
  {
    key: '3',
    invoiceId: 'INV-2024-1215',
    date: '2024-12-15',
    description: 'Business Pro 월간 구독료',
    amount: 990000,
    status: 'paid',
    method: '신용카드 ****-1234',
    receiptUrl: '#',
  },
  {
    key: '4',
    invoiceId: 'INV-2024-1115',
    date: '2024-11-15',
    description: 'Business Pro 월간 구독료',
    amount: 990000,
    status: 'paid',
    method: '신용카드 ****-1234',
    receiptUrl: '#',
  },
  {
    key: '5',
    invoiceId: 'INV-2024-1015',
    date: '2024-10-15',
    description: 'Business Pro 월간 구독료',
    amount: 990000,
    status: 'refunded',
    method: '신용카드 ****-1234',
    receiptUrl: '#',
  },
  {
    key: '6',
    invoiceId: 'INV-2024-0915',
    date: '2024-09-15',
    description: 'Starter → Business Pro 업그레이드 차액',
    amount: 700000,
    status: 'paid',
    method: '신용카드 ****-5678',
    receiptUrl: '#',
  },
  {
    key: '7',
    invoiceId: 'INV-2024-0915-S',
    date: '2024-09-15',
    description: 'Starter 월간 구독료',
    amount: 290000,
    status: 'paid',
    method: '신용카드 ****-5678',
    receiptUrl: '#',
  },
  {
    key: '8',
    invoiceId: 'INV-2024-0815',
    date: '2024-08-15',
    description: 'Starter 월간 구독료',
    amount: 290000,
    status: 'failed',
    method: '신용카드 ****-5678',
    receiptUrl: '#',
  },
];

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  paid: { icon: <CheckCircleOutlined />, color: '#52c41a', label: '결제 완료' },
  failed: { icon: <CloseCircleOutlined />, color: '#ff4d4f', label: '결제 실패' },
  pending: { icon: <ClockCircleOutlined />, color: '#FF9500', label: '대기 중' },
  refunded: { icon: <SyncOutlined />, color: '#007AFF', label: '환불됨' },
};

const formatCurrency = (amount: number) => {
  return `₩${new Intl.NumberFormat('ko-KR').format(amount)}`;
};

export default function PaymentHistoryTable() {
  const [searchText, setSearchText] = useState('');
  const [detailModal, setDetailModal] = useState<{ open: boolean; record: PaymentRecord | null }>({
    open: false,
    record: null,
  });

  const filteredData = paymentData.filter(
    (item) =>
      item.invoiceId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<PaymentRecord> = [
    {
      title: '청구서 ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      width: 160,
      render: (id: string) => (
        <Text strong style={{ color: '#007AFF', fontSize: 13 }}>
          {id}
        </Text>
      ),
    },
    {
      title: '결제일',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a: PaymentRecord, b: PaymentRecord) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      align: 'right',
      render: (amount: number) => (
        <Text strong style={{ fontSize: 14 }}>
          {formatCurrency(amount)}
        </Text>
      ),
      sorter: (a: PaymentRecord, b: PaymentRecord) => a.amount - b.amount,
    },
    {
      title: '결제 수단',
      dataIndex: 'method',
      key: 'method',
      width: 160,
      render: (method: string) => <Text type="secondary">{method}</Text>,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: '결제 완료', value: 'paid' },
        { text: '결제 실패', value: 'failed' },
        { text: '대기 중', value: 'pending' },
        { text: '환불됨', value: 'refunded' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        const config = statusConfig[status];
        return (
          <Tag
            icon={config.icon}
            color={config.color}
            style={{ borderRadius: 12, fontWeight: 600 }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: 'actions',
      width: 80,
      render: (_: unknown, record: PaymentRecord) => (
        <Space size={4}>
          <Tooltip title="상세 보기">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => setDetailModal({ open: true, record })}
              style={{ color: '#007AFF' }}
            />
          </Tooltip>
          <Tooltip title="영수증 다운로드">
            <Button
              type="text"
              size="small"
              icon={<DownloadOutlined />}
              style={{ color: '#8c8c8c' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        bordered={false}
        style={{ borderRadius: 16, backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        title={
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
            결제 내역
          </Title>
        }
        extra={
          <Button
            icon={<FileTextOutlined />}
            style={{ borderRadius: 8 }}
          >
            전체 내보내기
          </Button>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="청구서 ID 또는 설명 검색"
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ borderRadius: 10 }}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker
              style={{ width: '100%', borderRadius: 10 }}
              placeholder={['시작일', '종료일']}
            />
          </Col>
        </Row>

        <Table<PaymentRecord>
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            showTotal: (total) => `총 ${total}건`,
            style: { marginTop: 16 },
          }}
          scroll={{ x: 800 }}
          style={{ borderRadius: 12, overflow: 'hidden' }}
        />
      </Card>

      <Modal
        title="결제 상세 정보"
        open={detailModal.open}
        onCancel={() => setDetailModal({ open: false, record: null })}
        footer={
          <Space>
            <Button onClick={() => setDetailModal({ open: false, record: null })}>
              닫기
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} style={{ backgroundColor: '#007AFF', borderColor: '#007AFF', borderRadius: 8 }}>
              영수증 다운로드
            </Button>
          </Space>
        }
      >
        {detailModal.record && (
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Row gutter={[16, 12]}>
              <Col span={8}>
                <Text type="secondary">청구서 ID</Text>
              </Col>
              <Col span={16}>
                <Text strong>{detailModal.record.invoiceId}</Text>
              </Col>

              <Col span={8}>
                <Text type="secondary">결제일</Text>
              </Col>
              <Col span={16}>
                <Text>{detailModal.record.date}</Text>
              </Col>

              <Col span={8}>
                <Text type="secondary">설명</Text>
              </Col>
              <Col span={16}>
                <Text>{detailModal.record.description}</Text>
              </Col>

              <Col span={8}>
                <Text type="secondary">금액</Text>
              </Col>
              <Col span={16}>
                <Text strong style={{ fontSize: 16 }}>
                  {formatCurrency(detailModal.record.amount)}
                </Text>
              </Col>

              <Col span={8}>
                <Text type="secondary">결제 수단</Text>
              </Col>
              <Col span={16}>
                <Text>{detailModal.record.method}</Text>
              </Col>

              <Col span={8}>
                <Text type="secondary">상태</Text>
              </Col>
              <Col span={16}>
                {(() => {
                  const config = statusConfig[detailModal.record.status];
                  return (
                    <Tag icon={config.icon} color={config.color} style={{ borderRadius: 12, fontWeight: 600 }}>
                      {config.label}
                    </Tag>
                  );
                })()}
              </Col>
            </Row>
          </Space>
        )}
      </Modal>
    </>
  );
}
