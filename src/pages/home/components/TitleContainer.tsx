import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Checkbox, Fade, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  bg: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
  title: {
    color: '#202124',
    display: 'flex',
    alignItems: 'center',
  },
  t1: {
    color: '#fa6980',
    fontWeight: 'bold',
  },
  t2: {
    color: '#202124',
    fontWeight: 'bold',
    margin: '16px 0 8px',
  },
  text: {
    color: '#a6adb4',
    fontSize: '13px',
  },
  time: {
    color: '#a6adb4',
    fontSize: '14px',
    marginRight: '4px',
    verticalAlign: '-2px',
  },
  content: {
    background: '#f6f8f9',
    padding: '50px 140px',
  },
  limit:{
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    display: '-webkit-box;',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
    overflow: 'hidden',
  },
}));

const TitleContainer = () => {
  const [open, setOpen] = useState(false);
  const handleSwitch = () => setOpen(!open);
  const classes = useStyles();

  return (
    <>
      <Grid
        container>
        <Grid container xs={6} justifyContent="flex-start" alignItems="center">
          <Typography variant="h5">OPPORTUNITIES</Typography>
        </Grid>
        <Grid container xs={6} justifyContent="flex-end" alignItems="center">
          <Button onClick={handleSwitch}>Open modal</Button>
        </Grid>
      </Grid>
      <Fade in={open} mountOnEnter unmountOnExit timeout={300}>
        <div>
          Helloworld
        </div>
      </Fade>
    </>
  );
};

export default TitleContainer;
