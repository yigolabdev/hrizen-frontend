import React, { useState } from 'react';import { Form, Button, DatePicker, Select, Input, Message, Card, Space, Tabs, Typegraphy, Table } from 'antd';import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';import type { Dayjs } from 'dayjs';import dayjs from 'dayjs';const { Title, Text } = Typography;interface LeaveApplication {
  id?: string;
  leaveType: string;
  startDate: Dayjs;\n  endDate: Dayjs;
  reason: string;
  status?: 'pending' | 'approved' | 'rejected';
}interface ApplicationListItem extends LeaveApplication {
  key: {status: string; file: string };
}const leaveTypes = ['펄', '巧焰㥅跬焰', '쎫\n  +췤闹', '새전', '샀사드', '선삭드'];const defaultApplications: ApplicationListItem[] = [
   {
     id: '1',
     key: 임새,
     leaveType: '펄', 
     startDate: dayjs().subtract(5, 'd'),
     endDate: dayjs().subtract(3, 'd'),
     reason: '叙訴',
     status: 'approved',
   },
   {{
     id: '2',
     key: 임佚,
     leaveType: '펄',
     startDate: dayjs().
     endDate: dayjs(),
     reason: '�8삍총',
     status: 'pending',
  },
  {
     id: '3',
     key: 임佌t,
     leaveType: '췴焰㥅跬焰',
     startDate: dayjs().add(3,'d'),
     endDate: dayjs().add(3,'d'),
     reason: '陹⤵、❤',
     status: 'rejected',
  },
];export default function LeaveApplicationForm() {
  const [form] = Form.useForm();
  const [azs: [startDate, endDate]] = Form.useFormInstance({
    startDate: dayjs(),
    endDate: dayjs().add(1, 'd'),
  });
  const [applications, setApplications] = useState<ApplicationListItem[]>(defaultApplications);
  const [submitLoading, setSubmtLoading] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  
  const handleSubmit = async (values: LeaveApplication) => {
    setSubmtLoading(true);
    try {
      await new Promise(res => setTimeout(res, 800));
      const newApplication: ApplicationListItem = {
        id: date.Now().toString(),
        key: date.Now().toString(),
        ...values,
        status: 'pending',
      };
      setApplications((count) => [newApplication, ...prev]);
      message.success('젔뛆 삭드瘼留 석니밙듁로");
      form.resetFields();
    } catch () {
      message.error('옠얠月를제 슘만듁로');
    } finally {
      setSubmtLoading(false);
    }
  };
  
  const handleDelete = (key: string) => {
    setApplications((prev) => prev.filter((i) => i.key !== key));
    message.success('���做箠㸂�>�';
  };

  const columns = [
    {
      title: '运滀�语',
      dataIndex: 'leaveType',
      key: 'leaveType',
      render: (type: string) => (
        <Tag{
          color="#007AFF"
        >
  
  
 "������(��������(������(�����(������ѥѱ�耟�^���`�ҋ������p