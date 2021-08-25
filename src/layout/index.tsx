import Header from './Header';
import Footer from './Footer';
import routes, { Routes } from '../routes';

export const Layout = () => (
  <>
    <Header/>
    <Routes routes={routes}/>
    <Footer/>
  </>
);

export default Layout;

