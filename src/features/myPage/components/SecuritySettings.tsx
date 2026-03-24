import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Typography,
  Space,
  Row,
  Col,
  Tag,
  List,
  Modal,
  message,
  Alert,
  Divider,
  Progress,
  Popconfirm,
} from 'antd';
import {
  LockOutlined,
  SafetyOutlined,
  MobileOutlined,
  DesktopOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  WarningFilled,
  KeyOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  ShieldOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'desktop' | 'mobile';
  lastAccess: string;
  ip: string;
  location: string;
  isCurrent: boolean;
}

interface LoginSession {
  id: string;
  browser: string;
  os: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

const connectedDevices: ConnectedDevice[] = [
  {
    id: '1',
    name: 'Chrome - Windows PC',
    type: 'desktop',
    lastAccess: '2024-01-15 09:02:33',
    ip: '192.168.1.100',
    location: '서울, 대한민국',
    isCurrent: true,
  },
  {
    id: '2',
    name: 'Safari - iPhone 15',
    type: 'mobile',
    lastAccess: '2024-01-14 18:30:00',
    ip: '10.0.0.55',
    location: '서울, 대한민국',
    isCurrent: false,
  },
  {
    id: '3',
    name: 'Firefox - MacBook Pro',
    type: 'desktop',
    lastAccess: '2024-01-10 14:20:00',
    ip: '192.168.1.101',
    location: '부산, 대한민국',
    isCurrent: false,
  },
];

const loginSessions: LoginSession[] = [
  {
    id: '1',
    browser: 'Chrome 120',
    os: 'Windows 11',
    ip: '192.168.1.100',
    lastActive: '현재 활성',
    isCurrent: true,
  },
  {
    id: '2',
    browser: 'Safari 17',
    os: 'iOS 17.2',
    ip: '10.0.0.55',
    lastActive: '2시간 전',
    isCurrent: false,
  },
];

function getPasswordStrength(password: string): { percent: number; status: 'exception' | 'active' | 'success'; text: string; color: string } {
  if (password.length === 0) return { percent: 0, status: 'exception', text: '', color: '#D1D1D6' };
  let score = 0;
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 10;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
  if (/\d/.test(password)) score += 20;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20;

  if (score < 40) return { percent: score, status: 'exception', text: '약함', color: '#FF3B30' };
  if (score < 70) return { percent: score, status: 'active', text: '보통', color: '#FF9500' };
  return { percent: score, status: 'success', text: '강함', color: '#34C759' };
}

export default function SecuritySettings() {
  const [passwordForm] = Form.useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [devices, setDevices] = useState(connectedDevices);
  const [sessions, setSessions] = useState(loginSessions);
  const [newPassword, setNewPassword] = useState('');

  const strength = getPasswordStrength(newPassword);

  const handlePasswordChange = async () => {
    try {
      await passwordForm.validateFields();
      setPasswordLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      message.success('비밀번호가 성공적으로 변경되었습니다.');
      passwordForm.resetFields();
      setNewPassword('');
      setPasswordModalOpen(false);
    } catch {
      // validation error
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRemoveDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    message.success('디바이스 연결이 해제되었습니다.');
  };

  const handleTerminateSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    message.success('세션이 종료되었습니다.');
  };

  const handleTerminateAll = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    message.success('현재 세션을 제외한 모든 세션이 종료되었습니다.');
  };

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      {/* 보안 상태 요약 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 10,
                backgroundColor: twoFactorEnabled ? '#E8F8EE' : '#FFF3E0',
                textAlign: 'center',
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              {twoFactorEnabled ? (
                <CheckCircleFilled style={{ fontSize: 32, color: '#34C759' }} />
              ) : (
                <WarningFilled style={{ fontSize: 32, color: '#FF9500' }} />
              )}
              <br />
              <Text strong style={{ display: 'block', marginTop: 8 }}>
                2단계 인증
              </Text>
              <Tag
                color={twoFactorEnabled ? 'green' : 'orange'}
                style={{ marginTop: 4 }}
              >
                {twoFactorEnabled ? '활성화됨' : '비활성화됨'}
              </Tag>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 10,
                backgroundColor: '#E3F2FD',
                textAlign: 'center',
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              <KeyOutlined style={{ fontSize: 32, color: '#007AFF' }} />
              <br />
              <Text strong style={{ display: 'block', marginTop: 8 }}>
                비밀번호
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                마지막 변경: 30일 전
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 10,
                backgroundColor: '#F2F2F7',
                textAlign: 'center',
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              <ShieldOutlined style={{ fontSize: 32, color: '#8E8E93' }} />
              <br />
              <Text strong style={{ display: 'block', marginTop: 8 }}>
                연결된 기기
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {devices.length}개 기기
              </Text>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 비밀번호 & 인증 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        title={
          <Space>
            <LockOutlined style={{ color: '#007AFF' }} />
            <span>비밀번호 및 인증</span>
          </Space>
        }
      >
        <List>
          <List.Item
            actions={[
              <Button
                type="primary"
                key="change"
                onClick={() => setPasswordModalOpen(true)}
                style={{
                  backgroundColor: '#007AFF',
                  borderColor: '#007AFF',
                  borderRadius: 8,
                }}
              >
                변경
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <KeyOutlined
                  style={{ fontSize: 24, color: '#007AFF', marginTop: 4 }}
                />
              }
              title="비밀번호 변경"
              description="주기적인 비밀번호 변경을 권장합니다. (마지막 변경: 30일 전)"
            />
          </List.Item>

          <List.Item
            actions={[
              <Switch
                key="2fa"
                checked={twoFactorEnabled}
                onChange={(checked) => {
                  setTwoFactorEnabled(checked);
                  message.success(
                    checked
                      ? '2단계 인증이 활성화되었습니다.'
                      : '2단계 인증이 비활성화되었습니다.'
                  );
                }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <SafetyOutlined
                  style={{ fontSize: 24, color: '#34C759', marginTop: 4 }}
                />
              }
              title="2단계 인증 (2FA)"
              description="로그인 시 추가 인증 코드를 요구하여 계정 보안을 강화합니다."
            />
          </List.Item>

          <List.Item
            actions={[
              <Switch
                key="bio"
                checked={biometricEnabled}
                onChange={(checked) => {
                  setBiometricEnabled(checked);
                  message.success(
                    checked
                      ? '생체 인증이 활성화되었습니다.'
                      : '생체 인증이 비활성화되었습니다.'
                  );
                }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <EyeInvisibleOutlined
                  style={{ fontSize: 24, color: '#AF52DE', marginTop: 4 }}
                />
              }
              title="생체 인증"
              description="지문 또는 Face ID를 사용하여 빠르고 안전하게 로그인합니다."
            />
          </List.Item>
        </List>
      </Card>

      {/* 연결된 기기 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        title={
          <Space>
            <GlobalOutlined style={{ color: '#007AFF' }} />
            <span>연결된 기기</span>
          </Space>
        }
      >
        <List
          dataSource={devices}
          renderItem={(device) => (
            <List.Item
              actions={
                device.isCurrent
                  ? [
                      <Tag key="current" color="blue">
                        현재 기기
                      </Tag>,
                    ]
                  : [
                      <Popconfirm
                        key="remove"
                        title="기기 연결을 해제하시겠습니까?"
                        onConfirm={() => handleRemoveDevice(device.id)}
                        okText="해제"
                        cancelText="취소"
                        okButtonProps={{
                          danger: true,
                        }}
                      >
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          style={{ borderRadius: 6 }}
                        >
                          해제
                        </Button>
                      </Popconfirm>,
                    ]
              }
            >
              <List.Item.Meta
                avatar={
                  device.type === 'desktop' ? (
                    <DesktopOutlined
                      style={{ fontSize: 24, color: '#007AFF', marginTop: 4 }}
                    />
                  ) : (
                    <MobileOutlined
                      style={{ fontSize: 24, color: '#FF9500', marginTop: 4 }}
                    />
                  )
                }
                title={
                  <Space>
                    <Text strong>{device.name}</Text>
                    {device.isCurrent && (
                      <CheckCircleFilled style={{ color: '#34C759' }} />
                    )}
                  </Space>
                }
                description={
                  <Space split={<Text type="secondary">·</Text>} wrap>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined /> {device.lastAccess}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      IP: {device.ip}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {device.location}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* 활성 세션 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        title={
          <Space>
            <ClockCircleOutlined style={{ color: '#007AFF' }} />
            <span>활성 세션</span>
          </Space>
        }
        extra={
          sessions.filter((s) => !s.isCurrent).length > 0 ? (
            <Popconfirm
              title="현재 세션을 제외한 모든 세션을 종료하시겠습니까?"
              onConfirm={handleTerminateAll}
              okText="종료"
              cancelText="취소"
              okButtonProps={{ danger: true }}
            >
              <Button danger size="small" style={{ borderRadius: 6 }}>
                모두 종료
              </Button>
            </Popconfirm>
          ) : null
        }
      >
        <List
          dataSource={sessions}
          renderItem={(session) => (
            <List.Item
              actions={
                session.isCurrent
                  ? [
                      <Tag key="current" color="green">
                        현재 세션
                      </Tag>,
                    ]
                  : [
                      <Popconfirm
                        key="terminate"
                        title="이 세션을 종료하시겠습니까?"
                        onConfirm={() => handleTerminateSession(session.id)}
                        okText="종료"
                        cancelText="취소"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          danger
                          size="small"
                          style={{ borderRadius: 6 }}
                        >
                          종료
                        </Button>
                      </Popconfirm>,
                    ]
              }
            >
              <List.Item.Meta
                title={
                  <Text strong>
                    {session.browser} / {session.os}
                  </Text>
                }
                description={
                  <Space split={<Text type="secondary">·</Text>}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      IP: {session.ip}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {session.lastActive}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* 비밀번호 변경 모달 */}
      <Modal
        title={
          <Space>
            <LockOutlined style={{ color: '#007AFF' }} />
            <span>비밀번호 변경</span>
          </Space>
        }
        open={passwordModalOpen}
        onCancel={() => {
          setPasswordModalOpen(false);
          passwordForm.resetFields();
          setNewPassword('');
        }}
        footer={null}
        destroyOnClose
        width={480}
      >
        <Alert
          message="안전한 비밀번호를 설정해주세요."
          description="대소문자, 숫자, 특수문자를 포함하여 8자리 이상으로 설정하는 것을 권장합니다."
          type="info"
          showIcon
          style={{ marginBottom: 24, borderRadius: 8 }}
        />
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            label="현재 비밀번호"
            name="currentPassword"
            rules={[
              { required: true, message: '현재 비밀번호를 입력해주세요.' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#007AFF' }} />}
              placeholder="현재 비밀번호"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label="새 비밀번호"
            name="newPassword"
            rules={[
              { required: true, message: '새 비밀번호를 입력해주세요.' },
              { min: 8, message: '8자리 이상 입력해주세요.' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#007AFF' }} />}
              placeholder="새 비밀번호"
              style={{ borderRadius: 8 }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          {newPassword.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  비밀번호 강도:
                </Text>
                <Text style={{ fontSize: 12, color: strength.color }}>
                  {strength.text}
                </Text>
              </Space>
              <Progress
                percent={strength.percent}
                status={strength.status}
                showInfo={false}
                strokeColor={strength.color}
                size="small"
              />
            </div>
          )}

          <Form.Item
            label="새 비밀번호 확인"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '비밀번호를 다시 입력해주세요.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('비밀번호가 일치하지 않습니다.')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#007AFF' }} />}
              placeholder="새 비밀번호 확인"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Divider />

          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button
                onClick={() => {
                  setPasswordModalOpen(false);
                  passwordForm.resetFields();
                  setNewPassword('');
                }}
                style={{ borderRadius: 8 }}
              >
                취소
              </Button>
              <Button
                type="primary"
                loading={passwordLoading}
                onClick={handlePasswordChange}
                style={{
                  backgroundColor: '#007AFF',
                  borderColor: '#007AFF',
                  borderRadius: 8,
                }}
              >
                비밀번호 변경
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Space>
  );
}
