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

const { Text } = Typography;

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
  { id: '1', text: '개발팀 이직위험이 전월 대비 12% 즞가했습니다. 1:1 면담을 권입합니다.', type: 'warning' },
  { id: '2', text: '전사 근태 준수율이 93%로 목표(90%)을 달성했습니다.', type: 'positive' },
  { id: '3', text: '영업팀 시간외 수당이 예산 대비 23% 초과할 것으로 예측됩니다.', type: 'warning' },
  { id: '4', text: '신읅 직원 온보듩 완료율이 95%로 양호합니다.', type: 'positive' },
  { id: '5', text: '다음 분기 인즜비 총밌은 약 5.3억으로 예측됩니다.', type: 'neutral' },
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
          <span style={{ fontWeight: 700 }}>AI 용 분석</span>
        </div>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Statistic
            title="총 예측수"
            value={totalPredictions}
            suffix="회"
            prefix={<ThunderboltOutlined />}
            valueStyle={{ color: '#007AFF' }}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic
            title="정확도"
            value={92.5}
            suffix="%"
            prefix={<SafetyCertificateOutlined />}
            valueStyle={{ color: '#34C759' }}
          />
        </Col>
      </Row>

      <Divider />

      <Text strong style={{ marginBottom: 8 }}>모눦 사용량</Text>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={modelUsageData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {modelUsageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Divider />

      <Text strong style={{ marginBottom: 8 }}>AI 인사이트</Text>
      <List
        size="small"
        dataSource={aiInsights}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Space>
              <Tag color={insightTypeConfig[item.type].tagColor}>
                {item.type === 'positive' ? '긍정' : item.type === 'warning' ? '주의' : '정보'}
              </Tag>
              <Text style={{ fontSize: 13 }}>{item.text}</Text>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
}
