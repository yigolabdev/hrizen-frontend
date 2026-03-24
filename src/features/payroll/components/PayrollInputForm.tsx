import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Table,
  Space,
  Tag,
  Modal,
  DatePicker,
  message,
  Row,
  Col,
  Divider,
  Typography,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { PayrollRecord, Allowance, Deduction } from '@/features/payroll/types';
import dayjs from 'dayjs';

const { Text } = Typography;

interface PayrollInputFormProps {
  onRecordCreated: (record: PayrollRecord) => void;
}

const mockEmployees = [
  { id: 'EMP001', name: '김지수', department: '개발팀', position: '시니어 개발자' },
  { id: 'EMP002', name: '박민수', department: '마케팅팀', position: '팀장' },
  { id: 'EMP003', name: '이수진', department: '인사팀', position: '매니저' },
  { id: 'EMP004', name: '최현우', department: '개발팀', position: '주니어 개발자' },
  { id: 'EMP005', name: '정다은', department: '재무팀', position: '회계사' },
  { id: 'EMP006', name: '한서연', department: '디자인팀', position: 'UI 디자이너' },
];

const defaultAllowances: Allowance[] = [
  { id: 'a1', name: '식대', amount: 200000 },
  { id: 'a2', name: '교통비', amount: 100000 },
  { id: 'a3', name: '직책수당', amount: 0 },
];

const defaultDeductions: Deduction[] = [
  { id: 'd1', name: '국민연금', amount: 0 },
  { id: 'd2', name: '건강보험', amount: 0 },
  { id: 'd3', name: '장기요양보험', amount: 0 },
  { id: 'd4', name: '고용보험', amount: 0 },
  { id: 'd5', name: '소득세', amount: 0 },
  { id: 'd6', name: '지방소득세', amount: 0 },
];

const initialRecords: PayrollRecord[] = [
  {
    id: 'PR001',
    employeeId: 'EMP001',
    employeeName: '김지수',
    department: '개발팀',
    position: '시니어 개발자',
    baseSalary: 5000000,
    allowances: [
      { id: 'a1', name: '식대', amount: 200000 },
      { id: 'a2', name: '교통비', amount: 100000 },
      { id: 'a3', name: '직책수당', amount: 300000 },
    ],
    deductions: [
      { id: 'd1', name: '국민연금', amount: 252000 },
      { id: 'd2', name: '건강보험', amount: 196000 },
      { id: 'd3', name: '장기요양보험', amount: 25270 },
      { id: 'd4', name: '고용보험', amount: 50400 },
      { id: 'd5', name: '소득세', amount: 213340 },
      { id: 'd6', name: '지방소득세', amount: 21334 },
    ],
    grossPay: 5600000,
    totalDeductions: 758344,
    netPay: 4841656,
    payPeriod: '2024-07',
    payDate: '2024-07-25',
    status: 'confirmed',
  },
  {
    id: 'PR002',
    employeeId: 'EMP002',
    employeeName: '박민수',
    department: '마케팅팀',
    position: '팀장',
    baseSalary: 6000000,
    allowances: [
      { id: 'a1', name: '식대', amount: 200000 },
      { id: 'a2', name: '교통비', amount: 100000 },
      { id: 'a3', name: '직책수당', amount: 500000 },
    ],
    deductions: [
      { id: 'd1', name: '국민연금', amount: 306000 },
      { id: 'd2', name: '건강보험', amount: 238000 },
      { id: 'd3', name: '장기요양보험', amount: 30690 },
      { id: 'd4', name: '고용보험', amount: 61200 },
      { id: 'd5', name: '소득세', amount: 318920 },
      { id: 'd6', name: '지방소득세', amount: 31892 },
    ],
    grossPay: 6800000,
    totalDeductions: 986702,
    netPay: 5813298,
    payPeriod: '2024-07',
    payDate: '2024-07-25',
    status: 'calculated',
  },
  {
    id: 'PR003',
    employeeId: 'EMP003',
    employeeName: '이수진',
    department: '인사팀',
    position: '매니저',
    baseSalary: 4500000,
    allowances: [
      { id: 'a1', name: '식대', amount: 200000 },
      { id: 'a2', name: '교통비', amount: 100000 },
      { id: 'a3', name: '직책수당', amount: 200000 },
    ],
    deductions: [
      { id: 'd1', name: '국민연금', amount: 225000 },
      { id: 'd2', name: '건강보험', amount: 175000 },
      { id: 'd3', name: '장기요양보험', amount: 22560 },
      { id: 'd4', name: '고용보험', amount: 45000 },
      { id: 'd5', name: '소득세', amount: 175680 },
      { id: 'd6', name: '지방소득세', amount: 17568 },
    ],
    grossPay: 5000000,
    totalDeductions: 660808,
    netPay: 4339192,
    payPeriod: '2024-07',
    payDate: '2024-07-25',
    status: 'draft',
  },
];

function calculateDeductions(grossPay: number): Deduction[] {
  const nationalPension = Math.round(grossPay * 0.045);
  const healthInsurance = Math.round(grossPay * 0.03545);
  const longTermCare = Math.round(healthInsurance * 0.1291);
  const employmentInsurance = Math.round(grossPay * 0.009);
  const incomeTax = Math.round(grossPay * 0.038);
  const localIncomeTax = Math.round(incomeTax * 0.1);

  return [
    { id: 'd1', name: '국민연금', amount: nationalPension },
    { id: 'd2', name: '건강보험', amount: healthInsurance },
    { id: 'd3', name: '장기요양보험', amount: longTermCare },
    { id: 'd4', name: '고용보험', amount: employmentInsurance },
    { id: 'd5', name: '소득세', amount: incomeTax },
    { id: 'd6', name: '지방소득세', amount: localIncomeTax },
  ];
}

export default function PayrollInputForm({ onRecordCreated }: PayrollInputFormProps) {
  const [records, setRecords] = useState<PayrollRecord[]>(initialRecords);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PayrollRecord | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const statusConfig: Record<string, { color: string; label: string }> = {
    draft: { color: 'default', label: '초안' },
    calculated: { color: 'processing', label: '정산 완료' },
    confirmed: { color: 'success', label: '확정' },
    paid: { color: 'purple', label: '지급 완료' },
  };

  const openCreateModal = () => {
    setEditingRecord(null);
    form.resetFields();
    form.setFieldsValue({
      allowances: defaultAllowances,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (record: PayrollRecord) => {
    setEditingRecord(record);
    form.setFieldsValue({
      employeeId: record.employeeId,
      baseSalary: record.baseSalary,
      payPeriod: dayjs(record.payPeriod, 'YYYY-MM'),
      payDate: dayjs(record.payDate, 'YYYY-MM-DD'),
      allowances: record.allowances,
    });
    setIsModalOpen(true);
  };

  const handleCalculateAndSave = () => {
    form.validateFields().then((values) => {
      const emp = mockEmployees.find((e) => e.id === values.employeeId);
      if (!emp) return;

      const allowances: Allowance[] = (values.allowances || []).map((a: Allowance, i: number) => ({
        ...a,
        id: `a${i + 1}`,
      }));
      const totalAllowances = allowances.reduce((sum: number, a: Allowance) => sum + (a.amount || 0), 0);
      const grossPay = (values.baseSalary || 0) + totalAllowances;
      const deductions = calculateDeductions(grossPay);
      const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
      const netPay = grossPay - totalDeductions;

      const newRecord: PayrollRecord = {
        id: editingRecord ? editingRecord.id : `PR${String(records.length + 1).padStart(3, '0')}`,
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        position: emp.position,
        baseSalary: values.baseSalary,
        allowances,
        deductions,
        grossPay,
        totalDeductions,
        netPay,
        payPeriod: dayjs(values.payPeriod).format('YYYY-MM'),
        payDate: dayjs(values.payDate).format('YYYY-MM-DD'),
        status: 'calculated',
      };

      if (editingRecord) {
        setRecords((prev) => prev.map((r) => (r.id === editingRecord.id ? newRecord : r)));
        message.success('급여 내역이 수정되었습니다.');
      } else {
        setRecords((prev) => [...prev, newRecord]);
        message.success('급여가 자동 정산되었습니다.');
      }

      onRecordCreated(newRecord);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleConfirm = (record: PayrollRecord) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === record.id ? { ...r, status: 'confirmed' as const } : r))
    );
    message.success(`${record.employeeName}님의 급여가 확정되었습니다.`);
  };

  const handleDelete = (recordId: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== recordId));
    message.success('급여 내역이 삭제되었습니다.');
  };

  const filteredRecords = records.filter(
    (r) =>
      r.employeeName.includes(searchText) ||
      r.department.includes(searchText) ||
      r.employeeId.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<PayrollRecord> = [
    {
      title: '직원명',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 100,
      render: (name: string, record: PayrollRecord) => (
        <div>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.department}</Text>
        </div>
      ),
    },
    {
      title: '기본급',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      width: 120,
      align: 'right',
      render: (v: number) => `${v.toLocaleString()}원`,
    },
    {
      title: '총지급액',
      dataIndex: 'grossPay',
      key: 'grossPay',
      width: 120,
      align: 'right',
      render: (v: number) => <Text strong style={{ color: '#007AFF' }}>{v.toLocaleString()}원</Text>,
    },
    {
      title: '공제합계',
      dataIndex: 'totalDeductions',
      key: 'totalDeductions',
      width: 120,
      align: 'right',
      render: (v: number) => <Text type="danger">{v.toLocaleString()}원</Text>,
    },
    {
      title: '실수령액',
      dataIndex: 'netPay',
      key: 'netPay',
      width: 130,
      align: 'right',
      render: (v: number) => <Text strong style={{ fontSize: 14 }}>{v.toLocaleString()}원</Text>,
    },
    {
      title: '정산기간',
      dataIndex: 'payPeriod',
      key: 'payPeriod',
      width: 100,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const config = statusConfig[status];
        return <Tag color={config?.color}>{config?.label}</Tag>;
      },
    },
    {
      title: '액션',
      key: 'action',
      width: 180,
      render: (_: unknown, record: PayrollRecord) => (
        <Space size={4}>
          <Button
            type="link"
            size="small"
            icon={<SearchOutlined />}
            onClick={() => onRecordCreated(record)}
          >
            상세
          </Button>
          {record.status === 'draft' || record.status === 'calculated' ? (
            <>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => openEditModal(record)}
              >
                수정
              </Button>
              <Button
                type="link"
                size="small"
                icon={<CheckCircleOutlined />}
                style={{ color: '#52c41a' }}
                onClick={() => handleConfirm(record)}
              >
                확정
              </Button>
            </>
          ) : null}
          <Popconfirm
            title="삭제하시겠습니까?"
            onConfirm={() => handleDelete(record.id)}
            okText="삭제"
            cancelText="취소"
          >
            <Button type="link" size="small" icon={<DeleteOutlined />} danger>
              삭제
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="급여 내역"
        bordered={false}
        style={{ borderRadius: 12 }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
        extra={
          <Space>
            <Input
              placeholder="직원 검색..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateModal}
              style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}
            >
              급여 등록
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredRecords}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 900 }}
          size="middle"
        />
      </Card>

      <Modal
        title={editingRecord ? '급여 수정' : '급여 등록 및 자동 정산'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={handleCalculateAndSave}
        okText={
          <span>
            <CalculatorOutlined style={{ marginRight: 6 }} />
            자동 정산
          </span>
        }
        cancelText="취소"
        width={700}
        okButtonProps={{ style: { backgroundColor: '#007AFF', borderColor: '#007AFF' } }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="employeeId"
                label="직원"
                rules={[{ required: true, message: '직원을 선택하세요' }]}
              >
                <Select
                  placeholder="직원 선택"
                  showSearch
                  optionFilterProp="label"
                  options={mockEmployees.map((e) => ({
                    value: e.id,
                    label: `${e.name} (${e.department})`,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="baseSalary"
                label="기본급 (원)"
                rules={[{ required: true, message: '기본급을 입력하세요' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => Number((value || '').replace(/,/g, ''))}
                  min={0}
                  step={100000}
                  placeholder="5,000,000"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="payPeriod"
                label="정산 기간"
                rules={[{ required: true, message: '정산 기간을 선택하세요' }]}
              >
                <DatePicker picker="month" style={{ width: '100%' }} placeholder="YYYY-MM" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="payDate"
                label="지급일"
                rules={[{ required: true, message: '지급일을 선택하세요' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" plain style={{ color: '#007AFF', fontSize: 14 }}>
            수당 항목
          </Divider>
          <Form.List name="allowances">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={12} align="middle">
                    <Col xs={10}>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: '항목명 입력' }]}
                        style={{ marginBottom: 8 }}
                      >
                        <Input placeholder="수당명" />
                      </Form.Item>
                    </Col>
                    <Col xs={10}>
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        rules={[{ required: true, message: '금액 입력' }]}
                        style={{ marginBottom: 8 }}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => Number((value || '').replace(/,/g, ''))}
                          min={0}
                          placeholder="금액"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={4}>
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        style={{ marginBottom: 8 }}
                      />
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add({ name: '', amount: 0 })} block icon={<PlusOutlined />}>
                  수당 추가
                </Button>
              </>
            )}
          </Form.List>

          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#F2F2F7', borderRadius: 8 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              💡 공제 항목(4대 보험, 소득세, 지방소득세)은 총지급액 기준으로 자동 계산됩니다.
            </Text>
          </div>
        </Form>
      </Modal>
    </>
  );
}
