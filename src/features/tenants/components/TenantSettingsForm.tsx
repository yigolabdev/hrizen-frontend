import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Button, Space, Divider, Typography } from 'antd';
import { apiClient } from '@/lib/api';
import type { Tenant } from './TenantListTable';
import LanguageCurrencySelector from './LanguageCurrencySelector';

const { Title } = Typography;

interface InitialFormValues {
  usersLimit: number;
  enableESS: boolean;
  enableAttendance: boolean;
  enablePerformance: boolean;
}

export default function TenantSettingsForm() {
  // 선택된 테넌트 단일 상태 관리 (demo 목적으로 첫 번째 테넌트 초기 세팅)
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const [form] = Form.useForm<InitialFormValues>();

  const [saving, setSaving] = useState(false);

  // 임시로 api 에서 첫 테넌트 정보 로딩
  useEffect(() => {
    async function load() {
      // Mock
      const response: Tenant = {
        id: 'tn001',
        name: '서울HQ',
        country: 'KR',
        usersCount: 120,
        permissionsCount: 5,
        subscriptionStatus: 'active',
        language: 'ko',
        currency: 'KRW',
      };
      setTenant(response);
      form.setFieldsValue({
        usersLimit: 300,
        enableESS: true,
        enableAttendance: true,
        enablePerformance: false,
      });
    }
    load();
  }, [form]);

  const onFinish = (values: InitialFormValues) => {
    setSaving(true);
    // Mock API call
    setTimeout(() => {
      // 실제 api 호출 시: await apiClient.put(`/admin/tenants/${tenant?.id}/settings`, values);
      setSaving(false);
    }, 1000);
  };

  if (!tenant) {
    return <div>테넌트 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <Title level={5} style={{ marginBottom: 24, color: '#007AFF' }}>
        {tenant.name} 설정
      </Title>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ usersLimit: 300, enableESS: true, enableAttendance: true, enablePerformance: false }}>
        <Form.Item
          name="usersLimit"
          label="사용자 수 제한"
          rules={[
            { required: true, message: '사용자 수 제한을 입력하세요.' },
            {
              type: 'number',
              min: 1,
              max: 300,
              message: '1명 이상 300명 이하로 입력하세요.',
            },
          ]}
        >
          <Input type="number" placeholder="1-300" />
        </Form.Item>

        <Divider style={{ borderColor: '#F2F2F7' }} />

        <Form.Item name="enableESS" label="직원 셀프 서비스 포털(ESS) 사용" valuePropName="checked">
          <Switch checkedChildren="사용" unCheckedChildren="미사용" />
        </Form.Item>

        <Form.Item name="enableAttendance" label="근태 관리 모듈 사용" valuePropName="checked">
          <Switch checkedChildren="사용" unCheckedChildren="미사용" />
        </Form.Item>

        <Form.Item name="enablePerformance" label="성과 및 평가 모듈 사용" valuePropName="checked">
          <Switch checkedChildren="사용" unCheckedChildren="미사용" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary" loading={saving}>
              저장
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()} disabled={saving}>
              초기화
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
