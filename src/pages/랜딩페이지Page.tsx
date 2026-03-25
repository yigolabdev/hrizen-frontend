import React from 'react';
import { Space } from 'antd';
import HeroSection from '@/features/landing/components/HeroSection';
import FeatureHighlightSection from '@/features/landing/components/FeatureHighlightSection';
import PricingOverview from '@/features/landing/components/PricingOverview';
import CustomerTestimonials from '@/features/landing/components/CustomerTestimonials';
import CallToActionButtons from '@/features/landing/components/CallToActionButtons';
import LandingFooter from '@/features/landing/components/LandingFooter';

export default function LandingPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <HeroSection />
      <FeatureHighlightSection />
      <PricingOverview />
      <CustomerTestimonials />
      <CallToActionButtons />
      <LandingFooter />
    </Space>
  );
}
