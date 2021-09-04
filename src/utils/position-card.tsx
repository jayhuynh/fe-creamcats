import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ReleaseTime from './release-time';

const useStyles = makeStyles({
  title: {
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
 * @param {string} description Position description
 * @param {string} releaseTime Release time in ISO 8601 format e.g. 1997-07-26 23:30:26
 * @returns {object}
 */
export default function PositionCard(props: any) {
  let { coverURL } = props;
  const classes = useStyles();
  const { title, description, releaseTime } = props;

  coverURL =
    typeof coverURL === 'undefined'
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png'
      : coverURL;

  return (
    <Card>
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
          <Typography className={classes.description}>{description}</Typography>
        </CardContent>
        <CardActions>
          <ReleaseTime time={releaseTime} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
