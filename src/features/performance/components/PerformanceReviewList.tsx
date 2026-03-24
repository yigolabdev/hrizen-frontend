import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Space,
  Input,
  Select,
  Button,
  Typography,
  Progress,
  Tooltip,
  Modal,
  Descriptions,
  Rate,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { PerformanceReview } from '@/features/performance/types';

const { Text } = Typography;

const mockReviews: PerformanceReview[] = [
  {
    id: '1',
    employeeName: '김서연',
    department: '개발팀',
    position: '시니어 개발자',
    reviewPeriod: '2025년 1분기',
    selfScore: 85,
    managerScore: 88,
    finalScore: 87,
    grade: 'A',
    status: 'completed',
    updatedAt: '2025-04-01',
  },
  {
    id: '2',
    employeeName: '이준호',
    department: '마케팅팀',
    position: '팀장',
    reviewPeriod: '2025년 1분기',
    selfScore: 78,
    managerScore: 82,
    finalScore: 80,
    grade: 'B',
    status: 'completed',
    updatedAt: '2025-04-02',
  },
  {
    id: '3',
    employeeName: '박지민',
    department: '디자인팀',
    position: 'UI 디자이너',
    reviewPeriod: '2025년 1분기',
    selfScore: 92,
    managerScore: 90,
    finalScore: 91,
    grade: 'S',
    status: 'completed',
    updatedAt: '2025-04-03',
  },
  {
    id: '4',
    employeeName: '최민수',
    department: '영업팀',
    position: '영업 사원',
    reviewPeriod: '2025년 2분기',
    selfScore: 70,
    managerScore: 0,
    finalScore: 0,
    grade: 'C',
    status: 'in_progress',
    updatedAt: '2025-06-15',
  },
  {
    id: '5',
    employeeName: '정유진',
    department: '인사팀',
    position: 'HR 매니저',
    reviewPeriod: '2025년 2분기',
    selfScore: 0,
    managerScore: 0,
    finalScore: 0,
    grade: 'B',
    status: 'pending',
    updatedAt: '2025-06-10',
  },
  {
    id: '6',
    employeeName: '한소희',
    department: '개발팀',
    position: '주니어 개발자',
    reviewPeriod: '2025년 1분기',
    selfScore: 75,
    managerScore: 78,
    finalScore: 77,
    grade: 'B',
    status: 'completed',
    updatedAt: '2025-04-05',
  },
  {
    id: '7',
    employeeName: '오태양',
    department: 'QA팀',
    position: 'QA 엔지니어',
    reviewPeriod: '2025년 2분기',
    selfScore: 88,
    managerScore: 85,
    finalScore: 86,
    grade: 'A',
    status: 'completed',
    updatedAt: '2025-07-01',
  },
];

const gradeColorMap: Record<string, string> = {
  S: '#FF9500',
  A: '#007AFF',
  B: '#34C759',
  C: '#8E8E93',
  D: '#FF3B30',
};

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '대기 중', color: 'default' },
  in_progress: { label: '진행 중', color: 'processing' },
  completed: { label: '완료', color: 'success' },
};

export default function PerformanceReviewList() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);

  const filteredData = mockReviews.filter((review) => {
    const matchesSearch =
      review.employeeName.includes(searchText) ||
      review.department.includes(searchText);
    const matchesStatus = !statusFilter || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (review: PerformanceReview) => {
    setSelectedReview(review);
    setDetailVisible(true);
  };

  const columns: ColumnsType<PerformanceReview> = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 100,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: '부서',
      dataIndex: 'department',
      key: 'department',
      width: 100,
      responsive: ['md'],
    },
    {
      title: '평가 기간',
      dataIndex: 'reviewPeriod',
      key: 'reviewPeriod',
      width: 120,
      responsive: ['lg'],
    },
    {
      title: '최종 점수',
      dataIndex: 'finalScore',
      key: 'finalScore',
      width: 130,
      sorter: (a, b) => a.finalScore - b.finalScore,
      render: (score: number, record: PerformanceReview) => {
        if (record.status === 'pending') return <Text type="secondary">-</Text>;
        return (
          <Space size={8}>
            <Progress
              percent={score}
              size="small"
              strokeColor={gradeColorMap[record.grade]}
              style={{ width: 70, marginBottom: 0 }}
              format={() => `${score}`}
            />
          </Space>
        );
      },
    },
    {
      title: '등급',
      dataIndex: 'grade',
      key: 'grade',
      width: 70,
      align: 'center',
      render: (grade: string, record: PerformanceReview) => {
        if (record.status === 'pending') return <Text type="secondary">-</Text>;
        return (
          <Tag
            color={gradeColorMap[grade]}
            style={{ fontWeight: 700, fontSize: 14, minWidth: 32, textAlign: 'center' }}
          >
            {grade}
          </Tag>
        );
      },
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: string) => {
        const info = statusMap[status];
        return <Tag color={info.color}>{info.label}</Tag>;
      },
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_: unknown, record: PerformanceReview) => (
        <Tooltip title="상세 보기">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{ color: '#007AFF' }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <FileTextOutlined style={{ color: '#007AFF' }} />
            <span>성과 리뷰 목록</span>
          </Space>
        }
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      >
        <Space wrap style={{ marginBottom: 16, width: '100%' }}>
          <Input
            placeholder="직원명 또는 부서 검색"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
          <Select
            placeholder="상태 필터"
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            allowClear
            style={{ width: 130 }}
            options={[
              { value: 'pending', label: '대기 중' },
              { value: 'in_progress', label: '진행 중' },
              { value: 'completed', label: '완료' },
            ]}
          />
        </Space>

        <Table<PerformanceReview>
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          size="middle"
          pagination={{ pageSize: 5, showSizeChanger: false, showTotal: (total) => `총 ${total}건` }}
          scroll={{ x: 600 }}
        />
      </Card>

      <Modal
        open={detailVisible}
        title="성과 평가 상세"
        onCancel={() => setDetailVisible(false)}
        footer={
          <Button type="primary" onClick={() => setDetailVisible(false)} style={{ backgroundColor: '#007AFF' }}>
            확인
          </Button>
        }
        width={560}
      >
        {selectedReview && (
          <Descriptions column={2} bordered size="small" style={{ marginTop: 16 }}>
            <Descriptions.Item label="직원명">{selectedReview.employeeName}</Descriptions.Item>
            <Descriptions.Item label="부서">{selectedReview.department}</Descriptions.Item>
            <Descriptions.Item label="직급">{selectedReview.position}</Descriptions.Item>
            <Descriptions.Item label="평가 기간">{selectedReview.reviewPeriod}</Descriptions.Item>
            <Descriptions.Item label="자기 평가 점수">
              {selectedReview.selfScore || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="매니저 평가 점수">
              {selectedReview.managerScore || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="최종 점수">
              <Text strong style={{ color: '#007AFF', fontSize: 16 }}>
                {selectedReview.finalScore || '-'}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="등급">
              {selectedReview.status !== 'pending' ? (
                <Tag color={gradeColorMap[selectedReview.grade]} style={{ fontWeight: 700 }}>
                  {selectedReview.grade}
                </Tag>
              ) : (
                '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="상태" span={2}>
              <Tag color={statusMap[selectedReview.status].color}>
                {statusMap[selectedReview.status].label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="종합 평점" span={2}>
              <Rate disabled value={Math.round(selectedReview.finalScore / 20)} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
