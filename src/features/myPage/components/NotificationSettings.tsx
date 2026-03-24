import React, { useState } from 'react';
import {
  Card,
  Switch,
  List,
  Typography,
  Space,
  Button,
  message,
  Tag,
  Divider,
  Row,
  Col,
  Select,
} from 'antd';
import {
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  MobileOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  TeamOutlined,
  DollarOutlined,
  ScheduleOutlined,
  TrophyOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface NotificationItem {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  email: boolean;
  push: boolean;
  sms: boolean;
  category: string;
}

const initialNotifications: NotificationItem[] = [
  {
    key: 'attendance',
    title: '근태 알림',
    description: '출퇴근 기록, 지각/조퇴 알림, 근무시간 초과 경고',
    icon: <ScheduleOutlined style={{ color: '#007AFF', fontSize: 20 }} />,
    email: true,
    push: true,
    sms: false,
    category: '근무',
  },
  {
    key: 'payroll',
    title: '급여 알림',
    description: '급여 지급 완료, 급여명세서 발행, 세금 관련 안내',
    icon: <DollarOutlined style={{ color: '#007AFF', fontSize: 20 }} />,
    email: true,
    push: true,
    sms: true,
    category: '급여',
  },
  {
    key: 'leave',
    title: '휴가 알림',
    description: '휴가 신청 승인/반려, 잔여 연차 안내, 휴가 일정 리마인더',
    icon: <ClockCircleOutlined style={{ color: '#007AFF', fontSize: 20 }} />,
    email: true,
    push: true,
    sms: false,
    category: '근무',
  },
  {
    key: 'performance',
    title: '성과 평가 알림',
    description: 'OKR 마감일 리마인더, 평가 요청, 피드백 수신',
    icon: <TrophyOutlined style={{ color: '#FF9500', fontSize: 20 }} />,
    email: true,
    push: false,
    sms: false,
    category: '성과',
  },
  {
    key: 'team',
    title: '팀 알림',
    description: '팀원 변경, 조직 공지사항, 팀 일정 안내',
    icon: <TeamOutlined style={{ color: '#007AFF', fontSize: 20 }} />,
    email: false,
    push: true,
    sms: false,
    category: '조직',
  },
  {
    key: 'security',
    title: '보안 알림',
    description: '로그인 시도, 비밀번호 변경, 새 기기 접속 감지',
    icon: <SafetyOutlined style={{ color: '#FF3B30', fontSize: 20 }} />,
    email: true,
    push: true,
    sms: true,
    category: '보안',
  },
];

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [loading, setLoading] = useState(false);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');

  const handleToggle = (
    key: string,
    channel: 'email' | 'push' | 'sms',
    checked: boolean
  ) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [channel]: checked } : item
      )
    );
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    message.success('알림 설정이 저장되었습니다.');
    setLoading(false);
  };

  const handleAllOn = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, email: true, push: true, sms: true }))
    );
  };

  const handleAllOff = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, email: false, push: false, sms: false }))
    );
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      {/* 방해 금지 모드 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      >
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Space>
              <ClockCircleOutlined style={{ fontSize: 20, color: '#FF9500' }} />
              <div>
                <Text strong>방해 금지 모드</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  설정된 시간 동안 푸시 알림을 받지 않습니다.
                </Text>
              </div>
            </Space>
          </Col>
          <Col xs={24} sm={12}>
            <Space wrap>
              <Switch
                checked={quietHoursEnabled}
                onChange={setQuietHoursEnabled}
              />
              {quietHoursEnabled && (
                <Space>
                  <Select
                    value={quietStart}
                    onChange={setQuietStart}
                    options={timeOptions}
                    style={{ width: 90 }}
                    size="small"
                  />
                  <Text type="secondary">~</Text>
                  <Select
                    value={quietEnd}
                    onChange={setQuietEnd}
                    options={timeOptions}
                    style={{ width: 90 }}
                    size="small"
                  />
                </Space>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 알림 채널 설정 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        title={
          <Space>
            <BellOutlined style={{ color: '#007AFF' }} />
            <span>알림 채널 설정</span>
          </Space>
        }
        extra={
          <Space>
            <Button size="small" onClick={handleAllOn} style={{ borderRadius: 6 }}>
              전체 켜기
            </Button>
            <Button size="small" onClick={handleAllOff} style={{ borderRadius: 6 }}>
              전체 끄기
            </Button>
          </Space>
        }
      >
        {/* 헤더 */}
        <Row
          style={{
            padding: '8px 0',
            borderBottom: '1px solid #F2F2F7',
            marginBottom: 8,
          }}
        >
          <Col xs={12} sm={12}>
            <Text strong>알림 항목</Text>
          </Col>
          <Col xs={4} sm={4} style={{ textAlign: 'center' }}>
            <Space size={2}>
              <MailOutlined style={{ fontSize: 12 }} />
              <Text strong style={{ fontSize: 12 }}>이메일</Text>
            </Space>
          </Col>
          <Col xs={4} sm={4} style={{ textAlign: 'center' }}>
            <Space size={2}>
              <MobileOutlined style={{ fontSize: 12 }} />
              <Text strong style={{ fontSize: 12 }}>푸시</Text>
            </Space>
          </Col>
          <Col xs={4} sm={4} style={{ textAlign: 'center' }}>
            <Space size={2}>
              <MessageOutlined style={{ fontSize: 12 }} />
              <Text strong style={{ fontSize: 12 }}>SMS</Text>
            </Space>
          </Col>
        </Row>

        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item style={{ padding: '16px 0', border: 'none' }}>
              <Row align="middle" style={{ width: '100%' }}>
                <Col xs={12} sm={12}>
                  <Space>
                    {item.icon}
                    <div>
                      <Space size={4}>
                        <Text strong>{item.title}</Text>
                        <Tag
                          color={
                            item.category === '보안'
                              ? 'red'
                              : item.category === '성과'
                              ? 'orange'
                              : 'blue'
                          }
                          style={{ fontSize: 10, lineHeight: '16px' }}
                        >
                          {item.category}
                        </Tag>
                      </Space>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.description}
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col xs={4} sm={4} style={{ textAlign: 'center' }}>
                  <Switch
                    size="small"
                    checked={item.email}
                    onChange={(checked) =>
                      handleToggle(item.key, 'email', checked)
                    }
                  />
                </Col>
                <Col xs={4} sm={4} style={{ textAlign: 'center' }}>
                  <Switch
                    size="small"
                    checked={item.push}
                    onChange={(checked) =>
                      handleToggle(item.key, 'push', checked)
                    }
                  />
                </Col>
                <Col xs={4} sm={4} style={{ textAlign: 'center' }}>
                  <Switch
                    size="small"
                    checked={item.sms}
                    onChange={(checked) =>
                      handleToggle(item.key, 'sms', checked)
                    }
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>

      {/* 저장 버튼 */}
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          loading={loading}
          onClick={handleSave}
          size="large"
          style={{
            backgroundColor: '#007AFF',
            borderColor: '#007AFF',
            borderRadius: 8,
            minWidth: 120,
          }}
        >
          설정 저장
        </Button>
      </div>
    </Space>
  );
}
