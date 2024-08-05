import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import ElectronRouter from './router';

export default function App() {
  const defaultTheme = {};

  return (
    <ThemeProvider themeMode='auto' theme={{}}>
      <ConfigProvider theme={defaultTheme}>
        <ElectronRouter />
      </ConfigProvider>
    </ThemeProvider>
  );
}
