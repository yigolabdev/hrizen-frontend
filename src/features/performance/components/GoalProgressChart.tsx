import React, { useEffect, useState } from 'react';
import { Card, Statistic, Progress, Row, Col, Typography, Space } from 'antd';
import { apiClient } from '@/lib/api';

interface GoalProgress {
  objective: string;
  progressPercent: number;
}

export default function GoalProgressChart() {
  const [progressData, setProgressData] = useState<GoalProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState<number>(0);

  useEffect(() => {
    // Mock API 호출
    apiClient.get<GoalProgress[]>('/goal-progress').then((res) => {
      setProgressData(res);
      const avg = res.reduce((acc, cur) => acc + cur.progressPercent, 0) / res.length || 0;
      setOverallProgress(Math.round(avg));
    }).catch(() => {
      setProgressData([]);
      setOverallProgress(0);
    });
  }, []);

  return (
    <Card bodyStyle={{ padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12 }}>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Typography.Title level={4} style={{ marginBottom: 0, fontWeight: 'bold', color: '#007AFF' }}>
          전체 목표 달성률
        </Typography.Title>
        <Progress
          type="circle"
          percent={overallProgress}
          strokeColor="#007AFF"
          width={120}
          style={{ marginTop: 12 }}
        />
      </Row>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {progressData.map((item) => (
          <div key={item.objective} style={{ width: '100%' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 4 }}>
              <Col flex="auto">
                <Statistic
                  title={<span style={{ color: '#333333', fontWeight: 600 }}>{item.objective}</span>}
                  value={item.progressPercent}
                  suffix="%"
                  valueStyle={{ color: '#007AFF' }}
                />
              </Col>
            </Row>
            <Progress percent={item.progressPercent} strokeColor="#007AFF" />
          </div>
        ))}

        {progressData.length === 0 && <Typography.Text type="secondary">목표 데이터가 없습니다.</Typography.Text>}
      </Space>
    </Card>
  );
}
