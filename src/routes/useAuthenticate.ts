import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { login, useNavigate } from '.';
import { fromAuth, fromProfile, useAppDispatch } from '../store';
import { useQuery } from './useQuery';

// This hook can be moved into ProtectedRoute
// but it will be more developer friendly when we need different route guard
// which can stay in another hook, ex: Role
export const useAuthenticate = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { replaceQuery, replace } = useNavigate();
  const { get, clear, queryString, queryDictionary } = useQuery();
  const user = useSelector(fromProfile.selectProfile);
  const  isAuthenticated = useSelector(fromAuth.selectIsAuthenticated);
  const [isAfterResume, setIsAfterResume] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const jwt = get('access_token');
        const accountType = get('type') ?? JSON.parse(localStorage.getItem(fromAuth.TYPE) || 'volunteer');
        if (!!jwt || (isAuthenticated && !user)) {
          clear('access_token');
          replace(undefined, replaceQuery(queryDictionary()));
          await dispatch(fromAuth.doResume(jwt ? { jwt } : undefined));
          await dispatch(fromProfile.doFetchMyProfile({ type: accountType }));
        }
      } finally {
        setIsAfterResume(true);
      }
    })();

    // This hook should run only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAfterResume && !isAuthenticated) {
      replace(
        login.path,
        replaceQuery({ redirect: `${location.pathname}?${queryString()}` }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAfterResume]);

  return isAfterResume && isAuthenticated;
};
