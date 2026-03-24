import React, { useState } from 'react';
import {
  Card,
  Space,
  Typography,
  Tag,
  List,
  Progress,
  Button,
  Tooltip,
  Badge,
  Empty,
  Segmented,
} from 'antd';
import {
  RobotOutlined,
  WarningOutlined,
  BulbOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { AIRecommendation } from '@/features/performance/types';

const { Text, Paragraph } = Typography;

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'warning',
    title: '이직 위험 감지',
    description: '개발팀 한소희 님의 최근 3개월 성과 점수가 하락 추세이며, 출석률이 감소하고 있습니다. 1:1 면담을 권장합니다.',
    confidence: 87,
    employeeName: '한소희',
    actionLabel: '면담 예약',
  },
  {
    id: '2',
    type: 'suggestion',
    title: '성과 우수자 보상 제안',
    description: '디자인팀 박지민 님이 2분기 연속 S등급을 달성했습니다. 인센티브 또는 승진 검토를 추천합니다.',
    confidence: 94,
    employeeName: '박지민',
    actionLabel: '보상 검토',
  },
  {
    id: '3',
    type: 'insight',
    title: '팀 성과 트렌드 분석',
    description: '마케팅팀의 전체 OKR 달성률이 전 분기 대비 12% 상승했습니다. 현재 전략을 유지하면 연간 목표 초과 달성이 예상됩니다.',
    confidence: 91,
  },
  {
    id: '4',
    type: 'warning',
    title: '목표 미달성 경고',
    description: '영업팀 최민수 님의 2분기 KR 달성률이 45%에 머물고 있습니다. 목표 재설정 또는 멘토링을 고려하세요.',
    confidence: 82,
    employeeName: '최민수',
    actionLabel: '목표 조정',
  },
  {
    id: '5',
    type: 'suggestion',
    title: '교육 프로그램 추천',
    description: 'QA팀의 자동화 테스트 역량 강화를 위해 "CI/CD 파이프라인 마스터" 과정 수강을 추천합니다.',
    confidence: 78,
    actionLabel: '과정 확인',
  },
  {
    id: '6',
    type: 'insight',
    title: '조직 몰입도 분석',
    description: '전사 직원 몰입도 지수가 76점으로 업계 평균(72점) 대비 양호합니다. 개발팀이 가장 높은 82점을 기록했습니다.',
    confidence: 89,
  },
];

const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  warning: { icon: <WarningOutlined />, color: '#FF3B30', label: '경고' },
  suggestion: { icon: <BulbOutlined />, color: '#FF9500', label: '제안' },
  insight: { icon: <LineChartOutlined />, color: '#007AFF', label: '인사이트' },
};

type FilterType = '전체' | 'warning' | 'suggestion' | 'insight';

export default function AIRecommendationPanel() {
  const [filter, setFilter] = useState<FilterType>('전체');
  const [refreshing, setRefreshing] = useState(false);

  const filteredData =
    filter === '전체'
      ? mockRecommendations
      : mockRecommendations.filter((r) => r.type === filter);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const warningCount = mockRecommendations.filter((r) => r.type === 'warning').length;

  return (
    <Card
      title={
        <Space>
          <RobotOutlined style={{ color: '#007AFF' }} />
          <span>AI 인재 진단</span>
          {warningCount > 0 && (
            <Badge count={warningCount} size="small" />
          )}
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      extra={
        <Tooltip title="AI 분석 새로고침">
          <Button
            type="text"
            icon={<ReloadOutlined spin={refreshing} />}
            onClick={handleRefresh}
            size="small"
            style={{ color: '#007AFF' }}
          />
        </Tooltip>
      }
    >
      <Segmented
        options={[
          { label: '전체', value: '전체' },
          { label: '경고', value: 'warning' },
          { label: '제안', value: 'suggestion' },
          { label: '인사이트', value: 'insight' },
        ]}
        value={filter}
        onChange={(val) => setFilter(val as FilterType)}
        size="small"
        block
        style={{ marginBottom: 16 }}
      />

      <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}>
        {filteredData.length === 0 ? (
          <Empty description="해당 유형의 분석 결과가 없습니다." />
        ) : (
          <List
            dataSource={filteredData}
            renderItem={(item) => {
              const config = typeConfig[item.type];
              return (
                <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #F2F2F7' }}>
                  <Space direction="vertical" size={6} style={{ width: '100%' }}>
                    <Space size={8} align="start" style={{ width: '100%' }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          backgroundColor: `${config.color}14`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: config.color,
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {config.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Space size={6} wrap>
                          <Text strong style={{ fontSize: 13 }}>{item.title}</Text>
                          <Tag
                            color={config.color}
                            style={{ fontSize: 11, lineHeight: '18px', padding: '0 6px' }}
                          >
                            {config.label}
                          </Tag>
                        </Space>
                        <Paragraph
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 6, marginTop: 2 }}
                          ellipsis={{ rows: 2, expandable: true, symbol: '더보기' }}
                        >
                          {item.description}
                        </Paragraph>
                        <Space size={12}>
                          <Tooltip title="AI 신뢰도">
                            <Space size={4}>
                              <ThunderboltOutlined style={{ color: '#FF9500', fontSize: 12 }} />
                              <Progress
                                percent={item.confidence}
                                size="small"
                                strokeColor={
                                  item.confidence >= 90
                                    ? '#34C759'
                                    : item.confidence >= 80
                                    ? '#007AFF'
                                    : '#FF9500'
                                }
                                style={{ width: 80, marginBottom: 0 }}
                                format={(pct) => <span style={{ fontSize: 11 }}>{pct}%</span>}
                              />
                            </Space>
                          </Tooltip>
                          {item.employeeName && (
                            <Tag style={{ fontSize: 11 }}>{item.employeeName}</Tag>
                          )}
                          {item.actionLabel && (
                            <Button
                              type="link"
                              size="small"
                              style={{ padding: 0, fontSize: 12, color: '#007AFF', height: 'auto' }}
                            >
                              {item.actionLabel}
                            </Button>
                          )}
                        </Space>
                      </div>
                    </Space>
                  </Space>
                </List.Item>
              );
            }}
          />
        )}
      </div>
    </Card>
  );
}
