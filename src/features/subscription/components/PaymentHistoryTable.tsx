import React, { useEffect, useState } from 'react';
import { Table, Card, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { apiClient } from '@/lib/api';

const { Title } = Typography;

type PaymentRecord = {
  key: string;
  date: string; // YYYY-MM-DD
  amount: number; // 원 단위
  method: '신용카드' | '계좌이체' | '자동이체';
  status: '완료' | '실패' | '취소';
  transactionId: string;
};

const mockPaymentHistory: PaymentRecord[] = [
  {
    key: '1',
    date: '2024-05-25',
    amount: 85000,
    method: '신용카드',
    status: '완료',
    transactionId: 'TXN202405250001',
  },
  {
    key: '2',
    date: '2024-04-25',
    amount: 85000,
    method: '신용카드',
    status: '완료',
    transactionId: 'TXN202404250001',
  },
  {
    key: '3',
    date: '2024-03-25',
    amount: 55000,
    method: '계좌이체',
    status: '완료',
    transactionId: 'TXN202403250001',
  },
  {
    key: '4',
    date: '2024-02-25',
    amount: 55000,
    method: '계좌이체',
    status: '실패',
    transactionId: 'TXN202402250001',
  },
];

export default function PaymentHistoryTable() {
  const [data, setData] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true);
      try {
        // mock api 호출
        await new Promise((resolve) => setTimeout(resolve, 600));
        setData(mockPaymentHistory);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  const columns: ColumnsType<PaymentRecord> = [
    {
      title: '결제일',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => (a.date > b.date ? 1 : -1),
      defaultSortOrder: 'descend',
      render: (text) => <span style={{ color: '#007AFF' }}>{text}</span>,
      width: 120,
    },
    {
      title: '결제 금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (value) => <span>{value.toLocaleString()} 원</span>,
      sorter: (a, b) => a.amount - b.amount,
      width: 130,
    },
    {
      title: '결제 수단',
      dataIndex: 'method',
      key: 'method',
      width: 100,
      filters: [
        { text: '신용카드', value: '신용카드' },
        { text: '계좌이체', value: '계좌이체' },
        { text: '자동이체', value: '자동이체' },
      ],
      onFilter: (value, record) => record.method === value,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '완료', value: '완료' },
        { text: '실패', value: '실패' },
        { text: '취소', value: '취소' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = status === '완료' ? '#52c41a' : status === '실패' ? '#ff4d4f' : '#d9d9d9';
        return <span style={{ color }}>{status}</span>;
      },
      width: 80,
    },
    {
      title: '거래 번호',
      dataIndex: 'transactionId',
      key: 'transactionId',
      ellipsis: true,
      width: 160,
    },
  ];

  return (
    <Card title={<Title level={4} style={{ color: '#007AFF' }}>결제 내역</Title>} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgb(0 122 255 / 0.12)' }}>
      <Table<PaymentRecord>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
        rowKey="key"
        bordered={false}
      />
    </Card>
  );
}
