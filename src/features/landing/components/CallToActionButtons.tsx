import React from 'react';
import { Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function CallToActionButtons() {
  const navigate = useNavigate();

  return (
    <section aria-label="주요 행동 유도 버튼" style={{ textAlign: 'center', marginBottom: 64 }}>
      <Space size={24} wrap>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/subscription')}
          style={{ borderRadius: 8, minWidth: 160 }}
          aria-label="무료 체험 시작하기"
        >
          무료 체험 시작하기
        </Button>
        <Button
          type="default"
          size="large"
          onClick={() => navigate('/my-page')}
          style={{ borderRadius: 8, minWidth: 160, color: '#007AFF', borderColor: '#007AFF' }}
          aria-label="로그인"
        >
          로그인
        </Button>
      </Space>
    </section>
  );
}
