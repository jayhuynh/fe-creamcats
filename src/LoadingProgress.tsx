import React from 'react';
import { useSelector } from 'react-redux';
import { fromAuth } from './store';

export const LoadingProgress = () => {
  const isLoading = useSelector(fromAuth.selectLoading);

  return <div>${isLoading ? 'Loading' : 'Loaded'}</div>;
};

export default LoadingProgress;
