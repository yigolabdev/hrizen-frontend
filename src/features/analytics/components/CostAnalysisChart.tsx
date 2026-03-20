import React, { useEffect, useState } from "react";
import { Card, Statistic, Typography } from "antd";
import { apiClient } from "@/lib/api";
import { Line } from "@ant-design/charts";

interface CostDataPoint {
  month: string; // YYYY-MM
  personnelCost: number; // 인력 비용
  otherCost: number; // 기타 비용
}

export function CostAnalysisChart() {
  const [data, setData] = useState<CostDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    async function fetchData() {
      setLoading(true);
      // mock delay
      await new Promise((r) => setTimeout(r, 500));
      const mockData: CostDataPoint[] = [
        { month: "2023-11", personnelCost: 12500000, otherCost: 2300000 },
        { month: "2023-12", personnelCost: 13000000, otherCost: 2500000 },
        { month: "2024-01", personnelCost: 12800000, otherCost: 2700000 },
        { month: "2024-02", personnelCost: 13500000, otherCost: 2900000 },
        { month: "2024-03", personnelCost: 13700000, otherCost: 3000000 },
        { month: "2024-04", personnelCost: 14000000, otherCost: 3100000 },
        { month: "2024-05", personnelCost: 14500000, otherCost: 3200000 },
      ];
      setData(mockData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const config = {
    data: data.flatMap(d => [
      { month: d.month, type: "인력 비용", cost: d.personnelCost },
      { month: d.month, type: "기타 비용", cost: d.otherCost },
    ]),
    xField: "month",
    yField: "cost",
    seriesField: "type",
    xAxis: {
      title: { text: "월" },
      tickCount: 7,
      label: {
        formatter: (v: string) => v.slice(5),
      },
    },
    yAxis: {
      title: { text: "비용 (원)" },
      label: {
        formatter: (v: number) => `${(v / 10000).toFixed(0)}만`,
      },
    },
    smooth: true,
    color: ["#007AFF", "#FF9500"],
    height: 280,
    legend: { position: "top-left" },
    tooltip: {
      formatter: (datum: { type: string; cost: number }) => ({
        name: datum.type,
        value: datum.cost.toLocaleString() + " 원",
      }),
    },
    interactions: [{ type: "marker-active" }],
  };

  const latestMonth = data.length > 0 ? data[data.length-1] : null;

  return (
    <>
      <Typography.Title level={4} style={{ marginBottom: 24, color: "var(--main)" }}>
        인력 비용 분석
      </Typography.Title>
      {latestMonth && (
        <Statistic
          title={`${latestMonth.month} 기준 총 인력 비용`}
          value={latestMonth.personnelCost}
          precision={0}
          suffix="원"
          valueStyle={{ color: "var(--main)" }}
          style={{ marginBottom: 24 }}
          formatter={(value) => value && Number(value).toLocaleString()}
        />
      )}
      <Line {...config} loading={loading} />
    </>
  );
}
