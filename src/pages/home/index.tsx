import { login, resolvePath } from '../../routes';
import { Grid, Button } from '@material-ui/core';
import { AccessTime, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import PositionCard from '../../utils/position-card';
import { useSelector } from 'react-redux';
import { fromPositions, useAppDispatch } from '../../store';

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

const testData: any[] = [];
for (let i = 0; i < 9; i++) {
  testData.push({});
}

const testImg =
  'https://images.unsplash.com/photo-1622389084799-e2343c893b8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80';
const Home = () => {
  const [viewAll, setViewAll] = useState(false);
  const classes = useStyles();
  const positions = useSelector(fromPositions.selectPositions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch]);

  console.log(positions);
  // console.log(resolvePath(login, undefined, { redirect_uri: '/blog' }));
  return (
    <div style={{ minHeight: 'calc(100vh - 248px)' }}>
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
      <div className={classes.content}>
        <h2 className={classes.flex}>
          OPPORTUNITIES<div style={{ flex: 1 }}></div>
          <span
            style={{ cursor: 'pointer', color: '#bac0c5', fontWeight: 'normal' }}
            onClick={() => setViewAll(!viewAll)}
          >
            VIEW ALL
          </span>
        </h2>
        <div>
          <Grid container spacing={3}>
            {positions.slice(0, viewAll ? 9 : 3).map((position, index) => (
              <Grid item xs={4} key={position.id}>
                <PositionCard
                  coverURL={position.thumbnail}
                  title={position.name}
                  description={position.description}
                  releaseTime={position.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
