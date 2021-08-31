import { Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  'top-menu':{
    color: 'gray',
    fontSize: '14px',
    lineHeight: '30px',
    '& span':{
      display: 'inline-block',
      margin: '0 20px',
      cursor: 'pointer',
    },
    '& span:hover':{
      color: '#343638',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 50, background: '#f6f8f9', padding: '0 10px' }}>
      <h3 style={{ color: '#fa6980', fontSize: 13, flex: 1 }}>LOGO</h3>

      <Grid container>
        <Grid container item justifyContent="flex-start"></Grid>
        <Grid container item justifyContent="flex-end">
          <Grid item className={classes['top-menu']}>
            <span style={{ color:'#343638' }}>HOME</span>
            <span >OPPORTUNITIES</span>
            <span >ABOUT US</span>
          </Grid>
          <Grid item>
            <Avatar style={{ backgroundColor: 'orange', width: 30, height: 30, marginLeft:10 }}>N</Avatar>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
