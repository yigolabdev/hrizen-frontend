import React from 'react';
import { Alert, Typography } from 'antd';

const { Title } = Typography;

export function TaxComplianceStatus() {
  return (
    <div>
      <Title level={4} style={{ color: '#007AFF' }}>세금 준수 상태</Title>
      <Alert
        message="세금 줐수 완료"
        description="2024년 6월 근여세와 ค 대서는 로든 정상 제출되었습니다."
        type="success"
        showIcon
      />
    </div>
  );
}

export default TaxComplianceStatus;
