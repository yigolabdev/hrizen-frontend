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
  { id: '1', text: '개발팀 이직 위험이 전월 대비 12% 증가했습니다. 1:1 면담을 권장합니다.', type: 'warning' },
  { id: '2', text: '전사 근태 준수율이 93%로 목표(90%)를 달성했습니다.', type: 'positive' },
  { id: '3', text: '영업팀 시간외 수당이 예산 대비 23% 초과할 것으로 예측됩니다.', type: 'warning' },
  { id: '4', text: '신입 직원 온보딩 완료율이 95%로 양호합니다.', type: 'positive' },
  { id: '5', text: '다음 분기 인건비 총액은 약 5.6억으로 예측됩니다.', type: 'neutral' },
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
          <span style={{ fontWeight: 700, color: '#007AFF', fontSize: 16 }}>AI 활용 현황</span>
          <AntTooltip title="AI 모델의 활용 통계와 주요 인사이트를 제공합니다.">
            <InfoCircleOutlined style={{ color: '#8E8E93', fontSize: 14 }} />
          </AntTooltip>
        </div>
      }
    >
      {/* 핵심 지표 */}
      <Row gutter={[12, 16]} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <div
            style={{
              background: 'linear-gradient(135deg, #007AFF15, #007AFF08)',
              borderRadius: 10,
              padding: '14px 12px',
              textAlign: 'center',
            }}
          >
            <RobotOutlined style={{ fontSize: 20, color: '#007AFF', marginBottom: 4 }} />
            <Statistic
              value={totalPredictions}
              suffix="건"
              valueStyle={{ fontSize: 18, fontWeight: 700, color: '#007AFF' }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>이번 달 예측 수행</Text>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: 'linear-gradient(135deg, #34C75915, #34C75908)',
              borderRadius: 10,
              padding: '14px 12px',
              textAlign: 'center',
            }}
          >
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#34C759', marginBottom: 4 }} />
            <Statistic
              value={91.3}
              suffix="%"
              precision={1}
              valueStyle={{ fontSize: 18, fontWeight: 700, color: '#34C759' }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>평균 예측 정확도</Text>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: 'linear-gradient(135deg, #FF950015, #FF950008)',
              borderRadius: 10,
              padding: '14px 12px',
              textAlign: 'center',
            }}
          >
            <ThunderboltOutlined style={{ fontSize: 20, color: '#FF9500', marginBottom: 4 }} />
            <Statistic
              value={2.4}
              suffix="초"
              precision={1}
              valueStyle={{ fontSize: 18, fontWeight: 700, color: '#FF9500' }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>평균 응답 시간</Text>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: 'linear-gradient(135deg, #AF52DE15, #AF52DE08)',
              borderRadius: 10,
              padding: '14px 12px',
              textAlign: 'center',
            }}
          >
            <EyeOutlined style={{ fontSize: 20, color: '#AF52DE', marginBottom: 4 }} />
            <Statistic
              value={47}
              suffix="명"
              valueStyle={{ fontSize: 18, fontWeight: 700, color: '#AF52DE' }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>활성 사용자</Text>
          </div>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      {/* 모델별 사용량 파이차트 */}
      <Text strong style={{ fontSize: 13, color: '#3C3C43' }}>모델별 사용 분포</Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={modelUsageData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
            >
              {modelUsageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => [`${value}건`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ flex: 1 }}>
          {modelUsageData.map((item) => (
            <div
              key={item.name}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}
            >
              <Space size={6}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.color }} />
                <Text style={{ fontSize: 12 }}>{item.name}</Text>
              </Space>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>{item.value}건</Text>
            </div>
          ))}
        </div>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      {/* AI 인사이트 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <RiseOutlined style={{ color: '#007AFF' }} />
        <Text strong style={{ fontSize: 13, color: '#3C3C43' }}>AI 핵심 인사이트</Text>
      </div>
      <List
        dataSource={aiInsights}
        renderItem={(item) => {
          const config = insightTypeConfig[item.type];
          return (
            <List.Item style={{ padding: '8px 0', borderBottom: '1px solid #F2F2F7' }}>
              <Space align="start" size={8}>
                <CheckCircleOutlined style={{ color: config.color, marginTop: 3, fontSize: 12 }} />
                <Text style={{ fontSize: 12, lineHeight: '18px', color: '#3C3C43' }}>{item.text}</Text>
              </Space>
            </List.Item>
          );
        }}
        style={{ maxHeight: 220, overflowY: 'auto' }}
      />
    </Card>
  );
}
