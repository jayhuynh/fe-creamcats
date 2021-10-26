import { Grid, Typography, Divider, makeStyles } from '@material-ui/core';

import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import ApplicationDialog from '../../position/components/ApplicationDialog';
import React from 'react';

const useStyles = makeStyles({
  briefPositionDetailsGrid: {
    width: '75%',
    marginBottom: 30,
  },
  briefTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#202124',
  },
  briefContent: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#a6adb4',
  },
  contentGrid: {
    '& h1': {
      fontSize: 48,
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#333',
      marginTop: 0,
      marginBottom: 10,
    },
    '& h2': {
      fontSize: 32,
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#333',
      marginBottom: 5,
    },
    '& p': {
      fontSize: 14,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#333',
      marginBottom: 10,
    },
    '& img': {
      width: '80%',
      borderRadius: 10,
      marginLeft: '10%',
      marginRight: '10%',
    },
    '& figure': {
      margin: 0,
    },
  },
});

/**
 * This component generate the content of an event including title, brief and description
 * @param {Event} eventInfo A Event object that contains all the information of an event
 */
export default function EventContent(props: any) {
  const classes = useStyles();
  const { eventInfo } = props;

  return (
    <Grid
      direction="row"
      className={classes.briefPositionDetailsGrid}
      container
      spacing={6}
    >
      <Grid item xs={3}>
        <Grid container direction="column" spacing={3}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography className={classes.briefTitle}>Location</Typography>
              <Typography className={classes.briefContent}>
                {eventInfo.location}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.briefTitle}>Duration</Typography>
              <Typography className={classes.briefContent}>
                {moment(eventInfo.startAt).format('DD/MM/YYYY') +
                  ' - ' +
                  moment(eventInfo.endAt).format('DD/MM/YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction="column"
          spacing={2}
          className={classes.contentGrid}
        >
          <Grid item>
            <Typography variant="h2">Description</Typography>
            <Typography className={classes.briefContent}>
              {ReactHtmlParser(eventInfo.description)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
