import React from 'react';
import { Layout, Space } from 'antd';
import HeroSection from '@/features/landing/components/HeroSection';
import FeatureHighlightSection from '@/features/landing/components/FeatureHighlightSection';
import CustomerTestimonials from '@/features/landing/components/CustomerTestimonials';
import PricingOverview from '@/features/landing/components/PricingOverview';
import CallToActionButtons from '@/features/landing/components/CallToActionButtons';
import LandingFooter from '@/features/landing/components/LandingFooter';

export default function LandingPage() {
  return (
    <Layout
      style={{
        background: '#FFFFFF',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <HeroSection />
      <FeatureHighlightSection />
      <CustomerTestimonials />
      <PricingOverview />
      <CallToActionButtons />
      <LandingFooter />
    </Layout>
  );
}
