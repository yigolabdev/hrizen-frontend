import React, { useEffect, useState } from 'react';
import { Button, Typography, Space, Modal, List, Tag, Skeleton } from 'antd';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

interface Contract {
  id: string;
  employeeName: string;
  contractDate: string;
  status: '연동됨' | '미연동';
}

export function ElectronicContractIntegration() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchContracts() {
      setLoading(true);
      try {
        // Mock delay
        await new Promise((r) => setTimeout(r, 500));

        // Mock data
        setContracts([
          {
            id: 'c001',
            employeeName: '김영희',
            contractDate: '2023-09-01',
            status: '연동됨',
          },
          {
            id: 'c002',
            employeeName: '이민수',
            contractDate: '2023-10-12',
            status: '미연동',
          },
        ]);
      } catch {
        setContracts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchContracts();
  }, []);

  const handleSyncClick = (contractId: string) => {
    Modal.confirm({
      title: '전자계약 연동 확인',
      content: '해당 계약을 전자계약 시스템과 연동하시겠습니까?',
      okText: '예',
      cancelText: '취소',
      onOk: async () => {
        // Mock sync
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        setContracts((prev) =>
          prev.map((c) =>
            c.id === contractId ? { ...c, status: '연동됨' } : c
          )
        );
        setLoading(false);
      },
    });
  };

  return (
    <section aria-label="전자계약 연동 관리">
      <Title level={4} style={{ color: '#007AFF', marginBottom: 16 }}>
        전자계약 연동 관리
      </Title>
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={contracts}
          locale={{ emptyText: '연동된 계약 내역이 없습니다.' }}
          renderItem={(item) => (
            <List.Item
              actions={
                item.status === '미연동'
                  ? [
                      <Button
                        key="sync"
                        type="primary"
                        style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}
                        onClick={() => handleSyncClick(item.id)}
                      >
                        연동하기
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                title={<Text strong>{item.employeeName}</Text>}
                description={<Text>계약일: {item.contractDate}</Text>}
              />
              <Tag color={item.status === '연동됨' ? 'success' : 'warning'}>{item.status}</Tag>
            </List.Item>
          )}
        />
      )}
    </section>
  );
}
