import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Typography, Spin } from 'antd';
import { apiClient } from '@/lib/api';

interface OvertimeData {
  totalOvertimeHours: number;
  averageOvertimeHours: number;
  maxOvertimeHours: number;
}

const { Text } = Typography;

export default function OvertimeSummary() {
  const [data, setData] = useState<OvertimeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOvertime() {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));
      const mockData: OvertimeData = {
        totalOvertimeHours: 134.5,
        averageOvertimeHours: 2.7,
        maxOvertimeHours: 8.5,
      };
      setData(mockData);
      setLoading(false);
    }
    fetchOvertime();
  }, []);

  if (loading || data === null) {
    return <Spin />;
  }

  return (
    <Row justify="space-around" align="middle">
      <Col span={8} style={{ textAlign: 'center' }}>
        <Statistic
          title="총 초과근무 시간"
          value={data.totalOvertimeHours}
          suffix="시간"
          valueStyle={{ color: '#007AFF' }}
        />
      </Col>
      <Col span={8} style={{ textAlign: 'center' }}>
        <Statistic
          title="평균 초과근무 시간"
          value={data.averageOvertimeHours}
          precision={1}
          suffix="시간"
          valueStyle={{ color: '#FF9500' }}
        />
      </Col>
      <Col span={8} style={{ textAlign: 'center' }}>
        <Statistic
          title="최대 초과근무 시간"
          value={data.maxOvertimeHours}
          precision={1}
          suffix="시간"
          valueStyle={{ color: 'red' }}
        />
      </Col>
    </Row>
  );
}
