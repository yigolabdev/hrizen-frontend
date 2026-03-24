import React, { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  department: string;
  role: RoleType;
  status: '활성' | '비활성';
  lastLogin: string;
}

export type RoleType = '최고관리자' | '관리자' | 'HR담당자' | '팀장' | '일반직원';

export interface PermissionItem {
  key: string;
  module: string;
  description: string;
  최고관리자: boolean;
  관리자: boolean;
  HR담당자: boolean;
  팀장: boolean;
  일반직원: boolean;
}

interface FiltersState {
  searchText: string;
  roleFilter: RoleType | 'all';
  departmentFilter: string;
  statusFilter: '활성' | '비활성' | 'all';
}

interface PermissionsContextValue {
  users: UserRecord[];
  permissions: PermissionItem[];
  filters: FiltersState;
  filteredUsers: UserRecord[];
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  updateUserRole: (userId: string, role: RoleType) => void;
  updateUserStatus: (userId: string, status: '활성' | '비활성') => void;
  togglePermission: (permissionKey: string, role: RoleType) => void;
}

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

export function usePermissions(): PermissionsContextValue {
  const ctx = useContext(PermissionsContext);
  if (!ctx) throw new Error('usePermissions must be used within PermissionsProvider');
  return ctx;
}

const initialUsers: UserRecord[] = [
  { id: 'U001', name: '김철수', email: 'chulsoo.kim@hrizen.com', department: '인사팀', role: '최고관리자', status: '활성', lastLogin: '2024-01-15 09:30' },
  { id: 'U002', name: '이영희', email: 'younghee.lee@hrizen.com', department: '인사팀', role: 'HR담당자', status: '활성', lastLogin: '2024-01-15 08:45' },
  { id: 'U003', name: '박민수', email: 'minsoo.park@hrizen.com', department: '개발팀', role: '팀장', status: '활성', lastLogin: '2024-01-14 17:20' },
  { id: 'U004', name: '정수진', email: 'sujin.jung@hrizen.com', department: '재무팀', role: '관리자', status: '활성', lastLogin: '2024-01-15 10:05' },
  { id: 'U005', name: '최동현', email: 'donghyun.choi@hrizen.com', department: '마케팅팀', role: '일반직원', status: '활성', lastLogin: '2024-01-13 14:30' },
  { id: 'U006', name: '한지은', email: 'jieun.han@hrizen.com', department: '개발팀', role: '일반직원', status: '활성', lastLogin: '2024-01-15 11:00' },
  { id: 'U007', name: '오승호', email: 'seungho.oh@hrizen.com', department: '영업팀', role: '팀장', status: '활성', lastLogin: '2024-01-14 09:15' },
  { id: 'U008', name: '윤서연', email: 'seoyeon.yoon@hrizen.com', department: '디자인팀', role: '일반직원', status: '비활성', lastLogin: '2023-12-20 16:40' },
  { id: 'U009', name: '장현우', email: 'hyunwoo.jang@hrizen.com', department: '재무팀', role: '일반직원', status: '활성', lastLogin: '2024-01-15 08:00' },
  { id: 'U010', name: '임수정', email: 'sujeong.lim@hrizen.com', department: '인사팀', role: 'HR담당자', status: '활성', lastLogin: '2024-01-14 13:25' },
  { id: 'U011', name: '강태훈', email: 'taehoon.kang@hrizen.com', department: '개발팀', role: '일반직원', status: '활성', lastLogin: '2024-01-15 07:50' },
  { id: 'U012', name: '송미래', email: 'mirae.song@hrizen.com', department: '마케팅팀', role: '팀장', status: '비활성', lastLogin: '2023-11-30 11:10' },
];

const initialPermissions: PermissionItem[] = [
  { key: 'P01', module: '관리자 대시보드', description: '대시보드 조회 및 통계 확인', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: false, 일반직원: false },
  { key: 'P02', module: '멀티테넌트 설정', description: '테넌트 생성·수정·삭제', 최고관리자: true, 관리자: false, HR담당자: false, 팀장: false, 일반직원: false },
  { key: 'P03', module: '권한 관리', description: '역할 및 권한 설정 변경', 최고관리자: true, 관리자: true, HR담당자: false, 팀장: false, 일반직원: false },
  { key: 'P04', module: '근태 관리', description: '출퇴근 기록 조회·수정', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: true, 일반직원: false },
  { key: 'P05', module: '근태 관리 (본인)', description: '본인 출퇴근 기록 조회', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: true, 일반직원: true },
  { key: 'P06', module: '급여 정산 관리', description: '급여 데이터 조회·정산 처리', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: false, 일반직원: false },
  { key: 'P07', module: '급여 명세서 (본인)', description: '본인 급여 명세서 조회', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: true, 일반직원: true },
  { key: 'P08', module: '성과 및 평가 관리', description: 'OKR 설정 및 평가 수행', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: true, 일반직원: false },
  { key: 'P09', module: '성과 조회 (본인)', description: '본인 성과 기록 조회', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: true, 일반직원: true },
  { key: 'P10', module: '직원 셀프서비스(ESS)', description: '휴가 신청·개인정보 수정', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: true, 일반직원: true },
  { key: 'P11', module: 'AI 분석 대시보드', description: 'AI 이직 예측·인재 분석 조회', 최고관리자: true, 관리자: true, HR담당자: true, 팀장: false, 일반직원: false },
  { key: 'P12', module: '오픈 API 관리', description: 'API 키 발급·웹훅 설정', 최고관리자: true, 관리자: true, HR담당자: false, 팀장: false, 일반직원: false },
  { key: 'P13', module: '구독 관리', description: '플랜 변경·구독 상태 관리', 최고관리자: true, 관리자: true, HR담당자: false, 팀장: false, 일반직원: false },
  { key: 'P14', module: '결제 및 청구 관리', description: '결제 수단·청구 내역 관리', 최고관리자: true, 관리자: true, HR담당자: false, 팀장: false, 일반직원: false },
];

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [permissions, setPermissions] = useState<PermissionItem[]>(initialPermissions);
  const [filters, setFilters] = useState<FiltersState>({
    searchText: '',
    roleFilter: 'all',
    departmentFilter: 'all',
    statusFilter: 'all',
  });

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchText =
        filters.searchText === '' ||
        u.name.includes(filters.searchText) ||
        u.email.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        u.id.toLowerCase().includes(filters.searchText.toLowerCase());
      const matchRole = filters.roleFilter === 'all' || u.role === filters.roleFilter;
      const matchDept = filters.departmentFilter === 'all' || u.department === filters.departmentFilter;
      const matchStatus = filters.statusFilter === 'all' || u.status === filters.statusFilter;
      return matchText && matchRole && matchDept && matchStatus;
    });
  }, [users, filters]);

  const updateUserRole = useCallback((userId: string, role: RoleType) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  }, []);

  const updateUserStatus = useCallback((userId: string, status: '활성' | '비활성') => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
  }, []);

  const togglePermission = useCallback((permissionKey: string, role: RoleType) => {
    if (role === '최고관리자') return;
    setPermissions((prev) =>
      prev.map((p) =>
        p.key === permissionKey ? { ...p, [role]: !p[role] } : p
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      users,
      permissions,
      filters,
      filteredUsers,
      setFilters,
      updateUserRole,
      updateUserStatus,
      togglePermission,
    }),
    [users, permissions, filters, filteredUsers, updateUserRole, updateUserStatus, togglePermission]
  );

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}
