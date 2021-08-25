import { login, resolvePath } from '../../routes';

const Home = () => {
  console.log(resolvePath(login, undefined, { redirect_uri: '/blog' }));
  return (<div>This is content of the home page</div>);
};

export default Home;
