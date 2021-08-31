import Header from './Header';
import Footer from './Footer';
import routes, { Routes } from '../routes';

export const Layout = () => (
  <div style={{ fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif' }}>
    <Header/>
    <Routes routes={routes}/>
    <Footer/>
  </div>
);

export default Layout;

