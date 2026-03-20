import React, { useEffect, useState } from 'react';
import { List, Tag, Typography, Spin } from 'antd';
import { apiClient } from '@/lib/api';

interface LeaveRequest {
  id: string;
  employeeName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: '승인' | '대기' | '반려';
  type: '연차' | '병가' | '금요 휴가';
}

const statusColorMap: Record<LeaveRequest['status'], string> = {
  승인: '#007AFF',
  대기: '#FF9500',
  반려: '#FF3B30',
};

export default function LeaveRequestList() {
  const [loading, setLoading] = useState(true);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    async function fetchLeaveRequests() {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));
      const mockData: LeaveRequest[] = [
        {
          id: 'lr1',
          employeeName: '김민수',
          startDate: '2024-06-15',
          endDate: '2024-06-17',
          status: '대기',
          type: '연차',
        },
        {
          id: 'lr2',
          employeeName: '이서연',
          startDate: '2024-06-10',
          endDate: '2024-06-10',
          status: '승인',
          type: '병가',
        },
        {
          id: 'lr3',
          employeeName: '박지훈',
          startDate: '2024-06-05',
          endDate: '2024-06-05',
          status: '반려',
          type: '연차',
        },
      ];
      setLeaveRequests(mockData);
      setLoading(false);
    }
    fetchLeaveRequests();
  }, []);

  return (
    <Spin spinning={loading}>
      <List
        itemLayout="horizontal"
        dataSource={leaveRequests}
        locale={{ emptyText: '휴가 신청 내역이 없습니다.' }}
        renderItem={(item) => {
          const daysCount =
            (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
          return (
            <List.Item>
              <List.Item.Meta
                title={`${item.employeeName} - ${item.type} (${item.startDate} ~ ${item.endDate})`}
                description={`${daysCount}일 신청`}
              />
              <Tag color={statusColorMap[item.status]}>{item.status}</Tag>
            </List.Item>
          );
        }}
      />
    </Spin>
  );
}
