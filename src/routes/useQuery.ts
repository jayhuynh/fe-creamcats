import qs from 'querystring';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { QueryDictionary } from './useNavigate';

export const useQuery = <T = any>() => {
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  return {
    get: useCallback((name: string) => query.get(name), [query]),
    clear: useCallback((name: string) => {
      query.delete(name);
    }, [query]),
    queryDictionary: useCallback(() => qs.parse(query.toString()) as QueryDictionary<T>, [query]),
    queryString: useCallback(() => query.toString(), [query]),
  };
};
