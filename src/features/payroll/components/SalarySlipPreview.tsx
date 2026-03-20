import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Typography, Divider } from 'antd';
import { PayrollInputData } from './PayrollInputForm';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

interface SalarySlipProps {
  inputData?: PayrollInputData;
}

interface SalaryDetails {
  baseSalary: number;
  overtimePay: number;
  bonuses: number;
  deductions: number;
  taxAmount: number;
  totalPaid: number;
}

const TAX_RATES: Record<string, number> = {
  general: 0.1,
  simple: 0.05,
  exempt: 0,
};

export function SalarySlipPreview() {
  const [details, setDetails] = useState<SalaryDetails | null>(null);
  const [inputData, setInputData] = useState<PayrollInputData>({
    baseSalary: 3000000,
    overtimeHours: 0,
    overtimeRate: 1.5,
    deductions: 0,
    bonuses: 0,
    taxCode: 'general',
  });

  // Listen event from PayrollInputForm via window event (simplification)
  useEffect(() => {
    function handlePayrollInputUpdate(e: CustomEvent<PayrollInputData>) {
      setInputData(e.detail);
    }
    window.addEventListener('payrollInputUpdate', handlePayrollInputUpdate as EventListener);
    return () => {
      window.removeEventListener('payrollInputUpdate', handlePayrollInputUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    // 계산
    const baseSalary = inputData.baseSalary;
    const overtimePay = Math.round(baseSalary / 209 * inputData.overtimeHours * inputData.overtimeRate);
    const bonuses = inputData.bonuses;
    const deductions = inputData.deductions;

    const taxRate = TAX_RATES[inputData.taxCode] ?? 0.1;
    const taxableIncome = baseSalary + overtimePay + bonuses - deductions;
    const taxAmount = Math.max(Math.round(taxableIncome * taxRate), 0);

    const totalPaid = taxableIncome - taxAmount;

    setDetails({
      baseSalary,
      overtimePay,
      bonuses,
      deductions,
      taxAmount,
      totalPaid,
    });
  }, [inputData]);

  if (!details) {
    return null;
  }

  return (
    <section aria-label="급여 계산 결과">
      <Title level={4} style={{ color: '#007AFF', marginBottom: 16 }}>
        급여명세서 미리보기
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="기본 급여" value={details.baseSalary} suffix="원" />
        </Col>
        <Col span={12}>
          <Statistic title="초과 근무 수당" value={details.overtimePay} suffix="원" />
        </Col>
        <Col span={12}>
          <Statistic title="성과급 및 보너스" value={details.bonuses} suffix="원" />
        </Col>
        <Col span={12}>
          <Statistic title="공제액" value={details.deductions} suffix="원" />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="세금 총액" value={details.taxAmount} suffix="원" />
        </Col>
        <Col span={12}>
          <Statistic
            title="실 수령액"
            value={details.totalPaid}
            suffix="원"
            valueStyle={{ color: '#FF9500', fontWeight: 'bold' }}
          />
        </Col>
      </Row>
      <Text type="secondary" style={{ display: 'block', marginTop: 12 }}>
        * 세법 및 공제는 선택하신 세법 코드에 따라 자동 적용됩니다.
      </Text>
    </section>
  );
}
