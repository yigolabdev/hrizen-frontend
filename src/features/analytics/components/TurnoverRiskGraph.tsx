import React, { useEffect, useState } from "react";
import { Typography, Progress, Space } from "antd";
import { apiClient } from "@/lib/api";

interface RiskData {
  team: string;
  riskPercent: number; // 이직 위험도 %
}

export function TurnoverRiskGraph() {
  const [risks, setRisks] = useState<RiskData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRisk() {
      setLoading(true);
      // Mock delay
      await new Promise((res) => setTimeout(res, 400));
      const mockRisks: RiskData[] = [
        { team: "개발팀", riskPercent: 18 },
        { team: "영업팀", riskPercent: 12 },
        { team: "인사팀", riskPercent: 8 },
        { team: "마케팅팀", riskPercent: 15 },
        { team: "고객지원팀", riskPercent: 10 },
      ];
      setRisks(mockRisks);
      setLoading(false);
    }
    fetchRisk();
  }, []);

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 24, color: "var(--main)" }}>
        이직 위험도 분석
      </Typography.Title>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {loading ? (
          <Typography.Text>데이터를 불러오는 중입니다...</Typography.Text>
        ) : (
          risks.map(({ team, riskPercent }) => (
            <div key={team} style={{ width: "100%" }}>
              <Typography.Text strong style={{ fontSize: 16 }}>
                {team}
              </Typography.Text>
              <Progress
                percent={riskPercent}
                status={riskPercent >= 15 ? "exception" : "normal"}
                strokeColor={riskPercent >= 15 ? "#FF9500" : "#007AFF"}
                format={(percent) => `${percent}%`}
                showInfo
                style={{ marginTop: 8 }}
              />
            </div>
          ))
        )}
      </Space>
    </div>
  );
}
