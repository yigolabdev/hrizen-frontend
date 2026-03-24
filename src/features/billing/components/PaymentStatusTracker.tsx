import React from 'react';
import { Card, Row, Col, Statistic, Progress, Space, Typography, Tag, Steps } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  WarningOutlined,
} from '@ant-design/icons';

interface BillingSummary {
  totalPaid: number;
  pendingAmount: number;
  overdueAmount: number;
  nextBillingDate: string;
  currentPlanName: string;
  billingCycle: string;
  paymentSuccessRate: number;
}

const summaryData: BillingSummary = {
  totalPaid: 4140000,
  pendingAmount: 1080000,
  overdueAmount: 1170000,
  nextBillingDate: '2025-05-01',
  currentPlanName: 'HRiZen Pro',
  billingCycle: '월간',
  paymentSuccessRate: 75,
};

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  extra?: React.ReactNode;
}

function StatCard({ title, value, icon, iconBg, iconColor, extra }: StatCardProps) {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        height: '100%',
      }}
      bodyStyle={{ padding: '20px 24px' }}
    >
      <Space size={16} align="start">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {React.cloneElement(icon as React.ReactElement, {
            style: { fontSize: 22, color: iconColor },
          })}
        </div>
        <div>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {title}
          </Typography.Text>
          <div>
            <Typography.Text strong style={{ fontSize: 20 }}>
              {value}
            </Typography.Text>
          </div>
          {extra && <div style={{ marginTop: 4 }}>{extra}</div>}
        </div>
      </Space>
    </Card>
  );
}

export default function PaymentStatusTracker() {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="총 결제 금액"
            value={formatCurrency(summaryData.totalPaid)}
            icon={<DollarOutlined />}
            iconBg="#E8F5E9"
            iconColor="#52c41a"
            extra={
              <Tag color="green" style={{ borderRadius: 6, fontSize: 11 }}>
                <CheckCircleOutlined /> 정상
              </Tag>
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="결제 대기"
            value={formatCurrency(summaryData.pendingAmount)}
            icon={<ClockCircleOutlined />}
            iconBg="#EBF5FF"
            iconColor="#007AFF"
            extra={
              <Tag color="blue" style={{ borderRadius: 6, fontSize: 11 }}>
                <ClockCircleOutlined /> 대기중
              </Tag>
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="연체 금액"
            value={formatCurrency(summaryData.overdueAmount)}
            icon={<ExclamationCircleOutlined />}
            iconBg="#FFF2F0"
            iconColor="#ff4d4f"
            extra={
              <Tag color="red" style={{ borderRadius: 6, fontSize: 11 }}>
                <WarningOutlined /> 연체
              </Tag>
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="다음 결제일"
            value="2025.05.01"
            icon={<CalendarOutlined />}
            iconBg="#FFF7E6"
            iconColor="#FF9500"
            extra={
              <Space size={4}>
                <Tag style={{ borderRadius: 6, fontSize: 11 }}>
                  {summaryData.currentPlanName}
                </Tag>
                <Tag style={{ borderRadius: 6, fontSize: 11 }}>
                  {summaryData.billingCycle}
                </Tag>
              </Space>
            }
          />
        </Col>
      </Row>

      <Card
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
        bodyStyle={{ padding: '20px 24px' }}
      >
        <Row gutter={[32, 16]} align="middle">
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                결제 성공률
              </Typography.Text>
              <div style={{ marginTop: 8 }}>
                <Progress
                  type="dashboard"
                  percent={summaryData.paymentSuccessRate}
                  size={120}
                  strokeColor={{
                    '0%': '#007AFF',
                    '100%': '#52c41a',
                  }}
                  format={(percent) => (
                    <span style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>
                      {percent}%
                    </span>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <Typography.Text strong style={{ fontSize: 15, display: 'block', marginBottom: 16 }}>
              최근 결제 흐름
            </Typography.Text>
            <Steps
              current={3}
              size="small"
              items={[
                {
                  title: '1월',
                  description: '결제완료',
                  status: 'finish',
                  icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                },
                {
                  title: '2월',
                  description: '결제완료',
                  status: 'finish',
                  icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                },
                {
                  title: '3월',
                  description: '결제완료',
                  status: 'finish',
                  icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                },
                {
                  title: '4월',
                  description: '대기중',
                  status: 'process',
                  icon: <ClockCircleOutlined style={{ color: '#007AFF' }} />,
                },
                {
                  title: '5월',
                  description: '연체',
                  status: 'error',
                  icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    </Space>
  );
}
