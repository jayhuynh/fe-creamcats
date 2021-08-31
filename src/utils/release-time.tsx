import { Typography, Grid } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
const moment = require('moment');

/**
 * This component calaulate the past time according to the release time
 * @param {string} time Release time in ISO 8601 format e.g. 1997-07-26 23:30:26
 * @param {string} [text] Extra text after the past time
 * @param {string} [color] Defines the color of the clock icon
 * @returns {object}
 */
export default function ReleaseTime(props: any) {
  let { time, extraText, color } = props;

  extraText = typeof extraText === 'undefined' ? '' : extraText;
  color = typeof color === 'undefined' ? '#cbd0d3' : extraText;

  return (
    <Grid container direction="row" alignItems="center" style={{ height: 16 }}>
      <Grid item>
        <AccessTimeIcon style={{ width: 16, height: 16, color: color }} />
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: 13,
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'oblique',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#a6adb4',
            lineHeight: '16px',
            marginLeft: 10,
          }}
        >
          {
            //Parsing time and calculate the past time with moment
            moment(time).fromNow() + (extraText === '' ? '' : ' ' + extraText)
          }
        </Typography>
      </Grid>
    </Grid>
  );
}
