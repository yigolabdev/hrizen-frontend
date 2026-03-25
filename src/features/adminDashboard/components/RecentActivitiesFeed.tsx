import React from 'react';
import { Card, Timeline, Typography, Tag, Space, Button } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
  FileTextOutlined,
  DollarOutlined,
  ScheduleOutlined,
  RightOutlined,
} from '@ant-design/icons';

type ActivityType = 'attendance' | 'payroll' | 'onboarding' | 'leave' | 'alert';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'info' | 'error';
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'alert',
    title: '이직 위험 알림',
    description: '개발팀 김서준 님의 이줁 위험도가 85%로 상승했습니다.',
    time: '5분 전',
    status: 'error',
  },
  {
    id: '2',
    type: 'payroll',
    title: '급여 정산 완료',
    description: '2024년 7월 급여 정산이 완료되었습니다.',
    time: '1시간 전',
    status: 'success',
  },
  {
    id: '3',
    type: 'onboarding',
    title: '신규 입사자 등록',
    description: '마케팅팀 이하은 님이 입사 등록되었습니다.',
    time: '2짤간 전',
    status: 'info',
  },
  {
    id: '4',
    type: 'leave',
    title: '연차 승인 요청',
    description: '영업팀 박준서 님의 연차 신청(7/22~7/23)穰 대기 중입니다.',
    time: '3시간 전',
    status: 'warning',
  },
  {
    id: '5',
    type: 'attendance',
    title: '지각 알림',
    description: 'QA팀 최민지 님이 09:15에 출근하였습니다.',
    time: '4짤간 전',
    status: 'warning',
  },
];

function getIcon(type: ActivityType): React.ReactNode {
  const iconStyle = { fontSize: 14 };
  switch (type) {
    case 'attendance':
      return <ScheduleOutlined style={iconStyle} />;
    case 'payroll':
      return <DollarOutlined style={iconStyle} />;
    case 'onboarding':
      return <UserAddOutlined style={iconStyle} />;
    case 'leave':
      return <FileTextOutlined style={iconStyle} />;
    case 'alert':
      return <ExclamationCircleOutlined style={iconStyle} />;
    default:
      return <ClockCircleOutlined style={iconStyle} />;
  }
}

function getStatusColor(status: Activity['status']): string {
  switch (status) {
    case 'success': return '#34C759';
    case 'warning': return '#FF9500';
    case 'error': return '#FF3B30';
    case 'info': return '#007AFF';
    default: return '#8E8E93';
  }
}

export default function RecentActivitiesFeed() {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        height: '100%',
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>활동 피드</span>
        <Button type="link" size="small" icon={<RightOutlined />}>훈더 보기</Button>
      </div>

      <Timeline
        items={activities.map((activity) => ({
          key: activity.id,
          color: getStatusColor(activity.status),
          dot: getIcon(activity.type),
          children: (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{activity.title}</span>
                <span style={{ fontSize: 11, color: '#8E8E93' }}>{activity.time}</span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}>{activity.description}</p>
            </div>
          ),
        }))}
      />
    </Card>
  );
}
