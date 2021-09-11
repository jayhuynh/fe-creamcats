import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { AccessTime, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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

const testImg =
  'https://images.unsplash.com/photo-1622389084799-e2343c893b8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80';

const HighlightBanner = () => {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', color: 'white' }}>
      <div
        className={classes.bg}
        style={{
          height: 600,
          boxSizing: 'border-box',
          padding: '176px 130px 0',
          width: '60%',
          backgroundImage: 'url(' + testImg + ')',
        }}
      >
        <h1 style={{ color: 'white' }}>Resident Admissions Volunteer</h1>
        <div style={{ background:'white', height:1 }}/>
        <p className={classes.limit}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sodales primis, mollis viverra conubia ligula
          inceptos laoreet libero tortor, nascetur non habitasse iaculis tempor nec egestas fames augue, platea porta
          integer nostra curae sed arcu. Nec ut diam vulputate ante scelerisque ridiculus lobortis orci mi{' '}
        </p>
        <Button variant="contained" style={{ background: '#fa6980', color: 'white', marginTop: 22 }}>
          LEARN MORE
        </Button>
      </div>
      <div style={{ width: '40%', padding: '100px 100px 0' }}>
        <h2 className={classes.title}>
          MOST POPULAR
          <div style={{ flex: 1 }}></div>
          <ChevronLeft style={{ cursor: 'pointer', color: '#a6adb4' }}></ChevronLeft>
          <ChevronRight style={{ cursor: 'pointer' }}></ChevronRight>
        </h2>
        <div style={{ margin: '40px 0', background: '#ebeded', height: 1 }} />
        <div className={classes.t1}>POSITION 1</div>
        <div className={classes.t2}>Organisation 1 </div>
        <p className={classes.text}>Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat…</p>
        <div className={classes.text}>
          <AccessTime className={classes.time}></AccessTime> <i>2 min ago</i>
        </div>
        <div className={classes.t1} style={{ marginTop: 38 }}>
          POSITION 1
        </div>
        <div className={classes.t2}>Organisation 1 </div>
        <p className={classes.text}>Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad has appareat…</p>
        <div className={classes.text}>
          <AccessTime className={classes.time}></AccessTime> <i>2 min ago</i>
        </div>
      </div>
    </div>

  );
};

export default HighlightBanner;
