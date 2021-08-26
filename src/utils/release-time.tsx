import { Typography } from '@material-ui/core';
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
    <Typography variant="body2" color="textSecondary" component="p">
      <AccessTimeIcon style={{ color: color }} />
      {
        //Parsing time and calculate the past time with moment
        moment(time).fromNow() + (extraText === '' ? '' : ' ' + extraText)
      }
    </Typography>
  );
}
