import React, { useState } from 'react';
import {
  Card,
  Timeline,
  Typography,
  Tag,
  Space,
  DatePicker,
  Select,
  Row,
  Col,
  Empty,
  Button,
  Badge,
} from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  EditOutlined,
  FileTextOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DesktopOutlined,
  MobileOutlined,
  HistoryOutlined,
  FilterOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

type ActivityType = 'login' | 'logout' | 'profile_update' | 'document' | 'security' | 'approval';
type DeviceType = 'desktop' | 'mobile';

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  ip: string;
  device: DeviceType;
  location: string;
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    type: 'login',
    title: '로그인',
    description: 'Chrome 브라우저에서 로그인하였습니다.',
    timestamp: '2024-01-15 09:02:33',
    ip: '192.168.1.100',
    device: 'desktop',
    location: '서울, 대한민국',
  },
  {
    id: '2',
    type: 'profile_update',
    title: '프로필 수정',
    description: '연락처 정보를 업데이트하였습니다.',
    timestamp: '2024-01-15 10:15:22',
    ip: '192.168.1.100',
    device: 'desktop',
    location: '서울, 대한민국',
  },
  {
    id: '3',
    type: 'document',
    title: '문서 열람',
    description: '2024년 1월 급여명세서를 조회하였습니다.',
    timestamp: '2024-01-15 11:30:45',
    ip: '192.168.1.100',
    device: 'desktop',
    location: '서울, 대한민국',
  },
  {
    id: '4',
    type: 'approval',
    title: '휴가 신청',
    description: '2024-01-20 ~ 2024-01-22 연차 휴가를 신청하였습니다.',
    timestamp: '2024-01-15 14:20:10',
    ip: '10.0.0.55',
    device: 'mobile',
    location: '서울, 대한민국',
  },
  {
    id: '5',
    type: 'security',
    title: '비밀번호 변경',
    description: '계정 비밀번호를 변경하였습니다.',
    timestamp: '2024-01-14 16:45:00',
    ip: '192.168.1.100',
    device: 'desktop',
    location: '서울, 대한민국',
  },
  {
    id: '6',
    type: 'logout',
    title: '로그아웃',
    description: '정상적으로 로그아웃하였습니다.',
    timestamp: '2024-01-14 18:00:12',
    ip: '192.168.1.100',
    device: 'desktop',
    location: '서울, 대한민국',
  },
  {
    id: '7',
    type: 'login',
    title: '로그인',
    description: 'Safari 모바일에서 로그인하였습니다.',
    timestamp: '2024-01-14 08:55:00',
    ip: '10.0.0.55',
    device: 'mobile',
    location: '서울, 대한민국',
  },
  {
    id: '8',
    type: 'approval',
    title: '경비 청구',
    description: '출장 경비 150,000원을 청구하였습니다.',
    timestamp: '2024-01-13 15:30:00',
    ip: '192.168.1.100',
    device: 'desktop',
    location: '서울, 대한민국',
  },
];

const typeConfig: Record<
  ActivityType,
  { color: string; icon: React.ReactNode; tagColor: string }
> = {
  login: {
    color: '#007AFF',
    icon: <LoginOutlined />,
    tagColor: 'blue',
  },
  logout: {
    color: '#8E8E93',
    icon: <LogoutOutlined />,
    tagColor: 'default',
  },
  profile_update: {
    color: '#34C759',
    icon: <EditOutlined />,
    tagColor: 'green',
  },
  document: {
    color: '#FF9500',
    icon: <FileTextOutlined />,
    tagColor: 'orange',
  },
  security: {
    color: '#FF3B30',
    icon: <SafetyOutlined />,
    tagColor: 'red',
  },
  approval: {
    color: '#AF52DE',
    icon: <CheckCircleOutlined />,
    tagColor: 'purple',
  },
};

const typeLabel: Record<ActivityType, string> = {
  login: '로그인',
  logout: '로그아웃',
  profile_update: '프로필',
  document: '문서',
  security: '보안',
  approval: '승인/신청',
};

export default function ActivityLog() {
  const [filterType, setFilterType] = useState<ActivityType | 'all'>('all');
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  const filteredData = activityData.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const itemDate = dayjs(item.timestamp);
      if (
        itemDate.isBefore(dateRange[0], 'day') ||
        itemDate.isAfter(dateRange[1], 'day')
      ) {
        return false;
      }
    }
    return true;
  });

  const handleReset = () => {
    setFilterType('all');
    setDateRange(null);
  };

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      {/* 필터 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Space>
              <FilterOutlined style={{ color: '#007AFF' }} />
              <Text strong>필터</Text>
            </Space>
          </Col>
          <Col xs={24} sm={6}>
            <Select
              value={filterType}
              onChange={(val) => setFilterType(val)}
              style={{ width: '100%', borderRadius: 8 }}
              options={[
                { value: 'all', label: '전체 활동' },
                { value: 'login', label: '로그인' },
                { value: 'logout', label: '로그아웃' },
                { value: 'profile_update', label: '프로필 수정' },
                { value: 'document', label: '문서 열람' },
                { value: 'security', label: '보안' },
                { value: 'approval', label: '승인/신청' },
              ]}
            />
          </Col>
          <Col xs={24} sm={7}>
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              style={{ width: '100%', borderRadius: 8 }}
              placeholder={['시작일', '종료일']}
            />
          </Col>
          <Col xs={24} sm={3}>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              style={{ borderRadius: 8, width: '100%' }}
            >
              초기화
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 활동 통계 */}
      <Row gutter={[16, 16]}>
        {(['login', 'security', 'approval', 'document'] as ActivityType[]).map(
          (type) => {
            const count = activityData.filter((a) => a.type === type).length;
            return (
              <Col xs={12} sm={6} key={type}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    textAlign: 'center',
                    backgroundColor: '#F2F2F7',
                  }}
                  bodyStyle={{ padding: '16px 12px' }}
                >
                  <div style={{ color: typeConfig[type].color, fontSize: 24 }}>
                    {typeConfig[type].icon}
                  </div>
                  <Text
                    strong
                    style={{ fontSize: 24, display: 'block', marginTop: 4 }}
                  >
                    {count}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {typeLabel[type]}
                  </Text>
                </Card>
              </Col>
            );
          }
        )}
      </Row>

      {/* 타임라인 */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        title={
          <Space>
            <HistoryOutlined style={{ color: '#007AFF' }} />
            <span>활동 내역</span>
            <Badge
              count={filteredData.length}
              style={{ backgroundColor: '#007AFF' }}
            />
          </Space>
        }
      >
        {filteredData.length === 0 ? (
          <Empty description="해당 조건의 활동 기록이 없습니다." />
        ) : (
          <Timeline
            items={filteredData.map((item) => ({
              color: typeConfig[item.type].color,
              dot: (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: `${typeConfig[item.type].color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: typeConfig[item.type].color,
                    fontSize: 14,
                  }}
                >
                  {typeConfig[item.type].icon}
                </div>
              ),
              children: (
                <div style={{ paddingBottom: 8 }}>
                  <Space wrap>
                    <Text strong>{item.title}</Text>
                    <Tag color={typeConfig[item.type].tagColor}>
                      {typeLabel[item.type]}
                    </Tag>
                  </Space>
                  <br />
                  <Text style={{ fontSize: 13 }}>{item.description}</Text>
                  <br />
                  <Space
                    split={<Text type="secondary">·</Text>}
                    style={{ marginTop: 4 }}
                    wrap
                  >
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined /> {item.timestamp}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.device === 'desktop' ? (
                        <DesktopOutlined />
                      ) : (
                        <MobileOutlined />
                      )}{' '}
                      {item.device === 'desktop' ? 'PC' : '모바일'}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      IP: {item.ip}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.location}
                    </Text>
                  </Space>
                </div>
              ),
            }))}
          />
        )}
      </Card>
    </Space>
  );
}
