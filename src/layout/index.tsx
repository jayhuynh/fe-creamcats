import Header from './Header';
import Footer from './Footer';
import routes, { Routes } from '../routes';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

export const Layout = () => (
  <MuiThemeProvider theme={theme}>
    <Header/>
    <Routes routes={routes}/>
    <Footer/>
  </MuiThemeProvider>
);

export default Layout;

