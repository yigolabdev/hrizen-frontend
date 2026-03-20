import React, { useEffect, useState } from 'react';
import { List, Typography, Progress, Tooltip, Space, message } from 'antd';
import { SyncOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { apiClient } from '@/lib/api';

interface PaymentStatus {
  id: string;
  invoiceNumber: string;
  progressPercent: number; // 0~100
  status: 'processing' | 'completed' | 'failed';
  lastUpdated: string; // ISO string
}

export default function PaymentStatusTracker() {
  const [statuses, setStatuses] = useState<PaymentStatus[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 모의 API 호출
    setTimeout(() => {
      setStatuses([
        {
          id: 'status_001',
          invoiceNumber: '202306-0001',
          progressPercent: 100,
          status: 'completed',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 'status_002',
          invoiceNumber: '202307-0002',
          progressPercent: 60,
          status: 'processing',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 'status_003',
          invoiceNumber: '202308-0003',
          progressPercent: 100,
          status: 'failed',
          lastUpdated: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const renderStatusIcon = (status: PaymentStatus['status']) => {
    if (status === 'completed') return <CheckCircleTwoTone twoToneColor="#52c41a" />;
    if (status === 'failed') return <CloseCircleTwoTone twoToneColor="#f5222d" />;
    return <SyncOutlined spin style={{ color: '#007AFF' }} />;
  };

  return (
    <List
      loading={loading}
      dataSource={statuses}
      locale={{ emptyText: '결제 상태 내역이 없습니다.' }}
      renderItem={(item) => (
        <List.Item
          style={{ padding: '12px 16px', borderRadius: 8, backgroundColor: '#FAFAFA', marginBottom: 12 }}
          key={item.id}
        >
          <List.Item.Meta
            title={<Typography.Text strong>{`청구서 번호: ${item.invoiceNumber}`}</Typography.Text>}
            description={`최종 업데이트: ${new Date(item.lastUpdated).toLocaleString('ko-KR')}`}
          />
          <Space size="large" align="center">
            <Tooltip title={item.status === 'processing' ? '결제 진행 중' : item.status === 'completed' ? '결제 완료' : '결제 실패'}>
              {renderStatusIcon(item.status)}
            </Tooltip>
            <div style={{ width: 160 }}>
              <Progress
                percent={item.progressPercent}
                status={item.status === 'failed' ? 'exception' : item.status === 'completed' ? 'success' : 'active'}
                strokeColor={
                  item.status === 'completed'
                    ? '#52c41a'
                    : item.status === 'failed'
                    ? '#f5222d'
                    : '#007AFF'
                }
              />
            </div>
          </Space>
        </List.Item>
      )}
    />
  );
}
