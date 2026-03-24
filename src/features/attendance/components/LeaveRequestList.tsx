import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Typography,
  message,
  Tooltip,
  Grid,
  Spin,
  Descriptions,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { fetchLeaveRequests, updateLeaveStatus } from '../api/attendanceApi';
import type { LeaveRequest } from '../types';
import dayjs from 'dayjs';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const statusConfig: Record<LeaveRequest['status'], { color: string; label: string }> = {
  pending: { color: '#FF9500', label: '대기중' },
  approved: { color: '#52c41a', label: '승인' },
  rejected: { color: '#ff4d4f', label: '반려' },
};

const leaveTypeColor: Record<string, string> = {
  '연차': '#007AFF',
  '반차(오전)': '#36cfc9',
  '반차(오후)': '#36cfc9',
  '병가': '#ff7a45',
  '경조사': '#9254de',
  '공가': '#597ef7',
  '특별휴가': '#f759ab',
};

export default function LeaveRequestList() {
  const screens = useBreakpoint();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [detailModal, setDetailModal] = useState<LeaveRequest | null>(null);

  const loadData = () => {
    setLoading(true);
    fetchLeaveRequests()
      .then(setRequests)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    setActionLoading(id);
    try {
      const updated = await updateLeaveStatus(id, status);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r))
      );
      message.success(status === 'approved' ? '승인되었습니다.' : '반려되었습니다.');
    } catch {
      message.error('처리 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 90,
      render: (name: string, record: LeaveRequest) => (
        <div>
          <Text strong style={{ fontSize: 13 }}>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 11 }}>{record.department}</Text>
        </div>
      ),
    },
    {
      title: '유형',
      dataIndex: 'leaveType',
      key: 'leaveType',
      width: 90,
      render: (type: string) => (
        <Tag color={leaveTypeColor[type] || '#007AFF'}>{type}</Tag>
      ),
    },
    {
      title: '기간',
      key: 'period',
      width: 140,
      render: (_: unknown, record: LeaveRequest) => (
        <div style={{ fontSize: 12 }}>
          <div>{record.startDate}</div>
          {record.startDate !== record.endDate && <div>~ {record.endDate}</div>}
          <Text type="secondary" style={{ fontSize: 11 }}>({record.days}일)</Text>
        </div>
      ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 70,
      render: (status: LeaveRequest['status']) => (
        <Tag color={statusConfig[status].color}>{statusConfig[status].label}</Tag>
      ),
    },
    {
      title: '관리',
      key: 'actions',
      width: 130,
      render: (_: unknown, record: LeaveRequest) => (
        <Space size={4}>
          <Tooltip title="상세 보기">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => setDetailModal(record)}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <>
              <Tooltip title="승인">
                <Button
                  type="text"
                  size="small"
                  icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  loading={actionLoading === record.id}
                  onClick={() => handleStatusChange(record.id, 'approved')}
                />
              </Tooltip>
              <Tooltip title="반려">
                <Button
                  type="text"
                  size="small"
                  icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                  loading={actionLoading === record.id}
                  onClick={() => handleStatusChange(record.id, 'rejected')}
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <>
      <Card
        title={
          <Space>
            <span>휴가 신청 목록</span>
            {pendingCount > 0 && (
              <Tag color="#FF9500" style={{ borderRadius: 10 }}>
                {pendingCount}건 대기
              </Tag>
            )}
          </Space>
        }
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      >
        <Spin spinning={loading}>
          <Table
            dataSource={requests}
            columns={columns}
            rowKey="id"
            size="small"
            pagination={{ pageSize: 5, showSizeChanger: false }}
            scroll={{ x: 520 }}
          />
        </Spin>
      </Card>

      <Modal
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        title="휴가 신청 상세"
        footer={
          detailModal?.status === 'pending' ? (
            <Space>
              <Button onClick={() => setDetailModal(null)}>닫기</Button>
              <Button
                danger
                onClick={() => {
                  if (detailModal) {
                    handleStatusChange(detailModal.id, 'rejected');
                    setDetailModal(null);
                  }
                }}
              >
                반려
              </Button>
              <Button
                type="primary"
                style={{ backgroundColor: '#007AFF' }}
                onClick={() => {
                  if (detailModal) {
                    handleStatusChange(detailModal.id, 'approved');
                    setDetailModal(null);
                  }
                }}
              >
                승인
              </Button>
            </Space>
          ) : (
            <Button onClick={() => setDetailModal(null)}>닫기</Button>
          )
        }
        width={screens.xs ? '95%' : 520}
      >
        {detailModal && (
          <Descriptions column={1} bordered size="small" style={{ marginTop: 12 }}>
            <Descriptions.Item label="직원명">{detailModal.employeeName}</Descriptions.Item>
            <Descriptions.Item label="부서">{detailModal.department}</Descriptions.Item>
            <Descriptions.Item label="휴가 유형">
              <Tag color={leaveTypeColor[detailModal.leaveType] || '#007AFF'}>
                {detailModal.leaveType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="기간">
              {detailModal.startDate}
              {detailModal.startDate !== detailModal.endDate && ` ~ ${detailModal.endDate}`}
              {' '}({detailModal.days}일)
            </Descriptions.Item>
            <Descriptions.Item label="사유">{detailModal.reason}</Descriptions.Item>
            <Descriptions.Item label="신청일">
              {dayjs(detailModal.requestedAt).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label="상태">
              <Tag color={statusConfig[detailModal.status].color}>
                {statusConfig[detailModal.status].label}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
