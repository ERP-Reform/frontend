// project import
import { zhCN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollTop from 'components/ScrollTop';
import Routes from 'routes';
import ThemeCustomization from 'themes';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProtectedComponent from 'components/auth/index';
import { queryClient } from 'config/queryClient';
const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  zhCN
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeCustomization>
      <ThemeProvider theme={theme}>
        <ScrollTop>
          <ProtectedComponent>
            <Routes />
          </ProtectedComponent>
        </ScrollTop>
      </ThemeProvider>
    </ThemeCustomization>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
