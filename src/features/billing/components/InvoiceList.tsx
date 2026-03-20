import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography } from 'antd';
import { apiClient } from '@/lib/api';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string; // ISO string
  amount: number; // 원 단위
  status: 'paid' | 'pending' | 'failed';
}

const statusColorMap: Record<Invoice['status'], string> = {
  paid: 'green',
  pending: 'orange',
  failed: 'red',
};

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Mock API 호출
    setTimeout(() => {
      setInvoices([
        {
          id: 'inv_001',
          invoiceNumber: '202306-0001',
          date: '2023-06-01T10:23:00Z',
          amount: 500000,
          status: 'paid',
        },
        {
          id: 'inv_002',
          invoiceNumber: '202307-0002',
          date: '2023-07-01T10:23:00Z',
          amount: 520000,
          status: 'pending',
        },
        {
          id: 'inv_003',
          invoiceNumber: '202308-0003',
          date: '2023-08-01T10:23:00Z',
          amount: 580000,
          status: 'failed',
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const columns = [
    {
      title: '청구서 번호',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      fixed: 'left',
      width: 140,
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: '청구 날짜',
      dataIndex: 'date',
      key: 'date',
      width: 140,
      render: (date: string) => new Date(date).toLocaleDateString('ko-KR'),
      sorter: (a: Invoice, b: Invoice) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: '청구 금액',
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      render: (amount: number) => amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }),
      sorter: (a: Invoice, b: Invoice) => a.amount - b.amount,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: Invoice['status']) => (
        <Tag color={statusColorMap[status]} style={{ fontWeight: 'bold' }}>
          {status === 'paid' ? '결제 완료' : status === 'pending' ? '결제 대기' : '결제 실패'}
        </Tag>
      ),
      filters: [
        { text: '결제 완료', value: 'paid' },
        { text: '결제 대기', value: 'pending' },
        { text: '결제 실패', value: 'failed' },
      ],
      onFilter: (value: string | number | boolean, record: Invoice) => record.status === value,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={invoices}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'max-content' }}
      bordered
      style={{
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgb(0 0 0 / 0.05)',
      }}
    />
  );
}
