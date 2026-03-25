import React from 'react';
import { Typography, Row, Col } from 'antd';
import ProfileEditor from '@/features/myPage/components/ProfileEditor';
import ActivityLog from '@/features/myPage/components/ActivityLog';
import NotificationSettings from '@/features/myPage/components/NotificationSettings';
import SecuritySettings from '@/features/myPage/components/SecuritySettings';

const { Title } = Typography;

export default function MyPage() {
  return (
    <div>
      <Title level={2} style={{ color: '#007AFF', marginBottom: 24 }}>마이페이지</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ProfileEditor />
        </Col>
        <Col xs={24} lg={12}>
          <SecuritySettings />
        </Col>
        <Col xs={24} lg={12}>
          <NotificationSettings />
        </Col>
        <Col xs={24} lg={12}>
          <ActivityLog />
        </Col>
      </Row>
    </div>
  );
}
