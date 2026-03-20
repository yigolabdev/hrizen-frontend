// 간단한 Mock apiClient 구현

interface ApiResponse<T> {
  data: T;
}

// mockDB
const mockRoles = [
  { id: 'role-admin', name: '관리자', description: '시스템 전반 권한 보유', permissionIds: ['perm-attendance', 'perm-payroll', 'perm-okr', 'perm-ess', 'perm-contract'] },
  { id: 'role-hr', name: '인사 담당자', description: '인사 및 급여 관리 권한', permissionIds: ['perm-attendance', 'perm-payroll', 'perm-ess'] },
  { id: 'role-employee', name: '일반 직원', description: '자신 정보 열람 및 수정 권한', permissionIds: ['perm-ess'] },
];

const mockPermissions = [
  { id: 'perm-attendance', name: '근태 관리', description: '근태 정보 조회·수정 권한' },
  { id: 'perm-payroll', name: '급여 정산', description: '급여 정보 조회·수정 권한' },
  { id: 'perm-okr', name: '성과 및 평가', description: '성과 정보 열람 권한' },
  { id: 'perm-ess', name: '직원 셀프서비스(ESS)', description: '자기 정보 열람 및 신청 권한' },
  { id: 'perm-contract', name: '전자 계약', description: '전자 계약서 관리 권한' },
];

const mockUsers = [
  { id: 'user-1', username: 'hong.jiho', name: '홍지호', email: 'hongjiho@hrizen.com', roleId: 'role-admin' },
  { id: 'user-2', username: 'kim.soyoung', name: '김소영', email: 'kimsoyoung@hrizen.com', roleId: 'role-hr' },
  { id: 'user-3', username: 'lee.minho', name: '이민호', email: 'leemin@hrizen.com', roleId: 'role-employee' },
  { id: 'user-4', username: 'park.jieun', name: '박지은', email: 'parkjieun@hrizen.com', roleId: 'role-employee' },
  { id: 'user-5', username: 'choi.seungwoo', name: '최승우', email: 'choisw@hrizen.com', roleId: 'role-hr' },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiClient = {
  get: async <T = any>(url: string): Promise<ApiResponse<T>> => {
    await delay(300); // 모의 대기
    switch (url) {
      case '/mock/roles':
        return { data: mockRoles as unknown as T };
      case '/mock/permissions':
        return { data: mockPermissions as unknown as T };
      case '/mock/users':
        return { data: mockUsers as unknown as T };
      default:
        throw new Error('잘못된 API 경로입니다.');
    }
  },
};
