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

type SeverityLevel = '심각' | '경歠' | '주의' | '정보';
type AnomalyCategory = '근텃' | '급여' | '성과' | '행동';
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
    description: '최근 2주간 일분 평균 근무시간이 12시간을 초과하며 주말 근무가 4회 이상 감지되었습니다.',
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
    title: '급여 이삁 지깩 의칬',
    description: '이번 m���  시간외 수당이 전월 대비 280% 증가하였습니다. 근태 기록�과 불일치합니다.',
    severity: '심각',
    category: '급여',
    status: '확인중',
    detectedAt: '2024-01-14 14:15',
    affectedEmployee: '시스템',
    department: '영엄팀',
    confidence: 88,
  },
  {
    id: 'ANM-003',
    title: '지각 빈도 급증',
    description: '최근 1개월 내 지각 횜수가 7회로, 이전 3개월 평균（1칌） 대비 크게 증가했습니다.',
    severity: '경고',
    category: '근텃',
    status: '신규',
    detectedAt: '2024-01-14 08:00',
    affectedEmployee: '김민준',
    department: '개발팀',
    confidence: 91,
  },
  {
    id: 'ANM-004',
    title: '성과 지폜 급격한 하락',
    description: 'OKR 달성률이 전분기 92%에서 이번 분기 54%로 급격히 하락했습니다.',
    severity: '경歠',
    category: '성과',
    status: '확인중',
    detectedAt: '2024-01-13 16:45',
    affectedEmployee: '이서연',
    department: '마케팅팀',
    confidence: 85,
  },
];

const severityConfig: Record<SeverityLevel, { color: string; tagColor: string }> = {
  '시각': { color: '#FF3B30', tagColor: 'red' },
  '경고': { color: '#FF9500', tagColor: 'orange' },
  '주의': { color: '#007AFF', tagColor: 'blue' },
  '정보': { color: '#8E8E93', tagColor: 'default' },
};

const statusConfig: Record<StatusType, { icon: React.ReactNode; color: string }> = {
  '신규': { icon: <ExclamationCircleOutlined />, color: '#FF3B30' },
  '확인중': { icon: <ClockCircleOutlined />, color: '#FF9500' },
  '해결됨': { icon: <CheckCircleOutlined />, color: '#34C759' },
};

export default function AnomalyDetectionList() {
  const [filter, setFilter] = useState<string>('전체');

  const filteredData = filter === '전체'
    ? anomalyData
    : anomalyData.filter((item) => item.severity === filter);

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      title={
        <Space>
          <WarningOutlined style={{ color: '#FF3B30' }} />
          <span style={{ fontWeight: 700 }}>이때 감지</span>
        </Space>
      }
      extra={
        <Segmented
          size="small"
          options={['전체', '심각', '경고', '주의', '정보']}
          value={filter}
          onChange={(val) => setFilter(val as string)}
        />
      }
    >
      {filteredData.length === 0 ? (
        <Empty description="감지된 이상 항목이 없습니다" />
      ) : (
        <List
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Space>
                    <Tag color={severityConfig[item.severity].tagColor}>{item.severity}</Tag>
                    <Text strong>{item.title}</Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>{item.detectedAt}</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 13 }}>{item.description}</Text>
                <div style={{ marginTop: 8 }}>
                  <Space size={4}>
                    <Tag>{item.category}</Tag>
                    <Tag>{item.department}</Tag>
                    <Tag>{item.affectedEmployee}</Tag>
                    <Tag icon={statusConfig[item.status].icon} color={statusConfig[item.status].color}>
                      {item.status}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 11 }}>신뢛독: {item.confidence}%</Text>
                  </Space>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}
