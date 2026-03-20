import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Space, message, Modal } from 'antd';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

interface SubscriptionStatus {
  planName: string;
  nextBillingDate: string; // YYYY-MM-DD
  isActive: boolean;
}

const mockStatus: SubscriptionStatus = {
  planName: '프로페셔널',
  nextBillingDate: '2024-06-25',
  isActive: true,
};

export default function SubscriptionStatusCard() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus(mockStatus);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (!status) {
    return null;
  }

  const handleCancelSubscription = () => {
    setModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      message.success('구독이 정상적으로 해지되었습니다.');
      setStatus((prev) => prev ? { ...prev, isActive: false } : null);
      setModalOpen(false);
    } catch {
      message.error('해지 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={<Title level={4} style={{ color: '#007AFF' }}>현재 구독 상태</Title>}
      style={{ borderRadius: 12, boxShadow: '0 2px 10px rgb(0 122 255 / 0.12)' }}
    >
      <Space direction="vertical" size={8} style={{ display: 'flex' }}>
        <Text style={{ fontSize: 16 }}>
          <b>플랜:</b> {status.planName}
        </Text>
        <Text style={{ fontSize: 16 }}>
          <b>다음 결제일:</b> {status.nextBillingDate}
        </Text>
        <Text style={{ fontSize: 16, color: status.isActive ? '#389e0d' : '#ff4d4f' }}>
          <b>상태:</b> {status.isActive ? '활성' : '해지됨'}
        </Text>
        {status.isActive && (
          <Button
            type="primary"
            danger
            onClick={handleCancelSubscription}
            style={{ borderRadius: 6, marginTop: 16 }}
            loading={loading}
          >
            구독 해지
          </Button>
        )}
      </Space>

      <Modal
        title="구독 해지 확인"
        open={isModalOpen}
        onOk={handleConfirmCancel}
        onCancel={() => setModalOpen(false)}
        okText="해지하기"
        okButtonProps={{ danger: true, loading: loading }}
        cancelText="취소"
      >
        <Text>정말로 구독을 해지하시겠습니까? 해지 시 서비스 이용이 중지됩니다.</Text>
      </Modal>
    </Card>
  );
}
