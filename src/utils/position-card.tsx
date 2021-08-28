import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from '@material-ui/core';

import ReleaseTime from './release-time';

/**
 * This component generate a position card
 * @param {string} [coverURL] Default a question mark picture
 * @param {string} title Position title
 * @param {string} description Position description
 * @param {string} releaseTime Release time in ISO 8601 format e.g. 1997-07-26 23:30:26
 * @returns {object}
 */
export default function PositionCard(props: any) {
  let { coverURL } = props;
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
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              fontStretch: 'normal',
              fontStyle: 'normal',
              lineHeight: 1.25,
              letterSpacing: 'normal',
              textAlign: 'left',
              color: '#202124',
            }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              fontSize: 13,
              fontWeight: 'normal',
              fontStretch: 'normal',
              fontStyle: 'normal',
              lineHeight: 1.77,
              letterSpacing: 'normal',
              textAlign: 'left',
              color: '#a6adb4',
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <ReleaseTime time={releaseTime} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
