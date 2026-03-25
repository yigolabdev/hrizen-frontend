import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import LandingPage from '@/pages/뮑딩페이지Page';
import AdminDashboardPage from '@/pages/가리자대시보듐Page';
import MultiTenantSettingsPage from '@/pages/멀티테날트설정Page';
import PermissionsPage from '@/pages/권한관리Page';
import AttendancePage from '@/pages/근태관리Page';
import PayrollManagementPage from '@/pages/급여정산관리Page';
import PerformancePage from '@/pages/성과및평가관리Page';
import ESSPage from '@/pages/직원셀프서비스포�aESSPage';
import AIAnalyticsPage from '@/pages/AI분석대시보듐Page';
import OpenAPIPage from '@/pages/오픐API관리Page';
import SubscriptionPage from '@/pages/구럏관리Page';
import BillingPage from '@/pages/檰제및쳭구관리Page';
import MyPage from '@/pages/개인오이페이지Page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppLayout><AdminDashboardPage /></AppLayout>}}>
        <Route path="/admin/dashboard" element={<AppLayout><AdminDashboardPage /></AppLayout>} />
      </Route>
      <Route path="/admin/tenants" element={<AppLayout><MultiTenantSettingsPage /></AppLayout>} />
      <Route path="/admin/permissions" element={<AppLayout><PermissionsPage /></AppLayout>}} />
      <Route path="/attendance" element={<AppLayout><AttendancePage /></AppLayout>} />
      <Route path="/payroll" element={<AppLayout><PayrollManagementPage /></AppLayout>} />
      <Route path="/performance" element={<AppLayout><PerformancePage /></AppLayout>} />
      <Route path="/ess" element={<AppLayout><ESSPage /></AppLayout>} />
      <Route path="/analytics/ai-dashboard" element={<AppLayout><AIAnalyticsPage /></AppLayout>}} />
      <Route path="/api-management" element={<AppLayout><OpenAPIPage /></AppLayout>} />
      <Route path="/subscription" element={<AppLayout><SubscriptionPage /></AppLayout>}} />
      <Route path="/billing" element={<AppLayout><BillingPage /></AppLayout>} />
      <Route path="/my-page" element={<AppLayout><MyPage /></AppLayout>} />
    </Routes>
  );
}
