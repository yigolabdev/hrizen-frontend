import React, { useState, useEffect } from 'react';
import {
  Card,
  Alert,
  List,
  Tag,
  Typography,
  Button,
  Space,
  Badge,
  Grid,
  Spin,
  Empty,
  Collapse,
} from 'antd';
import {
  RobotOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  BellOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { fetchAnomalies } from '../api/attendanceApi';
import type { AnomalyItem } from '../types';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const severityConfig: Record<AnomalyItem['severity'], { color: string; icon: React.ReactNode; label: string }> = {
  high: { color: '#ff4d4f', icon: <ExclamationCircleOutlined />, label: '높음' },
  medium: { color: '#FF9500', icon: <WarningOutlined />, label: '보통' },
  low: { color: '#007AFF', icon: <InfoCircleOutlined />, label: '낮음' },
};

const typeLabels: Record<AnomalyItem['type'], string> = {
  frequent_late: '잦은 지각',
  unusual_overtime: '비정상 초과근무',
  pattern_change: '패턴 변화',
  consecutive_absence: '연속 결근',
};

export default function AIAnomalyAlert() {
  const screens = useBreakpoint();
  const [anomalies, setAnomalies] = useState<AnomalyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    fetchAnomalies()
      .then(setAnomalies)
      .finally(() => setLoading(false));
  }, []);

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  const activeAnomalies = anomalies.filter((a) => !dismissed.has(a.id));
  const highCount = activeAnomalies.filter((a) => a.severity === 'high').length;

  return (
    <Card
      title={
        <Space>
          <RobotOutlined style={{ color: '#007AFF' }} />
          <span>AI 이상 징후 탐지</span>
          {activeAnomalies.length > 0 && (
            <Badge count={activeAnomalies.length} style={{ backgroundColor: '#FF9500' }} />
          )}
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
    >
      <Spin spinning={loading}>
        {highCount > 0 && (
          <Alert
            message={
              <Text strong>
                긴급 알림: 즉시 확인이 필요한 이상 징후가 {highCount}건 있습니다.
              </Text>
            }
            type="error"
            showIcon
            icon={<BellOutlined />}
            style={{ marginBottom: 16, borderRadius: 8 }}
          />
        )}

        {activeAnomalies.length === 0 && !loading ? (
          <Empty
            description="현재 감지된 이상 징후가 없습니다."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <Collapse
            accordion
            bordered={false}
            style={{ background: 'transparent' }}
            items={activeAnomalies.map((anomaly) => {
              const severityCfg = severityConfig[anomaly.severity];
              return {
                key: anomaly.id,
                label: (
                  <Space wrap size={8}>
                    <Tag
                      color={severityCfg.color}
                      icon={severityCfg.icon}
                      style={{ borderRadius: 6 }}
                    >
                      {severityCfg.label}
                    </Tag>
                    <Tag style={{ borderRadius: 6 }}>{typeLabels[anomaly.type]}</Tag>
                    <Text strong style={{ fontSize: 13 }}>
                      {anomaly.employeeName}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {anomaly.department}
                    </Text>
                  </Space>
                ),
                children: (
                  <div style={{ padding: '4px 0' }}>
                    <Paragraph style={{ fontSize: 13, color: '#333', marginBottom: 8 }}>
                      {anomaly.description}
                    </Paragraph>
                    <Space size={8}>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        탐지 시간: {dayjs(anomaly.detectedAt).format('YYYY-MM-DD HH:mm')}
                      </Text>
                      <Button
                        size="small"
                        type="link"
                        style={{ color: '#007AFF', fontSize: 12, padding: 0 }}
                        icon={<EyeOutlined />}
                      >
                        직원 상세
                      </Button>
                      <Button
                        size="small"
                        type="link"
                        style={{ color: '#8c8c8c', fontSize: 12, padding: 0 }}
                        onClick={() => handleDismiss(anomaly.id)}
                      >
                        확인 완료
                      </Button>
                    </Space>
                  </div>
                ),
                style: {
                  marginBottom: 8,
                  borderRadius: 8,
                  border: `1px solid ${anomaly.severity === 'high' ? '#ffccc7' : '#f0f0f0'}`,
                  background: anomaly.severity === 'high' ? '#fff2f0' : '#fafafa',
                },
              };
            })}
          />
        )}
      </Spin>
    </Card>
  );
}
