import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Row,
  Col,
  Select,
  DatePicker,
  message,
  Space,
  Typography,
  Divider,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';

const { Text } = Typography;

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employeeId: string;
  birthDate: dayjs.Dayjs | null;
  address: string;
  bio: string;
}

const initialValues: ProfileFormValues = {
  name: '김민수',
  email: 'minsu.kim@hrizen.com',
  phone: '010-1234-5678',
  department: 'engineering',
  position: '시니어 개발자',
  employeeId: 'EMP-2024-001',
  birthDate: dayjs('1990-05-15'),
  address: '서울특별시 강남구 테헤란로 123',
  bio: 'HRiZen 플랫폼 프론트엔드 개발을 담당하고 있습니다.',
};

export default function ProfileEditor() {
  const [form] = Form.useForm<ProfileFormValues>();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('프로필이 성공적으로 업데이트되었습니다.');
      setIsEditing(false);
    } catch {
      message.error('입력 정보를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const handleAvatarChange = (info: { file: UploadFile }) => {
    if (info.file.status === 'done' || info.file.originFileObj) {
      const url = info.file.originFileObj
        ? URL.createObjectURL(info.file.originFileObj)
        : undefined;
      if (url) {
        setAvatarUrl(url);
        message.success('프로필 사진이 변경되었습니다.');
      }
    }
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
    >
      <Row gutter={[32, 24]}>
        {/* 아바타 섹션 */}
        <Col xs={24} sm={24} md={8} lg={6}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 0',
            }}
          >
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <Avatar
                size={120}
                src={avatarUrl}
                icon={!avatarUrl ? <UserOutlined /> : undefined}
                style={{
                  backgroundColor: avatarUrl ? undefined : '#007AFF',
                  fontSize: 48,
                }}
              />
              {isEditing && (
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleAvatarChange}
                  accept="image/*"
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CameraOutlined />}
                    size="small"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#007AFF',
                      borderColor: '#007AFF',
                    }}
                  />
                </Upload>
              )}
            </div>
            <Text strong style={{ fontSize: 18 }}>
              {initialValues.name}
            </Text>
            <Text type="secondary" style={{ marginTop: 4 }}>
              {initialValues.position}
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: 12, marginTop: 2, color: '#007AFF' }}
            >
              {initialValues.employeeId}
            </Text>
          </div>
        </Col>

        {/* 폼 섹션 */}
        <Col xs={24} sm={24} md={16} lg={18}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Text strong style={{ fontSize: 16 }}>
              기본 정보
            </Text>
            {!isEditing ? (
              <Button
                type="primary"
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: '#007AFF',
                  borderColor: '#007AFF',
                  borderRadius: 8,
                }}
              >
                편집
              </Button>
            ) : (
              <Space>
                <Button onClick={handleCancel} style={{ borderRadius: 8 }}>
                  취소
                </Button>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleSave}
                  style={{
                    backgroundColor: '#007AFF',
                    borderColor: '#007AFF',
                    borderRadius: 8,
                  }}
                >
                  저장
                </Button>
              </Space>
            )}
          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              ...initialValues,
              birthDate: initialValues.birthDate,
            }}
            disabled={!isEditing}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="이름"
                  name="name"
                  rules={[{ required: true, message: '이름을 입력해주세요.' }]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: '#007AFF' }} />}
                    placeholder="이름"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="사번"
                  name="employeeId"
                >
                  <Input
                    prefix={<IdcardOutlined style={{ color: '#007AFF' }} />}
                    disabled
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="이메일"
                  name="email"
                  rules={[
                    { required: true, message: '이메일을 입력해주세요.' },
                    { type: 'email', message: '유효한 이메일을 입력해주세요.' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: '#007AFF' }} />}
                    placeholder="이메일"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="연락처"
                  name="phone"
                  rules={[
                    { required: true, message: '연락처를 입력해주세요.' },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined style={{ color: '#007AFF' }} />}
                    placeholder="010-0000-0000"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="부서" name="department">
                  <Select
                    placeholder="부서 선택"
                    style={{ borderRadius: 8 }}
                    suffixIcon={
                      <BankOutlined style={{ color: '#007AFF' }} />
                    }
                    options={[
                      { value: 'engineering', label: '개발팀' },
                      { value: 'design', label: '디자인팀' },
                      { value: 'hr', label: '인사팀' },
                      { value: 'marketing', label: '마케팅팀' },
                      { value: 'sales', label: '영업팀' },
                      { value: 'finance', label: '재무팀' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="직책" name="position">
                  <Input
                    placeholder="직책"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="생년월일" name="birthDate">
                  <DatePicker
                    style={{ width: '100%', borderRadius: 8 }}
                    placeholder="생년월일 선택"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="주소" name="address">
                  <Input
                    placeholder="주소"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Form.Item label="자기소개" name="bio">
              <Input.TextArea
                rows={3}
                placeholder="간단한 자기소개를 입력해주세요."
                showCount
                maxLength={200}
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
