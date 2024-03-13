// project import
import { zhCN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollTop from 'components/ScrollTop';
import Routes from 'routes';
import ThemeCustomization from 'themes';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  zhCN
);

const App = () => (
  <ThemeCustomization>
    <ThemeProvider theme={theme}>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeProvider>
  </ThemeCustomization>
);

export default App;
