import React, { useRef } from 'react';
import { Card, Descriptions, Table, Typography, Space, Divider, Empty, Button, Tag } from 'antd';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import type { PayrollRecord } from '@/features/payroll/types';

const { Title, Text } = Typography;

interface SalarySlipPreviewProps {
  record: PayrollRecord | null;
}

export default function SalarySlipPreview({ record }: SalarySlipPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>급여명세서 - ${record?.employeeName}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; }
                table { width: 100%; border-collapse: collapse; margin: 16px 0; }
                th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
                th { background: #f5f5f5; }
                .header { text-align: center; margin-bottom: 24px; }
                .amount { text-align: right; }
              </style>
            </head>
            <body>${printContent}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (!record) {
    return (
      <Card
        title="급여 명세서 미리보기"
        bordered={false}
        style={{ borderRadius: 12 }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      >
        <Empty
          description="급여 내역을 선택하면 명세서를 미리볼 수 있습니다."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  const statusMap: Record<string, { color: string; label: string }> = {
    draft: { color: 'default', label: '초안' },
    calculated: { color: 'processing', label: '정산 완료' },
    confirmed: { color: 'success', label: '확정' },
    paid: { color: 'purple', label: '지급 완료' },
  };

  const allowanceColumns = [
    { title: '수당 항목', dataIndex: 'name', key: 'name' },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (v: number) => `${v.toLocaleString()}원`,
    },
  ];

  const deductionColumns = [
    { title: '공제 항목', dataIndex: 'name', key: 'name' },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (v: number) => `${v.toLocaleString()}원`,
    },
  ];

  return (
    <Card
      title={
        <Space>
          <span>급여 명세서 미리보기</span>
          <Tag color={statusMap[record.status]?.color}>{statusMap[record.status]?.label}</Tag>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12 }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
      extra={
        <Space>
          <Button icon={<PrinterOutlined />} onClick={handlePrint} size="small">
            인쇄
          </Button>
          <Button icon={<DownloadOutlined />} size="small">
            다운로드
          </Button>
        </Space>
      }
    >
      <div ref={printRef}>
        <div className="header" style={{ textAlign: 'center', marginBottom: 20 }}>
          <Title level={4} style={{ margin: 0, color: '#007AFF' }}>HRiZen 급여명세서</Title>
          <Text type="secondary">{record.payPeriod} 정산 | 지급일: {record.payDate}</Text>
        </div>

        <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }} style={{ marginBottom: 16 }}>
          <Descriptions.Item label="직원명">{record.employeeName}</Descriptions.Item>
          <Descriptions.Item label="사번">{record.employeeId}</Descriptions.Item>
          <Descriptions.Item label="부서">{record.department}</Descriptions.Item>
          <Descriptions.Item label="직위">{record.position}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left" plain style={{ fontSize: 13, color: '#007AFF' }}>
          지급 내역
        </Divider>

        <Table
          dataSource={[
            { key: 'base', name: '기본급', amount: record.baseSalary },
            ...record.allowances.map((a) => ({ key: a.id, name: a.name, amount: a.amount })),
          ]}
          columns={allowanceColumns}
          pagination={false}
          size="small"
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <Text strong>총지급액</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <Text strong style={{ color: '#007AFF' }}>{record.grossPay.toLocaleString()}원</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />

        <Divider orientation="left" plain style={{ fontSize: 13, color: '#ff4d4f' }}>
          공제 내역
        </Divider>

        <Table
          dataSource={record.deductions.map((d) => ({ key: d.id, ...d }))}
          columns={deductionColumns}
          pagination={false}
          size="small"
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <Text strong>공제합계</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <Text strong type="danger">{record.totalDeductions.toLocaleString()}원</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />

        <div
          style={{
            marginTop: 20,
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #007AFF08, #007AFF15)',
            borderRadius: 10,
            border: '1px solid #007AFF30',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={5} style={{ margin: 0 }}>실수령액</Title>
          <Title level={3} style={{ margin: 0, color: '#007AFF' }}>
            {record.netPay.toLocaleString()}원
          </Title>
        </div>
      </div>
    </Card>
  );
}
