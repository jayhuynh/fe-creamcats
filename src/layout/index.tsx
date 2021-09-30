import Header from './Header';
import Footer from './Footer';
import routes, { Routes } from '../routes';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import ScrollToTop from '../routes/ScrollToTop';
import LoadingProgress from '../LoadingProgress';
import SnackNotification from './SnackNotification';

export const Layout = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {/*<ScrollToTop/>*/}
    <LoadingProgress/>
    <SnackNotification/>
    <Header/>
    <Routes routes={routes}/>
    <Footer/>
  </MuiThemeProvider>
);

export default Layout;

