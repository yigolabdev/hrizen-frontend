import React from 'react';
import { Card, Table, Tag, Typography, Progress, Space, Tooltip, Row, Col, Statistic } from 'antd';
import {
  CheckCircleFilled,
  WarningFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import type { TaxComplianceItem } from '@/features/payroll/types';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

const complianceData: TaxComplianceItem[] = [
  {
    id: '1',
    name: '4대 보험 적용',
    status: 'compliant',
    description: '국민연금, 건강보험, 장기요양보험, 고용보험 요율 적용 완료',
    lastChecked: '2024-07-15',
    regulation: '사회보험법',
  },
  {
    id: '2',
    name: '근로소득세 원천징수',
    status: 'compliant',
    description: '간이세액표 기준 소득세 자동 계산',
    lastChecked: '2024-07-15',
    regulation: '소득세법 제134조',
  },
  {
    id: '3',
    name: '지방소득세 산출',
    status: 'compliant',
    description: '소득세의 10% 지방소득세 적용',
    lastChecked: '2024-07-15',
    regulation: '지방세법',
  },
  {
    id: '4',
    name: '최저임금 준수',
    status: 'compliant',
    description: '2024년 최저시급 9,860원 기준 충족 확인',
    lastChecked: '2024-07-15',
    regulation: '최저임금법',
  },
  {
    id: '5',
    name: '연장근로수당 반영',
    status: 'warning',
    description: '일부 직원의 연장근로 내역이 미반영 상태입니다.',
    lastChecked: '2024-07-14',
    regulation: '근로기준법 제56조',
  },
  {
    id: '6',
    name: '퇴직금 적립 현황',
    status: 'compliant',
    description: '퇴직급여충당금 월별 적립 완료',
    lastChecked: '2024-07-15',
    regulation: '근로자퇴직급여보장법',
  },
  {
    id: '7',
    name: '연말정산 자료 준비',
    status: 'pending',
    description: '2024년 귀속 연말정산 자료 수집 대기 중',
    lastChecked: '2024-07-10',
    regulation: '소득세법 제137조',
  },
  {
    id: '8',
    name: '급여대장 보관',
    status: 'compliant',
    description: '전자급여대장 3년 보관 의무 준수',
    lastChecked: '2024-07-15',
    regulation: '근로기준법 제48조',
  },
];

const statusIconMap: Record<string, React.ReactNode> = {
  compliant: <CheckCircleFilled style={{ color: '#52c41a' }} />,
  warning: <WarningFilled style={{ color: '#FF9500' }} />,
  non_compliant: <CloseCircleFilled style={{ color: '#ff4d4f' }} />,
  pending: <ClockCircleFilled style={{ color: '#8c8c8c' }} />,
};

const statusTagMap: Record<string, { color: string; text: string }> = {
  compliant: { color: 'success', text: '준수' },
  warning: { color: 'warning', text: '주의' },
  non_compliant: { color: 'error', text: '미준수' },
  pending: { color: 'default', text: '대기' },
};

export default function TaxComplianceStatus() {
  const compliantCount = complianceData.filter((d) => d.status === 'compliant').length;
  const warningCount = complianceData.filter((d) => d.status === 'warning').length;
  const pendingCount = complianceData.filter((d) => d.status === 'pending').length;
  const total = complianceData.length;
  const complianceRate = Math.round((compliantCount / total) * 100);

  const columns: ColumnsType<TaxComplianceItem> = [
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 60,
      align: 'center',
      render: (status: string) => statusIconMap[status],
    },
    {
      title: '항목',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      render: (name: string, record: TaxComplianceItem) => (
        <Tooltip title={record.description}>
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 11 }}>{record.regulation}</Text>
          </div>
        </Tooltip>
      ),
    },
    {
      title: '결과',
      dataIndex: 'status',
      key: 'tag',
      width: 80,
      render: (status: string) => {
        const config = statusTagMap[status];
        return <Tag color={config?.color}>{config?.text}</Tag>;
      },
    },
    {
      title: '확인일',
      dataIndex: 'lastChecked',
      key: 'lastChecked',
      width: 100,
      responsive: ['md'],
    },
  ];

  return (
    <Card
      title={
        <Space>
          <SafetyCertificateOutlined style={{ color: '#007AFF' }} />
          <span>세무 컴플라이언스 현황</span>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12 }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
    >
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col xs={8}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={complianceRate}
              size={80}
              strokeColor="#52c41a"
              format={(pct) => <span style={{ fontWeight: 700, fontSize: 16 }}>{pct}%</span>}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>준수율</Text>
            </div>
          </div>
        </Col>
        <Col xs={16}>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Statistic
                title={<Text style={{ fontSize: 12 }}>준수</Text>}
                value={compliantCount}
                valueStyle={{ color: '#52c41a', fontSize: 20 }}
                suffix={`/${total}`}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={<Text style={{ fontSize: 12 }}>주의</Text>}
                value={warningCount}
                valueStyle={{ color: '#FF9500', fontSize: 20 }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={<Text style={{ fontSize: 12 }}>대기</Text>}
                value={pendingCount}
                valueStyle={{ color: '#8c8c8c', fontSize: 20 }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={complianceData}
        rowKey="id"
        pagination={false}
        size="small"
        scroll={{ x: 400 }}
      />
    </Card>
  );
}
