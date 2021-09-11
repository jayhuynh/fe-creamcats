import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
const moment = require('moment');

const useStyles = makeStyles({
  releaseTimeText: {
    fontSize: 13,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'oblique',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#a6adb4',
    lineHeight: '16px',
    marginLeft: 10,
  },
});

/**
 * This function generates corresponding time-tag according to input
 * @param {string} [usage] This should be "public" or "personal", default as "public"
 * @param {string} [time] Release (public usage)/applied (personal usage) time in ISO 8601 format e.g. 1997-07-26 23:30:26
 * @param {string} [extraText] Extra text after the time-tag
 * @param {string} [status] This should be "Applied", "On-going" or "Ended" (only required for personal usage)
 * @returns
 */
function tagText(
  usage: string,
  time: string,
  extraText: string,
  status = undefined,
) {
  switch (usage) {
    default:
      //Parsing time and calculate the past time with moment
      return moment(time).fromNow() + (extraText === '' ? '' : ' ' + extraText);
    case 'personal':
      if (status === 'On-going' || 'Ended') {
        return status;
      } else if (status === 'Applied') {
        return (
          status +
          moment(time).fromNow() +
          (extraText === '' ? '' : ' ' + extraText)
        );
      }
      return moment(time).fromNow() + (extraText === '' ? '' : ' ' + extraText);
  }
}

/**
 * This component calaulate the past time according to the release time
 * @param {string} [usage] This should be "public" or "personal", default as "public"
 * @param {string} [status] Position status, e.g.  applied, on-going, or ended (only required in personal usage)
 * @param {string} time Release (public usage)/applied (personal usage) time in ISO 8601 format e.g. 1997-07-26 23:30:26
 * @param {string} [text] Extra text after the time-tag
 * @param {string} [color] Defines the color of the clock icon
 * @returns {object}
 */
export default function TimeTag(props: any) {
  const classes = useStyles();
  let { usage, time, extraText, color, status } = props;

  extraText = typeof extraText === 'undefined' ? '' : extraText;
  color = typeof color === 'undefined' ? '#cbd0d3' : extraText;

  return (
    <Grid container direction="row" alignItems="center" style={{ height: 16 }}>
      <Grid item>
        <AccessTimeIcon style={{ width: 16, height: 16, color: color }} />
      </Grid>
      <Grid item>
        <Typography className={classes.releaseTimeText}>
          {tagText(usage, time, extraText, status)}
        </Typography>
      </Grid>
    </Grid>
  );
}
