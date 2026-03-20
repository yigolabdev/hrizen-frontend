import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import 관리자대시보드Page from '@/pages/관리자대시보드Page';
import 멀티테넌트설정Page from '@/pages/멀티테넌트설정Page';
import 권한관리Page from '@/pages/권한관리Page';
import 근태관리Page from '@/pages/근태관리Page';
import 급여정산관리Page from '@/pages/급여정산관리Page';
import 성과및평가관리Page from '@/pages/성과및평가관리Page';
import 직원셀프서비스포털ESSPage from '@/pages/직원셀프서비스포털ESSPage';
import AI분석대시보드Page from '@/pages/AI분석대시보드Page';
import 오픈API관리Page from '@/pages/오픈API관리Page';
import 구독관리Page from '@/pages/구독관리Page';
import 결제및청구관리Page from '@/pages/결제및청구관리Page';
import 랜딩페이지Page from '@/pages/랜딩페이지Page';
import 개인마이페이지Page from '@/pages/개인마이페이지Page';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/admin/dashboard" element={<관리자대시보드Page />} />
        <Route path="/admin/tenants" element={<멀티테넌트설정Page />} />
        <Route path="/admin/permissions" element={<권한관리Page />} />
        <Route path="/attendance" element={<근태관리Page />} />
        <Route path="/payroll" element={<급여정산관리Page />} />
        <Route path="/performance" element={<성과및평가관리Page />} />
        <Route path="/ess" element={<직원셀프서비스포털ESSPage />} />
        <Route path="/analytics/ai-dashboard" element={<AI분석대시보드Page />} />
        <Route path="/api-management" element={<오픈API관리Page />} />
        <Route path="/subscription" element={<구독관리Page />} />
        <Route path="/billing" element={<결제및청구관리Page />} />
        <Route path="/" element={<랜딩페이지Page />} />
        <Route path="/my-page" element={<개인마이페이지Page />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<div style={{ padding: 24 }}>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </AppLayout>
  );
}
