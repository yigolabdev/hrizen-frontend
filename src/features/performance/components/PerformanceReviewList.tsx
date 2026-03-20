import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { apiClient } from '@/lib/api';

interface Review {
  id: number;
  employeeName: string;
  period: string;
  score: number;
  status: '미작성' | '검토중' | '완료';
  comments: string;
}

export default function PerformanceReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    setLoading(true);
    // Mock API 호출
    apiClient.get<Review[]>('/performance-reviews').then((res) => {
      setReviews(res);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const showDetail = (record: Review) => {
    setSelectedReview(record);
    setModalOpen(true);
  };

  const columns: ColumnsType<Review> = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      fixed: 'left',
      width: 120,
      ellipsis: true,
    },
    {
      title: '평가 기간',
      dataIndex: 'period',
      key: 'period',
      width: 120,
      ellipsis: true,
    },
    {
      title: '점수',
      dataIndex: 'score',
      key: 'score',
      width: 100,
      sorter: (a, b) => a.score - b.score,
      render: (score) => <Typography.Text strong>{score}</Typography.Text>,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: '미작성', value: '미작성' },
        { text: '검토중', value: '검토중' },
        { text: '완료', value: '완료' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Review['status']) => {
        let color = '#FF9500';
        if (status === '완료') color = '#007AFF';
        else if (status === '미작성') color = '#AAAAAA';
        else if (status === '검토중') color = '#FFAA33';
        return <Tag color={color} style={{ borderRadius: 8 }}>{status}</Tag>;
      },
    },
    {
      title: '상세',
      key: 'detail',
      fixed: 'right',
      width: 80,
      render: (_text, record) => (
        <Button type="link" onClick={() => showDetail(record)} style={{ padding: 0 }}>
          보기
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="id"
        loading={loading}
        scroll={{ x: 700 }}
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 }}
      />

      <Modal
        title={selectedReview?.employeeName + ' 님의 성과 리뷰 상세'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        bodyStyle={{ whiteSpace: 'pre-wrap', fontSize: 14 }}
        centered
        destroyOnClose
      >
        {selectedReview ? (
          <div>
            <p><b>평가 기간:</b> {selectedReview.period}</p>
            <p><b>점수:</b> {selectedReview.score}</p>
            <p><b>상태:</b> {selectedReview.status}</p>
            <p><b>코멘트:</b><br />{selectedReview.comments || '코멘트가 없습니다.'}</p>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
