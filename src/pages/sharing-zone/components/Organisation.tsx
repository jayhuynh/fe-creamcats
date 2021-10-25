import { FC, useState } from 'react';
import { Button, Box, CardMedia, Grid, Typography } from '@material-ui/core';
import { AccessTime, ChevronLeft, ChevronRight } from '@material-ui/icons';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  limit: {
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    display: '-webkit-box;',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    overflow: 'hidden',
  },
}));

interface OrganisationProps {
  post: any
  organisation?: any
}
const Organisation: FC<OrganisationProps> = ({ post, organisation }: OrganisationProps) => {
  const classes = useStyles();
  return (
    <Box style={{ padding: '0 40px', marginBottom: 30 }}>
      <CardMedia component="img" alt="" height="230px" image={post.postCover} />
      <Typography variant="h5" style={{ marginTop: 30 }}>
        {post.title}
      </Typography>
      <Box className={classes.text} style={{ color: '#bfc4c9', fontSize: 12 }}>
        {organisation ? (
          <>
            <AccountCircleOutlinedIcon className={classes.icon}></AccountCircleOutlinedIcon>Organisation Type
          </>
        ) : (
          <Box style={{ color: '#333333' }}>
            <PersonIcon className={classes.icon}></PersonIcon>{post?.profile?.fullname}
            <AccessTime className={classes.icon} style={{ marginLeft: 20 }}></AccessTime>19/05/2021
            <ForumIcon className={classes.icon} style={{ marginLeft: 20 }}></ForumIcon>10
            <VisibilityIcon className={classes.icon} style={{ marginLeft: 20 }}></VisibilityIcon>301
          </Box>
        )}
      </Box>
      <Typography variant="body1" className={classes.text + ' ' + classes.limit} style={{ marginTop: 10 }}>
        {ReactHtmlParser(post.content)}
      </Typography>
    </Box>
  );
};

export default Organisation;
