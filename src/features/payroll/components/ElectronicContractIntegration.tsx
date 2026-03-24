import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Timeline,
  Badge,
  Tooltip,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  FileProtectOutlined,
  PlusOutlined,
  SendOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  FileDoneOutlined,
  ClockCircleOutlined,
  EditOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { ElectronicContract } from '@/features/payroll/types';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Text } = Typography;

const initialContracts: ElectronicContract[] = [
  {
    id: 'EC001',
    employeeName: '김지수',
    contractType: '근로계약서',
    status: 'signed',
    createdAt: '2024-07-01',
    signedAt: '2024-07-02',
  },
  {
    id: 'EC002',
    employeeName: '박민수',
    contractType: '연봉계약서',
    status: 'signed',
    createdAt: '2024-07-01',
    signedAt: '2024-07-03',
  },
  {
    id: 'EC003',
    employeeName: '이수진',
    contractType: '근로계약서',
    status: 'sent',
    createdAt: '2024-07-10',
    signedAt: null,
  },
  {
    id: 'EC004',
    employeeName: '최현우',
    contractType: '수습계약서',
    status: 'draft',
    createdAt: '2024-07-12',
    signedAt: null,
  },
  {
    id: 'EC005',
    employeeName: '정다은',
    contractType: '연봉계약서',
    status: 'expired',
    createdAt: '2023-07-01',
    signedAt: '2023-07-02',
  },
];

const contractStatusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  draft: { color: 'default', label: '초안', icon: <EditOutlined /> },
  sent: { color: 'processing', label: '서명 대기', icon: <ClockCircleOutlined /> },
  signed: { color: 'success', label: '서명 완료', icon: <CheckCircleOutlined /> },
  expired: { color: 'error', label: '만료', icon: <WarningOutlined /> },
};

export default function ElectronicContractIntegration() {
  const [contracts, setContracts] = useState<ElectronicContract[]>(initialContracts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ElectronicContract | null>(null);
  const [form] = Form.useForm();

  const signedCount = contracts.filter((c) => c.status === 'signed').length;
  const pendingCount = contracts.filter((c) => c.status === 'sent' || c.status === 'draft').length;
  const expiredCount = contracts.filter((c) => c.status === 'expired').length;

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const newContract: ElectronicContract = {
        id: `EC${String(contracts.length + 1).padStart(3, '0')}`,
        employeeName: values.employeeName,
        contractType: values.contractType,
        status: 'draft',
        createdAt: dayjs().format('YYYY-MM-DD'),
        signedAt: null,
      };
      setContracts((prev) => [newContract, ...prev]);
      setIsModalOpen(false);
      form.resetFields();
      message.success('전자계약이 생성되었습니다.');
    });
  };

  const handleSend = (contract: ElectronicContract) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === contract.id ? { ...c, status: 'sent' as const } : c))
    );
    message.success(`${contract.employeeName}님에게 서명 요청을 보냈습니다.`);
  };

  const handleViewDetail = (contract: ElectronicContract) => {
    setSelectedContract(contract);
    setIsDetailOpen(true);
  };

  const columns: ColumnsType<ElectronicContract> = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 90,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: '계약 유형',
      dataIndex: 'contractType',
      key: 'contractType',
      width: 110,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const config = contractStatusConfig[status];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {config?.label}
          </Tag>
        );
      },
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      responsive: ['md'],
    },
    {
      title: '액션',
      key: 'action',
      width: 140,
      render: (_: unknown, record: ElectronicContract) => (
        <Space size={4}>
          <Tooltip title="상세 보기">
            <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)} />
          </Tooltip>
          {record.status === 'draft' && (
            <Tooltip title="서명 요청 발송">
              <Button
                type="link"
                size="small"
                icon={<SendOutlined />}
                style={{ color: '#007AFF' }}
                onClick={() => handleSend(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <FileProtectOutlined style={{ color: '#007AFF' }} />
            <span>전자계약 연동</span>
          </Space>
        }
        bordered={false}
        style={{ borderRadius: 12 }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
        extra={
          <Button
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}
          >
            계약 생성
          </Button>
        }
      >
        <Row gutter={[16, 12]} style={{ marginBottom: 16 }}>
          <Col xs={8}>
            <Statistic
              title={<Text style={{ fontSize: 12 }}>서명 완료</Text>}
              value={signedCount}
              valueStyle={{ color: '#52c41a', fontSize: 20 }}
              prefix={<Badge status="success" />}
            />
          </Col>
          <Col xs={8}>
            <Statistic
              title={<Text style={{ fontSize: 12 }}>대기 중</Text>}
              value={pendingCount}
              valueStyle={{ color: '#007AFF', fontSize: 20 }}
              prefix={<Badge status="processing" />}
            />
          </Col>
          <Col xs={8}>
            <Statistic
              title={<Text style={{ fontSize: 12 }}>만료</Text>}
              value={expiredCount}
              valueStyle={{ color: '#ff4d4f', fontSize: 20 }}
              prefix={<Badge status="error" />}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={contracts}
          rowKey="id"
          pagination={{ pageSize: 5, size: 'small' }}
          size="small"
          scroll={{ x: 500 }}
        />
      </Card>

      {/* 계약 생성 모달 */}
      <Modal
        title="전자계약 생성"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={handleCreate}
        okText="생성"
        cancelText="취소"
        okButtonProps={{ style: { backgroundColor: '#007AFF', borderColor: '#007AFF' } }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="employeeName"
            label="직원명"
            rules={[{ required: true, message: '직원명을 입력하세요' }]}
          >
            <Input placeholder="직원명" />
          </Form.Item>
          <Form.Item
            name="contractType"
            label="계약 유형"
            rules={[{ required: true, message: '계약 유형을 선택하세요' }]}
          >
            <Select
              placeholder="계약 유형 선택"
              options={[
                { value: '근로계약서', label: '근로계약서' },
                { value: '연봉계약서', label: '연봉계약서' },
                { value: '수습계약서', label: '수습계약서' },
                { value: '파견계약서', label: '파견계약서' },
                { value: '비밀유지계약서', label: '비밀유지계약서' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 계약 상세 모달 */}
      <Modal
        title="전자계약 상세"
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={
          <Button onClick={() => setIsDetailOpen(false)}>닫기</Button>
        }
        width={500}
      >
        {selectedContract && (
          <div style={{ padding: '8px 0' }}>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div>
                <Text type="secondary">직원명</Text>
                <br />
                <Text strong style={{ fontSize: 16 }}>{selectedContract.employeeName}</Text>
              </div>
              <div>
                <Text type="secondary">계약 유형</Text>
                <br />
                <Tag color="blue">{selectedContract.contractType}</Tag>
              </div>
              <div>
                <Text type="secondary">현재 상태</Text>
                <br />
                <Tag
                  color={contractStatusConfig[selectedContract.status]?.color}
                  icon={contractStatusConfig[selectedContract.status]?.icon}
                >
                  {contractStatusConfig[selectedContract.status]?.label}
                </Tag>
              </div>

              <div>
                <Text type="secondary" style={{ marginBottom: 8, display: 'block' }}>진행 이력</Text>
                <Timeline
                  items={[
                    {
                      color: 'green',
                      children: `계약서 생성 - ${selectedContract.createdAt}`,
                    },
                    ...(selectedContract.status !== 'draft'
                      ? [
                          {
                            color: 'blue' as const,
                            children: '서명 요청 발송',
                          },
                        ]
                      : []),
                    ...(selectedContract.signedAt
                      ? [
                          {
                            color: 'green' as const,
                            children: `전자 서명 완료 - ${selectedContract.signedAt}`,
                          },
                        ]
                      : []),
                    ...(selectedContract.status === 'expired'
                      ? [
                          {
                            color: 'red' as const,
                            children: '계약 만료',
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            </Space>
          </div>
        )}
      </Modal>
    </>
  );
}
