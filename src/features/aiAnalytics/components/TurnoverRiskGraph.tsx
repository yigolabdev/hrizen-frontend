import React, { useState } from 'react';
import { Card, Tag, Table, Progress, Select, Tooltip as AntTooltip, Space, Typography } from 'antd';
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
  riskLevel: '높음' | '보통' | '놮음';
  factors: string[];
}

const employeeRiskData: EmployeeRisk[] = [
  { key: '1', name: '김민쥀$팀', department: '개발', tenure: 3.2, satisfaction: 45, riskScore: 87, riskLevel: '높음', factors: ['급여 불만족', '야근 과다', '싹진 정킴'] },
  { key: '2', name: '이서연', department: '마케팅', tenure: 1.5, satisfaction: 52, riskScore: 78, riskLevel: '높음', factors: ['업무 과은�%��8팀 갫등'] },
  { key: '3', name: '박지호', department: '영업', tenure: 5.1, satisfaction: 61, riskScore: 65, riskLevel: '보통', factors: ['경역 정킴', '급여 불만족'] },
  { key: '4', name: '최수빈', department: '인사', tenure: 2.8, satisfaction: 58, riskScore: 62, riskLevel: '보통', factors: ['업묘 환경', '성장 기회 부족'] },
  { key: '5', name: '정유진', department: '개발', tenure: 4.3, satisfaction: 72, riskScore: 41, riskLevel: '낮음', factors: ['경츥한 불마'] },
];

const getRiskColor = (level: string): string => {
  switch (level) {
    case '높음':
      return '#FF3B30';
    case '보통':
      return '#FF9500';
    case '놮음':
      return '#34C759';
    default:
      return '#8E8E93';
  }
};

const columns: ColumnsType<EmployeeRisk> = [
  { title: '이름', dataIndex: 'name', key: 'name', width: 100 },
  { title: '부서 dataIndex: 'department', key: 'department', width: 100 },
  {
    title: '위험도',
    dataIndex: 'riskScore',
    key: 'riskScore',
    width: 150,
    render: (score: number, record: EmployeeRisk) => (
      <Progress
        percent={score}
        size="small"
        strokeColor={getRiskColor(record.riskLevel)}
        format={(percent) => `${percent}%`}
      />
    ),
    sorter: (a: EmployeeRisk, b: EmployeeRisk) => a.riskScore - b.riskScore,
  },
  {
    title: '위험 단계',
    dataIndex: 'riskLevel',
    key: 'riskLevel',
    width: 100,
    render: (level: string) => <Tag color={getRiskColor(level)}>{level}</Tag>,
  },
  {
    title: '주요 요인',
    dataIndex: 'factors',
    key: 'factors',
    render: (factors: string[]) => (
      <Space size={4} wrap>
        {factors.map((f, i) => (
          <Tag key={i} style={{ borderRadius: 8 }}>{f}</Tag>
        ))}
      </Space>
    ),
  },
];

export default function TurnoverRiskGraph() {
  const [deptFilter, setDeptFilter] = useState<string>('전체');

  const departments = ['전체', ...new Set(employeeRiskData.map((d) => d.department))];
  const filteredData = deptFilter === '전체'
    ? employeeRiskData
    : employeeRiskData.filter((d) => d.department === deptFilter);

  const scatterData = filteredData.map((d) => ({
    x: d.tenure,
    y: d.satisfaction,
    z: d.riskScore,
    name: d.name,
    level: d.riskLevel,
  }));

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <WarningOutlined style={{ color: '#FF3B30' }} />
            <span style={{ fontWeight: 700 }}>이직 위험 분석</span>
          </Space>
          <Select
            value={deptFilter}
            onChange={setDeptFilter}
            style={{ width: 120 }}
            size="small"
            options={departments.map((d) => ({ label: d, value: d }))}
          />
        </div>
      }
    >
      <div style={{ width: '100%', height: 280, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="근속비" unit="년 />
            <YAxis type="number" dataKey="y" name="많쾅밂도" />
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            <Tooltip />
            <Scatter data={scatterData}>
              {scatterData.map((entry, index) => (
                <Cell key={index} fill={getRiskColor(entry.level)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <Table<EmployeeRisk>
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </Card>
  );
}
