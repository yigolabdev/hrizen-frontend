import React, { useEffect, useState } from 'react';
import { Card, List, Typography, Tag, Skeleton } from 'antd';
import { apiClient } from '@/lib/api';

const { Title, Text } = Typography;

interface ComplianceRule {
  id: string;
  title: string;
  status: '적합' | '위반';
  description: string;
}

export function TaxComplianceStatus() {
  const [rules, setRules] = useState<ComplianceRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplianceRules() {
      setLoading(true);
      try {
        // Mock API
        await new Promise((r) => setTimeout(r, 300));
        const mockData: ComplianceRule[] = [
          {
            id: '001',
            title: '최저임금 준수',
            status: '적합',
            description: '기본 급여가 최저임금 이상으로 설정되어 있습니다.',
          },
          {
            id: '002',
            title: '근로시간 준수',
            status: '적합',
            description: '초과근무 시간이 법적 한도 내에 있습니다.',
          },
          {
            id: '003',
            title: '세금 납부 적시',
            status: '적합',
            description: '모든 세금 납부가 정시에 이루어지고 있습니다.',
          },
        ];
        setRules(mockData);
      } catch {
        setRules([]);
      } finally {
        setLoading(false);
      }
    }
    fetchComplianceRules();
  }, []);

  return (
    <section aria-label="세무 컴플라이언스 현황">
      <Title level={4} style={{ color: '#007AFF', marginBottom: 16 }}>
        세무 컴플라이언스 현황
      </Title>

      {loading ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={rules}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Text strong>
                    {item.title}{' '}
                    <Tag color={item.status === '적합' ? 'success' : 'error'}>{item.status}</Tag>
                  </Text>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      )}
    </section>
  );
}
