import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, message, Card, Table, Popconfirm } from 'antd';
import { CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiClient } from '@/lib/api';

interface PaymentMethod {
  id: string;
  cardNumberMasked: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: string;
}

const cardTypeOptions = [
  { label: '신용카드', value: 'credit' },
  { label: '직불카드', value: 'debit' },
  { label: '계좌이체', value: 'bank_transfer' },
];

const cardTypeMap: Record<string, string> = {
  credit: '신용카드',
  debit: '직불카드',
  bank_transfer: '계좌이체',
};

export default function PaymentMethodForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm_1',
      cardNumberMasked: '**** **** **** 1234',
      cardHolder: '홍길동',
      expiryMonth: '12',
      expiryYear: '2025',
      cardType: 'credit',
    },
  ]);

  const handleAdd = async (values: {
    cardNumber: string;
    cardHolder: string;
    expiryMonth: string;
    expiryYear: string;
    cardType: string;
  }) => {
    setLoading(true);
    try {
      // Mock API call (replace with apiClient.post('/payment-methods', values) in real)
      await new Promise((res) => setTimeout(res, 1000));
      const maskedNumber = '**** **** **** ' + values.cardNumber.slice(-4);
      setMethods((prev) => [
        ...prev,
        {
          id: `pm_${Date.now()}`,
          cardNumberMasked: maskedNumber,
          cardHolder: values.cardHolder,
          expiryMonth: values.expiryMonth,
          expiryYear: values.expiryYear,
          cardType: values.cardType,
        },
      ]);
      message.success('결제 수단이 등록되었습니다.');
      form.resetFields();
    } catch {
      message.error('결제 수단 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    message.success('결제 수단이 삭제되었습니다.');
  };

  const columns = [
    {
      title: '카드 소유자',
      dataIndex: 'cardHolder',
      key: 'cardHolder',
    },
    {
      title: '카드 번호',
      dataIndex: 'cardNumberMasked',
      key: 'cardNumberMasked',
    },
    {
      title: '카드 유형',
      dataIndex: 'cardType',
      key: 'cardType',
      render: (cardType: string) => cardTypeMap[cardType] || cardType,
    },
    {
      title: '유효기간',
      dataIndex: 'expiryMonth',
      key: 'expiry',
      render: (_: string, record: PaymentMethod) => `${record.expiryMonth}/${record.expiryYear}`,
    },
    {
      title: '작업',
      key: 'action',
      render: (_: string, record: PaymentMethod) => (
        <Popconfirm
          title="삭제 확인"
          description="이 결제 수단을 삭제하시겠습니까?"
          onConfirm={() => handleRemove(record.id)}
          okText="삭제"
          cancelText="취소"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Card title="새 결제 수단 추가" style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical" onFinish={handleAdd} autoComplete="off">
          <Form.Item
            label="카드 번호"
            name="cardNumber"
            rules={[
              { required: true, message: '카드 번호를 입력해주세요.' },
              { len: 16, message: '카드 번호 16자리를 입력해주세요.' },
              { pattern: /^\d{16}$/, message: '숫자 16자리로 입력해주세요.' },
            ]}
          >
            <Input
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              style={{ letterSpacing: '0.3em' }}
              inputMode="numeric"
            />
          </Form.Item>

          <Form.Item
            label="카드 유형"
            name="cardType"
            rules={[{ required: true, message: '카드 유형을 선택해주세요.' }]}
          >
            <Select options={cardTypeOptions} placeholder="카드 유형 선택" />
          </Form.Item>

          <Form.Item
            label="카드 소유자"
            name="cardHolder"
            rules={[{ required: true, message: '카드 소유자명을 입력해주세요.' }]}
          >
            <Input placeholder="홍길동" />
          </Form.Item>

          <Form.Item
            label="유효기간 (월)"
            name="expiryMonth"
            rules={[
              { required: true, message: '월을 입력해주세요.' },
              { pattern: /^(0[1-9]|1[0-2])$/, message: '01~12 형식으로 입력해주세요.' },
            ]}
          >
            <Input placeholder="12" maxLength={2} />
          </Form.Item>

          <Form.Item
            label="유효기간 (년)"
            name="expiryYear"
            rules={[
              { required: true, message: '년을 입력해주세요.' },
              { pattern: /^\d{4}$/, message: '4자리 연도를 입력해주세요.' },
            ]}
          >
            <Input placeholder="2025" maxLength={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<CreditCardOutlined />}
              style={{ borderRadius: 8, backgroundColor: '#007AFF', borderColor: '#007AFF' }}
            >
              등록
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="등록된 결제 수단">
        <Table
          columns={columns}
          dataSource={methods}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: '등록된 결제 수단이 없습니다.' }}
        />
      </Card>
    </>
  );
}
