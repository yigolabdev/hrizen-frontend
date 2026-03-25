import React from 'react';
import { Card, Statistic, Row, Col, Progress, Typography, Space, Divider, Tooltip as AntTooltip, List, Tag } from 'antd';
import {
  RobotOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
  RiseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const { Text, Title } = Typography;

interface ModelUsage {
  name: string;
  value: number;
  color: string;
}

const modelUsageData: ModelUsage[] = [
  { name: '이직 예측', value: 342, color: '#007AFF' },
  { name: '근태 이상 탐지', value: 287, color: '#FF9500' },
  { name: '비용 분석', value: 198, color: '#34C759' },
  { name: '성과 예측', value: 156, color: '#AF52DE' },
  { name: '인재 추천', value: 89, color: '#FF2D55' },
];

interface InsightItem {
  id: string;
  text: string;
  type: 'positive' | 'warning' | 'neutral';
}

const aiInsights: InsightItem[] = [
  { id: '1', text: '개발팀 이짂 위험이 전월 대비 12% 증가했습니다. 1:1 면틀을 권장쵔니다.', type: 'warning' },
  { id: '2', text: '전사 근태 준수율이 93%로 목표(90%)를 달성했습니다.', type: 'positive' },
  { id: '3', text: '영업팀 시간왈 수당판예산팀비 23% 초과할 것으로 예측됩n, type: 'warning' },
  { id: '4', text: '신입 직원 온보딩 완료율이 95%로 양지으로 양호니다.', type: 'positive' },
  { id: '5', text: '다음 분기 인챨비 총읁 약 5.1억으로 예측됩니다.', type: 'neutral' },
];

const insightTypeConfig: Record<string, { color: string; tagColor: string }> = {
  positive: { color: '#34C759', tagColor: 'green' },
  warning: { color: '#FF9500', tagColor: 'orange' },
  neutral: { color: '#8E8E93', tagColor: 'default' },
};

export default function UsageAnalyticsPanel() {
  const totalPredictions = modelUsageData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, color: '#007AFF', fontSize: 18 }}>
            <RobotOutlined />
          </span>
          <span style={{ fontWeight: 700 }}>AI 예측hmo��;..됱</span>
        </div>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title="총 예측세"
            value={totalPredictions}
            suffix="회/30일"
            prefix={<ThunderboltOutlined style={{ color: '#FF9500' }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title="정확도"
            value={89.2}
            suffix="%"
            prefix={<SafetyCertificateOutlined style={{ color: '#34C759' }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title="견토된 이상"
            value={12}
            suffix="�,"
            prefix={<EyeOutlined style={{ color: '#FF3B30' }} />}
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>모레 사용 �Ȅ콩</Text>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  {modelUsageData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>AI 인사이트</Text>
          <List
            size="small"
            dataSource={aiInsights}
            renderItem={(item) => (
              <List.Item style={{ padding: '8px 0' }}>
                <Space size={8} align="start">
                  <Tag color={insightTypeConfig[item.type].tagColor}>
                    {item.type === 'positive' ? '긍접' : item.type === 'warning' ? '주윘' : '알림'}
                  </Tag>
                  <Text style={{ fontSize: 12 }}>{item.text}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}
