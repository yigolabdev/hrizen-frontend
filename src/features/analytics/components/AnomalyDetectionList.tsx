import React, { useEffect, useState } from "react";
import { List, Typography, Badge } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';

interface Anomaly {
  id: string;
  employeeName: string;
  department: string;
  anomalyType: string;
  detectedAt: string; // ISO 날짜
  severity: "경고" | "주의" | "심각";
}

const severityColorMap: Record<Anomaly['severity'], string> = {
  경고: "#FF9500",
  주의: "#FFB84D",
  심각: "#FF3B30",
};

export function AnomalyDetectionList() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnomalies() {
      setLoading(true);
      await new Promise(r => setTimeout(r, 500));
      const mockData: Anomaly[] = [
        {
          id: "a1",
          employeeName: "홍길동",
          department: "개발팀",
          anomalyType: "연차 미신청 근태",
          detectedAt: "2024-05-15T09:30:00Z",
          severity: "주의",
        },
        {
          id: "a2",
          employeeName: "김서연",
          department: "인사팀",
          anomalyType: "퇴직금 계산 오류 가능성",
          detectedAt: "2024-05-14T14:20:00Z",
          severity: "경고",
        },
        {
          id: "a3",
          employeeName: "이민준",
          department: "영업팀",
          anomalyType: "초과 근무 시간 이상",
          detectedAt: "2024-05-13T18:45:00Z",
          severity: "심각",
        },
      ];
      setAnomalies(mockData);
      setLoading(false);
    }
    fetchAnomalies();
  }, []);

  return (
    <>
      <Typography.Title level={4} style={{ marginBottom: 24, color: "#007AFF" }}>
        이상 징후 탐지
      </Typography.Title>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={anomalies}
        locale={{ emptyText: "이상 징후가 없습니다." }}
        renderItem={item => {
          const detectedDate = new Date(item.detectedAt);
          const formattedDate = detectedDate.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge color={severityColorMap[item.severity]} />}
                title={<Typography.Text strong>{item.employeeName} ({item.department})</Typography.Text>}
                description={
                  <>
                    <Typography.Text>{item.anomalyType}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined /> {formattedDate}
                    </Typography.Text>
                  </>
                }
              />
              <Typography.Text style={{ color: severityColorMap[item.severity], fontWeight: "bold" }}>
                {item.severity}
              </Typography.Text>
            </List.Item>
          );
        }}
      />
    </>
  );
}
