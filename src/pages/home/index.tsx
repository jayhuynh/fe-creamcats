import { login, resolvePath } from '../../routes';

const Home = () => {
  console.log(resolvePath(login, undefined, { redirect_uri: '/blog' }));
  return (<div>start working on the homepage</div>);
};

export default Home;
