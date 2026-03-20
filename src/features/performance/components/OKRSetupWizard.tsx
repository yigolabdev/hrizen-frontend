import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select, message, Space } from 'antd';
import type { StepProps } from 'antd';
import { apiClient } from '@/lib/api';

const { Step } = Steps;
const { Option } = Select;

interface OKR {
  objective: string;
  keyResults: string[];
  owner: string;
  dueDate: string;
}

export default function OKRSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [okrs, setOkrs] = useState<OKR[]>([]);

  const steps: StepProps[] = [
    {
      title: '목표 설정',
      content: (
        <Form.Item
          name="objective"
          label="목표(Objective)"
          rules={[{ required: true, message: '목표를 입력해주세요.' }]}
        >
          <Input placeholder="올해 회사의 핵심 목표를 입력하세요." />
        </Form.Item>
      ),
    },
    {
      title: '핵심 결과(Key Results)',
      content: (
        <Form.List name="keyResults" rules={[{ validator: async (_, keyResults) => {
          if (!keyResults || keyResults.length < 1) {
            return Promise.reject(new Error('최소 한 개 이상의 핵심 결과를 입력해야 합니다.'));
          }
        } }]}> 
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  required
                  key={key}
                  style={{ marginBottom: 8 }}
                >
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: '핵심 결과를 입력해주세요.' }]}
                    noStyle
                  >
                    <Input placeholder="핵심 결과를 입력하세요." />
                  </Form.Item>
                  <Button
                    type="link"
                    danger
                    onClick={() => remove(name)}
                    style={{ padding: 0, marginLeft: 8 }}
                  >
                    삭제
                  </Button>
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                  핵심 결과 추가
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      ),
    },
    {
      title: '담당자 및 마감일',
      content: (
        <>
          <Form.Item
            name="owner"
            label="담당자"
            rules={[{ required: true, message: '담당자를 선택해주세요.' }]}
          >
            <Select placeholder="담당자를 선택하세요.">
              <Option value="kim">김철수</Option>
              <Option value="lee">이영희</Option>
              <Option value="park">박민수</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="마감일"
            rules={[{ required: true, message: '마감일을 입력해주세요.' }]}
          >
            <Input type="date" />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = (values: any) => {
    const newOKR: OKR = {
      objective: values.objective,
      keyResults: values.keyResults,
      owner: values.owner,
      dueDate: values.dueDate,
    };

    // Mock API 저장
    apiClient.post('/okrs', newOKR).then(() => {
      message.success('OKR이 성공적으로 저장되었습니다.');
      setOkrs(prev => [...prev, newOKR]);
      form.resetFields();
      setCurrentStep(0);
    });
  };

  return (
    <>
      <Steps current={currentStep} size="small" items={steps.map(s => ({ title: s.title }))} style={{ marginBottom: 24 }} />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ keyResults: [''] }}
      >
        {steps[currentStep].content}

        <Form.Item>
          <Space>
            {currentStep > 0 && (
              <Button onClick={prev} style={{ borderRadius: 6 }}>
                이전
              </Button>
            )}

            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next} style={{ borderRadius: 6 }}>
                다음
              </Button>
            )}

            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit" style={{ borderRadius: 6, backgroundColor: '#007AFF', borderColor: '#007AFF' }}>
                완료
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
