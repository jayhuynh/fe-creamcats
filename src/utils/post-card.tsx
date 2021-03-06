import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

import TimeTag from './time-tag';

const useStyles = makeStyles({
  card: {
    boxShadow: 'none',
  },
  cardArea: {
    display: 'flex',
    flexDirection: 'row',
  },
  postCover: {
    width: '50%',
    height: 220,
  },
  postContent: {
    width: '50%',
    height: 170,
    padding: '0 40px 0 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#202124',
    height: 28,
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.77,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#a6adb4',
    height: 43,
    overflow: 'hidden',
  },
  postActions: {
    height: 40,
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconArea: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    width: 18,
    height: 18,
    color: '#b4b9bf',
  },
  button: {
    height: 40,
    backgroundColor: 'white',
    fontSize: 14,
  },
});

/**
 * This component generate a post card
 * @param {string} [coverURL] Post cover image URL, default a question mark picture
 * @param {string} title Post title
 * @param {string} description Post description
 * @returns {object}
 */
export default function PostCard(props: any) {
  let { coverURL } = props;
  const classes = useStyles();
  const { title, description, time } = props;

  coverURL =
    typeof coverURL === 'undefined'
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png'
      : coverURL;

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardArea}>
        <CardMedia
          component="img"
          className={classes.postCover}
          alt="Position Cover"
          image={coverURL}
          title={title + ' cover'}
        />
        <CardContent className={classes.postContent}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.description}>{description.replace(/<\/?[^>]+(>|$)/g, '')}</Typography>
          <section className={classes.postActions}>
            <section className={classes.iconArea}>
              <TimeTag usage="personal" time={time} status="Posted" />
            </section>
            <Button className={classes.button} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button className={classes.button} startIcon={<ShareIcon />}>
              Share
            </Button>
            <Button className={classes.button} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </section>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
