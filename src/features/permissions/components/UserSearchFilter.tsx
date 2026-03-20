import React, { useState } from 'react';
import { Input, Select, Form, Row, Col, Button, Space } from 'antd';
import { Role } from '@/features/permissions/types';

interface UserSearchFilterProps {
  roles: Role[];
  onFilter: (keyword: string, roleIds: string[]) => void;
}

export default function UserSearchFilter({ roles, onFilter }: UserSearchFilterProps) {
  const [keyword, setKeyword] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleSearch = () => {
    onFilter(keyword, selectedRoles);
  };

  return (
    <Form layout="vertical" onFinish={handleSearch} autoComplete="off">
      <Row gutter={16} wrap>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Form.Item label="사용자 검색" >
            <Input
              placeholder="이름, 이메일, 사용자명 입력"
              value={keyword}
              onChange={(e) => setKeyword(e.currentTarget.value)}
              allowClear
              onPressEnter={handleSearch}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Form.Item label="역할 필터">
            <Select
              mode="multiple"
              placeholder="역할 선택"
              options={roles.map((role) => ({ label: role.name, value: role.id }))}
              value={selectedRoles}
              onChange={(value) => setSelectedRoles(value)}
              allowClear
              maxTagCount={2}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={4} lg={8} xl={6} style={{ display: 'flex', alignItems: 'end' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              검색
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
