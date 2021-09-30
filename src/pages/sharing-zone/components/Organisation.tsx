import { FC, useState } from 'react';
import { Button, Box, CardMedia, Grid, Typography } from '@material-ui/core';
import { AccessTime, ChevronLeft, ChevronRight } from '@material-ui/icons';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  images: string;
  organisation?: boolean;
}
const Organisation: FC<OrganisationProps> = ({ images, organisation }) => {
  const classes = useStyles();
  return (
    <Box style={{ padding: '0 40px', marginBottom: 30 }}>
      <CardMedia component="img" alt="" height="230px" image={images} />
      <Typography variant="h5" style={{ marginTop: 30 }}>
        Organisation 1
      </Typography>
      <Box className={classes.text} style={{ color: '#bfc4c9', fontSize: 12 }}>
        {organisation ? (
          <>
            <AccountCircleOutlinedIcon className={classes.icon}></AccountCircleOutlinedIcon>Organisation Type
          </>
        ) : (
          <Box style={{ color: '#333333' }}>
            <PersonIcon className={classes.icon}></PersonIcon>Name slfdsf
            <AccessTime className={classes.icon} style={{ marginLeft: 20 }}></AccessTime>19/05/2021
            <ForumIcon className={classes.icon} style={{ marginLeft: 20 }}></ForumIcon>10
            <VisibilityIcon className={classes.icon} style={{ marginLeft: 20 }}></VisibilityIcon>301
          </Box>
        )}
      </Box>
      <Typography variant="body1" className={classes.text + ' ' + classes.limit} style={{ marginTop: 10 }}>
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
    </Box>
  );
};

export default Organisation;
