import {
  match as MatchProps,
  Redirect,
  Route,
  RouteProps,
  Switch,
  SwitchProps,
  useRouteMatch,
  generatePath,
} from 'react-router-dom';
import qs from 'querystring';

import ProtectedRoute from './ProtectedRoute';
import Layout from '../layout';
import Login from '../pages/login';
import Home from '../pages/home';
import { QueryDictionary } from './useNavigate';
import Position from '../pages/position';
import Profile from '../pages/profile';
import NotFound from '../pages/not-found';
import SharingZone from '../pages/sharing-zone';
import Organization from '../pages/organization';

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
  const basePath = match && match.path !== '/' ? match.path : '';
  // populate basePath for resolvePath to run
  routes.forEach(r => (r.basePath = basePath));
  return (
    <Switch {...switchProps}>
      {routes.map(({ redirect, requireAuth, path, ...routeProps }) => {
        if (redirect) {
          return (
            <Redirect
              key={`${basePath}${path}`}
              path={`${basePath}${path}`}
              to={`${basePath}${redirect}`}
              {...routeProps}
            />
          );
        }
        if (requireAuth) {
          return (
            <ProtectedRoute
              key={`${basePath}${path}`}
              path={`${basePath}${path}`}
              {...routeProps}
            />
          );
        }
        return (
          <Route
            key={`${basePath}${path}`}
            path={`${basePath}${path}`}
            {...routeProps}
          />
        );
      })}
    </Switch>
  );
};

export const Routes = ({
  routes,
  switchProps,
}: {
  routes: RouteConfig[];
  switchProps?: SwitchProps;
}) => renderRoutes(routes, useRouteMatch(), switchProps);

export const resolvePath = <T extends any>(
  route: RouteConfig,
  params: Parameters<typeof generatePath>[1] = {},
  queries?: QueryDictionary<T>,
) =>
    Array.of(
      generatePath(`${route.basePath || ''}${route.path}`, params),
      queries ? qs.stringify(queries) : '',
    )
      .filter(Boolean)
      .join('?');

export const login: RouteConfig = {
  path: '/login',
  component: Login,
};

export const home: RouteConfig = {
  path: '/home',
  component: Home,
};

export const position: RouteConfig = {
  path: '/positions/:positionId',
  component: Position,
  requireAuth: true,
};

export const profile: RouteConfig = {
  path: '/profile',
  component: Profile,
  requireAuth: true,
};

export const sharingZone: RouteConfig = {
  path: '/sharing-zone',
  component: SharingZone,
};

export const orgnization: RouteConfig = {
  path: '/organizations',
  component: Organization,
  requireAuth: true,
};

export const notfound: RouteConfig = {
  path: '/*',
  component: NotFound,
};


const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    redirect: home.path,
  },
  home,
  position,
  profile,
  sharingZone,
  login,
  orgnization,
  notfound,
];

export * from './useQuery';
export * from './useNavigate';
export default routes;
