import React, { useEffect } from 'react';
import { Form, InputNumber, Button, Divider, message, Select } from 'antd';
import { useState } from 'react';
import { apiClient } from '@/lib/api';

const { Option } = Select;

export type PayrollInputData = {
  baseSalary: number;
  overtimeHours: number;
  overtimeRate: number;
  deductions: number;
  bonuses: number;
  taxCode: string;
};

interface PayrollInputFormProps {
  onDataChange?: (data: PayrollInputData) => void;
}

const TAX_CODE_OPTIONS = [
  { label: '일반 과세', value: 'general' },
  { label: '간이 과세', value: 'simple' },
  { label: '면세', value: 'exempt' },
];

export function PayrollInputForm({ onDataChange }: PayrollInputFormProps) {
  const [form] = Form.useForm<PayrollInputData>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      baseSalary: 3000000,
      overtimeHours: 0,
      overtimeRate: 1.5,
      deductions: 0,
      bonuses: 0,
      taxCode: 'general',
    });
  }, [form]);

  const submitHandler = async (values: PayrollInputData) => {
    setSubmitting(true);
    try {
      // Mock API call delay
      await new Promise((r) => setTimeout(r, 500));

      message.success('급여 입력이 저장되었습니다.');
      onDataChange && onDataChange(values);
    } catch (error) {
      message.error('저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form<PayrollInputData>
      form={form}
      layout="vertical"
      onFinish={submitHandler}
      style={{ maxWidth: 500 }}
      initialValues={{
        baseSalary: 3000000,
        overtimeHours: 0,
        overtimeRate: 1.5,
        deductions: 0,
        bonuses: 0,
        taxCode: 'general',
      }}
    >
      <Form.Item
        name="baseSalary"
        label="기본 급여 (원)"
        rules={[{ required: true, type: 'number', min: 1000, message: '기본 급여를 입력해주세요.' }]}
      >
        <InputNumber
          min={1000}
          step={10000}
          style={{ width: '100%' }}
          placeholder="기본 급여를 입력하세요"
          stringMode
        />
      </Form.Item>

      <Form.Item
        name="overtimeHours"
        label="초과 근무 시간 (시간)"
        rules={[{ required: true, type: 'number', min: 0, message: '0 이상의 숫자를 입력하세요.' }]}
      >
        <InputNumber min={0} step={0.1} style={{ width: '100%' }} placeholder="초과 근무 시간을 입력하세요" />
      </Form.Item>

      <Form.Item
        name="overtimeRate"
        label="초과 근무 수당 배율"
        rules={[{ required: true, type: 'number', min: 1, message: '1 이상의 숫자를 입력하세요.' }]}
      >
        <InputNumber min={1} max={3} step={0.1} style={{ width: '100%' }} placeholder="예: 1.5" stringMode />
      </Form.Item>

      <Form.Item
        name="bonuses"
        label="성과급 및 보너스 (원)"
        rules={[{ required: true, type: 'number', min: 0, message: '0 이상의 숫자를 입력하세요.' }]}
      >
        <InputNumber min={0} step={10000} style={{ width: '100%' }} placeholder="성과급 및 보너스를 입력하세요" stringMode />
      </Form.Item>

      <Form.Item
        name="deductions"
        label="공제액 (원)"
        rules={[{ required: true, type: 'number', min: 0, message: '0 이상의 숫자를 입력하세요.' }]}
      >
        <InputNumber min={0} step={10000} style={{ width: '100%' }} placeholder="공제액을 입력하세요" stringMode />
      </Form.Item>

      <Form.Item name="taxCode" label="세법 코드" rules={[{ required: true, message: '세법 코드를 선택하세요.' }]}>  
        <Select placeholder="세법 코드를 선택하세요">
          {TAX_CODE_OPTIONS.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Divider />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}
          loading={submitting}
          block
        >
          급여 계산 적용
        </Button>
      </Form.Item>
    </Form>
  );
}
