import { useParams } from 'react-router-dom';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ReactHtmlParser from 'react-html-parser';

import { fromAuth, fromPositions, useAppDispatch } from '../../store';

import PositionCarousel from './components/PositionCarousel';
import Brief from './components/Brief';
import ApplicationDialog from './components/ApplicationDialog';
import PositionCards from './components/PositionCards';

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
      width: 500,
      borderRadius: 10,
    },
  },
});

//---------------- Mock data ----------------
//This mock data remains untill we have position details (plain HTML) in Database
const positionDetail =
  '<h2><strong>About us</strong></h2><p>Lorem ipsum dolor sit amet consectetur adipiscing elit sodales primis, mollis viverra conubia ligula inceptos laoreet libero tortor, nascetur non habitasse iaculis tempor nec egestas fames augue, platea porta integer nostra curae sed arcu. Nec ut diam vulputate ante scelerisque ridiculus lobortis orci mi</p><figure class="image"><img src="https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg" srcset="https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_390 390w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_780 780w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_1170 1170w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_1560 1560w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_1950 1950w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_2340 2340w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_2730 2730w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_3120 3120w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_3510 3510w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/223322fdf2959761ce6d2aeee3f0da9ea39b055b5c6478c2.jpeg/w_3841 3841w" sizes="100vw" width="3841"></figure><h2><strong>Event</strong></h2><p>Dignissim rutrum ridiculus lacinia phasellus torquent ad aliquet, nisi dictum cubilia class habitasse commodo, semper potenti nec ac per egestas. Ac volutpat ullamcorper phasellus montes sollicitudin litora ridiculus mi conubia inceptos euismod odio curabitur, tortor eros porta venenatis facilisis quam blandit in ut lobortis consequat justo. Hac libero quisque tortor conubia iaculis</p><figure class="image"><img src="https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg" srcset="https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_390 390w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_780 780w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_1170 1170w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_1560 1560w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_1950 1950w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_2340 2340w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_2730 2730w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_3120 3120w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_3510 3510w, https://83680.cdn.cke-cs.com/gUYwSa3b9Jio3phjR4jl/images/8e69972a1d19767378bbed9397e7d88ab2470afa6f815457.jpeg/w_3840 3840w" sizes="100vw" width="3840"></figure><p>Nascetur himenaeos morbi gravida porta sapien justo aliquam pellentesque dapibus curae, cursus ultrices suspendisse cras ligula id aenean vulputate taciti, eleifend eros bibendum scelerisque lobortis venenatis nulla tristique tempus. Quisque eleifend vulputate.</p><h2><strong>Position Description</strong></h2><p>Dignissim rutrum ridiculus lacinia phasellus torquent ad aliquet, nisi dictum cubilia class habitasse commodo, semper potenti nec ac per egestas. Ac volutpat ullamcorper phasellus montes sollicitudin litora ridiculus mi conubia inceptos euismod odio curabitur, tortor eros porta venenatis facilisis quam blandit in ut lobortis consequat justo. Hac libero quisque tortor conubia iaculis</p><ul><li>{Specific task of thie position}</li><li>{Specific task of thie position}</li><li>{Specific task of thie position}</li></ul><p>Nascetur himenaeos morbi gravida porta sapien justo aliquam pellentesque dapibus curae, cursus ultrices suspendisse cras ligula id aenean vulputate taciti, eleifend eros bibendum scelerisque lobortis venenatis nulla tristique tempus. Quisque eleifend vulputate.</p>';
//---------------- Mock data ----------------

/**
 * Position detail page component
 */
function Position() {
  const { positionId } = useParams<ParamsTypes>();
  const isAuthenticated = useSelector(fromAuth.selectIsAuthenticated);

  const position = useSelector(fromPositions.selectCurrentPosition);
  const positions = useSelector(fromPositions.selectPositions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromPositions.doFetchCurrentPosition({ id: Number(positionId) }));
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch, positionId]);

  const {
    name,
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
            <Grid container direction="column" spacing={2}>
              <Brief briefInformations={briefInformations} />
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
                <h1>{name}</h1>
                {ReactHtmlParser(positionDetail)}
              </Grid>
              <Grid item>
                <ApplicationDialog postionId={position.id} />
              </Grid>
            </Grid>
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
