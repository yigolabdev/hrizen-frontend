import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Typography, Tag, Space } from 'antd';
import { UserOutlined, WarningOutlined, LikeOutlined } from '@ant-design/icons';
import { apiClient } from '@/lib/api';

interface TalentRecommendation {
  id: number;
  name: string;
  position: string;
  retentionRisk: '높음' | '보통' | '낮음';
  recommendation: string;
}

export default function AIRecommendationPanel() {
  const [recommendations, setRecommendations] = useState<TalentRecommendation[]>([]);

  useEffect(() => {
    apiClient.get<TalentRecommendation[]>('/ai-talent-recommendations').then((res) => {
      setRecommendations(res);
    }).catch(() => {
      setRecommendations([]);
    });
  }, []);

  const riskColor = (risk: TalentRecommendation['retentionRisk']): string => {
    switch (risk) {
      case '높음':
        return '#FF4D4F';
      case '보통':
        return '#FAAD14';
      case '낮음':
        return '#52C41A';
      default:
        return '#AAAAAA';
    }
  };

  const riskIcon = (risk: TalentRecommendation['retentionRisk']) => {
    switch (risk) {
      case '높음':
        return <WarningOutlined style={{ color: '#FF4D4F' }} />;
      case '보통':
        return <LikeOutlined style={{ color: '#FAAD14' }} />;
      case '낮음':
        return <UserOutlined style={{ color: '#52C41A' }} />;
      default:
        return <UserOutlined style={{ color: '#AAAAAA' }} />;
    }
  };

  return (
    <Card bodyStyle={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 }}>
      <Typography.Title level={4} style={{ color: '#007AFF', marginBottom: 24, fontWeight: 'bold' }}>
        AI 기반 인재 유지·이직 예측
      </Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={recommendations}
        locale={{ emptyText: '추천 데이터가 없습니다.' }}
        renderItem={item => (
          <List.Item style={{ paddingTop: 12, paddingBottom: 12 }}>
            <List.Item.Meta
              avatar={<Avatar size={48} icon={riskIcon(item.retentionRisk)} style={{ backgroundColor: '#F0F5FF', color: riskColor(item.retentionRisk) }} />}
              title={<Typography.Text strong>{item.name} - {item.position}</Typography.Text>}
              description={
                <Space direction="vertical" size={4}>
                  <Tag color={riskColor(item.retentionRisk)} style={{ borderRadius: 8, fontWeight: 600 }}>
                    이직 위험도: {item.retentionRisk}
                  </Tag>
                  <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                    {item.recommendation}
                  </Typography.Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
