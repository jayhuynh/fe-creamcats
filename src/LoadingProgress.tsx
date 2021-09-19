import React from 'react';
import { useSelector } from 'react-redux';
import { fromAuth, fromPositions, fromTags } from './store';
import { Box, LinearProgress, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

export const LoadingProgress = () => {
  const auth = useSelector(fromAuth.selectLoading);
  const position = useSelector(fromPositions.selectLoading);
  const tags = useSelector(fromTags.selectLoading);
  const classes = useStyles();

  if (!(auth || position || tags)) return <></>;

  return (
    <Box position="fixed" zIndex='tooltip' top className={classes.root}>
      <LinearProgress color="secondary"/>
    </Box>
  );
};

export default LoadingProgress;
