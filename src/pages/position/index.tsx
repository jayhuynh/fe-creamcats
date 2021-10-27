import { useParams } from 'react-router-dom';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ReactHtmlParser from 'react-html-parser';

import { fromAuth, fromPositions, useAppDispatch } from '../../store';

import PositionCarousel from './components/PositionCarousel';
import Brief from './components/Brief';
import ApplicationDialog from './components/ApplicationDialog';
import PositionCards from './components/PositionCards';
import { EventService, ProfileService } from '../../services';

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
      marginTop: 10,
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

  const [event, setEvent] = useState<any>({});
  const [organization, setOrganization] = useState<any>({});

  useEffect(() => {
    dispatch(fromPositions.doFetchCurrentPosition({ id: Number(positionId) }));
    dispatch(fromPositions.doFetchPositions());
  }, [dispatch, positionId]);

  useEffect(() => {
    (async () => {
      if (position.eventId > 0) {
        const event = await EventService.getEventById(position.eventId);
        const organization = await ProfileService.getOrganizationById(event.organizationId);
        setEvent(event);
        setOrganization(organization);
        console.log(event);
      }
    })();
  }, [position]);

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

  console.log(position, event, organization);

  const briefInformations = {
    location: location,
    startAt: startAt,
    endAt: endAt,
    typesOfWork: position.tags ? [...position.tags] : [],
    numberOfApplicants: numberOfApplicants,
    requirements: requirements,
    organizationName: organization.name,
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
              spacing={1}
              className={classes.contentGrid}
            >
              <h1>{name}</h1>
              { organization ? <Grid item>
                <h2>About us</h2>
                {organization.desc}
                <p>&nbsp;</p>
                <figure>
                  <img
                    alt={event.name}
                    src={event?.gallery?.reverse()[0]}/>
                </figure>
                <p>&nbsp;</p>
              </Grid> : <></> }
              { event ? <Grid item>
                <h2>Event</h2>
                {ReactHtmlParser(event.description)}
              </Grid> : <></> }
              { position ? <Grid item>
                <h2>Description</h2>
                {ReactHtmlParser(position.description)}
              </Grid> : <></> }
              <Grid style={{ marginTop: 25 }} item>
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
