import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, message, Card, Table, Popconfirm, Typography } from 'antd';
import { CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

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
  debit: '직맄카드',
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
      message.error('결제 수단 등롞에 실패했습니다.');
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
      dataIndex: 'cardHolder' as const,
      key: 'cardHolder',
    },
    {
      title: '카드 번호',
      dataIndex: 'cardNumberMasked' as const,
      key: 'cardNumberMasked',
    },
    {
      title: '카드 유형',
      dataIndex: 'cardType' as const,
      key: 'cardType',
      render: (cardType: string) => cardTypeMap[cardType] || cardType,
    },
    {
      title: '유효기간',
      dataIndex: 'expiryMonth' as const,
      key: 'expiry',
      render: (_: string, record: PaymentMethod) => `${record.expiryMonth}/${record.expiryYear}`,
    },
    {
      title: '작위',
      key: 'action',
      render: (_: unknown, record: PaymentMethod) => (
        <Popconfirm
          title="삭제 확인"
          description="이 결제 수단을 삭제하시겠습니까?"
          onConfirm={() => handleRemove(record.id)}
          okText="삭제"
          cancelText="취소"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ color: '#007AFF' }}>결제 수단 관리</Title>
      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Table
          columns={columns}
          dataSource={methods}
          rowKey="id"
          pagination={false}
          bordered
        />
      </Card>
      <Card title="새 결제 수단 등록" style={{ borderRadius: 12 }}>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            label="겸제 유형"
            name="cardType"
            rules={[{ required: true, message: '결제 유형을 선택해주세요.' }]}
          >
            <Select options={cardTypeOptions} placeholder="겸제 유형 선택" />
          </Form.Item>
          <Form.Item
            label="카드 소유자"
            name="cardHolder"
            rules={[{ required: true, message: '카드 소유자를 입력해주세요.' }]}
          >
            <Input placeholder="강쁕 홍길동" />
          </Form.Item>
          <Form.Item
            label="계좌 / 카드 번호"
            name="cardNumber"
            rules={[{ required: true, message: '계좌 또는 카드 번호를 입력해주세요.' }]}
          >
            <Input placeholder="1234567890123456" />
          </Form.Item>
          <Space>
            <Form.Item
              label="만료 월"
              name="expiryMonth"
              rules={[{ required: true, message: '만렌 월!' }]}
            >
              <Input placeholder="12" />
            </Form.Item>
            <Form.Item
              label="만렌 년"
              name="expiryYear"
              rules={[{ required: true, message: '만료 년!' }]}
            >
              <Input placeholder="2025" />
            </Form.Item>
          </Space>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<CreditCardOutlined />}
              style={{ borderRadius: 8, backgroundColor: '#007AFF', borderColor: '#007AFF' }}
            >
              결제 수단 등록
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
