export interface Tenant {
  id: string;
  name: string;
  country: string;
  language: string;
  currency: string;
  userCount: number;
  maxUsers: number;
  subscriptionPlan: 'Free' | 'Starter' | 'Professional' | 'Enterprise';
  subscriptionStatus: 'active' | 'trial' | 'expired' | 'suspended';
  createdAt: string;
  adminEmail: string;
  businessType: string;
  timezone: string;
}

export interface TenantSettings {
  tenantId: string;
  name: string;
  country: string;
  language: string;
  currency: string;
  timezone: string;
  businessType: string;
  adminEmail: string;
  maxUsers: number;
  features: string[];
  ssoEnabled: boolean;
  mfaRequired: boolean;
}

export interface LanguageCurrencyOption {
  language: string;
  languageLabel: string;
  currency: string;
  currencyLabel: string;
  country: string;
}

export interface SubscriptionSummary {
  totalTenants: number;
  activeTenants: number;
  trialTenants: number;
  expiredTenants: number;
  totalUsers: number;
  totalRevenue: number;
}
