import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#007AFF',
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#F2F2F7',
    colorText: '#000000',
    colorTextSecondary: '#595959',
    borderRadius: 8,
    colorError: '#FF3B30',
    colorWarning: '#FF9500',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Layout: {
      colorBgHeader: '#FFFFFF',
      colorBgTrigger: '#F2F2F7',
    },
    Menu: {
      colorBgElevated: '#FFFFFF',
      colorItemBgSelected: '#007AFF',
      colorItemTextSelected: '#FFFFFF',
      colorItemTextHover: '#007AFF',
      borderRadius: 8,
    },
  },
};
