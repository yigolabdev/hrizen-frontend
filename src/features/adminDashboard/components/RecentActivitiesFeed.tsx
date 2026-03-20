import React from 'react';
import { List, Card, Typography, Avatar } from 'antd';
import { UserOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  status: '완료' | '실패';
}

const activities: Activity[] = [
  { id: 1, user: '김민수', action: '월 급여 정산 완료', time: '2024-06-12 14:35', status: '완료' },
  { id: 2, user: '이현주', action: '연차 신청 승인', time: '2024-06-12 13:20', status: '완료' },
  { id: 3, user: '박철호', action: '출근 기록 오류 제출', time: '2024-06-12 12:05', status: '실패' },
  { id: 4, user: '정은지', action: '성과평가 결과 입력', time: '2024-06-11 18:40', status: '완료' },
  { id: 5, user: '최준호', action: '퇴직금 계산 수정', time: '2024-06-11 16:44', status: '완료' },
];

export default function RecentActivitiesFeed() {
  return (
    <Card
      title="최근 활동 내역"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', minHeight: 280 }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      aria-label="최근 활동 내역 목록"
    >
      <List<Activity>
        dataSource={activities}
        itemLayout="horizontal"
        renderItem={({ id, user, action, time, status }) => (
          <List.Item key={id} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} alt={`${user} 프로필 이미지`} />}
              title={<Typography.Text strong>{user}</Typography.Text>}
              description={<Typography.Text>{action}</Typography.Text>}
            />
            <div style={{ textAlign: 'right' }}>
              <Typography.Text type="secondary" style={{ display: 'block' }}>
                {time}
              </Typography.Text>
              {status === '완료' ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" aria-label="완료 상태" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#ff4d4f" aria-label="실패 상태" />
              )}
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
