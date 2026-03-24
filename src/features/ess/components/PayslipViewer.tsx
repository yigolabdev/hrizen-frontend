import React, { useState } from 'react';
import {
  Card,
  Select,
  Row,
  Col,
  Descriptions,
  Divider,
  Button,
  Typography,
  Grid,
  Space,
  Tag,
  Empty,
} from 'antd';
import {
  DownloadOutlined,
  PrinterOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface PayslipData {
  month: string;
  baseSalary: number;
  overtimePay: number;
  bonus: number;
  mealAllowance: number;
  transportAllowance: number;
  nationalPension: number;
  healthInsurance: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalEarnings: number;
  totalDeductions: number;
  netPay: number;
  payDate: string;
  status: '지급완료' | '처리중';
}

const mockPayslips: PayslipData[] = [
  {
    month: '2025-01',
    baseSalary: 3500000,
    overtimePay: 350000,
    bonus: 0,
    mealAllowance: 200000,
    transportAllowance: 100000,
    nationalPension: 157500,
    healthInsurance: 124950,
    employmentInsurance: 29925,
    incomeTax: 185000,
    localIncomeTax: 18500,
    totalEarnings: 4150000,
    totalDeductions: 515875,
    netPay: 3634125,
    payDate: '2025-01-25',
    status: '지급완료',
  },
  {
    month: '2024-12',
    baseSalary: 3500000,
    overtimePay: 210000,
    bonus: 1750000,
    mealAllowance: 200000,
    transportAllowance: 100000,
    nationalPension: 157500,
    healthInsurance: 124950,
    employmentInsurance: 29925,
    incomeTax: 312000,
    localIncomeTax: 31200,
    totalEarnings: 5760000,
    totalDeductions: 655575,
    netPay: 5104425,
    payDate: '2024-12-25',
    status: '지급완료',
  },
  {
    month: '2024-11',
    baseSalary: 3500000,
    overtimePay: 175000,
    bonus: 0,
    mealAllowance: 200000,
    transportAllowance: 100000,
    nationalPension: 157500,
    healthInsurance: 124950,
    employmentInsurance: 29925,
    incomeTax: 172000,
    localIncomeTax: 17200,
    totalEarnings: 3975000,
    totalDeductions: 501575,
    netPay: 3473425,
    payDate: '2024-11-25',
    status: '지급완료',
  },
];

const formatCurrency = (val: number): string =>
  val.toLocaleString('ko-KR') + '원';

export default function PayslipViewer() {
  const screens = useBreakpoint();
  const [selectedMonth, setSelectedMonth] = useState<string>(mockPayslips[0].month);
  const payslip = mockPayslips.find((p) => p.month === selectedMonth);

  const monthOptions = mockPayslips.map((p) => ({
    label: `${p.month.replace('-', '년 ')}월`,
    value: p.month,
  }));

  const cardStyle: React.CSSProperties = {
    borderRadius: 12,
    border: 'none',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  };

  return (
    <div>
      <Space
        style={{
          marginBottom: 20,
          width: '100%',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Space>
          <DollarOutlined style={{ fontSize: 18, color: '#007AFF' }} />
          <Text strong style={{ fontSize: 16, color: '#1C1C1E' }}>
            급여명세서
          </Text>
        </Space>
        <Select
          value={selectedMonth}
          onChange={setSelectedMonth}
          options={monthOptions}
          style={{ width: 180, borderRadius: 8 }}
        />
      </Space>

      {payslip ? (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={8}>
              <Card style={{ ...cardStyle, background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)' }} bodyStyle={{ padding: 24 }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>실수령액</Text>
                <Title level={3} style={{ color: '#FFFFFF', margin: '8px 0 0', fontWeight: 800 }}>
                  {formatCurrency(payslip.netPay)}
                </Title>
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card style={cardStyle} bodyStyle={{ padding: 24 }}>
                <Text style={{ color: '#8E8E93', fontSize: 13 }}>총 지급액</Text>
                <Title level={4} style={{ color: '#34C759', margin: '8px 0 0', fontWeight: 700 }}>
                  {formatCurrency(payslip.totalEarnings)}
                </Title>
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card style={cardStyle} bodyStyle={{ padding: 24 }}>
                <Text style={{ color: '#8E8E93', fontSize: 13 }}>총 공제액</Text>
                <Title level={4} style={{ color: '#FF3B30', margin: '8px 0 0', fontWeight: 700 }}>
                  {formatCurrency(payslip.totalDeductions)}
                </Title>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card
                title="지급 항목"
                style={cardStyle}
                headStyle={{ fontWeight: 700, color: '#007AFF', borderBottom: '1px solid #F2F2F7' }}
              >
                <Descriptions column={1} size={screens.md ? 'default' : 'small'} colon={false}>
                  <Descriptions.Item label="기본급">
                    <Text strong>{formatCurrency(payslip.baseSalary)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="연장근로수당">
                    <Text strong>{formatCurrency(payslip.overtimePay)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="상여금">
                    <Text strong>{formatCurrency(payslip.bonus)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="식대">
                    <Text strong>{formatCurrency(payslip.mealAllowance)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="교통비">
                    <Text strong>{formatCurrency(payslip.transportAllowance)}</Text>
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#8E8E93' }}>합계</Text>
                  <Text strong style={{ color: '#34C759', fontSize: 16 }}>
                    {formatCurrency(payslip.totalEarnings)}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="공제 항목"
                style={cardStyle}
                headStyle={{ fontWeight: 700, color: '#FF3B30', borderBottom: '1px solid #F2F2F7' }}
              >
                <Descriptions column={1} size={screens.md ? 'default' : 'small'} colon={false}>
                  <Descriptions.Item label="국민연금">
                    <Text strong>{formatCurrency(payslip.nationalPension)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="건강보험">
                    <Text strong>{formatCurrency(payslip.healthInsurance)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="고용보험">
                    <Text strong>{formatCurrency(payslip.employmentInsurance)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="소득세">
                    <Text strong>{formatCurrency(payslip.incomeTax)}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="지방소득세">
                    <Text strong>{formatCurrency(payslip.localIncomeTax)}</Text>
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#8E8E93' }}>합계</Text>
                  <Text strong style={{ color: '#FF3B30', fontSize: 16 }}>
                    {formatCurrency(payslip.totalDeductions)}
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <Space>
              <Tag color={payslip.status === '지급완료' ? '#34C759' : '#FF9500'} style={{ borderRadius: 8, border: 'none', fontWeight: 600 }}>
                {payslip.status}
              </Tag>
              <Text style={{ color: '#8E8E93', fontSize: 13 }}>지급일: {payslip.payDate}</Text>
            </Space>
            <Space>
              <Button icon={<PrinterOutlined />} style={{ borderRadius: 8 }}>
                인쇄
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                style={{ borderRadius: 8, background: '#007AFF', borderColor: '#007AFF' }}
              >
                PDF 다운로드
              </Button>
            </Space>
          </div>
        </>
      ) : (
        <Empty description="선택한 월의 급여명세서가 없습니다." />
      )}
    </div>
  );
}
