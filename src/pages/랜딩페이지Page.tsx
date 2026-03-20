import React from 'react';
import { Layout } from 'antd';
import FeatureHighlightSection from '@/features/landing/components/FeatureHighlightSection';
import CustomerTestimonials from '@/features/landing/components/CustomerTestimonials';
import PricingOverview from '@/features/landing/components/PricingOverview';
import CallToActionButtons from '@/features/landing/components/CallToActionButtons';

const { Content } = Layout;

export default function 랜딩페이지Page() {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Content style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <main>
          <header style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#007AFF', lineHeight: 1.1 }}>
              HRiZen
            </h1>
            <p style={{ fontSize: 18, color: '#333333', marginTop: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              50~300인 규모 기업을 위한 클라우드 기반 HR SaaS 솔루션, HRiZen으로 인사 관리부터 급여 정산, AI 인사이트까지 한눈에 경험하세요.
            </p>
          </header>
          <FeatureHighlightSection />
          <CustomerTestimonials />
          <PricingOverview />
          <CallToActionButtons />
        </main>
      </Content>
    </Layout>
  );
}
