import { useParams } from 'react-router-dom';
import { Grid, Typography, Divider, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fromAuth, fromPositions, fromProfile, useAppDispatch } from '../../store';

import PositionCarousel from './components/PositionCarousel';
import Brief from './components/Brief';
import ApplicationDialog from './components/ApplicationDialog';
import Login from '../login';
import PositionCards from './components/PositionCards';
import TimeTag from '../../utils/time-tag';

interface ParamsTypes {
  positionId: string;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f6f8f9',
    paddingBottom: 60,
  },
  rootGrid: {
    width: '100%',
  },
  carouselGrid: {
    width: '100%',
    marginBottom: 30,
  },
  briefPositionDetailsGrid: {
    width: '75%',
    marginBottom: 30,
  },
  relatedPositionsGrid: {
    width: '70%',
    marginBottom: 30,
  },
  relatedPositionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#202124',
    marginBottom: 20,
  },
});

//---------------- Mock data ----------------

//This mock data remains untill I realise the seperate CSS/LESS file to control the dangerous HTML's style
const positionDetail: any = (
  <div>
    <Typography
      style={{
        fontSize: 48,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.25,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 30,
      }}
    >
      RESIDENT ADMISSIONS VOLUMTEER - BARDON
    </Typography>
    <Typography
      style={{
        fontSize: 32,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      About us
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipiscing elit sodales primis,
      mollis viverra conubia ligula inceptos laoreet libero tortor, nascetur non
      habitasse iaculis tempor nec egestas fames augue, platea porta integer
      nostra curae sed arcu. Nec ut diam vulputate ante scelerisque ridiculus
      lobortis orci mi
    </Typography>
    <Card style={{ marginBottom: 20, boxShadow: 'none' }}>
      <CardMedia
        component="img"
        className="organizationShowcase"
        alt="Organization showcase"
        height="300"
        image="https://www.intheblack.com/-/media/intheblack/allimages/magazine-2021/04-april/empty-city-street.jpg?rev=d3b55cf125a14112bcb2d8b7054591d4"
      />
    </Card>
    <Typography
      style={{
        fontSize: 32,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Event
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Dignissim rutrum ridiculus lacinia phasellus torquent ad aliquet, nisi
      dictum cubilia class habitasse commodo, semper potenti nec ac per egestas.
      Ac volutpat ullamcorper phasellus montes sollicitudin litora ridiculus mi
      conubia inceptos euismod odio curabitur, tortor eros porta venenatis
      facilisis quam blandit in ut lobortis consequat justo. Hac libero quisque
      tortor conubia iaculis
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Nascetur himenaeos morbi gravida porta sapien justo aliquam pellentesque
      dapibus curae, cursus ultrices suspendisse cras ligula id aenean vulputate
      taciti, eleifend eros bibendum scelerisque lobortis venenatis nulla
      tristique tempus. Quisque eleifend vulputate.
    </Typography>
    <Typography
      style={{
        fontSize: 32,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Position Description
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Dignissim rutrum ridiculus lacinia phasellus torquent ad aliquet, nisi
      dictum cubilia class habitasse commodo, semper potenti nec ac per egestas.
      Ac volutpat ullamcorper phasellus montes sollicitudin litora ridiculus mi
      conubia inceptos euismod odio curabitur, tortor eros porta venenatis
      facilisis quam blandit in ut lobortis consequat justo. Hac libero quisque
      tortor conubia iaculis
    </Typography>
    <Typography
      style={{
        fontSize: 16,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1.88,
        textAlign: 'left',
        color: '#202124',
        marginBottom: 20,
      }}
    >
      Nascetur himenaeos morbi gravida porta sapien justo aliquam pellentesque
      dapibus curae, cursus ultrices suspendisse cras ligula id aenean vulputate
      taciti, eleifend eros bibendum scelerisque lobortis venenatis nulla
      tristique tempus. Quisque eleifend vulputate.
    </Typography>
  </div>
);
//---------------- Mock data ----------------

/**
 * Position detail page component
 */
function Position() {
  const { positionId } = useParams<ParamsTypes>();
  const isTokenValid = useSelector(fromAuth.selectIsTokenValid);
  const isHasProfile = useSelector(fromProfile.selectIsHasProfile);

  const position = useSelector(fromPositions.selectCurrentPosition);
  const positions = useSelector(fromPositions.selectPositions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromPositions.doFetchCurrentPosition({ id: Number(positionId) }));
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch, positionId]);

  const {
    location,
    startAt,
    endAt,
    createdAt,
    requirements,
    carouselItems,
    numberOfApplicants,
  } = position;

  const briefInformations = {
    location: location,
    startAt: startAt,
    endAt: endAt,
    typesOfWork: ['Children care', 'Charity'],
    numberOfApplicants: numberOfApplicants,
    requirements: requirements,
    organizationName: 'Test Organization',
    createdAt: createdAt,
  };

  console.log('This is the detail of position ' + positionId);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.rootGrid}
        container
        direction="column"
        alignItems="center"
      >
        <Grid item className={classes.carouselGrid}>
          <PositionCarousel carouselItems={carouselItems} />
        </Grid>
        <Grid
          direction="row"
          className={classes.briefPositionDetailsGrid}
          container
          spacing={6}
        >
          <Grid item xs={4}>
            <Grid container direction="column" spacing={3}>
              <Brief briefInformations={briefInformations} />
            </Grid>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs>
            <section>
              {/* HTML embedding will be replaced in the future
              <div dangerouslySetInnerHTML={{ __html: positionDetail }} />*/}
              {positionDetail}
              {(isTokenValid && isHasProfile) ? <ApplicationDialog /> : <Login />}
            </section>
          </Grid>
        </Grid>
        <Grid className={classes.relatedPositionsGrid} container>
          <Typography className={classes.relatedPositionsTitle}>
            RELATED POSITIONS
          </Typography>
          <Grid container spacing={4}>
            <PositionCards positionInfoList={positions} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Position;
