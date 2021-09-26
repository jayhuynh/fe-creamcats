import { Grid, Typography, Divider, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import TimeTag from '../../../utils/time-tag';

const useStyles = makeStyles({
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
  chipRootGrid: {
    paddingTop: 8,
  },
  chip: {
    backgroundColor: '#f6f8f9',
    border: '1px solid #a6adb4',
    color: '#a6adb4',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#202124',
  },
});

/**
 * This component render a list of Grids, each render an item of brief according to the input array
 * @param {object[]} brief An array contains objects describing the brief items. Each object conatins
 * a fixed "type" attribute indicating it's type and a dynamic "content" field containing corresponding
 * data fetched from the back-end
 */
export default function Brief(props: any) {
  const {
    location,
    startAt,
    endAt,
    createdAt,
    typesOfWork,
    requirements,
    organizationName,
  } = props.briefInformations;
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography className={classes.briefTitle}>Location</Typography>
        <Typography className={classes.briefContent}>{location}</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.briefTitle}>Duration</Typography>
        <Typography className={classes.briefContent}>
          {moment(startAt).format('DD/MM/YYYY') +
            ' - ' +
            moment(endAt).format('DD/MM/YYYY')}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.briefTitle}>Tags</Typography>
        <Typography className={classes.briefContent}>
          <Grid
            container
            direction="row"
            spacing={1}
            className={classes.chipRootGrid}
          >
            {typesOfWork.map((tag: string) => (
              <Grid item>
                <Chip key={tag} label={tag} className={classes.chip} />
              </Grid>
            ))}
          </Grid>
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.briefTitle}>
          Number of applicants
        </Typography>
        <Typography className={classes.briefContent}>45</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.briefTitle}>
          Other requirements
        </Typography>
        <Typography className={classes.briefContent}>{requirements}</Typography>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <Typography className={classes.subtitle}>{organizationName}</Typography>
        <TimeTag time={createdAt} />
      </Grid>
    </Grid>
  );
}
