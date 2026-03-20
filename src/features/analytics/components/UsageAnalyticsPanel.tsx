import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Typography, Divider } from "antd";
import { apiClient } from "@/lib/api";

interface UsageStats {
  activeUsers: number;
  avgLoginPerUser: number;
  monthlyPageViews: number;
  avgSessionDurationSec: number;
}

export function UsageAnalyticsPanel() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      // Mock delay
      await new Promise((res) => setTimeout(res, 400));
      const mockStats: UsageStats = {
        activeUsers: 124,
        avgLoginPerUser: 3.7,
        monthlyPageViews: 13450,
        avgSessionDurationSec: 520, // 8분 40초
      };
      setStats(mockStats);
      setLoading(false);
    }
    fetchStats();
  }, []);

  function formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}분 ${sec}초`;
  }

  return (
    <>
      <Typography.Title level={4} style={{ marginBottom: 24, color: "var(--main)" }}>
        사용 현황 분석
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title="활성 사용자 수"
            value={stats?.activeUsers}
            loading={loading}
            valueStyle={{ color: "var(--main)" }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="사용자당 평균 로그인 횟수"
            value={stats?.avgLoginPerUser}
            precision={1}
            loading={loading}
            valueStyle={{ color: "var(--main)" }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="월간 페이지 조회수"
            value={stats?.monthlyPageViews}
            loading={loading}
            valueStyle={{ color: "var(--main)" }}
            formatter={(value) => value && Number(value).toLocaleString()}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="평균 세션 지속 시간"
            value={stats ? formatDuration(stats.avgSessionDurationSec) : "-"}
            loading={loading}
            valueStyle={{ color: "var(--main)" }}
          />
        </Col>
      </Row>
    </>
  );
}
