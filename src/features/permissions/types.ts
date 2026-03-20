export interface Role {
  id: string;
  name: string;
  description: string;
  permissionIds: string[]; // 권한 아이디 리스트
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  roleId: string;
}
