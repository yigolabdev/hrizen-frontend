import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import AdminDashboardPage from '@/pages/관리자대시보드Page';
import MultiTenantSettingsPage from '@/pages/멀티테넌트설정Page';
import PermissionsPage from '@/pages/권한관리Page';
import AttendancePage from '@/pages/근템관리Page';
import PayrollManagementPage from '@/pages/급여정할관리Page';
import PerformancePage from '@/pages/성과덴 평가관리Page';
import ESSPage from '@/pages/짡워셀프서비스포턔ESSPage';
import AIAnalyticsPage from '@/pages/AI분석대시보드Page';
import OpenAPIPage from '@/pages/오피API관릌Page';
import SubscriptionPage from '@/pages/구독관릌Page';
import BillingPage from '@/pages/결,제및청굨관리Page';
import MyPage from '@/pages/개인마이페이지Page';
import LandingPage from '@/pages/레딩페이지Page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/*"
        element={
          <AppLayout>
            <Routes>
              <Route path="admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="admin/tenants" element={<MultiTenantSettingsPage />} />
              <Route path="admin/permissions" element={<PermissionsPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="payroll" element={<PayrollManagementPage />} />
              <Route path="performance" element={<PerformancePage />} />
              <Route path="ess" element={<ESSPage />} />
              <Route path="analytics/ai-dashboard" element={<AIAnalyticsPage />} />
              <Route path="api-management" element={<OpenAPIPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="my-page" element={<MyPage />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
}
