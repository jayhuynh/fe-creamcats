import { Route, RouteProps } from 'react-router';

import { useAuthenticate } from './useAuthenticate';

const ProtectedRoute: React.FC<RouteProps> = props => (
  useAuthenticate() ? <Route {...props} /> : null
);

export default ProtectedRoute;
