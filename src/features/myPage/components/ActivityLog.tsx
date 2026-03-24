import React from 'react';
import { Table, Typography } from 'antd';
import dayjs from 'dayjs';

interface ActivityEntry {
  id: string;
  date: string;
  action: string;
  detail: string;
}

interface ActivityLogProps {
  entries: ActivityEntry[];
}

export default function ActivityLog({ entries }: ActivityLogProps) {
  const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format('YYYY.MM.DD HH:mm'),
      width: 160,
      sorter: (a: ActivityEntry, b: ActivityEntry) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      defaultSortOrder: 'descend' as const,
    },
    {
      title: '동작',
      dataIndex: 'action',
      key: 'action',
      width: 150,
    },
    {
      title: '상세',
      dataIndex: 'detail',
      key: 'detail',
      ellipsis: true,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={entries}
      rowKey={(record) => record.id}
      pagination={{ pageSize: 5 }}
      style={{ maxWidth: 960, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 }}
    />
  );
}
