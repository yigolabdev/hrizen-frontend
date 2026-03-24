import React, { useState } from 'react';
import {
  Card,
  Form,
  Select,
  DatePicker,
  Input,
  Button,
  Table,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  message,
  Grid,
} from 'antd';
import {
  PlusOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

interface LeaveRecord {
  key: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: '승인' | '대기' | '반려';
  appliedDate: string;
}

const mockLeaveRecords: LeaveRecord[] = [
  {
    key: '1',
    type: '연차',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    days: 3,
    reason: '개인 사유',
    status: '승인',
    appliedDate: '2025-01-10',
  },
  {
    key: '2',
    type: '반차(오전)',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    days: 0.5,
    reason: '병원 방문',
    status: '승인',
    appliedDate: '2025-01-20',
  },
  {
    key: '3',
    type: '경조휴가',
    startDate: '2025-02-05',
    endDate: '2025-02-07',
    days: 3,
    reason: '결혼',
    status: '대기',
    appliedDate: '2025-01-28',
  },
  {
    key: '4',
    type: '연차',
    startDate: '2024-12-24',
    endDate: '2024-12-25',
    days: 2,
    reason: '연말 휴가',
    status: '반려',
    appliedDate: '2024-12-15',
  },
];

const leaveTypeOptions = [
  { label: '연차', value: '연차' },
  { label: '반차(오전)', value: '반차(오전)' },
  { label: '반차(오후)', value: '반차(오후)' },
  { label: '병가', value: '병가' },
  { label: '경조휴가', value: '경조휴가' },
  { label: '공가', value: '공가' },
  { label: '특별휴가', value: '특별휴가' },
];

const statusColorMap: Record<LeaveRecord['status'], string> = {
  승인: '#34C759',
  대기: '#FF9500',
  반려: '#FF3B30',
};

const statusIconMap: Record<LeaveRecord['status'], React.ReactNode> = {
  승인: <CheckCircleOutlined />,
  대기: <ClockCircleOutlined />,
  반려: <CloseCircleOutlined />,
};

export default function LeaveApplicationForm() {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<LeaveRecord[]>(mockLeaveRecords);
  const [messageApi, contextHolder] = message.useMessage();

  const totalLeave = 15;
  const usedLeave = 5.5;
  const pendingLeave = 3;
  const remainingLeave = totalLeave - usedLeave;

  const handleSubmit = (values: { type: string; dateRange: [dayjs.Dayjs, dayjs.Dayjs]; reason: string }) => {
    const startDate = values.dateRange[0].format('YYYY-MM-DD');
    const endDate = values.dateRange[1].format('YYYY-MM-DD');
    const days = values.dateRange[1].diff(values.dateRange[0], 'day') + 1;

    const newRecord: LeaveRecord = {
      key: String(records.length + 1),
      type: values.type,
      startDate,
      endDate,
      days: values.type.includes('반차') ? 0.5 : days,
      reason: values.reason,
      status: '대기',
      appliedDate: dayjs().format('YYYY-MM-DD'),
    };

    setRecords([newRecord, ...records]);
    form.resetFields();
    setIsModalOpen(false);
    messageApi.success('휴가 신청이 완료되었습니다.');
  };

  const columns: ColumnsType<LeaveRecord> = [
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      width: 110,
      render: (type: string) => (
        <Tag style={{ borderRadius: 6, fontWeight: 600, background: '#F2F2F7', border: 'none', color: '#007AFF' }}>
          {type}
        </Tag>
      ),
    },
    {
      title: '기간',
      key: 'period',
      width: 200,
      render: (_: unknown, record: LeaveRecord) =>
        record.startDate === record.endDate
          ? record.startDate
          : `${record.startDate} ~ ${record.endDate}`,
    },
    {
      title: '일수',
      dataIndex: 'days',
      key: 'days',
      width: 80,
      render: (d: number) => `${d}일`,
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: LeaveRecord['status']) => (
        <Tag
          icon={statusIconMap[status]}
          color={statusColorMap[status]}
          style={{ borderRadius: 8, border: 'none', fontWeight: 600 }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: '신청일',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      width: 120,
    },
  ];

  const cardStyle: React.CSSProperties = {
    borderRadius: 12,
    border: 'none',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    height: '100%',
  };

  return (
    <div>
      {contextHolder}
      <Space
        style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}
      >
        <Space>
          <CalendarOutlined style={{ fontSize: 18, color: '#007AFF' }} />
          <Text strong style={{ fontSize: 16, color: '#1C1C1E' }}>
            휴가 관리
          </Text>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          style={{ borderRadius: 8, background: '#007AFF', borderColor: '#007AFF' }}
        >
          휴가 신청
        </Button>
      </Space>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={8}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>총 연차</span>}
              value={totalLeave}
              suffix="일"
              valueStyle={{ color: '#007AFF', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={8}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>사용</span>}
              value={usedLeave}
              suffix="일"
              valueStyle={{ color: '#FF9500', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={8}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>잔여</span>}
              value={remainingLeave}
              suffix="일"
              valueStyle={{ color: '#34C759', fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        style={{ borderRadius: 12, border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={records}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={{ x: 700 }}
          size={screens.md ? 'middle' : 'small'}
          style={{ borderRadius: 12, overflow: 'hidden' }}
        />
      </Card>

      <Modal
        title="휴가 신청"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
        styles={{ header: { borderBottom: '1px solid #F2F2F7' } }}
        style={{ borderRadius: 12 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="type"
            label="휴가 유형"
            rules={[{ required: true, message: '휴가 유형을 선택해주세요.' }]}
          >
            <Select
              placeholder="휴가 유형을 선택하세요"
              options={leaveTypeOptions}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="기간"
            rules={[{ required: true, message: '기간을 선택해주세요.' }]}
          >
            <RangePicker
              style={{ width: '100%', borderRadius: 8 }}
              placeholder={['시작일', '종료일']}
            />
          </Form.Item>
          <Form.Item
            name="reason"
            label="사유"
            rules={[{ required: true, message: '사유를 입력해주세요.' }]}
          >
            <TextArea
              rows={3}
              placeholder="휴가 사유를 입력하세요"
              maxLength={200}
              showCount
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  form.resetFields();
                }}
                style={{ borderRadius: 8 }}
              >
                취소
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: 8, background: '#007AFF', borderColor: '#007AFF' }}
              >
                신청하기
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
