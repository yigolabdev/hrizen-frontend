import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Modal,
  Descriptions,
  Divider,
  Grid,
  Empty,
  message,
} from 'antd';
import {
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  EditOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Text, Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface ContractDocument {
  key: string;
  title: string;
  type: string;
  createdDate: string;
  effectiveDate: string;
  expiryDate: string;
  status: '서명완료' | '서명대기' | '만료';
  description: string;
  parties: string;
}

const mockContracts: ContractDocument[] = [
  {
    key: '1',
    title: '근로계약서 (2025년)',
    type: '근로계약',
    createdDate: '2025-01-02',
    effectiveDate: '2025-01-01',
    expiryDate: '2025-12-31',
    status: '서명완료',
    description: '2025년도 정규직 근로계약서입니다. 근무 조건, 급여, 복리후생 등의 내용이 포함되어 있습니다.',
    parties: '(주)HRiZen · 홍길동',
  },
  {
    key: '2',
    title: '연봉계약서 (2025년)',
    type: '연봉계약',
    createdDate: '2025-01-02',
    effectiveDate: '2025-01-01',
    expiryDate: '2025-12-31',
    status: '서명대기',
    description: '2025년도 연봉 조정에 따른 연봉계약서입니다. 기본급 및 성과급 조건이 명시되어 있습니다.',
    parties: '(주)HRiZen · 홍길동',
  },
  {
    key: '3',
    title: '비밀유지서약서 (NDA)',
    type: '서약서',
    createdDate: '2024-03-15',
    effectiveDate: '2024-03-15',
    expiryDate: '2027-03-14',
    status: '서명완료',
    description: '영업비밀 및 기밀정보 보호에 관한 비밀유지서약서입니다.',
    parties: '(주)HRiZen · 홍길동',
  },
  {
    key: '4',
    title: '근로계약서 (2024년)',
    type: '근로계약',
    createdDate: '2024-01-02',
    effectiveDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: '만료',
    description: '2024년도 정규직 근로계약서입니다.',
    parties: '(주)HRiZen · 홍길동',
  },
];

const statusConfig: Record<ContractDocument['status'], { color: string; icon: React.ReactNode }> = {
  서명완료: { color: '#34C759', icon: <CheckCircleOutlined /> },
  서명대기: { color: '#FF9500', icon: <ClockCircleOutlined /> },
  만료: { color: '#8E8E93', icon: <ClockCircleOutlined /> },
};

export default function ContractDocuments() {
  const screens = useBreakpoint();
  const [selectedContract, setSelectedContract] = useState<ContractDocument | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleView = (record: ContractDocument) => {
    setSelectedContract(record);
    setIsDetailOpen(true);
  };

  const handleSign = (record: ContractDocument) => {
    messageApi.success(`"${record.title}" 전자서명이 완료되었습니다.`);
  };

  const columns: ColumnsType<ContractDocument> = [
    {
      title: '문서명',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => (
        <Space>
          <FileTextOutlined style={{ color: '#007AFF' }} />
          <Text strong>{title}</Text>
        </Space>
      ),
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      width: 110,
      render: (type: string) => (
        <Tag style={{ borderRadius: 6, background: '#F2F2F7', border: 'none', color: '#3C3C43', fontWeight: 600 }}>
          {type}
        </Tag>
      ),
    },
    {
      title: '유효기간',
      key: 'period',
      width: 220,
      render: (_: unknown, record: ContractDocument) => (
        <Text style={{ color: '#8E8E93', fontSize: 13 }}>
          {record.effectiveDate} ~ {record.expiryDate}
        </Text>
      ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: ContractDocument['status']) => (
        <Tag
          icon={statusConfig[status].icon}
          color={statusConfig[status].color}
          style={{ borderRadius: 8, border: 'none', fontWeight: 600 }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: '작업',
      key: 'actions',
      width: 200,
      render: (_: unknown, record: ContractDocument) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ color: '#007AFF' }}
          >
            보기
          </Button>
          {record.status === '서명대기' && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleSign(record)}
              style={{ borderRadius: 6, background: '#FF9500', borderColor: '#FF9500' }}
            >
              서명
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Space style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Space>
          <FileTextOutlined style={{ fontSize: 18, color: '#007AFF' }} />
          <Text strong style={{ fontSize: 16, color: '#1C1C1E' }}>
            전자계약 문서
          </Text>
        </Space>
        <Text style={{ color: '#8E8E93', fontSize: 13 }}>
          총 {mockContracts.length}건의 문서
        </Text>
      </Space>

      <Card
        style={{ borderRadius: 12, border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={mockContracts}
          pagination={false}
          scroll={{ x: 750 }}
          size={screens.md ? 'middle' : 'small'}
          style={{ borderRadius: 12, overflow: 'hidden' }}
        />
      </Card>

      <Modal
        title={selectedContract?.title ?? '문서 상세'}
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        width={640}
        footer={
          <Space>
            <Button onClick={() => setIsDetailOpen(false)} style={{ borderRadius: 8 }}>
              닫기
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ borderRadius: 8, background: '#007AFF', borderColor: '#007AFF' }}
            >
              PDF 다운로드
            </Button>
          </Space>
        }
        styles={{ header: { borderBottom: '1px solid #F2F2F7' } }}
      >
        {selectedContract ? (
          <div style={{ marginTop: 8 }}>
            <Descriptions column={1} size="small" colon={false}>
              <Descriptions.Item label="문서 유형">
                <Tag style={{ borderRadius: 6, background: '#F2F2F7', border: 'none', fontWeight: 600 }}>
                  {selectedContract.type}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="계약 당사자">
                <Text>{selectedContract.parties}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="작성일">
                <Text>{selectedContract.createdDate}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="유효기간">
                <Text>{selectedContract.effectiveDate} ~ {selectedContract.expiryDate}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="상태">
                <Tag
                  icon={statusConfig[selectedContract.status].icon}
                  color={statusConfig[selectedContract.status].color}
                  style={{ borderRadius: 8, border: 'none', fontWeight: 600 }}
                >
                  {selectedContract.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            <Divider style={{ margin: '16px 0' }} />
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>문서 내용</Text>
              <Card
                style={{
                  borderRadius: 8,
                  background: '#F2F2F7',
                  border: 'none',
                  minHeight: 120,
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Paragraph style={{ color: '#3C3C43', margin: 0 }}>
                  {selectedContract.description}
                </Paragraph>
              </Card>
            </div>
          </div>
        ) : (
          <Empty description="문서 정보를 불러올 수 없습니다." />
        )}
      </Modal>
    </div>
  );
}
