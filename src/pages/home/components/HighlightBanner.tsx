import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { AccessTime, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { fromPositions } from '../../../store';

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
    marginTop: '10px',
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

const testImg =
  'https://creamcats-bucket.s3.ap-southeast-1.amazonaws.com/1635154855955good-4206177_1280.jpg';

const HighlightBanner = () => {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', color: 'white', background: 'white' }}>
      <div
        className={classes.bg}
        style={{
          height: 650,
          boxSizing: 'border-box',
          padding: '176px 130px 0',
          width: '60%',
          backgroundImage: 'url(' + testImg + ')',
        }}
      >
        <Typography variant="h4" style={{ color: 'white' }}>Resident Admissions Volunteer</Typography>
        <div style={{ background:'white', height: 2, marginTop: 20, marginBottom: 20 }}/>
        <Typography variant="body1" className={classes.limit}>
          Volunteers play a very important part in what we do at New Auckland Place. We would like to thank our existing volunteers who give their valuable time every week to improve the lives of our residents. We thank you for all of your assistance, efforts and love; you are greatly appreciated by us all.
        </Typography>
        <Button variant="contained" style={{ background: '#fa6980', color: 'white', marginTop: 22 }}>
          LEARN MORE
        </Button>
      </div>
      <div style={{ width: '40%', padding: '100px 100px 0' }}>
        <Typography variant="h5" className={classes.title}>
          MOST POPULAR
          <div style={{ flex: 1 }}></div>
          <ChevronLeft style={{ cursor: 'pointer', color: '#a6adb4' }}></ChevronLeft>
          <ChevronRight style={{ cursor: 'pointer' }}></ChevronRight>
        </Typography>
        <div style={{ margin: '40px 0', background: '#ebeded', height: 1 }} />
        <Typography className={classes.t1}>Volunteers building connections with young adults with disabilities</Typography>
        <Typography className={classes.t2}>Wesley Mission Queensland's</Typography>
        <Typography className={classes.text}>Wesley Mission Queensland's ORCA Project is looking for volunteers to assist us to build meaningful connections for young post school adults with disabilities in the community with a focus on training, work experience and ultimately employment.</Typography>
        <div className={classes.text}>
          <AccessTime className={classes.time}></AccessTime> <i>2 min ago</i>
        </div>
        <Typography className={classes.t1} style={{ marginTop: 38 }}>
          Emergency Relief Volunteer
        </Typography>
        <Typography className={classes.t2}>Brisbane Relief Hub</Typography>
        <Typography className={classes.text}>Our Emergency Service volunteers are best known for helping people during a disaster - they might greet people at evacuation centres, or go door to door in communities following a flood or fire to check how people are coping, or register people on our registration service that helps people find their family and friends.</Typography>
        <div className={classes.text}>
          <AccessTime className={classes.time}></AccessTime> <i>2 min ago</i>
        </div>
      </div>
    </div>

  );
};

export default HighlightBanner;
