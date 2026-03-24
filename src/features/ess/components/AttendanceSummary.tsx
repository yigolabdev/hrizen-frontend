import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  DatePicker,
  Space,
  Grid,
  Progress,
  Typography,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { useBreakpoint } = Grid;
const { Text } = Typography;

interface AttendanceRecord {
  key: string;
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: number;
  status: '정상' | '지각' | '조퇴' | '결근' | '휴가';
}

const generateMockData = (): AttendanceRecord[] => {
  const statuses: AttendanceRecord['status'][] = ['정상', '지각', '조퇴', '결근', '휴가'];
  const records: AttendanceRecord[] = [];
  for (let i = 1; i <= 22; i++) {
    const day = i.toString().padStart(2, '0');
    const statusIdx = i % 10 === 0 ? 1 : i % 15 === 0 ? 3 : i % 7 === 0 ? 4 : i % 11 === 0 ? 2 : 0;
    const status = statuses[statusIdx];
    const clockIn = status === '결근' || status === '휴가' ? '-' : status === '지각' ? '09:32' : '08:55';
    const clockOut = status === '결근' || status === '휴가' ? '-' : status === '조퇴' ? '16:00' : '18:05';
    const workHours = status === '결근' || status === '휴가' ? 0 : status === '조퇴' ? 6.5 : 8;
    records.push({
      key: String(i),
      date: `2025-01-${day}`,
      clockIn,
      clockOut,
      workHours,
      status,
    });
  }
  return records;
};

const statusColorMap: Record<AttendanceRecord['status'], string> = {
  정상: '#34C759',
  지각: '#FF9500',
  조퇴: '#FF9500',
  결근: '#FF3B30',
  휴가: '#007AFF',
};

export default function AttendanceSummary() {
  const screens = useBreakpoint();
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  const data = generateMockData();

  const totalDays = data.length;
  const normalDays = data.filter((r) => r.status === '정상').length;
  const lateDays = data.filter((r) => r.status === '지각').length;
  const absentDays = data.filter((r) => r.status === '결근').length;
  const leaveDays = data.filter((r) => r.status === '휴가').length;
  const attendanceRate = Math.round((normalDays / (totalDays - leaveDays)) * 100);

  const columns: ColumnsType<AttendanceRecord> = [
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
      width: 100,
    },
    {
      title: '퇴근',
      dataIndex: 'clockOut',
      key: 'clockOut',
      width: 100,
    },
    {
      title: '근무시간',
      dataIndex: 'workHours',
      key: 'workHours',
      width: 100,
      render: (val: number) => (val > 0 ? `${val}시간` : '-'),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: AttendanceRecord['status']) => (
        <Tag
          color={statusColorMap[status]}
          style={{ borderRadius: 8, fontWeight: 600, border: 'none' }}
        >
          {status}
        </Tag>
      ),
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
      <Space
        style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}
      >
        <Text strong style={{ fontSize: 16, color: '#1C1C1E' }}>
          월별 근태 현황
        </Text>
        <DatePicker
          picker="month"
          value={selectedMonth}
          onChange={(val) => val && setSelectedMonth(val)}
          allowClear={false}
          style={{ borderRadius: 8 }}
        />
      </Space>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>출근율</span>}
              value={attendanceRate}
              suffix="%"
              valueStyle={{ color: '#007AFF', fontWeight: 700 }}
              prefix={<CheckCircleOutlined />}
            />
            <Progress
              percent={attendanceRate}
              showInfo={false}
              strokeColor="#007AFF"
              trailColor="#F2F2F7"
              size="small"
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>정상 출근</span>}
              value={normalDays}
              suffix="일"
              valueStyle={{ color: '#34C759', fontWeight: 700 }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>지각</span>}
              value={lateDays}
              suffix="일"
              valueStyle={{ color: '#FF9500', fontWeight: 700 }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
            <Statistic
              title={<span style={{ color: '#8E8E93' }}>결근</span>}
              value={absentDays}
              suffix="일"
              valueStyle={{ color: '#FF3B30', fontWeight: 700 }}
              prefix={<WarningOutlined />}
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
          dataSource={data}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          scroll={{ x: 520 }}
          size={screens.md ? 'middle' : 'small'}
          style={{ borderRadius: 12, overflow: 'hidden' }}
        />
      </Card>
    </div>
  );
}
