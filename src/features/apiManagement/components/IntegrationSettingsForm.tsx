import React, { useEffect, useState } from 'react';
import { Form, Switch, Button, Typography, message } from 'antd';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

interface IntegrationSettings {
  erpIntegration: boolean;
  groupwareIntegration: boolean;
  financialSystemIntegration: boolean;
}

export function IntegrationSettingsForm() {
  const [form] = Form.useForm<IntegrationSettings>();
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // Mock API fetch
      await new Promise((r) => setTimeout(r, 600));
      const mockData: IntegrationSettings = {
        erpIntegration: true,
        groupwareIntegration: false,
        financialSystemIntegration: true,
      };
      form.setFieldsValue(mockData);
    } catch {
      message.error('설정을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [form]);

  const onFinish = async (values: IntegrationSettings) => {
    setLoading(true);
    try {
      // Mock API save
      await new Promise((r) => setTimeout(r, 900));
      message.success('설정이 저장되었습니다.');
    } catch {
      message.error('설정 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Title level={4} style={{ color: '#007AFF' }}>통합 연동 설정</Title>
      <Text>외부 시스템과의 연동 사용 여부를 설정합니다.</Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 16, maxWidth: 480 }}
        initialValues={{
          erpIntegration: false,
          groupwareIntegration: false,
          financialSystemIntegration: false,
        }}
      >
        <Form.Item
          label="ERP 시스템 연동"
          name="erpIntegration"
          valuePropName="checked"
        >
          <Switch checkedChildren="사용" unCheckedChildren="미사용" disabled={loading} />
        </Form.Item>

        <Form.Item
          label="그룹웨어 연동"
          name="groupwareIntegration"
          valuePropName="checked"
        >
          <Switch checkedChildren="사용" unCheckedChildren="미사용" disabled={loading} />
        </Form.Item>

        <Form.Item
          label="재무 시스템 연동"
          name="financialSystemIntegration"
          valuePropName="checked"
        >
          <Switch checkedChildren="사용" unCheckedChildren="미사용" disabled={loading} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ borderRadius: 8, backgroundColor: '#007AFF', borderColor: '#007AFF' }}
          >저장</Button>
        </Form.Item>
      </Form>
    </section>
  );
}
