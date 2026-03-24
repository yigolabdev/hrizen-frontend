import React, { useState } from 'react';
import {
  Card,
  Steps,
  Form,
  Input,
  Select,
  Button,
  Space,
  InputNumber,
  Typography,
  Tag,
  List,
  message,
  Divider,
} from 'antd';
import {
  AimOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { KeyResult } from '@/features/performance/types';

const { TextArea } = Input;
const { Text } = Typography;

interface KeyResultForm {
  title: string;
  targetValue: number;
  unit: string;
}

export default function OKRSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [keyResults, setKeyResults] = useState<KeyResultForm[]>([]);
  const [krForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const quarterOptions = [
    { value: '2025-Q1', label: '2025년 1분기' },
    { value: '2025-Q2', label: '2025년 2분기' },
    { value: '2025-Q3', label: '2025년 3분기' },
    { value: '2025-Q4', label: '2025년 4분기' },
  ];

  const unitOptions = [
    { value: '%', label: '퍼센트 (%)' },
    { value: '건', label: '건수 (건)' },
    { value: '원', label: '금액 (원)' },
    { value: '점', label: '점수 (점)' },
    { value: '명', label: '인원 (명)' },
  ];

  const handleAddKeyResult = () => {
    krForm.validateFields().then((values) => {
      setKeyResults((prev) => [...prev, values as KeyResultForm]);
      krForm.resetFields();
    });
  };

  const handleRemoveKeyResult = (index: number) => {
    setKeyResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      form.validateFields().then(() => {
        setCurrentStep(1);
      });
    } else if (currentStep === 1) {
      if (keyResults.length === 0) {
        message.warning('핵심 결과(KR)를 최소 1개 이상 추가해주세요.');
        return;
      }
      setCurrentStep(2);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      message.success('OKR이 성공적으로 등록되었습니다.');
      setCurrentStep(0);
      form.resetFields();
      setKeyResults([]);
    }, 1200);
  };

  const steps = [
    { title: '목표 설정', description: 'Objective 입력' },
    { title: '핵심 결과', description: 'Key Results 추가' },
    { title: '확인 및 등록', description: '최종 검토' },
  ];

  const objectiveValues = form.getFieldsValue();

  return (
    <Card
      title={
        <Space>
          <AimOutlined style={{ color: '#007AFF' }} />
          <span>OKR 설정 마법사</span>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
    >
      <Steps
        current={currentStep}
        items={steps}
        size="small"
        style={{ marginBottom: 24 }}
      />

      {currentStep === 0 && (
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item
            name="title"
            label="목표 (Objective)"
            rules={[{ required: true, message: '목표를 입력해주세요.' }]}
          >
            <Input placeholder="예: 고객 만족도 향상" maxLength={100} />
          </Form.Item>
          <Form.Item
            name="quarter"
            label="분기"
            rules={[{ required: true, message: '분기를 선택해주세요.' }]}
          >
            <Select placeholder="분기 선택" options={quarterOptions} />
          </Form.Item>
          <Form.Item
            name="description"
            label="상세 설명"
            rules={[{ required: true, message: '상세 설명을 입력해주세요.' }]}
          >
            <TextArea rows={3} placeholder="목표에 대한 구체적인 설명을 입력하세요." maxLength={500} />
          </Form.Item>
        </Form>
      )}

      {currentStep === 1 && (
        <div>
          <Form form={krForm} layout="vertical" requiredMark="optional">
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Form.Item
                name="title"
                label="핵심 결과 (Key Result)"
                rules={[{ required: true, message: '핵심 결과를 입력해주세요.' }]}
                style={{ marginBottom: 8 }}
              >
                <Input placeholder="예: NPS 점수 80점 달성" />
              </Form.Item>
              <Space size={12} style={{ width: '100%' }} wrap>
                <Form.Item
                  name="targetValue"
                  label="목표 수치"
                  rules={[{ required: true, message: '필수' }]}
                  style={{ marginBottom: 8 }}
                >
                  <InputNumber min={0} placeholder="80" style={{ width: 120 }} />
                </Form.Item>
                <Form.Item
                  name="unit"
                  label="단위"
                  rules={[{ required: true, message: '필수' }]}
                  style={{ marginBottom: 8 }}
                >
                  <Select placeholder="단위" options={unitOptions} style={{ width: 140 }} />
                </Form.Item>
                <Form.Item label=" " style={{ marginBottom: 8 }}>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddKeyResult}
                    style={{ borderColor: '#007AFF', color: '#007AFF' }}
                  >
                    추가
                  </Button>
                </Form.Item>
              </Space>
            </Space>
          </Form>

          {keyResults.length > 0 && (
            <>
              <Divider style={{ margin: '16px 0 12px' }} />
              <List
                size="small"
                dataSource={keyResults}
                renderItem={(item, index) => (
                  <List.Item
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleRemoveKeyResult(index)}
                      />
                    }
                  >
                    <Space>
                      <Tag color="blue">KR{index + 1}</Tag>
                      <Text>{item.title}</Text>
                      <Text type="secondary">
                        목표: {item.targetValue}
                        {item.unit}
                      </Text>
                    </Space>
                  </List.Item>
                )}
              />
            </>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <Card
            size="small"
            style={{ backgroundColor: '#F2F2F7', borderRadius: 8, marginBottom: 16 }}
            bordered={false}
          >
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <div>
                <Text type="secondary">목표 (Objective)</Text>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{objectiveValues.title || '-'}</div>
              </div>
              <div>
                <Text type="secondary">분기</Text>
                <div>
                  {quarterOptions.find((q) => q.value === objectiveValues.quarter)?.label || '-'}
                </div>
              </div>
              <div>
                <Text type="secondary">설명</Text>
                <div>{objectiveValues.description || '-'}</div>
              </div>
            </Space>
          </Card>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            핵심 결과 ({keyResults.length}건)
          </Text>
          {keyResults.map((kr, idx) => (
            <Tag key={idx} color="blue" style={{ marginBottom: 6 }}>
              KR{idx + 1}: {kr.title} (목표 {kr.targetValue}{kr.unit})
            </Tag>
          ))}
        </div>
      )}

      <Divider style={{ margin: '20px 0 12px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={currentStep === 0} onClick={handlePrev}>
          이전
        </Button>
        <Space>
          {currentStep < 2 && (
            <Button type="primary" onClick={handleNext} style={{ backgroundColor: '#007AFF' }}>
              다음
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              loading={submitting}
              onClick={handleSubmit}
              style={{ backgroundColor: '#007AFF' }}
            >
              OKR 등록
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
}
