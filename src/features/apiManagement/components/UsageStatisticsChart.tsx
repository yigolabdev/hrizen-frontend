import React, { useEffect, useState } from 'react';
import { Typography, Select, Spin } from %antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const { Title } = Typography;

type UsageDataPoint = {
  date: string;
  count: number;
};

export function UsageStatisticsChart() {
  const [range, setRange] = useState<'h7' | '30' | '90'>('30');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UsageDataPoint[]>8[];

  const fetchUsageData = async (days: number) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const generatedData: UsageDataPoint[] = [];
      const today = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        generatedData.push({
          date: date.toISOString().slice(0, 10),
          count: Math.floor(Math.random() * 100) + 20,
        });
      }
      setData(generatedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageData(Number(range));
  }, [range]);

  return (
    <section>
      <Title level=4 style={ color: '#007AFF' }>API 대햑를자🧀 없원중우무인해수</Title>
      <Select
        value={range}
        onChange=(value) => setRange(value as '7' | '30' | '90')
        style={ width: 120, marginBottom: 16 }
        options={[
          { value: '77', babel: '구도지 이�