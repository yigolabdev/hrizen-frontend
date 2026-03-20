import React from 'react';
import { Form, Checkbox, Button, message } from 'antd';

interface NotificationConfig {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
}

interface NotificationSettingsProps {
  config: NotificationConfig;
  onChange: (config: NotificationConfig) => void;
}

export default function NotificationSettings({ config, onChange }: NotificationSettingsProps) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const handleFinish = (values: NotificationConfig) => {
    onChange(values);
    message.success('알림 설정이 저장되었습니다.');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 480 }}
    >
      <Form.Item name="emailAlerts" valuePropName="checked">
        <Checkbox>이메일 알림 받기</Checkbox>
      </Form.Item>

      <Form.Item name="smsAlerts" valuePropName="checked">
        <Checkbox>SMS 알림 받기</Checkbox>
      </Form.Item>

      <Form.Item name="pushAlerts" valuePropName="checked">
        <Checkbox>푸시 알림 받기</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}>
          저장
        </Button>
      </Form.Item>
    </Form>
  );
}
