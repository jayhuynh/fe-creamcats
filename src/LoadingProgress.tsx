import React from 'react';
import { useSelector } from 'react-redux';
import { fromApplications, fromAuth, fromPositions, fromPosts, fromProfile, fromTags } from './store';
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
  const applications = useSelector(fromApplications.selectLoading);
  const profile = useSelector(fromProfile.selectLoading);
  const posts = useSelector(fromPosts.selectLoading);
  const classes = useStyles();

  if (!(auth || position || tags || applications || profile || posts)) return <></>;

  return (
    <Box position="fixed" zIndex='tooltip' top className={classes.root}>
      <LinearProgress color="primary"/>
    </Box>
  );
};

export default LoadingProgress;
