import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Grid, Spin } from 'antd';
import {
  ClockCircleOutlined,
  TeamOutlined,
  WarningOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchOvertimeStats } from '../api/attendanceApi';
import type { OvertimeStats } from '../types';

const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function OvertimeSummary() {
  const screens = useBreakpoint();
  const [stats, setStats] = useState<OvertimeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchOvertimeStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card
      title="초과근무 현황"
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
    >
      <Spin spinning={loading}>
        {stats && (
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card
                style={{
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #F2F2F7 0%, #FFFFFF 100%)',
                  border: 'none',
                }}
                bodyStyle={{ padding: screens.xs ? 12 : 16 }}
              >
                <Statistic
                  title={<Text style={{ fontSize: 12, color: '#8c8c8c' }}>전체 직원</Text>}
                  value={stats.totalEmployees}
                  suffix="명"
                  prefix={<TeamOutlined style={{ color: '#007AFF', marginRight: 4 }} />}
                  valueStyle={{ fontSize: screens.xs ? 20 : 24, color: '#007AFF', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                style={{
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #F2F2F7 0%, #FFFFFF 100%)',
                  border: 'none',
                }}
                bodyStyle={{ padding: screens.xs ? 12 : 16 }}
              >
                <Statistic
                  title={<Text style={{ fontSize: 12, color: '#8c8c8c' }}>평균 초과근무</Text>}
                  value={stats.avgOvertimeHours}
                  suffix="시간"
                  prefix={<ClockCircleOutlined style={{ color: '#FF9500', marginRight: 4 }} />}
                  valueStyle={{ fontSize: screens.xs ? 20 : 24, color: '#FF9500', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                style={{
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #F2F2F7 0%, #FFFFFF 100%)',
                  border: 'none',
                }}
                bodyStyle={{ padding: screens.xs ? 12 : 16 }}
              >
                <Statistic
                  title={<Text style={{ fontSize: 12, color: '#8c8c8c' }}>최대 초과근무</Text>}
                  value={stats.maxOvertimeHours}
                  suffix="시간"
                  prefix={<RiseOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />}
                  valueStyle={{ fontSize: screens.xs ? 20 : 24, color: '#ff4d4f', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                style={{
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #fff2e8 0%, #FFFFFF 100%)',
                  border: 'none',
                }}
                bodyStyle={{ padding: screens.xs ? 12 : 16 }}
              >
                <Statistic
                  title={<Text style={{ fontSize: 12, color: '#8c8c8c' }}>52시간 초과 위험</Text>}
                  value={stats.overLimitCount}
                  suffix="명"
                  prefix={<WarningOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />}
                  valueStyle={{ fontSize: screens.xs ? 20 : 24, color: '#ff4d4f', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col span={24}>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ fontSize: 13, color: '#333' }}>주간 초과근무 추세</Text>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.weeklyTrend} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#8c8c8c' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#8c8c8c' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => [`${value}시간`, '평균 초과근무']}
                    />
                    <Bar dataKey="hours" fill="#007AFF" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Col>
          </Row>
        )}
      </Spin>
    </Card>
  );
}
