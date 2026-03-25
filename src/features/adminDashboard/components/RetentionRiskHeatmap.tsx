import React from 'react';
import { Card, Typography, Tag, Tooltip, Badge, Space } from 'antd';
import { WarningOutlined, UserOutlined } from '@ant-design/icons';

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
    name: '마케팅팀',
    riskLevel: 'medium',
    riskScore: 52,
    atRiskCount: 4,
    totalCount: 28,
    topReasons: ['워라밸', '업무 과중'],
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
    topReasons: ['안정적'],
  },
  {
    name: '재무팀',
    riskLevel: 'low',
    riskScore: 30,
    atRiskCount: 1,
    totalCount: 18,
    topReasons: ['안정적'],
  },
  {
    name: '디자인팀',
    riskLevel: 'medium',
    riskScore: 48,
    atRiskCount: 3,
    totalCount: 20,
    topReasons: ['커리어 전환', '업무 범위'],
  },
  {
    name: 'QA팀',
    riskLevel: 'low',
    riskScore: 22,
    atRiskCount: 0,
    totalCount: 12,
    topReasons: ['안정적'],
  },
  {
    name: '경영지원팀',
    riskLevel: 'medium',
    riskScore: 45,
    atRiskCount: 2,
    totalCount: 14,
    topReasons: ['보상 불만족'],
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
      return '중간';
    case 'low':
      return '낮음';
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
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>부서별 이직 위험도</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {departments.map((dept) => (
          <div
            key={dept.name}
            style={{
              padding: '16px',
              backgroundColor: getRiskBg(dept.riskLevel),
              borderRadius: '12px',
              border: `1px solid ${getRiskColor(dept.riskLevel)}20`,
            }}
          >
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{dept.name}</span>
                <Badge
                  count={dept.riskScore}
                  style={{
                    backgroundColor: getRiskColor(dept.riskLevel),
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: '#666' }}>
                위험도: <span style={{ color: getRiskColor(dept.riskLevel), fontWeight: 600 }}>{getRiskLabel(dept.riskLevel)}</span>
              </div>
              <div style={{ fontSize: 12, color: '#666' }}>
                위험 인원: {dept.atRiskCount}/{dept.totalCount}
              </div>
              <div style={{ fontSize: 11, color: '#999' }}>
                {dept.topReasons.join(', ')}
              </div>
            </Space>
          </div>
        ))}
      </div>
    </Card>
  );
}
