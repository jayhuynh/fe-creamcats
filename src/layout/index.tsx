import Header from './Header';
import Footer from './Footer';
import routes, { Routes } from '../routes';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import ScrollToTop from '../routes/ScrollToTop';
import LoadingProgress from '../LoadingProgress';

export const Layout = () => (
  <MuiThemeProvider theme={theme}>
    {/*<ScrollToTop/>*/}
    <LoadingProgress/>
    <Header/>
    <Routes routes={routes}/>
    <Footer/>
  </MuiThemeProvider>
);

export default Layout;

