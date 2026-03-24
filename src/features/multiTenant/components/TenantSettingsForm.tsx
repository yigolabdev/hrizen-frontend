import React, { useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  Divider,
  Typography,
} from 'antd';
import {
  SaveOutlined,
  CloseOutlined,
  GlobalOutlined,
  LockOutlined,
} from '@ant-design/icons';
import type { Tenant, TenantSettings } from '../types';

const { Text } = Typography;

interface TenantSettingsFormProps {
  tenant?: Tenant;
  onSubmit?: (values: Omit<TenantSettings, 'tenantId'>) => void;
  onCancel?: () => void;
}

const countryOptions = [
  { value: '대한민국', label: '🇰🇷 대한민국' },
  { value: '일본', label: '🇯🇵 일본' },
  { value: '미국', label: '🇺🇸 미국' },
  { value: '중국', label: '🇨🇳 중국' },
  { value: '베트남', label: '🇻🇳 베트남' },
  { value: '독일', label: '🇩🇪 독일' },
  { value: '영국', label: '🇬🇧 영국' },
  { value: '싱가포르', label: '🇸🇬 싱가포르' },
  { value: '인도', label: '🇮🇳 인도' },
];

const languageOptions = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'de', label: 'Deutsch' },
];

const currencyOptions = [
  { value: 'KRW', label: 'KRW (₩)' },
  { value: 'USD', label: 'USD ($)' },
  { value: 'JPY', label: 'JPY (¥)' },
  { value: 'CNY', label: 'CNY (¥)' },
  { value: 'VND', label: 'VND (₫)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'SGD', label: 'SGD (S$)' },
  { value: 'INR', label: 'INR (₹)' },
];

const timezoneOptions = [
  { value: 'Asia/Seoul', label: 'Asia/Seoul (KST, UTC+9)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST, UTC+9)' },
  { value: 'America/New_York', label: 'America/New_York (EST, UTC-5)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST, UTC-8)' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST, UTC+8)' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Asia/Ho_Chi_Minh (ICT, UTC+7)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (CET, UTC+1)' },
  { value: 'Europe/London', label: 'Europe/London (GMT, UTC+0)' },
  { value: 'Asia/Singapore', label: 'Asia/Singapore (SGT, UTC+8)' },
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST, UTC+5:30)' },
];

const businessTypeOptions = [
  { value: '본사', label: '본사' },
  { value: '지사', label: '지사' },
  { value: '해외법인', label: '해외법인' },
  { value: '해외공장', label: '해외공장' },
  { value: '사업부', label: '사업부' },
  { value: '자회사', label: '자회사' },
];

const featureOptions = [
  { value: 'attendance', label: '근태 관리' },
  { value: 'payroll', label: '급여 정산' },
  { value: 'performance', label: '성과 평가' },
  { value: 'ess', label: '직원 셀프서비스(ESS)' },
  { value: 'ai_analytics', label: 'AI 분석' },
  { value: 'open_api', label: '오픈 API' },
  { value: 'compliance', label: '노무/세무 컴플라이언스' },
];

export default function TenantSettingsForm({ tenant, onSubmit, onCancel }: TenantSettingsFormProps) {
  const [form] = Form.useForm();
  const isEditMode = !!tenant;

  useEffect(() => {
    if (tenant) {
      form.setFieldsValue({
        name: tenant.name,
        country: tenant.country,
        language: tenant.language,
        currency: tenant.currency,
        timezone: tenant.timezone,
        businessType: tenant.businessType,
        adminEmail: tenant.adminEmail,
        maxUsers: tenant.maxUsers,
        features: ['attendance', 'payroll', 'performance', 'ess'],
        ssoEnabled: false,
        mfaRequired: false,
      });
    } else {
      form.resetFields();
    }
  }, [tenant, form]);

  const handleFinish = (values: Record<string, unknown>) => {
    const settings: Omit<TenantSettings, 'tenantId'> = {
      name: values.name as string,
      country: values.country as string,
      language: values.language as string,
      currency: values.currency as string,
      timezone: values.timezone as string,
      businessType: values.businessType as string,
      adminEmail: values.adminEmail as string,
      maxUsers: values.maxUsers as number,
      features: values.features as string[],
      ssoEnabled: values.ssoEnabled as boolean,
      mfaRequired: values.mfaRequired as boolean,
    };
    onSubmit?.(settings);
  };

  const formContent = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        language: 'ko',
        currency: 'KRW',
        country: '대한민국',
        timezone: 'Asia/Seoul',
        businessType: '본사',
        maxUsers: 100,
        features: ['attendance', 'payroll', 'performance', 'ess'],
        ssoEnabled: false,
        mfaRequired: false,
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="name"
            label="테넌트명"
            rules={[{ required: true, message: '테넌트명을 입력하세요' }]}
          >
            <Input placeholder="예: (주)한국본사" style={{ borderRadius: 8 }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="adminEmail"
            label="관리자 이메일"
            rules={[
              { required: true, message: '이메일을 입력하세요' },
              { type: 'email', message: '올바른 이메일을 입력하세요' },
            ]}
          >
            <Input placeholder="admin@example.com" style={{ borderRadius: 8 }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="country"
            label="국가"
            rules={[{ required: true, message: '국가를 선택하세요' }]}
          >
            <Select options={countryOptions} placeholder="국가 선택" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="businessType"
            label="사업장 유형"
            rules={[{ required: true, message: '유형을 선택하세요' }]}
          >
            <Select options={businessTypeOptions} placeholder="유형 선택" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">
        <Space>
          <GlobalOutlined style={{ color: '#007AFF' }} />
          <Text strong>다국어 · 다통화 설정</Text>
        </Space>
      </Divider>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="language"
            label="기본 언어"
            rules={[{ required: true, message: '언어를 선택하세요' }]}
          >
            <Select options={languageOptions} placeholder="언어 선택" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="currency"
            label="기본 통화"
            rules={[{ required: true, message: '통화를 선택하세요' }]}
          >
            <Select options={currencyOptions} placeholder="통화 선택" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="timezone"
            label="타임존"
            rules={[{ required: true, message: '타임존을 선택하세요' }]}
          >
            <Select options={timezoneOptions} placeholder="타임존 선택" showSearch />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">
        <Space>
          <LockOutlined style={{ color: '#007AFF' }} />
          <Text strong>보안 및 기능 설정</Text>
        </Space>
      </Divider>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="maxUsers"
            label="최대 사용자 수"
            rules={[{ required: true, message: '최대 사용자 수를 입력하세요' }]}
          >
            <InputNumber min={1} max={10000} style={{ width: '100%', borderRadius: 8 }} />
          </Form.Item>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Item name="ssoEnabled" label="SSO 활성화" valuePropName="checked">
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Form.Item>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Item name="mfaRequired" label="MFA 필수" valuePropName="checked">
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="features" label="활성화 모듈">
        <Select
          mode="multiple"
          options={featureOptions}
          placeholder="사용할 모듈을 선택하세요"
          style={{ borderRadius: 8 }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Space>
          {onCancel && (
            <Button icon={<CloseOutlined />} onClick={onCancel} style={{ borderRadius: 8 }}>
              취소
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{ borderRadius: 8, backgroundColor: '#007AFF' }}
          >
            {isEditMode ? '변경사항 저장' : '테넌트 생성'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  if (onSubmit) {
    return formContent;
  }

  return (
    <Card
      title="테넌트 설정"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
    >
      {formContent}
    </Card>
  );
}
