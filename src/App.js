// project import
import { zhCN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollTop from 'components/ScrollTop';
import Routes from 'routes';
import ThemeCustomization from 'themes';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  zhCN
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeCustomization>
      <ThemeProvider theme={theme}>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeProvider>
    </ThemeCustomization>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
