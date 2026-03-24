import React from 'react';
import { Card, Typography, Switch, Button, message } from 'antd';
import dayjs from 'dayjs';

interface SecurityConfig {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

interface SecuritySettingsProps {
  config: SecurityConfig;
  onChange: (config: SecurityConfig) => void;
}

export default function SecuritySettings({ config, onChange }: SecuritySettingsProps) {
  const { Title, Paragraph } = Typography;
  const [twoFactorActive, setTwoFactorActive] = React.useState(config.twoFactorEnabled);

  React.useEffect(() => {
    setTwoFactorActive(config.twoFactorEnabled);
  }, [config.twoFactorEnabled]);

  const toggleTwoFactor = (checked: boolean) => {
    setTwoFactorActive(checked);
  };

  const handleSave = () => {
    onChange({ ...config, twoFactorEnabled: twoFactorActive });
    message.success('보안 설정이 저장되었습니다.');
  };

  return (
    <Card
      bordered={false}
      style={{ maxWidth: 480, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24 }}
    >
      <Title level={4} style={{ color: '#007AFF' }}>
        보안 설정
      </Title>

      <Paragraph>
        마지막 비밀번호 변경일: {dayjs(config.lastPasswordChange).format('YYYY.MM.DD HH:mm')}
      </Paragraph>

      <Paragraph>
        2단계 인증 설정:
        <Switch
          checked={twoFactorActive}
          onChange={toggleTwoFactor}
          style={{ marginLeft: 12 }}
          checkedChildren="활성화"
          unCheckedChildren="비활성화"
          color="#007AFF"
        />
      </Paragraph>

      <Button
        type="primary"
        onClick={handleSave}
        style={{ backgroundColor: '#007AFF', borderColor: '#007AFF' }}
      >
        저장
      </Button>
    </Card>
  );
}
