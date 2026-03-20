import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, message, Space } from 'antd';
import { CopyOutlined, ReloadOutlined } from '@ant-design/icons';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

interface ApiKeyResponse {
  apiKey: string;
  createdAt: string;
  expiresAt: string;
}

export function APIKeyGenerator() {
  const [apiKeyData, setApiKeyData] = useState<ApiKeyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchApiKey = async () => {
    setLoading(true);
    try {
      // Mock API response
      await new Promise((r) => setTimeout(r, 700));
      const mockApiKey = {
        apiKey: 'HRIZEN-API-KEY-1234-5678-ABCD',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
      };
      setApiKeyData(mockApiKey);
    } catch {
      message.error('API 키를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    setLoading(true);
    try {
      // Mock API call for generating new key
      await new Promise((r) => setTimeout(r, 1000));
      const newKey = {
        apiKey: `HRIZEN-API-KEY-${Math.random().toString(36).slice(2, 10).toUpperCase()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
      };
      setApiKeyData(newKey);
      message.success('새 API 키가 발급되었습니다.');
    } catch {
      message.error('API 키 발급에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  const copyToClipboard = () => {
    if (apiKeyData) {
      navigator.clipboard.writeText(apiKeyData.apiKey)
        .then(() => {
          message.success('API 키가 클립보드에 복사되었습니다.');
        })
        .catch(() => {
          message.error('복사에 실패했습니다.');
        });
    }
  };

  return (
    <section>
      <Title level={4} style={{ color: '#007AFF' }}>API 키 관리</Title>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Text>아래 API 키는 외부 시스템과의 통신에 사용됩니다.</Text>
        <Input.Password
          value={apiKeyData?.apiKey || ''}
          readOnly
          visibilityToggle={false}
          style={{ borderRadius: 8, backgroundColor: '#F2F2F7', fontFamily: 'monospace', fontSize: 16, fontWeight: 600 }}
          placeholder="API 키가 없습니다."/>
        <Space>
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
            disabled={!apiKeyData || loading}
            style={{ borderRadius: 8, backgroundColor: '#007AFF', borderColor: '#007AFF' }}
          >복사</Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={generateNewKey}
            loading={loading}
            disabled={loading}
            style={{ borderRadius: 8 }}
          >새 키 발급</Button>
        </Space>
        {apiKeyData && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            발급일: {new Date(apiKeyData.createdAt).toLocaleDateString('ko-KR')} / 만료일: {new Date(apiKeyData.expiresAt).toLocaleDateString('ko-KR')}
          </Text>
        )}
      </Space>
    </section>
  );
}
