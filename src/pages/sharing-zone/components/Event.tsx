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
  images: string;
  desc?: string;
}
const Event: FC<EventProps> = ({ images, desc }) => {
  const classes = useStyles();
  const [more, setMore] = useState(false);
  return (
    <Box style={{ padding: 40, background: 'white', marginBottom: 20 }}>
      <CardMedia component="img" alt="" height="430px" image={images} />
      <Typography variant="h5" style={{ marginTop: 30 }}>
        Volunteer Event - What a great experience!
      </Typography >
      <Box className={classes.text} style={{ color: '#333333' }}>
        <PersonIcon className={classes.icon}></PersonIcon>Name slfdsf
        <AccessTime className={classes.icon} style={{ marginLeft: 20 }}></AccessTime>19/05/2021
        <ForumIcon className={classes.icon} style={{ marginLeft: 20 }}></ForumIcon>10
        <VisibilityIcon className={classes.icon} style={{ marginLeft: 20 }}></VisibilityIcon>301
      </Box>
      <Typography
        variant="body1"
        className={classes.text + (more ? '' : ' ' + classes.limit)}
        style={{ marginTop: 10 }}
      >
        Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
        voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
        quasi ropeior architecto beatae vitae dicta sunt. Culpa qui officia deserunt mollit anim id est laborum Et harum
        quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
        nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
        repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
        voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut
        aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. am libero
        tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.
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
        {desc && <Typography className={classes.descText}>{desc}</Typography>}
      </Box>
    </Box>
  );
};

export default Event;
