import React, { useState, useCallback } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Divider,
  Space,
  Typography,
  InputNumber,
  Tag,
  message,
  Collapse,
  Alert,
  List,
  Badge,
} from 'antd';
import {
  SettingOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  CloudServerOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface IntegrationSystem {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  endpoint: string;
}

const mockSystems: IntegrationSystem[] = [
  {
    id: '1',
    name: 'SAP ERP',
    type: 'ERP',
    status: 'connected',
    lastSync: '2024-12-20 14:30',
    endpoint: 'https://sap.example.com/api/v2',
  },
  {
    id: '2',
    name: 'MS Teams',
    type: '그룹웨어',
    status: 'connected',
    lastSync: '2024-12-20 15:00',
    endpoint: 'https://graph.microsoft.com/v1.0',
  },
  {
    id: '3',
    name: '더존 회계',
    type: '재무',
    status: 'disconnected',
    lastSync: '2024-12-15 09:00',
    endpoint: 'https://douzone.example.com/api',
  },
  {
    id: '4',
    name: 'Slack',
    type: '메신저',
    status: 'syncing',
    lastSync: '2024-12-20 15:10',
    endpoint: 'https://slack.com/api',
  },
];

interface SettingsFormValues {
  webhookUrl: string;
  rateLimitPerMinute: number;
  rateLimitPerDay: number;
  ipWhitelist: string;
  enableLogging: boolean;
  enableRateLimit: boolean;
  enableIPWhitelist: boolean;
  alertOnError: boolean;
  alertOnQuotaExceed: boolean;
  alertEmail: string;
  corsOrigins: string;
  timeoutSeconds: number;
  retryAttempts: number;
}

const statusConfig: Record<
  IntegrationSystem['status'],
  { color: string; text: string; icon: React.ReactNode }
> = {
  connected: {
    color: '#52C41A',
    text: '연결됨',
    icon: <CheckCircleOutlined style={{ color: '#52C41A' }} />,
  },
  disconnected: {
    color: '#FF3B30',
    text: '연결 끊김',
    icon: <CloseCircleOutlined style={{ color: '#FF3B30' }} />,
  },
  syncing: {
    color: '#007AFF',
    text: '동기화 중',
    icon: <SyncOutlined spin style={{ color: '#007AFF' }} />,
  },
};

export default function IntegrationSettingsForm() {
  const [form] = Form.useForm<SettingsFormValues>();
  const [systems] = useState<IntegrationSystem[]>(mockSystems);
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(() => {
    form.validateFields().then(() => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        message.success('설정이 저장되었습니다.');
      }, 1000);
    });
  }, [form]);

  const handleReset = useCallback(() => {
    form.resetFields();
    message.info('설정이 초기화되었습니다.');
  }, [form]);

  const collapseItems = [
    {
      key: 'connections',
      label: (
        <Space>
          <LinkOutlined style={{ color: '#007AFF' }} />
          <Text strong style={{ color: '#1A1A1A' }}>연동 시스템 현황</Text>
          <Badge
            count={systems.filter((s) => s.status === 'connected').length}
            style={{ backgroundColor: '#52C41A' }}
          />
        </Space>
      ),
      children: (
        <List
          dataSource={systems}
          renderItem={(sys) => {
            const config = statusConfig[sys.status];
            return (
              <List.Item
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid #F2F2F7',
                }}
              >
                <List.Item.Meta
                  avatar={
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: '#F2F2F7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CloudServerOutlined style={{ color: '#007AFF', fontSize: 18 }} />
                    </div>
                  }
                  title={
                    <Space size={8}>
                      <Text strong style={{ fontSize: 14 }}>{sys.name}</Text>
                      <Tag
                        style={{
                          borderRadius: 6,
                          border: 'none',
                          backgroundColor: '#F2F2F7',
                          color: '#636366',
                          fontSize: 11,
                        }}
                      >
                        {sys.type}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={2}>
                      <Space size={4}>
                        {config.icon}
                        <Text style={{ color: config.color, fontSize: 12, fontWeight: 500 }}>
                          {config.text}
                        </Text>
                      </Space>
                      <Text style={{ color: '#C7C7CC', fontSize: 11 }}>
                        마지막 동기화: {sys.lastSync}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      ),
    },
    {
      key: 'security',
      label: (
        <Space>
          <SafetyCertificateOutlined style={{ color: '#007AFF' }} />
          <Text strong style={{ color: '#1A1A1A' }}>보안 설정</Text>
        </Space>
      ),
      children: (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Form.Item
            name="enableRateLimit"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>요청 제한 (Rate Limiting)</Text>
              <Switch defaultChecked />
            </div>
          </Form.Item>
          <Form.Item
            name="rateLimitPerMinute"
            label="분당 최대 요청 수"
            style={{ marginBottom: 8 }}
          >
            <InputNumber
              min={1}
              max={10000}
              defaultValue={100}
              style={{ width: '100%', borderRadius: 8 }}
              addonAfter="회/분"
            />
          </Form.Item>
          <Form.Item
            name="rateLimitPerDay"
            label="일일 최대 요청 수"
            style={{ marginBottom: 8 }}
          >
            <InputNumber
              min={1}
              max={1000000}
              defaultValue={50000}
              style={{ width: '100%', borderRadius: 8 }}
              addonAfter="회/일"
            />
          </Form.Item>
          <Divider style={{ margin: '8px 0' }} />
          <Form.Item
            name="enableIPWhitelist"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>IP 화이트리스트</Text>
              <Switch />
            </div>
          </Form.Item>
          <Form.Item
            name="ipWhitelist"
            label="허용 IP 주소"
            extra="쉼표로 구분하여 입력 (예: 192.168.1.1, 10.0.0.0/24)"
            style={{ marginBottom: 8 }}
          >
            <Input.TextArea
              rows={3}
              placeholder="허용할 IP 주소를 입력하세요"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="corsOrigins"
            label="CORS 허용 도메인"
            extra="쉼표로 구분하여 입력"
            style={{ marginBottom: 0 }}
          >
            <Input.TextArea
              rows={2}
              placeholder="https://example.com, https://app.example.com"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
        </Space>
      ),
    },
    {
      key: 'advanced',
      label: (
        <Space>
          <SettingOutlined style={{ color: '#007AFF' }} />
          <Text strong style={{ color: '#1A1A1A' }}>고급 설정</Text>
        </Space>
      ),
      children: (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Form.Item
            name="webhookUrl"
            label="Webhook URL"
            style={{ marginBottom: 8 }}
          >
            <Input
              placeholder="https://your-domain.com/webhook"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="timeoutSeconds"
            label="요청 타임아웃"
            style={{ marginBottom: 8 }}
          >
            <InputNumber
              min={1}
              max={300}
              defaultValue={30}
              style={{ width: '100%', borderRadius: 8 }}
              addonAfter="초"
            />
          </Form.Item>
          <Form.Item
            name="retryAttempts"
            label="재시도 횟수"
            style={{ marginBottom: 8 }}
          >
            <InputNumber
              min={0}
              max={10}
              defaultValue={3}
              style={{ width: '100%', borderRadius: 8 }}
              addonAfter="회"
            />
          </Form.Item>
          <Form.Item
            name="enableLogging"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>API 호출 로깅</Text>
              <Switch defaultChecked />
            </div>
          </Form.Item>
        </Space>
      ),
    },
    {
      key: 'notifications',
      label: (
        <Space>
          <BellOutlined style={{ color: '#007AFF' }} />
          <Text strong style={{ color: '#1A1A1A' }}>알림 설정</Text>
        </Space>
      ),
      children: (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Form.Item
            name="alertOnError"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>에러 발생 시 알림</Text>
              <Switch defaultChecked />
            </div>
          </Form.Item>
          <Form.Item
            name="alertOnQuotaExceed"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>할당량 초과 시 알림</Text>
              <Switch defaultChecked />
            </div>
          </Form.Item>
          <Form.Item
            name="alertEmail"
            label="알림 수신 이메일"
            rules={[{ type: 'email', message: '올바른 이메일 형식을 입력해주세요.' }]}
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="admin@company.com"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <SettingOutlined style={{ color: '#007AFF' }} />
          <span>통합 설정</span>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF', borderBottom: '1px solid #F2F2F7' }}
    >
      <Alert
        message="API 설정 변경 안내"
        description="설정 변경 사항은 저장 후 즉시 적용됩니다. 보안 관련 설정 변경 시 기존 연동에 영향을 줄 수 있으니 주의하세요."
        type="info"
        showIcon
        style={{
          borderRadius: 10,
          marginBottom: 20,
          border: '1px solid #007AFF30',
          backgroundColor: '#007AFF08',
        }}
      />

      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        initialValues={{
          enableRateLimit: true,
          rateLimitPerMinute: 100,
          rateLimitPerDay: 50000,
          enableIPWhitelist: false,
          enableLogging: true,
          alertOnError: true,
          alertOnQuotaExceed: true,
          timeoutSeconds: 30,
          retryAttempts: 3,
        }}
      >
        <Collapse
          defaultActiveKey={['connections']}
          ghost
          items={collapseItems}
          style={{ marginBottom: 24 }}
        />

        <Divider style={{ margin: '8px 0 20px 0' }} />

        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button
            icon={<UndoOutlined />}
            onClick={handleReset}
            style={{ borderRadius: 8 }}
          >
            초기화
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={saving}
            style={{
              backgroundColor: '#007AFF',
              borderColor: '#007AFF',
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            설정 저장
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
