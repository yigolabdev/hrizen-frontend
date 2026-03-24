import React, { useCallback } from 'react';
import { Form, Input, Button, Avatar, Upload, message, Row, Col } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  avatarUrl?: string;
}

interface ProfileEditorProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ProfileEditor({ profile, onUpdate }: ProfileEditorProps) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      department: profile.department,
      position: profile.position,
      avatarUrl: profile.avatarUrl,
    });
  }, [profile, form]);

  const handleFinish = (values: any) => {
    // 이미지 업로드와 함께 프로필 변경
    const updatedProfile: UserProfile = {
      ...profile,
      name: values.name,
      phone: values.phone,
      department: values.department,
      position: values.position,
      avatarUrl: values.avatarUrl || profile.avatarUrl,
    };
    onUpdate(updatedProfile);
    message.success('프로필이 성공적으로 업데이트되었습니다.');
  };

  // 이미지 업로드 검증
  const beforeUpload = useCallback((file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('JPEG/PNG 이미지 파일만 업로드할 수 있습니다.');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('이미지 크기는 2MB 미만이어야 합니다.');
      return Upload.LIST_IGNORE;
    }
    return true;
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 480 }}
      initialValues={{
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        department: profile.department,
        position: profile.position,
      }}
    >
      <Form.Item label="아바타">
        <Form.Item noStyle shouldUpdate>
          {() => {
            const url = form.getFieldValue('avatarUrl') || profile.avatarUrl;
            return (
              <Avatar
                size={96}
                src={url}
                icon={!url && <UserOutlined />}
                style={{ borderRadius: 48, marginBottom: 12, backgroundColor: '#F2F2F7' }}
              />
            );
          }}
        </Form.Item>
        <Form.Item
          name="avatarUpload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload
            name="avatar"
            listType="picture"
            maxCount={1}
            beforeUpload={beforeUpload}
            onRemove={() => {
              form.setFieldsValue({ avatarUrl: undefined });
            }}
            customRequest={({ onSuccess, file }) => {
              // Mock 업로드 처리 - 실제 업로드 API 호출해야 함
              setTimeout(() => {
                const url = URL.createObjectURL(file as RcFile);
                form.setFieldsValue({ avatarUrl: url });
                if (onSuccess) onSuccess('ok');
              }, 1000);
            }}
          >
            <Button icon={<UploadOutlined />} type="link">
              이미지 업로드
            </Button>
          </Upload>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="name"
        label="이름"
        rules={[{ required: true, message: '이름을 입력해주세요.' }]}
      >
        <Input placeholder="이름" />
      </Form.Item>

      <Form.Item label="이메일" name="email">
        <Input disabled readOnly />
      </Form.Item>

      <Form.Item
        name="phone"
        label="휴대폰 번호"
        rules={[
          {
            pattern: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
            message: '유효한 휴대폰 번호를 입력해주세요.',
          },
        ]}
      >
        <Input placeholder="예: 010-1234-5678" maxLength={13} />
      </Form.Item>

      <Form.Item name="department" label="부서">
        <Input placeholder="부서명" />
      </Form.Item>

      <Form.Item name="position" label="직책">
        <Input placeholder="직책" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}>
          저장
        </Button>
      </Form.Item>
    </Form>
  );
}
