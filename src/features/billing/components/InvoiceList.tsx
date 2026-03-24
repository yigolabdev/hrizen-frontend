import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Input,
  DatePicker,
  Tooltip,
  Modal,
  Descriptions,
  Divider,
} from 'antd';
import {
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  description: string;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-0001',
    issueDate: '2025-01-01',
    dueDate: '2025-01-15',
    amount: 990000,
    status: 'paid',
    description: '2025년 1월 구독료',
    items: [
      { name: 'HRiZen Pro 월 구독', quantity: 1, unitPrice: 900000, total: 900000 },
      { name: '추가 사용자 (5명)', quantity: 5, unitPrice: 18000, total: 90000 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-0002',
    issueDate: '2025-02-01',
    dueDate: '2025-02-15',
    amount: 990000,
    status: 'paid',
    description: '2025년 2월 구독료',
    items: [
      { name: 'HRiZen Pro 월 구독', quantity: 1, unitPrice: 900000, total: 900000 },
      { name: '추가 사용자 (5명)', quantity: 5, unitPrice: 18000, total: 90000 },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-0003',
    issueDate: '2025-03-01',
    dueDate: '2025-03-15',
    amount: 1080000,
    status: 'paid',
    description: '2025년 3월 구독료',
    items: [
      { name: 'HRiZen Pro 월 구독', quantity: 1, unitPrice: 900000, total: 900000 },
      { name: '추가 사용자 (10명)', quantity: 10, unitPrice: 18000, total: 180000 },
    ],
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-0004',
    issueDate: '2025-04-01',
    dueDate: '2025-04-15',
    amount: 1080000,
    status: 'pending',
    description: '2025년 4월 구독료',
    items: [
      { name: 'HRiZen Pro 월 구독', quantity: 1, unitPrice: 900000, total: 900000 },
      { name: '추가 사용자 (10명)', quantity: 10, unitPrice: 18000, total: 180000 },
    ],
  },
  {
    id: '5',
    invoiceNumber: 'INV-2025-0005',
    issueDate: '2025-05-01',
    dueDate: '2025-05-15',
    amount: 1170000,
    status: 'overdue',
    description: '2025년 5월 구독료 + 초과 사용',
    items: [
      { name: 'HRiZen Pro 월 구독', quantity: 1, unitPrice: 900000, total: 900000 },
      { name: '추가 사용자 (10명)', quantity: 10, unitPrice: 18000, total: 180000 },
      { name: 'API 초과 호출 (3,000건)', quantity: 3000, unitPrice: 30, total: 90000 },
    ],
  },
  {
    id: '6',
    invoiceNumber: 'INV-2024-0012',
    issueDate: '2024-12-01',
    dueDate: '2024-12-15',
    amount: 900000,
    status: 'cancelled',
    description: '2024년 12월 구독료 (취소)',
    items: [
      { name: 'HRiZen Pro 월 구독', quantity: 1, unitPrice: 900000, total: 900000 },
    ],
  },
];

const statusConfig: Record<InvoiceStatus, { color: string; label: string }> = {
  paid: { color: '#52c41a', label: '결제완료' },
  pending: { color: '#007AFF', label: '결제대기' },
  overdue: { color: '#ff4d4f', label: '연체' },
  cancelled: { color: '#d9d9d9', label: '취소' },
};

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);

export default function InvoiceList() {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [detailModal, setDetailModal] = useState<Invoice | null>(null);

  const filteredInvoices = mockInvoices.filter((inv) => {
    const matchesSearch =
      !searchText ||
      inv.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      inv.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesDate =
      !dateRange ||
      !dateRange[0] ||
      !dateRange[1] ||
      (dayjs(inv.issueDate).isAfter(dateRange[0].startOf('day').subtract(1, 'ms')) &&
        dayjs(inv.issueDate).isBefore(dateRange[1].endOf('day').add(1, 'ms')));

    return matchesSearch && matchesDate;
  });

  const columns: ColumnsType<Invoice> = [
    {
      title: '청구서 번호',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text: string) => (
        <Typography.Text strong style={{ color: '#007AFF', fontSize: 13 }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '발행일',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date: string) => dayjs(date).format('YYYY.MM.DD'),
      sorter: (a, b) => dayjs(a.issueDate).unix() - dayjs(b.issueDate).unix(),
    },
    {
      title: '결제기한',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('YYYY.MM.DD'),
      responsive: ['md'],
    },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: number) => (
        <Typography.Text strong>{formatCurrency(amount)}</Typography.Text>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status: InvoiceStatus) => {
        const config = statusConfig[status];
        return (
          <Tag
            color={config.color}
            style={{ borderRadius: 6, fontWeight: 500, fontSize: 12 }}
          >
            {config.label}
          </Tag>
        );
      },
      filters: [
        { text: '결제완료', value: 'paid' },
        { text: '결제대기', value: 'pending' },
        { text: '연체', value: 'overdue' },
        { text: '취소', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="상세 보기">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => setDetailModal(record)}
              style={{ color: '#007AFF' }}
            />
          </Tooltip>
          <Tooltip title="다운로드">
            <Button
              type="text"
              size="small"
              icon={<DownloadOutlined />}
              style={{ color: '#007AFF' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="청구서 내역"
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      >
        <Space
          direction="horizontal"
          size={12}
          style={{ marginBottom: 16, flexWrap: 'wrap', width: '100%' }}
          wrap
        >
          <Input
            placeholder="청구서 번호 또는 설명 검색"
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 260, borderRadius: 8 }}
            allowClear
          />
          <RangePicker
            onChange={(dates) =>
              setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null)
            }
            placeholder={['시작일', '종료일']}
            style={{ borderRadius: 8 }}
          />
        </Space>

        <Table<Invoice>
          columns={columns}
          dataSource={filteredInvoices}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `총 ${total}건`,
          }}
          style={{ borderRadius: 8 }}
          scroll={{ x: 600 }}
        />
      </Card>

      <Modal
        title={
          <Space>
            <FileTextOutlined style={{ color: '#007AFF' }} />
            <span>청구서 상세</span>
          </Space>
        }
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        footer={
          <Space>
            <Button onClick={() => setDetailModal(null)} style={{ borderRadius: 8 }}>
              닫기
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ backgroundColor: '#007AFF', borderColor: '#007AFF', borderRadius: 8 }}
            >
              PDF 다운로드
            </Button>
          </Space>
        }
        width={640}
      >
        {detailModal && (
          <>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 20 }}>
              <Descriptions.Item label="청구서 번호">
                {detailModal.invoiceNumber}
              </Descriptions.Item>
              <Descriptions.Item label="상태">
                <Tag
                  color={statusConfig[detailModal.status].color}
                  style={{ borderRadius: 6 }}
                >
                  {statusConfig[detailModal.status].label}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="발행일">
                {dayjs(detailModal.issueDate).format('YYYY.MM.DD')}
              </Descriptions.Item>
              <Descriptions.Item label="결제기한">
                {dayjs(detailModal.dueDate).format('YYYY.MM.DD')}
              </Descriptions.Item>
              <Descriptions.Item label="설명" span={2}>
                {detailModal.description}
              </Descriptions.Item>
            </Descriptions>

            <Table
              dataSource={detailModal.items}
              rowKey="name"
              pagination={false}
              size="small"
              columns={[
                { title: '항목', dataIndex: 'name', key: 'name' },
                {
                  title: '수량',
                  dataIndex: 'quantity',
                  key: 'quantity',
                  align: 'right',
                  render: (v: number) => v.toLocaleString(),
                },
                {
                  title: '단가',
                  dataIndex: 'unitPrice',
                  key: 'unitPrice',
                  align: 'right',
                  render: (v: number) => formatCurrency(v),
                },
                {
                  title: '소계',
                  dataIndex: 'total',
                  key: 'total',
                  align: 'right',
                  render: (v: number) => (
                    <Typography.Text strong>{formatCurrency(v)}</Typography.Text>
                  ),
                },
              ]}
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <Typography.Text strong>합계</Typography.Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="right">
                    <Typography.Text strong style={{ color: '#007AFF', fontSize: 15 }}>
                      {formatCurrency(detailModal.amount)}
                    </Typography.Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </>
        )}
      </Modal>
    </>
  );
}
