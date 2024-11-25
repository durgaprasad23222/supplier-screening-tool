import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import Dashboard from './Dashboard';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Dashboard />
    </MantineProvider>
  );
}
