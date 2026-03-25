import React from 'react';
import { Typography, Space } from 'antd';
import ProfileEditor from '@/features/myPage/components/ProfileEditor';
import NotificationSettings from '@/features/myPage/components/NotificationSettings';
import SecuritySettings from '@/features/myPage/components/SecuritySettings';
import ActivityLog from '@/features/myPage/components/ActivityLog';

const { Title } = Typography;

export default function MyPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ color: '#007AFF' }}>마이페이지</Title>
      <ProfileEditor />
      <NotificationSettings />
      <SecuritySettings />
      <ActivityLog />
    </Space>
  );
}
