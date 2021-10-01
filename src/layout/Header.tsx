import { Avatar, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
const useStyles = makeStyles(() => ({
  'top-menu': {
    color: 'gray',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    flex:1,
    marginLeft: 40,
    fontWeight:'bold',
    
    '& span': {
      display: 'inline-block',
      margin: '0 20px',
      cursor: 'pointer',
    },
    '& span:hover': {
      color: '#343638',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Box style={{ fontFamily:'HelveticaNeue', display: 'flex', alignItems: 'center', height: 60, background: '#f6f8f9', padding: '0 60px' }}>
      <Typography style={{ color: '#fa6980', fontSize: 14, fontWeight:'bold' }}>LOGO</Typography>
      <Grid item className={classes['top-menu']}>
        <span style={{ color: '#343638' }}>
          <Typography style={{ fontWeight:'bold' }}>HOME</Typography>
        </span>
        <span>
          <Typography style={{ fontWeight:'bold' }}>OPPORTUNITIES</Typography>
        </span>
        <span>
          <Typography style={{ fontWeight:'bold' }}>Sharing Zone</Typography>
        </span>
      </Grid>
      <SearchIcon></SearchIcon>
      <NotificationsIcon style={{ marginLeft: 30 }}></NotificationsIcon>
      <Avatar style={{ backgroundColor: 'orange', width: 30, height: 30, marginLeft: 30 }}>N</Avatar>
    </Box>
  );
};

export default Header;
