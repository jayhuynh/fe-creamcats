import {
  match as MatchProps,
  Redirect,
  Route,
  RouteProps,
  Switch,
  SwitchProps,
  useRouteMatch,
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Layout from '../layout';
import Login from '../pages/login';

export interface RouteConfig extends RouteProps {
  path: string;
  redirect?: string;
  requireAuth?: boolean;
  basePath?: string;
}

export const renderRoutes = (
  routes: RouteConfig[],
  match?: MatchProps | null,
  switchProps?: SwitchProps,
) => {
  const basePath = (match && match.path !== '/') ? match.path : '';
  // populate basePath for resolvePath to run
  routes.forEach(r => r.basePath = basePath);
  return (
    <Switch {...switchProps}>
      {
        routes.map(({ redirect, requireAuth, path, ...routeProps }) => {
          if (redirect) {
            return <Redirect key={`${basePath}${path}`} path={`${basePath}${path}`} to={`${basePath}${redirect}`} {...routeProps} />;
          }
          if (requireAuth) {
            return <ProtectedRoute key={`${basePath}${path}`} path={`${basePath}${path}`} {...routeProps} />;
          }
          return <Route key={`${basePath}${path}`} path={`${basePath}${path}`} {...routeProps} />;
        })
      }
    </Switch>
  );
};

export const Routes = (
  { routes, switchProps }: { routes: RouteConfig[]; switchProps?: SwitchProps; },
) => (
  renderRoutes(routes, useRouteMatch(), switchProps)
);

export const login: RouteConfig = {
  path: '/login',
  component: Login,
};

const routes: RouteConfig[] = [
  login,
  {
    path: '/',
    component: Layout,
    requireAuth: true,
  },
];

export * from './useQuery';
export * from './useNavigate';
export default routes;
