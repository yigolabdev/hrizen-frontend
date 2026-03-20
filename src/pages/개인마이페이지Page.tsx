import React, { useEffect, useState } from 'react';
import { Card, Tabs, Grid, Typography } from 'antd';
import ProfileEditor from '@/features/mypage/components/ProfileEditor';
import NotificationSettings from '@/features/mypage/components/NotificationSettings';
import ActivityLog from '@/features/mypage/components/ActivityLog';
import SecuritySettings from '@/features/mypage/components/SecuritySettings';
import { apiClient } from '@/lib/api';

const { TabPane } = Tabs;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  avatarUrl?: string;
}

interface NotificationConfig {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
}

interface ActivityEntry {
  id: string;
  date: string;
  action: string;
  detail: string;
}

interface SecurityConfig {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

export default function 개인마이페이지Page() {
  const screens = useBreakpoint();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notificationConfig, setNotificationConfig] = useState<NotificationConfig | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock API fetching
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Mock profile
        const userProfile: UserProfile = {
          id: 'user-001',
          name: '홍길동',
          email: 'hong.gildong@example.com',
          phone: '010-1234-5678',
          department: '인사팀',
          position: '팀장',
          avatarUrl: 'https://i.pravatar.cc/150?u=honggildong',
        };

        // Mock notifications
        const notifications: NotificationConfig = {
          emailAlerts: true,
          smsAlerts: false,
          pushAlerts: true,
        };

        // Mock activity log
        const activities: ActivityEntry[] = [
          {
            id: 'act-001',
            date: '2024-06-01T10:32:00Z',
            action: '비밀번호 변경',
            detail: '보안 강화를 위해 비밀번호를 변경했습니다.',
          },
          {
            id: 'act-002',
            date: '2024-05-28T09:15:00Z',
            action: '프로필 정보 수정',
            detail: '휴대폰 번호를 업데이트했습니다.',
          },
          {
            id: 'act-003',
            date: '2024-05-20T14:48:00Z',
            action: '알림 설정 변경',
            detail: 'SMS 알림 수신을 중지했습니다.',
          },
        ];

        // Mock security config
        const security: SecurityConfig = {
          twoFactorEnabled: true,
          lastPasswordChange: '2024-06-01T10:30:00Z',
        };

        // set states
        setProfile(userProfile);
        setNotificationConfig(notifications);
        setActivityLog(activities);
        setSecurityConfig(security);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '24px', backgroundColor: '#F2F2F7', minHeight: '100vh' }}>
      <Card
        style={{ maxWidth: 960, margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: 12 }}
        bodyStyle={{ padding: screens.xs ? 16 : 32 }}
        loading={loading}
        bordered={false}
      >
        <Title level={3} style={{ marginBottom: 24, color: '#007AFF', fontWeight: '700' }}>
          개인 마이페이지
        </Title>
        <Tabs
          type="line"
          size={screens.xs ? 'small' : 'middle'}
          tabBarGutter={24}
          items={
            [
              {
                key: 'profile',
                label: '프로필 수정',
                children: profile && <ProfileEditor profile={profile} onUpdate={setProfile} />, 
              },
              {
                key: 'notification',
                label: '알림 설정',
                children: notificationConfig && (
                  <NotificationSettings
                    config={notificationConfig}
                    onChange={setNotificationConfig}
                  />
                ),
              },
              {
                key: 'activity',
                label: '활동 로그',
                children: <ActivityLog entries={activityLog} />, 
              },
              {
                key: 'security',
                label: '보안 설정',
                children: securityConfig && (
                  <SecuritySettings config={securityConfig} onChange={setSecurityConfig} />
                ),
              },
            ]
          }
        />
      </Card>
    </div>
  );
}
