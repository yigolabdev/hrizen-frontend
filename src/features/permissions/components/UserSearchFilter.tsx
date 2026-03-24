import React from 'react';
import { Card, Input, Select, Space, Grid, Row, Col, Button } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { usePermissions, type RoleType } from '@/features/permissions/context/PermissionsContext';

const { useBreakpoint } = Grid;

const roleOptions: { label: string; value: RoleType | 'all' }[] = [
  { label: '전체 역할', value: 'all' },
  { label: '최고관리자', value: '최고관리자' },
  { label: '관리자', value: '관리자' },
  { label: 'HR담당자', value: 'HR담당자' },
  { label: '팀장', value: '팀장' },
  { label: '일반직원', value: '일반직원' },
];

const departmentOptions = [
  { label: '전체 부서', value: 'all' },
  { label: '인사팀', value: '인사팀' },
  { label: '개발팀', value: '개발팀' },
  { label: '재무팀', value: '재무팀' },
  { label: '마케팅팀', value: '마케팅팀' },
  { label: '영업팀', value: '영업팀' },
  { label: '디자인팀', value: '디자인팀' },
];

const statusOptions = [
  { label: '전체 상태', value: 'all' },
  { label: '활성', value: '활성' },
  { label: '비활성', value: '비활성' },
];

export default function UserSearchFilter() {
  const { filters, setFilters, filteredUsers, users } = usePermissions();
  const screens = useBreakpoint();

  const handleReset = () => {
    setFilters({
      searchText: '',
      roleFilter: 'all',
      departmentFilter: 'all',
      statusFilter: 'all',
    });
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12, backgroundColor: '#FFFFFF' }}
      bodyStyle={{ padding: screens.md ? '24px 24px 16px' : '16px 16px 12px' }}
    >
      <Row gutter={[16, 12]} align="middle">
        <Col xs={24} sm={24} md={8} lg={7}>
          <Input
            placeholder="이름, 이메일 또는 사번으로 검색"
            prefix={<SearchOutlined style={{ color: '#8e8e93' }} />}
            value={filters.searchText}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchText: e.target.value }))}
            allowClear
            style={{ borderRadius: 8 }}
            size="large"
          />
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Select
            value={filters.roleFilter}
            onChange={(val) => setFilters((prev) => ({ ...prev, roleFilter: val }))}
            options={roleOptions}
            style={{ width: '100%', borderRadius: 8 }}
            size="large"
            suffixIcon={<FilterOutlined />}
          />
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Select
            value={filters.departmentFilter}
            onChange={(val) => setFilters((prev) => ({ ...prev, departmentFilter: val }))}
            options={departmentOptions}
            style={{ width: '100%', borderRadius: 8 }}
            size="large"
          />
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Select
            value={filters.statusFilter}
            onChange={(val) => setFilters((prev) => ({ ...prev, statusFilter: val }))}
            options={statusOptions}
            style={{ width: '100%', borderRadius: 8 }}
            size="large"
          />
        </Col>
        <Col xs={12} sm={24} md={4} lg={5} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            style={{ borderRadius: 8 }}
            size="large"
          >
            초기화
          </Button>
          <span style={{ color: '#8e8e93', fontSize: 13, whiteSpace: 'nowrap' }}>
            {filteredUsers.length}/{users.length}명
          </span>
        </Col>
      </Row>
    </Card>
  );
}
