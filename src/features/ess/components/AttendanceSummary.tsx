import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Typography, Spin } from 'antd';

const { Title, Text } = Typography;

type AttendanceStatus = {
  date: string;
  status: '출근' | '지각' | '결근' | '외출' | '조퀴';
  checkIn?: string;
  checkOut?: string;
};

type AttendanceSummaryData = {
  month: string;
  totalWorkDays: number;
  daysAttended: number;
  daysLate: number;
  daysAbsent: number;
  attendanceStatuses: AttendanceStatus[];
};

export default function AttendanceSummary() {
  const [data, setData] = useState<AttendanceSummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Mock api
    setTimeout(() => {
      const mockData: AttendanceSummaryData = {
        month: '2024-06',
        totalWorkDays: 22,
        daysAttended: 20,
        daysLate: 1,
        daysAbsent: 1,
        attendanceStatuses: [
          { date: '2024-06-01', status: '출근', checkIn: '08:55', checkOut: '18:05' },
          { date: '2024-06-02', status: '출근', checkIn: '09:10', checkOut: '18:00' },
          { date: '2024-06-03', status: '조턴', checkIn: '08:50', checkOut: '16:00' },
          { date: '2024-06-04', status: '결근' },
        ],
      };
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !data) {
    return <Spin tip="로딩 중..." />;
  }

  return (
    <Card
      title={<Title level={4} style={{ margin: 0, color: '#007AFF' }}>근텀 현핍  {data.month})</Title>}
      bordered={false}
      style={{ borderRadius: 12 }}
    >
      <Row gutter={[24, 16]} justify="space-around">
        <Col xs={12} sm={6}>
          <Statistic title="총 근무일" value={data.totalWorkDays} />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic title="출근일" value={data.daysAttended} valueStyle={{ color: '#007AFF' }} />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic title="지각일" value={data.daysLate} valueStyle={{ color: '#FF9500' }} />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic title="겱淼일" value={data.daysAbsent} valueStyle={{ color: '#FF3B30' }} />
        </Col>
      </Row>
      <div style={{ marginTop: 24, maxHeight: 200, overflowY: 'auto' }}>
        <Title level={5} style={{ color: '#007AFF' }}>최근 근태 기록</Title>
        {data.attendanceStatuses.map(({ date, status, checkIn, checkOut }) => (
          <Row
            key={date}
            justify="space-between"
            style={{ padding: '4px 0', borderBottom: '1px solid #E6E6E6' }}
          >
            <Text>{date}</Text>
            <Text
              style={{
                color:
                  status === '결ʷ�'
                    ? '#FF3B30'
                    : status === '지각'
                    ? '#FF9500'
                    : '#007AFF',
              }}
            >
              {status}
            </Text>
            <Text type="secondary">
              {checkIn ? `${checkIn} ~ ${checkOut || '-'}` : '-'}
            </Text>
          </Row>
        ))}
      </div>
    </Card>
  );
}
