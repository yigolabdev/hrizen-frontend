import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message, Space, Typography } from 'antd';

const { Title } = Typography;

interface PayrollFormValues {
  employeeName: string;
  baseSalary: number;
  overtimeHours: number;
  bonus: number;
  deductions: number;
}

export function PayrollInputForm() {
  const [form] = Form.useForm<PayrollFormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: PayrollFormValues) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      message.success(`${values.employeeName}님 급여 정보가 저장되었습니다.`);
      form.resetFields();
    } catch {
      message.error('급여 정합 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={4} style={{ color: '#007AFF' }}>급여 정산 입력</Title>
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 480 }}>
        <Form.Item
          label="직원 이름"
          name="employeeName"
          rules={[{ required: true, message: '직원 이름을 입력해주세요.' }]}
        >
          <Input placeholder="홍길동" />
        </Form.Item>
        <Form.Item
          label="기본급"
          name="baseSalary"
          rules={[{ required: true, message: '기본급을 입력해주세요.' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => `{value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="3000000"
            min={0}
          />
        </Form.Item>
        <Form.Item label="초과근무 시간" name="overtimeHours">
          <InputNumber style={{ width: '100%' }} placeholder="0" min={0} />
        </Form.Item>
        <Form.Item label="상여금" name="bonus">
          <InputNumber style={{ width: '100%' }} placeholder="0" min={0} />
        </Form.Item>
        <Form.Item label="공죜액" name="deductions">
          <InputNumber style={{ width: '100%' }} placeholder="0" min={0} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ borderRadius: 8, backgroundColor: '#007AFF', borderColor: '#007AFF' }}
          >
            저장
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PayrollInputForm;
