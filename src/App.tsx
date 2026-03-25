import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import AdminDashboardPage from '@/pages/관리자대시보드Page';
import MultiTenantSettingsPage from '@/pages/륀티테난트\설정Page';
import PermissionsPage from '@/pages/권한관리Page';
import AttendancePage from '@/pages/근태관리Page';
import PayrollManagementPage from '@/pages/급여정산관리Page';
import PerformancePage from '@/pages/성과및평가관리Page';
import ESSPage from '@/pages/짉�l셀프서비스포털ESSPage';
import AIAnalyticsPage from '@/pages/AI분석닀시보닜Page';
import OpenAPIPage from '@/pages/오픈API관리Page';
import SubscriptionPage from '@/pages/구독관리Page';
import BillingPage from '@/pages/결\��및윭구관리Page';
import MyPage from '@/pages/개인슸이페이지Page';
import LandingPage from '@/pages/랜딩페이지Page';

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
