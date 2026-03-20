import React, { useEffect, useState } from 'react';
import { Alert, List, Typography, Spin } from 'antd';
import { apiClient } from '@/lib/api';

interface AIAlert {
  id: string;
  message: string;
  detectedDate: string; // YYYY-MM-DD
  severity: '경고' | '주의' | '심각';
}

const severityColorMap: Record<AIAlert['severity'], string> = {
  경고: '#FF9500',
  주의: '#007AFF',
  심각: '#FF3B30',
};

const { Text } = Typography;

export default function AIAnomalyAlert() {
  const [alerts, setAlerts] = useState<AIAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAIAlerts() {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));
      const mockData: AIAlert[] = [
        {
          id: 'alert1',
          message: '연차 사용 패턴이 비정상적으로 증가했습니다.',
          detectedDate: '2024-06-14',
          severity: '경고',
        },
        {
          id: 'alert2',
          message: '일부 직원의 출퇴근 기록 누락 의심 사례 발견',
          detectedDate: '2024-06-10',
          severity: '주의',
        },
        {
          id: 'alert3',
          message: '퇴사율 급등 가능성 탐지, 인사부서 확인 필요',
          detectedDate: '2024-06-08',
          severity: '심각',
        },
      ];
      setAlerts(mockData);
      setLoading(false);
    }
    fetchAIAlerts();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (alerts.length === 0) {
    return <Alert message="이상 징후가 없습니다" type="success" showIcon />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={alerts}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <span style={{ color: severityColorMap[item.severity], fontWeight: '600' }}>
                [{item.severity}] {item.detectedDate}
              </span>
            }
            description={<Text>{item.message}</Text>}
          />
        </List.Item>
      )}
    />
  );
}
