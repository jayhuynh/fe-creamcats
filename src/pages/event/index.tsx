import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Grid,
  Card,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';

import {
  fromEvents,
  fromOrganizationPositions,
  useAppDispatch,
} from '../../store';

import EventContent from './components/EventContent';
import EventPositions from './components/EventPositions';
import CreatePositionDialog from './components/CreatePositionDialog';

//This should be deleted when submit to avoid copyright issue
const backupURL =
  'https://www.galaxydigital.com/wp-content/uploads/2019/10/how-to-get-volunteers-for-an-event-scaled.jpg';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f6f8f9',
    paddingBottom: 60,
  },
  rootGrid: {
    width: '100%',
  },
  eventActionBar: {
    width: '95%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    top: 70,
    left: '50%',
  },
  backButton: {
    width: 134,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  back: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    color: 'white',
  },
  delete: {
    '&:hover': {
      backgroundColor: '#EAEAEA',
    },
    width: 134,
    height: 40,
    backgroundColor: '#fff',
    color: '#bfc4c9',
  },
  edit: {
    '&:hover': {
      backgroundColor: '#D26877',
    },
    width: 134,
    height: 40,
    backgroundColor: '#fa6980',
    color: 'white',
  },
  coverGrid: {
    width: '100%',
    marginBottom: 30,
  },
  coverCard: {
    boxShadow: 'none',
    borderRadius: 0,
  },
  cover: {
    height: 500,
  },
  eventTitleGrid: {
    width: '75%',
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#333',
    marginBottom: 40,
  },
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
  positionHeader: {
    marginBottom: 30,
  },
  button: {
    borderRadius: 6,
    border: 'solid 2px rgba(0, 0, 0, 0.05)',
  },
});

interface ParamsTypes {
  eventId: string;
}

export default function Event() {
  const { eventId } = useParams<ParamsTypes>();
  const history = useHistory();

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const eventInfo = useSelector(fromEvents.selectCurrentEvent);
  const cover =
    eventInfo.gallery.length === 0 ? backupURL : eventInfo.gallery[0];

  const positions = useSelector(fromOrganizationPositions.selectEventPositions);

  useEffect(() => {
    dispatch(fromEvents.doFetchEventById({ eventId: Number(eventId) }));
    dispatch(
      fromOrganizationPositions.doFetchEventPositions({
        eventId: Number(eventId),
      }),
    );
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid
        className={classes.rootGrid}
        container
        direction="column"
        alignItems="center"
      >
        <Grid item className={classes.coverGrid}>
          <Card className={classes.coverCard}>
            <CardMedia className={classes.cover} image={cover} title="" />
            <Grid
              container
              className={classes.eventActionBar}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  onClick={() => {history.goBack();}}
                  className={classes.backButton}
                  startIcon={<ArrowBackIosIcon />}
                >
                  <Typography className={classes.back}>Back</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Grid container spacing={3} justifyContent="space-around">
                  <Grid item>
                    <Button className={classes.delete}>Delete</Button>
                  </Grid>
                  <Grid item>
                    <Button className={classes.edit}>Edit Event</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          className={classes.eventTitleGrid}
        >
          <Grid item>
            <Typography className={classes.eventTitle}>
              {eventInfo.name}
            </Typography>
          </Grid>
        </Grid>
        <EventContent eventInfo={eventInfo} />
        <Grid
          container
          direction="column"
          className={classes.briefPositionDetailsGrid}
        >
          <Grid item className={classes.positionHeader}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Typography className={classes.briefTitle}>
                  {`Positions (${positions.length})`}
                </Typography>
              </Grid>
              <Grid item>
                <CreatePositionDialog eventId={Number(eventId)}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <EventPositions positionInfo={positions} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
