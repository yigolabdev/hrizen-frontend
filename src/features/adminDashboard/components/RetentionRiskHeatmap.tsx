import React from 'react';
import { Card, Typography, Tag, Tooltip, Space } from 'antd';
import { WarningOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Department {
  name: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskScore: number;
  atRiskCount: number;
  totalCount: number;
  topReasons: string[];
}

const departments: Department[] = [
  {
    name: '개발팀',
    riskLevel: 'high',
    riskScore: 78,
    atRiskCount: 8,
    totalCount: 42,
    topReasons: ['연봉 불만족', '성장 기회 부족'],
  },
  {
    name: '마케팅',
    riskLevel: 'medium',
    riskScore: 52,
    atRiskCount: 4,
    totalCount: 28,
    topReasons: ['워라벨', '업무 과중'],
  },
  {
    name: '영업팀',
    riskLevel: 'high',
    riskScore: 71,
    atRiskCount: 6,
    totalCount: 35,
    topReasons: ['성과 압박', '조직 문화'],
  },
  {
    name: '인사팀',
    riskLevel: 'low',
    riskScore: 25,
    atRiskCount: 1,
    totalCount: 15,
    topReasons: ['안정횝'],
  },
  {
    name: '재무팀',
    riskLevel: 'low',
    riskScore: 30,
    atRiskCount: 1,
    totalCount: 18,
    topReasons: ['안정횝'],
  },
  {
    name: '디자인팀',
    riskLevel: 'medium',
    riskScore: 48,
    atRiskCount: 3,
    totalCount: 20,
    topReasons: ['커리어 전환', '업무 범위'],
  },
];

function getRiskColor(level: Department['riskLevel']): string {
  switch (level) {
    case 'high':
      return '#FF3B30';
    case 'medium':
      return '#FF9500';
    case 'low':
      return '#34C759';
  }
}

function getRiskBg(level: Department['riskLevel']): string {
  switch (level) {
    case 'high':
      return 'rgba(255, 59, 48, 0.08)';
    case 'medium':
      return 'rgba(255, 149, 0, 0.08)';
    case 'low':
      return 'rgba(52, 199, 89, 0.08)';
  }
}

function getRiskLabel(level: Department['riskLevel']): string {
  switch (level) {
    case 'high':
      return '높음';
    case 'medium':
      return '주의';
    case 'low':
      return '안정';
  }
}

export default function RetentionRiskHeatmap() {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        height: '100%',
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>
          이직 위험 히트맵
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
        }}
      >
        {departments.map((dept) => (
          <Tooltip
            key={dept.name}
            title={
              <div>
                <div>위험 인원: {dept.atRiskCount}/{dept.totalCount}명</div>
                <div>주요 요인: {dept.topReasons.join(', ')}</div>
              </div>
            }
          >
            <div
              style={{
                backgroundColor: getRiskBg(dept.riskLevel),
                border: `1px solid ${getRiskColor(dept.riskLevel)}20`,
                borderRadius: 12,
                padding: 16,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a', marginBottom: 4 }}>
                {dept.name}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: getRiskColor(dept.riskLevel),
                  marginBottom: 4,
                }}
              >
                {dept.riskScore}
              </div>
              <Tag color={getRiskColor(dept.riskLevel)} style={{ borderRadius: 8 }}>
                {getRiskLabel(dept.riskLevel)}
              </Tag>
            </div>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
