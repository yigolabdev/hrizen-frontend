import React from 'react';
import { Typography, Tabs, Grid } from 'antd';
import {
  ScheduleOutlined,
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import AttendanceSummary from '@/features/ess/components/AttendanceSummary';
import PayslipViewer from '@/features/ess/components/PayslipViewer';
import LeaveApplicationForm from '@/features/ess/components/LeaveApplicationForm';
import ContractDocuments from '@/features/ess/components/ContractDocuments';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function ESSPage() {
  const screens = useBreakpoint();

  const tabItems = [
    {
      key: 'attendance',
      label: (
        <span>
          <ScheduleOutlined style={{ marginRight: 6 }} />
          근태 현황
        </span>
      ),
      children: <AttendanceSummary />,
    },
    {
      key: 'payslip',
      label: (
        <span>
          <DollarOutlined style={{ marginRight: 6 }} />
          급여명세서
        </span>
      ),
      children: <PayslipViewer />,
    },
    {
      key: 'leave',
      label: (
        <span>
          <CalendarOutlined style={{ marginRight: 6 }} />
          휴가 신청
        </span>
      ),
      children: <LeaveApplicationForm />,
    },
    {
      key: 'contracts',
      label: (
        <span>
          <FileTextOutlined style={{ marginRight: 6 }} />
          전자계약
        </span>
      ),
      children: <ContractDocuments />,
    },
  ];

  return (
    <div style={{ padding: screens.md ? 32 : 16 }}>
      <div style={{ marginBottom: 28 }}>
        <Title
          level={3}
          style={{
            margin: 0,
            fontWeight: 700,
            color: '#1C1C1E',
          }}
        >
          직원 셀프 서비스 포털 (ESS)
        </Title>
        <Text
          style={{
            color: '#8E8E93',
            fontSize: 14,
            marginTop: 4,
            display: 'block',
          }}
        >
          근태, 급여, 휴가, 전자계약을 한 곳에서 편리하게 관리하세요.
        </Text>
      </div>
      <Tabs
        defaultActiveKey="attendance"
        items={tabItems}
        size={screens.md ? 'large' : 'middle'}
        tabBarStyle={{
          fontWeight: 600,
          borderBottom: '1px solid #E5E5EA',
        }}
        style={{ background: '#FFFFFF', borderRadius: 12, padding: screens.md ? 24 : 12 }}
      />
    </div>
  );
}
