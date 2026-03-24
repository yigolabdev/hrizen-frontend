import React from 'react';
import { Typography, Tabs } from 'antd';
import { UserOutlined, BellOutlined, HistoryOutlined, SafetyOutlined } from '@ant-design/icons';
import ProfileEditor from '@/features/myPage/components/ProfileEditor';
import NotificationSettings from '@/features/myPage/components/NotificationSettings';
import ActivityLog from '@/features/myPage/components/ActivityLog';
import SecuritySettings from '@/features/myPage/components/SecuritySettings';

const { Title } = Typography;

export default function MyPage() {
  return (
    <div style={{ padding: '0 0 40px 0' }}>
      <Title
        level={2}
        style={{
          color: '#007AFF',
          fontWeight: 700,
          marginBottom: 32,
        }}
      >
        마이페이지
      </Title>
      <Tabs
        defaultActiveKey="profile"
        type="card"
        size="large"
        style={{ background: 'transparent' }}
        items={[
          {
            key: 'profile',
            label: (
              <span>
                <UserOutlined style={{ marginRight: 6 }} />
                프로필 편집
              </span>
            ),
            children: <ProfileEditor />,
          },
          {
            key: 'notifications',
            label: (
              <span>
                <BellOutlined style={{ marginRight: 6 }} />
                알림 설정
              </span>
            ),
            children: <NotificationSettings />,
          },
          {
            key: 'activity',
            label: (
              <span>
                <HistoryOutlined style={{ marginRight: 6 }} />
                활동 기록
              </span>
            ),
            children: <ActivityLog />,
          },
          {
            key: 'security',
            label: (
              <span>
                <SafetyOutlined style={{ marginRight: 6 }} />
                보안 설정
              </span>
            ),
            children: <SecuritySettings />,
          },
        ]}
      />
    </div>
  );
}
