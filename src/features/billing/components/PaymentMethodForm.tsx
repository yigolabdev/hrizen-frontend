import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Tag,
  List,
  Modal,
  Typography,
  Divider,
  message,
  Popconfirm,
  Empty,
} from 'antd';
import {
  CreditCardOutlined,
  BankOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  StarFilled,
} from '@ant-design/icons';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  label: string;
  lastFour: string;
  expiry?: string;
  isDefault: boolean;
}

const initialMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    label: '삼성카드',
    lastFour: '4242',
    expiry: '12/27',
    isDefault: true,
  },
  {
    id: '2',
    type: 'bank',
    label: '국민은행',
    lastFour: '7890',
    isDefault: false,
  },
];

export default function PaymentMethodForm() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      setSubmitting(true);
      setTimeout(() => {
        const newMethod: PaymentMethod = {
          id: Date.now().toString(),
          type: values.type,
          label: values.label,
          lastFour: values.number.slice(-4),
          expiry: values.type === 'card' ? values.expiry : undefined,
          isDefault: methods.length === 0,
        };
        setMethods((prev) => [...prev, newMethod]);
        setSubmitting(false);
        setModalOpen(false);
        form.resetFields();
        message.success('결제 수단이 등록되었습니다.');
      }, 800);
    });
  };

  const handleDelete = (id: string) => {
    const target = methods.find((m) => m.id === id);
    const remaining = methods.filter((m) => m.id !== id);
    if (target?.isDefault && remaining.length > 0) {
      remaining[0].isDefault = true;
    }
    setMethods(remaining);
    message.success('결제 수단이 삭제되었습니다.');
  };

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
    message.success('기본 결제 수단이 변경되었습니다.');
  };

  return (
    <>
      <Card
        title="결제 수단 관리"
        bordered={false}
        style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
        headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalOpen(true)}
            style={{ backgroundColor: '#007AFF', borderColor: '#007AFF', borderRadius: 8 }}
          >
            추가
          </Button>
        }
      >
        {methods.length === 0 ? (
          <Empty description="등록된 결제 수단이 없습니다." />
        ) : (
          <List
            dataSource={methods}
            renderItem={(item) => (
              <List.Item
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid #F2F2F7',
                }}
                actions={[
                  !item.isDefault && (
                    <Button
                      key="default"
                      size="small"
                      type="text"
                      style={{ color: '#007AFF', fontSize: 13 }}
                      onClick={() => handleSetDefault(item.id)}
                    >
                      기본으로 설정
                    </Button>
                  ),
                  <Popconfirm
                    key="delete"
                    title="이 결제 수단을 삭제하시겠습니까?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="삭제"
                    cancelText="취소"
                    okButtonProps={{ danger: true }}
                  >
                    <Button
                      size="small"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>,
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  avatar={
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: item.type === 'card' ? '#EBF5FF' : '#FFF7E6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.type === 'card' ? (
                        <CreditCardOutlined style={{ fontSize: 20, color: '#007AFF' }} />
                      ) : (
                        <BankOutlined style={{ fontSize: 20, color: '#FF9500' }} />
                      )}
                    </div>
                  }
                  title={
                    <Space size={8}>
                      <Typography.Text strong style={{ fontSize: 15 }}>
                        {item.label}
                      </Typography.Text>
                      {item.isDefault && (
                        <Tag
                          icon={<StarFilled />}
                          color="#007AFF"
                          style={{ borderRadius: 6, fontSize: 11 }}
                        >
                          기본
                        </Tag>
                      )}
                    </Space>
                  }
                  description={
                    <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                      •••• {item.lastFour}
                      {item.expiry ? ` · 유효기간 ${item.expiry}` : ''}
                    </Typography.Text>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <Modal
        title="결제 수단 등록"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        onOk={handleAdd}
        confirmLoading={submitting}
        okText="등록"
        cancelText="취소"
        okButtonProps={{
          style: { backgroundColor: '#007AFF', borderColor: '#007AFF', borderRadius: 8 },
        }}
        cancelButtonProps={{ style: { borderRadius: 8 } }}
        styles={{ body: { paddingTop: 16 } }}
      >
        <Form form={form} layout="vertical" initialValues={{ type: 'card' }}>
          <Form.Item
            name="type"
            label="결제 유형"
            rules={[{ required: true, message: '결제 유형을 선택하세요.' }]}
          >
            <Select
              options={[
                { value: 'card', label: '신용/체크카드' },
                { value: 'bank', label: '계좌이체' },
              ]}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="label"
            label="카드사/은행명"
            rules={[{ required: true, message: '카드사 또는 은행명을 입력하세요.' }]}
          >
            <Input placeholder="예: 삼성카드, 국민은행" style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item
            name="number"
            label="카드번호/계좌번호"
            rules={[
              { required: true, message: '번호를 입력하세요.' },
              { min: 4, message: '최소 4자리를 입력하세요.' },
            ]}
          >
            <Input placeholder="번호 입력" maxLength={20} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.type !== currentValues.type
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('type') === 'card' ? (
                <Form.Item
                  name="expiry"
                  label="유효기간"
                  rules={[
                    { required: true, message: '유효기간을 입력하세요.' },
                    {
                      pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: 'MM/YY 형식으로 입력하세요.',
                    },
                  ]}
                >
                  <Input placeholder="MM/YY" maxLength={5} style={{ borderRadius: 8 }} />
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
