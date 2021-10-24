import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TimeTag from './time-tag';

const useStyles = makeStyles({
  card: {
    boxShadow: 'none',
  },
  title: {
    height: 20,
    overflow: 'hidden',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#202124',
  },
  description: {
    height: 40,
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.77,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#a6adb4',
  },
});

/**
 * This component generate a position card
 * @param {string} [coverURL] Position cover image URL, default a question mark picture
 * @param {string} title Position title
 * @param {string} [usage] This should be "public" or "personal", default as "public"
 * @param {string} [status] Position status, e.g.  applied, on-going, or ended (only required in personal usage)
 * @param {string} [description] Position description (only required in public usage)
 * @param {string} time Release (public usage)/applied (personal usage) time in ISO 8601 format e.g. 1997-07-26 23:30:26
 * @returns {object}
 */
export default function PositionCard(props: any) {
  let { coverURL } = props;
  const classes = useStyles();
  const { title, usage, status, description, time } = props;

  coverURL =
    typeof coverURL === 'undefined' || coverURL === ''
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png'
      : coverURL;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          className="posCover"
          alt="Position Cover"
          image={coverURL}
          title={title + ' cover'}
          style={{ height: 160 }}
        />
        <CardContent>
          <Typography className={classes.title}>{title}</Typography>
          {
            //If for public or undefined usage, add description
            usage === 'public' || typeof usage === 'undefined' ? (
              <Typography className={classes.description}>
                {description}
              </Typography>
            ) : null
          }
        </CardContent>
        <CardActions>
          <TimeTag usage={usage} status={status} time={time} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
