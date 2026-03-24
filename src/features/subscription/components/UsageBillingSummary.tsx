import React from 'react';
import { Card, Row, Col, Typography, Progress, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  ApiOutlined,
  CloudUploadOutlined,
  MessageOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface UsageItem {
  key: string;
  name: string;
  icon: React.ReactNode;
  used: number;
  limit: number;
  unit: string;
  unitPrice: number;
  totalCost: number;
  status: 'normal' | 'warning' | 'exceeded';
}

const usageData: UsageItem[] = [
  {
    key: '1',
    name: 'API 호출',
    icon: <ApiOutlined style={{ color: '#007AFF' }} />,
    used: 84520,
    limit: 100000,
    unit: '회',
    unitPrice: 0.5,
    totalCost: 0,
    status: 'warning',
  },
  {
    key: '2',
    name: '데이터 저장소',
    icon: <DatabaseOutlined style={{ color: '#52c41a' }} />,
    used: 12.5,
    limit: 50,
    unit: 'GB',
    unitPrice: 1000,
    totalCost: 0,
    status: 'normal',
  },
  {
    key: '3',
    name: '파일 업로드',
    icon: <CloudUploadOutlined style={{ color: '#FF9500' }} />,
    used: 4.2,
    limit: 10,
    unit: 'GB',
    unitPrice: 2000,
    totalCost: 0,
    status: 'normal',
  },
  {
    key: '4',
    name: 'AI 분석 요청',
    icon: <MessageOutlined style={{ color: '#722ed1' }} />,
    used: 520,
    limit: 500,
    unit: '회',
    unitPrice: 10,
    totalCost: 200,
    status: 'exceeded',
  },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  normal: { color: '#52c41a', label: '정상' },
  warning: { color: '#FF9500', label: '주의' },
  exceeded: { color: '#ff4d4f', label: '초과' },
};

const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

export default function UsageBillingSummary() {
  const totalOverageCost = usageData.reduce((sum, item) => sum + item.totalCost, 0);

  const columns: ColumnsType<UsageItem> = [
    {
      title: '항목',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: UsageItem) => (
        <Space size={8}>
          {record.icon}
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    {
      title: '사용량',
      key: 'usage',
      render: (_: unknown, record: UsageItem) => {
        const percent = Math.min(Math.round((record.used / record.limit) * 100), 100);
        const strokeColor =
          record.status === 'exceeded'
            ? '#ff4d4f'
            : record.status === 'warning'
            ? '#FF9500'
            : '#007AFF';
        return (
          <Space direction="vertical" size={2} style={{ width: 200 }}>
            <Text style={{ fontSize: 13 }}>
              {formatNumber(record.used)} / {formatNumber(record.limit)} {record.unit}
            </Text>
            <Progress
              percent={percent}
              strokeColor={strokeColor}
              trailColor="#F2F2F7"
              showInfo={false}
              size="small"
            />
          </Space>
        );
      },
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = statusConfig[status];
        return (
          <Tag color={config.color} style={{ borderRadius: 12, fontWeight: 600 }}>
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: '단가',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number, record: UsageItem) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          ₩{formatNumber(price)} / {record.unit}
        </Text>
      ),
    },
    {
      title: '초과 요금',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (cost: number) => (
        <Text strong style={{ color: cost > 0 ? '#ff4d4f' : '#1a1a1a' }}>
          ₩{formatNumber(cost)}
        </Text>
      ),
    },
  ];

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 16, backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
      title={
        <Space size={16} align="center">
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
            Usage-based 요금 청구
          </Title>
          <Tag
            color={totalOverageCost > 0 ? '#ff4d4f' : '#52c41a'}
            style={{ borderRadius: 12, fontWeight: 600, fontSize: 13 }}
          >
            초과 요금: ₩{formatNumber(totalOverageCost)}
          </Tag>
        </Space>
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {usageData.map((item) => {
          const percent = Math.min(Math.round((item.used / item.limit) * 100), 100);
          const strokeColor =
            item.status === 'exceeded'
              ? '#ff4d4f'
              : item.status === 'warning'
              ? '#FF9500'
              : '#007AFF';
          return (
            <Col xs={12} sm={6} key={item.key}>
              <Card
                size="small"
                bordered={false}
                style={{ backgroundColor: '#F2F2F7', borderRadius: 12 }}
                bodyStyle={{ padding: 16 }}
              >
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <Space size={6}>
                    {item.icon}
                    <Text strong style={{ fontSize: 13 }}>{item.name}</Text>
                  </Space>
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>
                    {percent}%
                  </Text>
                  <Progress
                    percent={percent}
                    strokeColor={strokeColor}
                    trailColor="#e8e8e8"
                    showInfo={false}
                    size="small"
                  />
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Table<UsageItem>
        columns={columns}
        dataSource={usageData}
        pagination={false}
        scroll={{ x: 600 }}
        style={{ borderRadius: 12, overflow: 'hidden' }}
      />
    </Card>
  );
}
