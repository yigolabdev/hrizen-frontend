import React, { useState } from 'react';
import { Card, List, Tag, Typography, Space, Badge, Button, Tooltip as AntTooltip, Empty, Segmented } from 'antd';
import {
  WarningOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

type SeverityLevel = '심각' | '경고' | '주의' | '정보';
type AnomalyCategory = '근태' | '급여' | '성과' | '행동';
type StatusType = '신규' | '확인중' | '해결됨';

interface AnomalyItem {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  category: AnomalyCategory;
  status: StatusType;
  detectedAt: string;
  affectedEmployee: string;
  department: string;
  confidence: number;
}

const anomalyData: AnomalyItem[] = [
  {
    id: 'ANM-001',
    title: '비정상 야근 패턴 감지',
    description: '최근 2주간 일일 평균 근무시간이 12시간을 초과하며 주말 근무가 4회 이상 감지되었습니다.',
    severity: '심각',
    category: '근태',
    status: '신규',
    detectedAt: '2024-01-15 09:32',
    affectedEmployee: '한도윤',
    department: '디자인팀',
    confidence: 94,
  },
  {
    id: 'ANM-002',
    title: '급여 이상 지급 의심',
    description: '이번 달 시간외 수당이 전월 대비 280% 증가하였습니다. 근태 기록과 불일치합니다.',
    severity: '심각',
    category: '급여',
    status: '확인중',
    detectedAt: '2024-01-14 14:15',
    affectedEmployee: '시스템',
    department: '영업팀',
    confidence: 88,
  },
  {
    id: 'ANM-003',
    title: '지각 빈도 급증',
    description: '최근 1개월 내 지각 횟수가 7회로, 이전 3개월 평균(1회) 대비 크게 증가했습니다.',
    severity: '경고',
    category: '근태',
    status: '신규',
    detectedAt: '2024-01-14 08:00',
    affectedEmployee: '김민준',
    department: '개발팀',
    confidence: 91,
  },
  {
    id: 'ANM-004',
    title: '성과 지표 급격한 하락',
    description: 'OKR 달성률이 전분기 92%에서 이번 분기 54%로 급격히 하락했습니다.',
    severity: '경고',
    category: '성과',
    status: '확인중',
    detectedAt: '2024-01-13 16:45',
    affectedEmployee: '이서연',
    department: '마케팅팀',
    confidence: 85,
  },
  {
    id: 'ANM-005',
    title: '비인가 시간대 시스템 접속',
    description: '새벽 2~4시 사이 반복적인 시스템 접속이 감지되었습니다.',
    severity: '주의',
    category: '행동',
    status: '신규',
    detectedAt: '2024-01-13 06:00',
    affectedEmployee: '강시우',
    department: '영업팀',
    confidence: 76,
  },
  {
    id: 'ANM-006',
    title: '조기 퇴근 패턴',
    description: '최근 2주간 정규 퇴근 시간 1시간 이전 퇴근이 8회 감지되었습니다.',
    severity: '정보',
    category: '근태',
    status: '해결됨',
    detectedAt: '2024-01-12 18:30',
    affectedEmployee: '오하은',
    department: '재무팀',
    confidence: 72,
  },
];

const severityConfig: Record<SeverityLevel, { color: string; icon: React.ReactNode; tagColor: string }> = {
  '심각': { color: '#FF3B30', icon: <ExclamationCircleOutlined />, tagColor: 'red' },
  '경고': { color: '#FF9500', icon: <WarningOutlined />, tagColor: 'orange' },
  '주의': { color: '#007AFF', icon: <InfoCircleOutlined />, tagColor: 'blue' },
  '정보': { color: '#8E8E93', icon: <InfoCircleOutlined />, tagColor: 'default' },
};

const statusConfig: Record<StatusType, { color: string; icon: React.ReactNode }> = {
  '신규': { color: 'red', icon: <Badge status="error" /> },
  '확인중': { color: 'orange', icon: <ClockCircleOutlined style={{ color: '#FF9500' }} /> },
  '해결됨': { color: 'green', icon: <CheckCircleOutlined style={{ color: '#34C759' }} /> },
};

type FilterType = '전체' | '심각' | '경고' | '주의' | '정보';

export default function AnomalyDetectionList() {
  const [filter, setFilter] = useState<FilterType>('전체');

  const filteredAnomalies = filter === '전체'
    ? anomalyData
    : anomalyData.filter((a) => a.severity === filter);

  const criticalCount = anomalyData.filter((a) => a.severity === '심각' && a.status !== '해결됨').length;

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, color: '#007AFF', fontSize: 16 }}>이상 징후 탐지</span>
          <AntTooltip title="AI가 실시간으로 근태, 급여, 성과, 행동 패턴에서 이상 징후를 탐지합니다.">
            <InfoCircleOutlined style={{ color: '#8E8E93', fontSize: 14 }} />
          </AntTooltip>
          {criticalCount > 0 && (
            <Badge count={criticalCount} style={{ backgroundColor: '#FF3B30' }} />
          )}
        </div>
      }
      extra={
        <Segmented
          size="small"
          options={[
            { label: '전체', value: '전체' },
            { label: '심각', value: '심각' },
            { label: '경고', value: '경고' },
            { label: '주의', value: '주의' },
          ]}
          value={filter}
          onChange={(val) => setFilter(val as FilterType)}
        />
      }
    >
      {filteredAnomalies.length === 0 ? (
        <Empty description="해당 조건의 이상 징후가 없습니다" />
      ) : (
        <List
          dataSource={filteredAnomalies}
          renderItem={(item) => {
            const sevConfig = severityConfig[item.severity];
            const statConfig = statusConfig[item.status];

            return (
              <List.Item
                style={{
                  padding: '16px 0',
                  borderLeft: `3px solid ${sevConfig.color}`,
                  paddingLeft: 16,
                  marginBottom: 8,
                  borderRadius: '0 8px 8px 0',
                  backgroundColor: item.status === '신규' ? '#FFF5F5' : item.status === '확인중' ? '#FFF8F0' : '#F2F2F7',
                }}
              >
                <List.Item.Meta
                  title={
                    <Space size={8} wrap>
                      <span style={{ color: sevConfig.color, fontSize: 14 }}>{sevConfig.icon}</span>
                      <Text strong style={{ fontSize: 14 }}>{item.title}</Text>
                      <Tag color={sevConfig.tagColor} style={{ borderRadius: 6, fontSize: 11 }}>{item.severity}</Tag>
                      <Tag style={{ borderRadius: 6, fontSize: 11 }}>{item.category}</Tag>
                      <Tag color={statConfig.color} style={{ borderRadius: 6, fontSize: 11 }}>
                        {item.status}
                      </Tag>
                    </Space>
                  }
                  description={
                    <div style={{ marginTop: 6 }}>
                      <Text style={{ fontSize: 13, color: '#3C3C43', display: 'block', marginBottom: 6 }}>
                        {item.description}
                      </Text>
                      <Space size={16} wrap>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          <ClockCircleOutlined /> {item.detectedAt}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          대상: {item.affectedEmployee} ({item.department})
                        </Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          AI 신뢰도: {item.confidence}%
                        </Text>
                      </Space>
                    </div>
                  }
                />
                {item.status !== '해결됨' && (
                  <Button type="link" size="small" style={{ color: '#007AFF' }}>
                    상세 보기
                  </Button>
                )}
              </List.Item>
            );
          }}
          style={{ maxHeight: 480, overflowY: 'auto' }}
        />
      )}
    </Card>
  );
}
