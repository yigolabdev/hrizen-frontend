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
    description: '개발팀 김서준 님의 이직 위험도가 85%로 상승했습니다.',
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
    time: '2시간 전',
    status: 'info',
  },
  {
    id: '4',
    type: 'leave',
    title: '연차 승인 요청',
    description: '영업팀 박준서 님의 연차 신청(7/22~7/23)이 대기 중입니다.',
    time: '3시간 전',
    status: 'warning',
  },
  {
    id: '5',
    type: 'attendance',
    title: '지각 알림',
    description: 'QA팀 최민지 님이 09:15에 출근하였습니다.',
    time: '4시간 전',
    status: 'warning',
  },
  {
    id: '6',
    type: 'payroll',
    title: '4대보험 신고 완료',
    description: '2024년 7월 4대보험 신고가 정상 처리되었습니다.',
    time: '5시간 전',
    status: 'success',
  },
  {
    id: '7',
    type: 'onboarding',
    title: '수습 평가 알림',
    description: '디자인팀 정소율 님의 수습 평가 기간이 종료됩니다.',
    time: '6시간 전',
    status: 'info',
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
  }
}

function getStatusColor(status: Activity['status']): string {
  switch (status) {
    case 'success':
      return '#34C759';
    case 'warning':
      return '#FF9500';
    case 'error':
      return '#FF3B30';
    case 'info':
      return '#007AFF';
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
      aria-label="최근 활동 피드"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>최근 활동</span>
        <Button type="link" size="small" style={{ color: '#007AFF', padding: 0, fontSize: 13 }}>
          전체 보기 <RightOutlined style={{ fontSize: 10 }} />
        </Button>
      </div>

      <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}>
        <Timeline
          items={activities.map((activity) => ({
            key: activity.id,
            color: getStatusColor(activity.status),
            dot: (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  backgroundColor: `${getStatusColor(activity.status)}14`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getStatusColor(activity.status),
                }}
              >
                {getIcon(activity.type)}
              </div>
            ),
            children: (
              <div style={{ paddingBottom: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography.Text style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>
                    {activity.title}
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 11, color: '#C7C7CC' }}>
                    {activity.time}
                  </Typography.Text>
                </div>
                <Typography.Text style={{ fontSize: 12, color: '#8E8E93', lineHeight: '18px' }}>
                  {activity.description}
                </Typography.Text>
              </div>
            ),
          }))}
        />
      </div>
    </Card>
  );
}
