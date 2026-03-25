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
  { id: '1', text: '개발팀 이직위험이 전월 대비 12% 증가했습니다. 1팑 면츴을 권장�]�니다.', type: 'warning' },
  { id: '2', text: '전사 근태 준수유이 93%로 목표(90%)를 달성했습니다.', type: 'positive' },
  { id: '3', text: '영업팀 시간왈 수당이 예쀐 대비 23% 초과할 것으로 예측됩니다.', type: 'warning' },
  { id: '4', text: '신입 직원 온보딩 완료율이 95%로 양호입니다.', type: 'positive' },
  { id: '5', text: '다음 분기 인건비 찝액은 약 5.6앵으로 예측됩니다.', type: 'neutral' },
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
          <RobotOutlined style={{ color: '#007AFF', fontSize: 18 }} />
          <span style={{ fontWeight: 700 }}>AI 분석 현황</span>
        </div>
      }
    >
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Statistic
            title="� 예측회수"
            value={totalPredictions.toLocaleString()}
            prefix={<ThunderboltOutlined style={{ color: '#FF9500' }} />}
          />
        </Col>
        <Col span={6}>
          <Statistic title="정확도" value="92.3%" prefix={<SafetyCertificateOutlined style={{ color: '#34C759' }} />} />
        </Col>
        <Col span={6}>
          <Statistic title="활용 모덶𰟞�" value="5" />
        </Col>
        <Col span={6}>
          <Statistic title="이상 탐지" value="12" prefix={<EyeOutlined style={{ color: '#FF3B30' }} />} />
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'center' }}>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>모델별 사용믎</Text>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) =>
                      `${name} ${ (percent * 100).toFixed(0)}%`
                    }
                  >
                    {modelUsageData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Text strong style={{ marginBottom: 8, display: 'block' }}>AI 인사이트</Text>
          <List
            size="small"
            dataSource={aiInsights}
            renderItem={(item) => (
              <List.Item key={item.id} style={{ padding: '8px 0' }}>
                <Space>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: insightTypeConfig[item.type].color,
                    }}
                  />
                  <Text style={{ fontSize: 13 }}>{item.text}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}
