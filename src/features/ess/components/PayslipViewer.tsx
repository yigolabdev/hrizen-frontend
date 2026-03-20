import React, { useEffect, useState } from 'react';
import { Table, Card, Typography, Button, Modal, Spin } from 'antd';
import { apiClient } from '@/lib/api';

const { Title } = Typography;

type Payslip = {
  id: string;
  month: string; // YYYY-MM
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  issueDate: string; // YYYY-MM-DD
  details: {
    label: string;
    amount: number;
  }[];
};

export default function PayslipViewer() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient.get('/ess/payslips').then(() => {
      // Mock 데이터
      const mockPayslips: Payslip[] = [
        {
          id: 'p202406',
          month: '2024-06',
          baseSalary: 3500000,
          bonus: 500000,
          deductions: 200000,
          netPay: 3800000,
          issueDate: '2024-07-01',
          details: [
            { label: '기본급', amount: 3500000 },
            { label: '성과급', amount: 500000 },
            { label: '국민연금', amount: -100000 },
            { label: '건강보험', amount: -60000 },
            { label: '소득세', amount: -40000 },
          ],
        },
        {
          id: 'p202405',
          month: '2024-05',
          baseSalary: 3500000,
          bonus: 0,
          deductions: 180000,
          netPay: 3320000,
          issueDate: '2024-06-01',
          details: [
            { label: '기본급', amount: 3500000 },
            { label: '국민연금', amount: -100000 },
            { label: '건강보험', amount: -60000 },
            { label: '소득세', amount: -20000 },
          ],
        },
      ];
      setPayslips(mockPayslips);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: '월',
      dataIndex: 'month',
      key: 'month',
      render: (text: string) => <span>{text}월</span>,
    },
    {
      title: '지급일',
      dataIndex: 'issueDate',
      key: 'issueDate',
    },
    {
      title: '총 급여',
      dataIndex: 'netPay',
      key: 'netPay',
      render: (value: number) => value.toLocaleString('ko-KR') + ' 원',
    },
    {
      title: '상세',
      key: 'detail',
      render: (_: unknown, record: Payslip) => (
        <Button type="link" onClick={() => setSelectedPayslip(record)}>
          보기
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4} style={{ margin: 0, color: '#007AFF' }}>급여명세서</Title>}
      bordered={false}
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: '16px' }}
    >
      {loading ? (
        <Spin tip="로딩 중..." />
      ) : (
        <Table
          rowKey="id"
          dataSource={payslips}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 400 }}
          size="middle"
          style={{ minWidth: 360 }}
        />
      )}

      <Modal
        title={`${selectedPayslip?.month}월 급여 상세`}
        open={selectedPayslip !== null}
        onCancel={() => setSelectedPayslip(null)}
        footer={null}
        destroyOnClose
      >
        {selectedPayslip && (
          <div>
            <p>기본급: {selectedPayslip.baseSalary.toLocaleString('ko-KR')} 원</p>
            <p>보너스: {selectedPayslip.bonus.toLocaleString('ko-KR')} 원</p>
            <p>공제 합계: {selectedPayslip.deductions.toLocaleString('ko-KR')} 원</p>
            <p>
              실수령액: <strong>{selectedPayslip.netPay.toLocaleString('ko-KR')} 원</strong>
            </p>
            <hr />
            <ul style={{ paddingLeft: 24 }}>
              {selectedPayslip.details.map(({ label, amount }, idx) => (
                <li key={idx} style={{ color: amount < 0 ? '#FF3B30' : '#000' }}>
                  {label}: {amount.toLocaleString('ko-KR')} 원
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </Card>
  );
}
