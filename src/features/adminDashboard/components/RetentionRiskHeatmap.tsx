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
  { name: '개발팀', riskLevel: 'high', riskScore: 78, atRiskCount: 8, totalCount: 42, topReasons: ['연봉 불플족', '성장 기회 부족'] },
  { name: '마케팄팀', riskLevel: 'medium', riskScore: 52, atRiskCount: 4, totalCount: 28, topReasons: ['워라밸', '업무 과중'] },
  { name: '영업팀', riskLevel: 'high', riskScore: 71, atRiskCount: 6, totalCount: 35, topReasons: ['성과 앵박', '조직미화'] },
  { name: '인사팀', riskLevel: 'low', riskScore: 25, atRiskCount: 1, totalCount: 15, topReasons: ['안정적'] },
  { name: '재무팀', riskLevel: 'low', riskScore: 30, atRiskCount: 1, totalCount: 18, topReasons: ['안정적'] },
  { name: '디자인팀', riskLevel: 'medium', riskScore: 48, atRiskCount: 3, totalCount: 20, topReasons: ['커리어 전혘', '업무 범위'] },
  { name: 'QA팀', riskLevel: 'low', riskScore: 22, atRiskCount: 0, totalCount: 12, topReasons: ['안정적'] },
  { name: '경영지원팀', riskLevel: 'medium', riskScore: 45, atRiskCount: 2, totalCount: 14, topReasons: ['보상 불만족'] },
];

function getRiskColor(level: Department['riskLevel']): string {
  switch (level) {
    case 'high': return '#FF3B30';
    case 'medium': return '#FF9500';
    case 'low': return '#34C759';
  }
}

function getRiskBg(level: Department['riskLevel']): string {
  switch (level) {
    case 'high': return 'rgba(255, 59, 48, 0.08)';
    case 'medium': return 'rgba(255, 149, 0, 0.08)';
    case 'low': return 'rgba(52, 199, 89, 0.08)';
  }
}

function getRiskLabel(level: Department['riskLevel']): string {
  switch (level) {
    case 'high': return '하험';
    case 'medium': return '주의';
    case 'low': return '안젔';
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
        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>이직 위험 힠트막</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {departments.map((dept) => (
          <Tooltip
            key={dept.name}
            title={
              <div>
                <p>��험 인원: {dept.atRiskCount}명 / {dept.totalCount}구</p>
                {dept.topReasons.map((r, i) => (
                  <Tag key={i} style={{ marginTop: 4 }}>{r}</Tag>
                ))}
              </div>
            }
          >
            <div
              style={{
                backgroundColor: getRiskBg(dept.riskLevel),
                border: `1px solid ${getRiskColor(dept.riskLevel)}20`,
                borderRadius: 12,
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{dept.name}</span>
                <Tag color={getRiskColor(dept.riskLevel)} style={{ borderRadius: 8 }}>
                  {getRiskLabel(dept.riskLevel)}
                </Tag>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: getRiskColor(dept.riskLevel) }}>
                {dept.riskScore}<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4 }}>점</span>
              </div>
              <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 4 }}>
                <UserOutlined /> 위험 {dept.atRiskCount}구 / 전 체 {dept.totalCount}구
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
