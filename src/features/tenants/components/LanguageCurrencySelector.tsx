import React, { useState } from 'react';
import { Form, Select, Button, Space } from 'antd';
import type { Tenant } from './TenantListTable';

const { Option } = Select;

const languageOptions = [
  { label: '한국어 (ko)', value: 'ko' },
  { label: '영어 (en)', value: 'en' },
  { label: '일본어 (ja)', value: 'ja' },
  { label: '중국어 (zh)', value: 'zh' },
  { label: '스페인어 (es)', value: 'es' },
];

const currencyOptions = [
  { label: '대한민국 원 (KRW)', value: 'KRW' },
  { label: '미국 달러 (USD)', value: 'USD' },
  { label: '일본 엔 (JPY)', value: 'JPY' },
  { label: '유로 (EUR)', value: 'EUR' },
  { label: '중국 위안 (CNY)', value: 'CNY' },
];

interface Props {
  tenant: Tenant;
  onClose: () => void;
  onSave: (updated: { id: string; language: string; currency: string }) => void;
}

export default function LanguageCurrencySelector({ tenant, onClose, onSave }: Props) {
  const [form] = Form.useForm();

  const [saving, setSaving] = useState(false);

  const onFinish = (values: { language: string; currency: string }) => {
    setSaving(true);
    // Mock delay
    setTimeout(() => {
      onSave({ id: tenant.id, language: values.language, currency: values.currency });
      setSaving(false);
    }, 500);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ language: tenant.language, currency: tenant.currency }}
      onFinish={onFinish}
      style={{ maxWidth: 360 }}
    >
      <Form.Item
        name="language"
        label="기본 언어"
        rules={[{ required: true, message: '언어를 선택하세요.' }]}
      >
        <Select placeholder="언어 선택">
          {languageOptions.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="currency"
        label="통화"
        rules={[{ required: true, message: '통화를 선택하세요.' }]}
      >
        <Select placeholder="통화 선택">
          {currencyOptions.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button onClick={onClose} disabled={saving}>
            취소
          </Button>
          <Button type="primary" htmlType="submit" loading={saving}>
            저장
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
