import { useState, useCallback } from 'react';
import type { Tenant, TenantSettings, SubscriptionSummary } from '../types';

const mockTenants: Tenant[] = [
  {
    id: 'T-001',
    name: '(주)한국본사',
    country: '대한민국',
    language: 'ko',
    currency: 'KRW',
    userCount: 245,
    maxUsers: 500,
    subscriptionPlan: 'Enterprise',
    subscriptionStatus: 'active',
    createdAt: '2023-01-15',
    adminEmail: 'admin@korea-hq.com',
    businessType: '본사',
    timezone: 'Asia/Seoul',
  },
  {
    id: 'T-002',
    name: 'Japan Branch Co.',
    country: '일본',
    language: 'ja',
    currency: 'JPY',
    userCount: 82,
    maxUsers: 200,
    subscriptionPlan: 'Professional',
    subscriptionStatus: 'active',
    createdAt: '2023-03-20',
    adminEmail: 'admin@japan-branch.jp',
    businessType: '해외법인',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 'T-003',
    name: 'US Operations Inc.',
    country: '미국',
    language: 'en',
    currency: 'USD',
    userCount: 156,
    maxUsers: 300,
    subscriptionPlan: 'Enterprise',
    subscriptionStatus: 'active',
    createdAt: '2023-02-10',
    adminEmail: 'admin@us-ops.com',
    businessType: '해외법인',
    timezone: 'America/New_York',
  },
  {
    id: 'T-004',
    name: 'Vietnam Factory Ltd.',
    country: '베트남',
    language: 'vi',
    currency: 'VND',
    userCount: 320,
    maxUsers: 500,
    subscriptionPlan: 'Professional',
    subscriptionStatus: 'active',
    createdAt: '2023-06-01',
    adminEmail: 'admin@vn-factory.vn',
    businessType: '해외공장',
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'T-005',
    name: 'EU GmbH',
    country: '독일',
    language: 'de',
    currency: 'EUR',
    userCount: 45,
    maxUsers: 100,
    subscriptionPlan: 'Starter',
    subscriptionStatus: 'trial',
    createdAt: '2024-01-05',
    adminEmail: 'admin@eu-gmbh.de',
    businessType: '해외법인',
    timezone: 'Europe/Berlin',
  },
  {
    id: 'T-006',
    name: '(주)부산지사',
    country: '대한민국',
    language: 'ko',
    currency: 'KRW',
    userCount: 78,
    maxUsers: 100,
    subscriptionPlan: 'Professional',
    subscriptionStatus: 'active',
    createdAt: '2023-08-12',
    adminEmail: 'admin@busan-branch.kr',
    businessType: '지사',
    timezone: 'Asia/Seoul',
  },
  {
    id: 'T-007',
    name: 'China Subsidiary',
    country: '중국',
    language: 'zh',
    currency: 'CNY',
    userCount: 0,
    maxUsers: 200,
    subscriptionPlan: 'Starter',
    subscriptionStatus: 'expired',
    createdAt: '2023-04-18',
    adminEmail: 'admin@cn-sub.cn',
    businessType: '해외법인',
    timezone: 'Asia/Shanghai',
  },
];

const mockSummary: SubscriptionSummary = {
  totalTenants: 7,
  activeTenants: 5,
  trialTenants: 1,
  expiredTenants: 1,
  totalUsers: 926,
  totalRevenue: 18500000,
};

export function useTenants() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [loading, setLoading] = useState(false);
  const [summary] = useState<SubscriptionSummary>(mockSummary);

  const deleteTenant = useCallback((id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTenant = useCallback((settings: TenantSettings) => {
    setLoading(true);
    setTimeout(() => {
      setTenants((prev) =>
        prev.map((t) =>
          t.id === settings.tenantId
            ? {
                ...t,
                name: settings.name,
                country: settings.country,
                language: settings.language,
                currency: settings.currency,
                timezone: settings.timezone,
                businessType: settings.businessType,
                adminEmail: settings.adminEmail,
                maxUsers: settings.maxUsers,
              }
            : t
        )
      );
      setLoading(false);
    }, 600);
  }, []);

  const addTenant = useCallback((settings: Omit<TenantSettings, 'tenantId'>) => {
    setLoading(true);
    setTimeout(() => {
      const newTenant: Tenant = {
        id: `T-${String(Date.now()).slice(-4)}`,
        name: settings.name,
        country: settings.country,
        language: settings.language,
        currency: settings.currency,
        userCount: 0,
        maxUsers: settings.maxUsers,
        subscriptionPlan: 'Starter',
        subscriptionStatus: 'trial',
        createdAt: new Date().toISOString().split('T')[0],
        adminEmail: settings.adminEmail,
        businessType: settings.businessType,
        timezone: settings.timezone,
      };
      setTenants((prev) => [...prev, newTenant]);
      setLoading(false);
    }, 600);
  }, []);

  return { tenants, loading, summary, deleteTenant, updateTenant, addTenant };
}
