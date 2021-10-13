import Header from './Header';
import Footer from './Footer';
import routes, { Routes } from '../routes';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import ScrollToTop from '../routes/ScrollToTop';
import LoadingProgress from '../LoadingProgress';
import SnackNotification from './SnackNotification';
import { useLocation } from 'react-router-dom';

export const Layout = () =>{
  const { pathname } = useLocation();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/*<ScrollToTop/>*/}
      <LoadingProgress/>
      <SnackNotification/>
      {pathname !== '/login' && <Header/>}
      <Routes routes={routes}/>
      {pathname !== '/login' && <Footer/>}
    </MuiThemeProvider>
  );
};

export default Layout;

