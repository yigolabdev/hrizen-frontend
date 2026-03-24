import React, { useState } from 'react';
import { Card, Select, Space, Typography, Tag, Divider, List } from 'antd';
import { GlobalOutlined, DollarOutlined } from '@ant-design/icons';
import type { LanguageCurrencyOption } from '../types';

const { Text, Title } = Typography;

const presets: LanguageCurrencyOption[] = [
  { language: 'ko', languageLabel: '한국어', currency: 'KRW', currencyLabel: '원 (₩)', country: '🇰🇷 대한민국' },
  { language: 'en', languageLabel: 'English', currency: 'USD', currencyLabel: 'Dollar ($)', country: '🇺🇸 미국' },
  { language: 'ja', languageLabel: '日本語', currency: 'JPY', currencyLabel: '円 (¥)', country: '🇯🇵 일본' },
  { language: 'zh', languageLabel: '中文', currency: 'CNY', currencyLabel: '元 (¥)', country: '🇨🇳 중국' },
  { language: 'vi', languageLabel: 'Tiếng Việt', currency: 'VND', currencyLabel: 'Đồng (₫)', country: '🇻🇳 베트남' },
  { language: 'de', languageLabel: 'Deutsch', currency: 'EUR', currencyLabel: 'Euro (€)', country: '🇩🇪 독일' },
];

export default function LanguageCurrencySelector() {
  const [selectedLang, setSelectedLang] = useState<string>('ko');
  const selected = presets.find((p) => p.language === selectedLang) || presets[0];

  return (
    <Card
      title={
        <Space>
          <GlobalOutlined style={{ color: '#007AFF' }} />
          <span>다국어 · 다통화</span>
        </Space>
      }
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF', height: '100%' }}
      headStyle={{ fontWeight: 'bold', color: '#007AFF' }}
    >
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>
          기본 언어/통화 프리셋
        </Text>
        <Select
          value={selectedLang}
          onChange={(val) => setSelectedLang(val)}
          style={{ width: '100%', borderRadius: 8 }}
          options={presets.map((p) => ({
            value: p.language,
            label: `${p.country} ${p.languageLabel}`,
          }))}
        />
      </div>

      <div
        style={{
          backgroundColor: '#F2F2F7',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary">언어</Text>
            <Tag color="blue">{selected.languageLabel}</Tag>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary">통화</Text>
            <Tag icon={<DollarOutlined />} color="green">{selected.currencyLabel}</Tag>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary">국가</Text>
            <Text>{selected.country}</Text>
          </div>
        </Space>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      <Title level={5} style={{ color: '#007AFF', marginBottom: 8, fontSize: 14 }}>
        지원 언어/통화 목록
      </Title>
      <List
        size="small"
        dataSource={presets}
        renderItem={(item) => (
          <List.Item
            style={{ padding: '6px 0', cursor: 'pointer' }}
            onClick={() => setSelectedLang(item.language)}
          >
            <Space>
              <Text>{item.country}</Text>
              <Tag style={{ fontSize: 11 }}>{item.languageLabel}</Tag>
            </Space>
            <Tag color="cyan" style={{ fontSize: 11 }}>
              {item.currency}
            </Tag>
          </List.Item>
        )}
      />
    </Card>
  );
}
