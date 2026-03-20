import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, message, Card } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
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

  return (
    <>
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

        <Space size="middle">
          <Form.Item
            label="만료월"
            name="expiryMonth"
            rules={[{ required: true, message: '만료월을 입력해주세요.' }, { pattern: /^(0[1-9]|1[0-2])$/, message: '01에서 12 사이 숫자 입력' }]}
          >
            <Input placeholder="MM" maxLength={2} style={{ width: 80 }} />
          </Form.Item>

          <Form.Item
            label="만료년"
            name="expiryYear"
            rules={[{ required: true, message: '만료년을 입력해주세요.' }, { pattern: /^20\d{2}$/, message: '2023 형식으로 입력' }]}
          >
            <Input placeholder="YYYY" maxLength={4} style={{ width: 100 }} />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}>
            결제 수단 등록
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Card size="small" title="저장된 결제 수단" bordered={false} style={{ backgroundColor: '#FAFAFA' }}>
        {methods.length === 0 ? (
          <p>등록된 결제 수단이 없습니다.</p>
        ) : (
          methods.map((method) => (
            <Card.Grid
              key={method.id}
              hoverable={false}
              style={{ width: '100%', textAlign: 'left', borderRadius: 6, marginBottom: 12 }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  <CreditCardOutlined style={{ color: '#007AFF', marginRight: 8 }} />
                  {method.cardNumberMasked}
                </div>
                <div>소유자: {method.cardHolder}</div>
                <div>
                  만료: {method.expiryYear}년 {method.expiryMonth}월
                </div>
                <Button
                  size="small"
                  danger
                  type="ghost"
                  onClick={() => handleRemove(method.id)}
                  style={{ width: 80, marginTop: 4 }}
                >
                  삭제
                </Button>
              </Space>
            </Card.Grid>
          ))
        )}
      </Card>
    </>
  );
}
