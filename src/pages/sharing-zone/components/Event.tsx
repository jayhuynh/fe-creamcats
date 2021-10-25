import { FC, useState } from 'react';
import { Button, Box, CardMedia, Grid, Typography } from '@material-ui/core';
import { AccessTime, ChevronLeft, ChevronRight } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ScreenShareOutlinedIcon from '@material-ui/icons/ScreenShareOutlined';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles(() => ({
  text: {
    color: '#7c7c91',
    fontSize: '13px',
  },
  desc: {
    color: '#333333',
    fontSize: '13px',
  },
  icon: {
    color: '#bfc4c9',
    fontSize: '14px',
    marginRight: '4px',
    marginTop: '10px',
    verticalAlign: '-2px',
  },
  icon2: {
    color: '#bfc4c9',
    fontSize: '18px',
    marginRight: '4px',
    marginTop: '10px',
    verticalAlign: '-4px',
  },
  limit: {
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    display: '-webkit-box;',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
    overflow: 'hidden',
  },
  limit2: {
    '-webkit-line-clamp': 2,
  },
  moreBtn: {
    background: 'white',
    position: 'relative',
    top: '-16px',
    color: '#fa6980',
    cursor: 'pointer',
    float: 'right',
    fontSize: 13,
    paddingLeft: 30,
  },
  bottom: {
    marginTop: 30,
    paddingTop: 30,
    borderTop: 'solid 1px #eaeaea',
  },
  descText: {
    borderRadius: 5,
    backgroundColor: '#f6f8f9',
    color: '#333',
    padding: 24,
    fontSize: 14,
    marginTop: 24,
  },
}));

interface EventProps {
  post: any;
}
const Event: FC<EventProps> = ({ post }: EventProps) => {
  const classes = useStyles();
  const [more, setMore] = useState(false);
  return (
    <Box style={{ padding: 40, background: 'white', marginBottom: 20 }}>
      <CardMedia component="img" alt="" height="430px" image={post.postCover} />
      <Typography variant="h5" style={{ marginTop: 30 }}>
        {post.title}
      </Typography >
      <Box className={classes.text} style={{ color: '#333333' }}>
        <PersonIcon className={classes.icon}></PersonIcon>{post?.profile?.fullname}
        <AccessTime className={classes.icon} style={{ marginLeft: 20 }}></AccessTime>19/05/2021
        <ForumIcon className={classes.icon} style={{ marginLeft: 20 }}></ForumIcon>10
        <VisibilityIcon className={classes.icon} style={{ marginLeft: 20 }}></VisibilityIcon>301
      </Box>
      <Typography
        variant="body1"
        className={classes.text + (more ? '' : ' ' + classes.limit)}
        style={{ marginTop: 10 }}
      >
        {ReactHtmlParser(post.content)}
      </Typography>
      {!more && (
        <Box className={classes.moreBtn} onClick={() => setMore(true)}>
          Read More
        </Box>
      )}
      <Box className={classes.bottom}>
        <Box className={classes.text} style={{ fontSize: 14 }}>
          <FavoriteBorderIcon className={classes.icon2}></FavoriteBorderIcon>Like
          <ChatBubbleOutlineIcon className={classes.icon2} style={{ marginLeft: 20 }}></ChatBubbleOutlineIcon>Comment
          <ScreenShareOutlinedIcon className={classes.icon2} style={{ marginLeft: 20 }}></ScreenShareOutlinedIcon>Share
        </Box>
        {ReactHtmlParser(post.content) && <Typography className={classes.descText}>{ReactHtmlParser(post.content)}</Typography>}
      </Box>
    </Box>
  );
};

export default Event;
