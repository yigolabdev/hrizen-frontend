import React, { useState } from 'react';
import { Card, Tag, Table, Progress, Select, Space, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from 'recharts';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

interface EmployeeRisk {
  key: string;
  name: string;
  department: string;
  tenure: number;
  satisfaction: number;
  riskScore: number;
  riskLevel: '높음' | '보톹' | '낮음';
  factors: string[];
}

const employeeRiskData: EmployeeRisk[] = [
  { key: '1', name: '김민준', department: '개발팀', tenure: 3.2, satisfaction: 45, riskScore: 87, riskLevel: '높음', factors: ['급여불만족', '야근 과다', '승진 정체'] },
  { key: '2', name: '이서연', department: '마케팅', tenure: 1.5, satisfaction: 52, riskScore: 78, riskLevel: '높음', factors: ['업무 과은', '팀 갬등'] },
  { key: '3', name: '박지호', department: '영업팀', tenure: 5.1, satisfaction: 61, riskScore: 65, riskLevel: '보통', factors: ['경력 정체', '급여 불만족'] },
  { key: '4', name: '최수빌', department: '인사팀', tenure: 2.8, satisfaction: 58, riskScore: 62, riskLevel: '보통', factors: ['업물 환경', '성장 기회 부족'] },
  { key: '5', name: '정유진', department: '개발팀', tenure: 4.3, satisfaction: 72, riskScore: 41, riskLevel: '낮음', factors: ['경캸한 불만'] },
  { key: '6', name: '한도윤', department: '디자인팀', tenure: 0.8, satisfaction: 38, riskScore: 91, riskLevel: '높음', factors: ['적응 실패', '기대 불일치', '급여불만족'] },
];

function getRiskColor(level: EmployeeRisk['riskLevel']): string {
  switch (level) {
    case '높음':
      return '#FF3B30';
    case '보통':
      return '#FF9500';
    case '남음':
      return '#34C759';
    default:
      return '#8E8E93';
  }
}

const columns: ColumnsType<EmployeeRisk> = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: '부서',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: '위험 점수',
    dataIndex: 'riskScore',
    key: 'riskScore',
    render: (score: number, record: EmployeeRisk) => (
      <Progress
        percent={score}
        size="small"
        strokeColor={getRiskColor(record.riskLevel)}
        format={() => `${score}`}
      />
    ),
    sorter: (a, b) => a.riskScore - b.riskScore,
  },
  {
    title: '위험 단계',
    dataIndex: 'riskLevel',
    key: 'riskLevel',
    render: (level: EmployeeRisk['riskLevel']) => (
      <Tag color={getRiskColor(level)}>{level}</Tag>
    ),
  },
  {
    title: '주요 요인',
    dataIndex: 'factors',
    key: 'factors',
    render: (factors: string[]) => (
      <Space size={4} wrap>
        {factors.map((f) => (
          <Tag key={f}>{f}</Tag>
        ))}
      </Space>
    ),
  },
];

export default function TurnoverRiskGraph() {
  const [deptFilter, setDeptFilter] = useState<string>('전체');

  const departments = ['전체', ...new Set(employeeRiskData.map((e) => e.department))];
  const filteredData = deptFilter === '전체' ? employeeRiskData : employeeRiskData.filter((e) => e.department === deptFilter);

  const scatterData = filteredData.map((e) => ({
    x: e.satisfaction,
    y: e.riskScore,
    z: e.tenure * 10,
    name: e.name,
    level: e.riskLevel,
  }));

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={
        <Space>
          <WarningOutlined style={{ color: '#FF3B30' }} />
          <span style={{ fontWeight: 700 }}>이직 위험 분석</span>
        </Space>
      }
      extra={
        <Select
          value={deptFilter}
          onChange={setDeptFilter}
          style={{ width: 120 }}
          size="small"
          options={departments.map((d) => ({ value: d, label: d }))}
        />
      }
    >
      <div style={{ width: '100%', height: 300, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="만족도" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis type="number" dataKey="y" name="위험점수" tickLine={false} axisLine={false} fontSize={12} />
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div style={{ background: '#fff', padding: 8, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontWeight: 600 }}>{d.name}</div>
                    <div>만족도: {d.x}</div>
                    <div>위험점수: {d.y}</div>
                  </div>
                );
              }}
            />
            <Scatter data={scatterData}>
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRiskColor(entry.level as EmployeeRisk['riskLevel'])} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <Table<EmployeeRisk>
        columns={columns}
        dataSource={filteredData}
        size="small"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}
