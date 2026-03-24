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
  { key: '2', name: '이서연', department: '마케팅팀', tenure: 1.5, satisfaction: 52, riskScore: 78, riskLevel: '높음', factors: ['업무 과부하', '팀 갈등'] },
  { key: '3', name: '박지호', department: '영업팀', tenure: 5.1, satisfaction: 61, riskScore: 65, riskLevel: '보통', factors: ['경력 정체', '급여 불만족'] },
  { key: '4', name: '최수빈', department: '인사팀', tenure: 2.8, satisfaction: 58, riskScore: 62, riskLevel: '보통', factors: ['업무 환경', '성장 기회 부족'] },
  { key: '5', name: '정유진', department: '개발팀', tenure: 4.3, satisfaction: 72, riskScore: 41, riskLevel: '낮음', factors: ['경미한 불만'] },
  { key: '6', name: '한도윤', department: '디자인팀', tenure: 0.8, satisfaction: 38, riskScore: 91, riskLevel: '높음', factors: ['적응 실패', '기대 불일치', '급여 불만족'] },
  { key: '7', name: '오하은', department: '재무팀', tenure: 6.2, satisfaction: 78, riskScore: 25, riskLevel: '낮음', factors: [] },
  { key: '8', name: '강시우', department: '영업팀', tenure: 2.1, satisfaction: 55, riskScore: 69, riskLevel: '보통', factors: ['성과 압박', '워라밸 부족'] },
  { key: '9', name: '윤지아', department: '개발팀', tenure: 1.2, satisfaction: 42, riskScore: 83, riskLevel: '높음', factors: ['야근 과다', '소통 부재'] },
  { key: '10', name: '임준서', department: '마케팅팀', tenure: 3.7, satisfaction: 68, riskScore: 38, riskLevel: '낮음', factors: [] },
];

type ViewMode = 'chart' | 'table';

const getRiskColor = (score: number): string => {
  if (score >= 70) return '#FF3B30';
  if (score >= 50) return '#FF9500';
  return '#34C759';
};

const getRiskTagColor = (level: string): string => {
  if (level === '높음') return 'red';
  if (level === '보통') return 'orange';
  return 'green';
};

interface ScatterDataPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  department: string;
  riskScore: number;
}

export default function TurnoverRiskGraph() {
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [departmentFilter, setDepartmentFilter] = useState<string>('전체');

  const departments = ['전체', ...Array.from(new Set(employeeRiskData.map((e) => e.department)))];

  const filteredData = departmentFilter === '전체'
    ? employeeRiskData
    : employeeRiskData.filter((e) => e.department === departmentFilter);

  const scatterData: ScatterDataPoint[] = filteredData.map((e) => ({
    x: e.tenure,
    y: e.satisfaction,
    z: e.riskScore,
    name: e.name,
    department: e.department,
    riskScore: e.riskScore,
  }));

  const highRiskCount = filteredData.filter((e) => e.riskLevel === '높음').length;

  const columns: ColumnsType<EmployeeRisk> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: EmployeeRisk) => (
        <Space>
          {record.riskLevel === '높음' && <WarningOutlined style={{ color: '#FF3B30' }} />}
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    { title: '부서', dataIndex: 'department', key: 'department' },
    {
      title: '재직기간',
      dataIndex: 'tenure',
      key: 'tenure',
      render: (val: number) => `${val}년`,
      sorter: (a: EmployeeRisk, b: EmployeeRisk) => a.tenure - b.tenure,
    },
    {
      title: '이직 위험도',
      dataIndex: 'riskScore',
      key: 'riskScore',
      render: (score: number) => (
        <Progress
          percent={score}
          size="small"
          strokeColor={getRiskColor(score)}
          format={(pct) => `${pct}%`}
          style={{ width: 120 }}
        />
      ),
      sorter: (a: EmployeeRisk, b: EmployeeRisk) => a.riskScore - b.riskScore,
      defaultSortOrder: 'descend',
    },
    {
      title: '위험 등급',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level: string) => <Tag color={getRiskTagColor(level)}>{level}</Tag>,
    },
    {
      title: '주요 요인',
      dataIndex: 'factors',
      key: 'factors',
      render: (factors: string[]) => (
        <Space wrap size={4}>
          {factors.slice(0, 2).map((f) => (
            <Tag key={f} style={{ borderRadius: 6, fontSize: 11 }}>{f}</Tag>
          ))}
          {factors.length > 2 && <Tag style={{ borderRadius: 6, fontSize: 11 }}>+{factors.length - 2}</Tag>}
        </Space>
      ),
    },
  ];

  const CustomTooltipContent = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScatterDataPoint }> }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <Text strong>{d.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{d.department}</Text>
          <br />
          <Text style={{ fontSize: 12 }}>재직: {d.x}년 | 만족도: {d.y}%</Text>
          <br />
          <Text style={{ fontSize: 12, color: getRiskColor(d.riskScore) }}>위험도: {d.riskScore}%</Text>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, color: '#007AFF', fontSize: 16 }}>이직 위험도 분석</span>
          <AntTooltip title="AI가 직원의 근태 패턴, 만족도 설문, 성과 데이터를 분석하여 이직 위험도를 산출합니다.">
            <InfoCircleOutlined style={{ color: '#8E8E93', fontSize: 14 }} />
          </AntTooltip>
          {highRiskCount > 0 && (
            <Tag color="red" style={{ marginLeft: 8, borderRadius: 10 }}>
              <WarningOutlined /> 고위험 {highRiskCount}명
            </Tag>
          )}
        </div>
      }
      extra={
        <Space>
          <Select
            value={departmentFilter}
            onChange={setDepartmentFilter}
            size="small"
            style={{ width: 110 }}
            options={departments.map((d) => ({ label: d, value: d }))}
          />
          <Select
            value={viewMode}
            onChange={(v) => setViewMode(v)}
            size="small"
            style={{ width: 90 }}
            options={[
              { label: '차트', value: 'chart' },
              { label: '테이블', value: 'table' },
            ]}
          />
        </Space>
      }
    >
      {viewMode === 'chart' ? (
        <>
          <div style={{ marginBottom: 12 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>X: 재직기간(년) | Y: 만족도(%) | 크기·색상: 이직 위험도</Text>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
              <XAxis
                type="number"
                dataKey="x"
                name="재직기간"
                unit="년"
                tick={{ fontSize: 12, fill: '#8E8E93' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="만족도"
                unit="%"
                tick={{ fontSize: 12, fill: '#8E8E93' }}
                axisLine={false}
                tickLine={false}
              />
              <ZAxis type="number" dataKey="z" range={[80, 400]} />
              <Tooltip content={<CustomTooltipContent />} />
              <Scatter data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskScore)} fillOpacity={0.7} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Table<EmployeeRisk>
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          size="small"
          scroll={{ x: 700 }}
        />
      )}
    </Card>
  );
}
