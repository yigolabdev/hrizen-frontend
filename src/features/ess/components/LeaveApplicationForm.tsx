import React, { useState } from 'react';
import { Form, DatePicker, Input, Button, Card, message, Typography, Select } from 'antd';
import { apiClient } from '@/lib/api';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const leaveTypes = [
  { label: '연차휴가', value: 'annual' },
  { label: '병가', value: 'sick' },
  { label: '출산휴가', value: 'maternity' },
  { label: '공가', value: 'official' },
];

export default function LeaveApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: {
    leaveType: string;
    dateRange: [moment.Moment, moment.Moment];
    reason: string;
  }) => {
    setLoading(true);
    apiClient
      .post('/ess/leave-application', {
        leaveType: values.leaveType,
        from: values.dateRange[0].format('YYYY-MM-DD'),
        to: values.dateRange[1].format('YYYY-MM-DD'),
        reason: values.reason,
      })
      .then(() => {
        message.success('휴가 신청이 접수되었습니다.');
        form.resetFields();
      })
      .catch(() => {
        message.error('휴가 신청 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card
      title={<Title level={4} style={{ margin: 0, color: '#007AFF' }}>휴가 신청</Title>}
      bordered={false}
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: '16px' }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="leaveType"
          label="휴가 유형"
          rules={[{ required: true, message: '휴가 유형을 선택하세요.' }]}
        >
          <Select options={leaveTypes} placeholder="휴가 유형을 선택하세요." />
        </Form.Item>

        <Form.Item
          name="dateRange"
          label="휴가 기간"
          rules={[{ required: true, message: '휴가 기간을 선택하세요.' }]}
        >
          <RangePicker style={{ width: '100%' }} allowClear={false} />
        </Form.Item>

        <Form.Item
          name="reason"
          label="사유"
          rules={[{ required: true, message: '휴가 사유를 입력하세요.' }]}
        >
          <TextArea rows={4} placeholder="휴가 사유를 입력하세요." maxLength={300} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            신청하기
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
