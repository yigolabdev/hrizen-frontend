import { useState } from 'react';
import { Form, Button, DatePicker, Select, Input, Card, Table, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const leaveTypes = ['연차', '반차(오전)', '반차(오후)', '병가', '경조사', '출산휴가'];

interface LeaveRecord {
  key: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockData: LeaveRecord[] = [
  { key: '1', leaveType: '연차', startDate: '2026-03-10', endDate: '2026-03-12', reason: '가족 여행', status: 'approved' },
  { key: '2', leaveType: '반차(오전)', startDate: '2026-03-20', endDate: '2026-03-20', reason: '병원 방문', status: 'pending' },
  { key: '3', leaveType: '병가', startDate: '2026-03-05', endDate: '2026-03-05', reason: '감기', status: 'approved' },
];

const statusColors: Record<string, string> = {
  pending: 'orange',
  approved: 'green',
  rejected: 'red',
};

const statusLabels: Record<string, string> = {
  pending: '대기중',
  approved: '승인',
  rejected: '반려',
};

const columns = [
  { title: '휴가 유형', dataIndex: 'leaveType', key: 'leaveType' },
  { title: '시작일', dataIndex: 'startDate', key: 'startDate' },
  { title: '종료일', dataIndex: 'endDate', key: 'endDate' },
  { title: '사유', dataIndex: 'reason', key: 'reason' },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
    ),
  },
];

export default function LeaveApplicationForm() {
  const [form] = Form.useForm();
  const [data, setData] = useState<LeaveRecord[]>(mockData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { leaveType: string; dates: [dayjs.Dayjs, dayjs.Dayjs]; reason: string }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const newRecord: LeaveRecord = {
      key: Date.now().toString(),
      leaveType: values.leaveType,
      startDate: values.dates[0].format('YYYY-MM-DD'),
      endDate: values.dates[1].format('YYYY-MM-DD'),
      reason: values.reason,
      status: 'pending',
    };
    setData((prev) => [newRecord, ...prev]);
    form.resetFields();
    setLoading(false);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="휴가 신청" size="small">
        <Form form={form} layout="inline" onFinish={handleSubmit} style={{ flexWrap: 'wrap', gap: 8 }}>
          <Form.Item name="leaveType" rules={[{ required: true, message: '유형 선택' }]}>
            <Select placeholder="휴가 유형" style={{ width: 140 }}>
              {leaveTypes.map((t) => (
                <Select.Option key={t} value={t}>{t}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="dates" rules={[{ required: true, message: '날짜 선택' }]}>
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="reason" rules={[{ required: true, message: '사유 입력' }]}>
            <Input placeholder="사유" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading}>
              신청
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="신청 내역" size="small">
        <Table dataSource={data} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}
