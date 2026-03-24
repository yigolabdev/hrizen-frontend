import React, { useState, useEffect } from 'react';
import { Card, Badge, Calendar, Table, Tag, Select, Space, Grid, Spin, Typography } from 'antd';
import type { BadgeStatus } from 'antd/es/badge';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { fetchAttendanceRecords } from '../api/attendanceApi';
import type { AttendanceRecord } from '../types';

const { useBreakpoint } = Grid;
const { Text } = Typography;

const statusConfig: Record<AttendanceRecord['status'], { color: string; label: string; badge: BadgeStatus }> = {
  normal: { color: '#52c41a', label: '정상', badge: 'success' },
  late: { color: '#FF9500', label: '지각', badge: 'warning' },
  early_leave: { color: '#faad14', label: '조퇴', badge: 'warning' },
  absent: { color: '#ff4d4f', label: '결근', badge: 'error' },
  holiday: { color: '#d9d9d9', label: '휴일', badge: 'default' },
  leave: { color: '#007AFF', label: '휴가', badge: 'processing' },
};

export default function AttendanceCalendar() {
  const screens = useBreakpoint();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAttendanceRecords()
      .then(setRecords)
      .finally(() => setLoading(false));
  }, []);

  const getDateRecords = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    return records.filter((r) => r.date === dateStr);
  };

  const dateCellRender = (value: Dayjs) => {
    const dateRecords = getDateRecords(value);
    if (dateRecords.length === 0) return null;

    const statusCounts: Partial<Record<AttendanceRecord['status'], number>> = {};
    dateRecords.forEach((r) => {
      statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
    });

    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = statusConfig[status as AttendanceRecord['status']];
          return (
            <li key={status} style={{ marginBottom: 2 }}>
              <Badge status={config.badge} text={<Text style={{ fontSize: 11 }}>{config.label} {count}</Text>} />
            </li>
          );
        })}
      </ul>
    );
  };

  const selectedRecords = selectedDate
    ? records.filter((r) => r.date === selectedDate)
    : records;

  const tableColumns = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 100,
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '출근',
      dataIndex: 'clockIn',
      key: 'clockIn',
      width: 80,
      render: (v: string | null) => v || <Text type="secondary">-</Text>,
    },
    {
      title: '퇴근',
      dataIndex: 'clockOut',
      key: 'clockOut',
      width: 80,
      render: (v: string | null) => v || <Text type="secondary">-</Text>,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: AttendanceRecord['status']) => {
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: '초과근무',
      dataIndex: 'overtimeMinutes',
      key: 'overtimeMinutes',
      width: 100,
      render: (mins: number) => {
        if (mins === 0) return <Text type="secondary">-</Text>;
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return <Text style={{ color: mins > 120 ? '#ff4d4f' : '#333' }}>{h > 0 ? `${h}시간 ` : ''}{m > 0 ? `${m}분` : ''}</Text>;
      },
    },
  ];

  return (
    <Card
      title="출퇴근 기록"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      extra={
        <Select
          value={viewMode}
          onChange={setViewMode}
          style={{ width: 120 }}
          options={[
            { label: '캘린더 보기', value: 'calendar' },
            { label: '테이블 보기', value: 'table' },
          ]}
        />
      }
    >
      <Spin spinning={loading}>
        {viewMode === 'calendar' ? (
          <>
            <Calendar
              fullscreen={!screens.xs}
              cellRender={(date, info) => {
                if (info.type === 'date') return dateCellRender(date);
                return info.originNode;
              }}
              onSelect={(date) => setSelectedDate(date.format('YYYY-MM-DD'))}
            />
            {selectedDate && (
              <div style={{ marginTop: 16 }}>
                <Text strong style={{ fontSize: 14, color: '#007AFF' }}>
                  {selectedDate} 상세 기록
                </Text>
                <Table
                  dataSource={records.filter((r) => r.date === selectedDate)}
                  columns={tableColumns}
                  rowKey="id"
                  size="small"
                  pagination={false}
                  style={{ marginTop: 8 }}
                  scroll={{ x: 560 }}
                />
              </div>
            )}
          </>
        ) : (
          <Table
            dataSource={records}
            columns={tableColumns}
            rowKey="id"
            size="middle"
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 560 }}
          />
        )}
      </Spin>
    </Card>
  );
}
