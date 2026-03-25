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
type AnomalyCategory = '근텃' | '급여' | '성과' | '행동';
type StatusType = '신규' | '확인중' | '해결˨';

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
    description: '최근 2주간 일일 평균근무시간이 12시간을 초과하며 주말 근무가 4회 이상 감지되었습니다.',
    severity: '심각',
    category: '근텃',
    status: '신규',
    detectedAt: '2024-01-15 09:32',
    affectedEmployee: '한도윤',
    department: '디자인팀',
    confidence: 94,
  },
  {
    id: 'ANM-002',
    title: '급여 이상 지급 의심',
    description: '이번 달 시간왈 수당이 전월 대비 280% 증가하였습니다. 근텀 기록과 불일치합니다.',
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
    description: '최근 1개월 내 지각 횁수가 7회로, 이전 3개월 평균(1회) 대비 크게 증가했습니다.',
    severity: '경고',
    category: '근태',
    status: '신개',
    detectedAt: '2024-01-14 08:00',
    affectedEmployee: '김민줐',
    department: '개발팀',
    confidence: 91,
  },
  {
    id: 'ANM-004',
    title: '성과 지표 겊穩'하락',
    description: 'OKR 달성률이 전분기 92%에서 이번 분기 54%로 금격히 하맽했습니다.',
    severity: '경고',
    category: '성과',
    status: '확인중',
    detectedAt: '2024-01-13 16:45',
    affectedEmployee: '이서연',
    department: '마케팅팀',
    confidence: 85,
  },
];

function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case '심각':
      return 'red';
    case '경고':
      return 'orange';
    case '주의':
      return 'gold';
    case '정보':
      return 'blue';
    default:
      return 'default';
  }
}

function getStatusIcon(status: StatusType): React.ReactNode {
  switch (status) {
    case '신규':
      return <ExclamationCircleOutlined style={{ color: '#FF3B30' }} />;
    case '확인중':
      return <ClockCircleOutlined style={{ color: '#FF9500' }} />;
    case '해결˨':
      return <CheckCircleOutlined style={{ color: '#34C759' }} />;
    default:
      return <InfoCircleOutlined />;
  }
}

export default function AnomalyDetectionList() {
  const [filter, setFilter] = useState<string>('전체');

  const filteredData = filter === '전체'
    ? anomalyData
    : anomalyData.filter((item) => item.severity === filter);

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, height: '100%' }}
      title={
        <Space>
          <WarningOutlined style={{ color: '#FF3B30' }} />
          <span style={{ fontWeight: 700 }}>이상 감지 목록</span>
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
        <Empty description="해당 조건의 이상 데이터가 없습니다." />
      ) : (
        <List
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <Space>
                    {getStatusIcon(item.status)}
                    <Text strong>{item.title}</Text>
                    <Tag color={getSeverityColor(item.severity)}>{item.severity}</Tag>
                    <Tag>{item.category}</Tag>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>{item.detectedAt}</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 13 }}>{item.description}</Text>
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {item.affectedEmployee} • {item.department} • 신몬돎  {item.confidence}%
                  </Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}
