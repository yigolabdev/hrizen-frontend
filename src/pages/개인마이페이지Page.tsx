import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import ProfileEditor from '@/features/myPage/components/ProfileEditor';
import NotificationSettings from '@/features/myPage/components/NotificationSettings';
import SecuritySettings from '@/features/myPage/components/SecuritySettings';
import ActivityLog from '@/features/myPage/components/ActivityLog';

const { Title } = Typography;

export default function MyPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>븀이페이지</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <ProfileEditor />
            <SecuritySettings />
          </Space>
        </Col>
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <NotificationSettings />
            <ActivityLog />
          </Space>
        </Col>
      </Row>
    </Space>
  );
}
