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
  riskLevel: '높음' | '보통' | '낮음';
  factors: string[];
}

const employeeRiskData: EmployeeRisk[] = [
  { key: '1', name: '김민준', department: '개발팀', tenure: 3.2, satisfaction: 45, riskScore: 87, riskLevel: '높음', factors: ['급여 불만족', '야근 과다', '승진 정체'] },
  { key: '2', name: '이서연', department: '마케팄팀', tenure: 1.5, satisfaction: 52, riskScore: 78, riskLevel: '높음', factors: ['업문 과부하', '팀 갈등'] },
  { key: '3', name: '박지호', department: '쨁업팀', tenure: 5.1, satisfaction: 61, riskScore: 65, riskLevel: '보통', factors: ['경력 정체', '급여 불만족'] },
  { key: '4', name: '최수빈', department: '인사팀', tenure: 2.8, satisfaction: 58, riskScore: 62, riskLevel: '보통', factors: ['업무 환경', '성장 기회 부족'] },
  { key: '5', name: '정유진', department: '개발팀', tenure: 4.3, satisfaction: 72, riskScore: 41, riskLevel: '낫음', factors: ['경미한 불만'] },
  { key: '6', name: '한도윤', department: '디자인팀', tenure: 0.8, satisfaction: 38, riskScore: 91, riskLevel: '높음', factors: ['적쑝 실패', '기대 불일치', '급여 불만족'] },
];

function getRiskColor(level: EmployeeRisk['riskLevel']): string {
  switch (level) {
    case '높음':
      return '#FF3B30';
    case '보통':
      return '#FF9500';
    case '낮음':
      return '#34C759';
    default:
      return '#8E8E93';
  }
}

export default function TurnoverRiskGraph() {
  const [selectedDept, setSelectedDept] = useState<string>('전체');

  const filteredData = selectedDept === '전체'
    ? employeeRiskData
    : employeeRiskData.filter((d) => d.department === selectedDept);

  const scatterData = filteredData.map((d) => ({
    x: d.satisfaction,
    y: d.riskScore,
    z: d.tenure * 10,
    name: d.name,
    riskLevel: d.riskLevel,
  }));

  const depts = ['전체', ...new Set(employeeRiskData.map((d) => d.department))];

  const columns: ColumnsType<EmployeeRisk> = [
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '부서', dataIndex: 'department', key: 'department' },
    {
      title: '위험도',
      key: 'riskScore',
      render: (_, record) => (
        <Progress
          percent={record.riskScore}
          size="small"
          strokeColor={getRiskColor(record.riskLevel)}
        />
      ),
    },
    {
      title: '위험 등급',
      key: 'riskLevel',
      render: (_, record) => (
        <Tag color={getRiskColor(record.riskLevel)}>{record.riskLevel}</Tag>
      ),
    },
  ];

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, height: '100%' }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <WarningOutlined style={{ color: '#FF9500' }} />
            <span style={{ fontWeight: 700 }}>이직 위험 분석</span>
          </Space>
          <Select
            size="small"
            value={selectedDept}
            onChange={setSelectedDept}
            style={{ width: 120 }}
            options={depts.map((d) => ({ label: d, value: d }))}
          />
        </div>
      }
    >
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" dataKey="x" name="만족도" tick={{ fontSize: 11 }} />
            <YAxis type="number" dataKey="y" name="위험도" tick={{ fontSize: 11 }} />
            <ZAxis type="number" dataKey="z" range={[60, 200]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={scatterData}>
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskLevel as EmployeeRisk['riskLevel'])} fillOpacity={0.7} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        size="small"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
      />
    </Card>
  );
}
