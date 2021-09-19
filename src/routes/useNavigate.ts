import qs from 'querystring';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

type QueryType = string | number | boolean | undefined | Array<string>;
export type QueryDictionary<T = unknown, K extends keyof T = keyof T> = Record<K, QueryType>;

interface MergeQuery<T = unknown> {
  type: 'MERGE_QUERY';
  dictionary: QueryDictionary<T>;
}

interface ReplaceQuery<T = unknown> {
  type: 'REPLACE_QUERY',
  dictionary: QueryDictionary<T>;
}

function isReplaceQuery(arg: any): arg is ReplaceQuery {
  return arg.type === 'REPLACE_QUERY';
}

export type QueryConfig<T> = MergeQuery<T> | ReplaceQuery<T>;

export const useNavigate = <T = any>() => {
  const history = useHistory();
  const location = useLocation();
  const mergeQuery = (query: QueryDictionary<T>): MergeQuery<T> => ({
    type: 'MERGE_QUERY',
    dictionary: query,
  });

  const replaceQuery = (query: QueryDictionary<T>): ReplaceQuery<T> => ({
    type: 'REPLACE_QUERY',
    dictionary: query,
  });

  const convertSearchString = useCallback((query: QueryConfig<T>) => (isReplaceQuery(query)
    ? qs.stringify(query.dictionary)
    : qs.stringify({
      ...qs.parse(location.search.replace('?', '')),
      ...query.dictionary,
    })), [location.search]);

  return {
    navigate: useCallback((pathname: string | undefined, query: QueryConfig<T>) => {
      history.push({
        pathname: pathname ?? location.pathname,
        search: convertSearchString(query),
      });
    }, [history, location.pathname, convertSearchString]),
    replace: useCallback((pathname: string | undefined, query: QueryConfig<T>) => {
      history.replace({
        pathname: pathname ?? location.pathname,
        search: convertSearchString(query),
      });
    }, [history, location.pathname, convertSearchString]),
    mergeQuery,
    replaceQuery: useCallback(replaceQuery, []),
    convertSearchString,
  };
};
