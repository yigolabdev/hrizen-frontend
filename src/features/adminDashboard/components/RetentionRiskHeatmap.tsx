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
      return '보통';
    case 'low':
      return '낮음';
  }
}

export default function RetentionRiskHeatmap() {
  const totalAtRisk = departments.reduce((sum, d) => sum + d.atRiskCount, 0);

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
      aria-label="AI 이직 위험도 분석"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <Space size={8} align="center">
          <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>
            AI 이직 위험도 분석
          </span>
          <Tag
            color="red"
            style={{ borderRadius: 12, fontSize: 11, fontWeight: 600, margin: 0 }}
          >
            <WarningOutlined /> {totalAtRisk}명 주의
          </Tag>
        </Space>
      </div>
      <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 20 }}>
        부서별 이직 위험 점수 및 위험 인원 현황
      </Typography.Text>

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
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{dept.name}</div>
                <div>위험 점수: {dept.riskScore}/100</div>
                <div>
                  위험 인원: {dept.atRiskCount}/{dept.totalCount}명
                </div>
                <div style={{ marginTop: 4 }}>
                  주요 원인: {dept.topReasons.join(', ')}
                </div>
              </div>
            }
            placement="top"
          >
            <div
              style={{
                padding: '16px 14px',
                borderRadius: 14,
                backgroundColor: getRiskBg(dept.riskLevel),
                border: `1px solid ${getRiskColor(dept.riskLevel)}20`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}
                  ellipsis
                >
                  {dept.name}
                </Typography.Text>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: getRiskColor(dept.riskLevel),
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: getRiskColor(dept.riskLevel),
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {dept.riskScore}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Text style={{ fontSize: 11, color: '#8E8E93' }}>
                  <UserOutlined /> {dept.atRiskCount}명
                </Typography.Text>
                <Tag
                  color={
                    dept.riskLevel === 'high'
                      ? 'error'
                      : dept.riskLevel === 'medium'
                      ? 'warning'
                      : 'success'
                  }
                  style={{
                    borderRadius: 8,
                    fontSize: 10,
                    margin: 0,
                    lineHeight: '18px',
                    padding: '0 6px',
                  }}
                >
                  {getRiskLabel(dept.riskLevel)}
                </Tag>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          marginTop: 20,
        }}
      >
        {(['high', 'medium', 'low'] as const).map((level) => (
          <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: getRiskColor(level),
              }}
            />
            <span style={{ fontSize: 11, color: '#8E8E93' }}>
              {getRiskLabel(level)} 위험
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
