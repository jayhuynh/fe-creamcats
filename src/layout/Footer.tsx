import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send, Public, Facebook, Twitter, Instagram } from '@material-ui/icons';
const useStyles = makeStyles(() => ({
  footer: {
    color: 'white',
    fontSize: '14px',
    lineHeight: '30px',
    padding: '58px 142px 0',
    height: '198px',
    background: '#a6adb4',
    boxSizing: 'border-box',
  },
  col: {
    display: 'inline-block',
    padding: '0 30px',
    verticalAlign: 'top',
    '& > div': {
      cursor: 'pointer',
      color: '#cbd0d3',
    },
    '& > div:hover': {
      color: 'white',
    },
  },
  input: {
    '& .MuiFormLabel-root': {
      color: '#cbd0d3',
      fontSize: '14px',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.1)',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
  icon:{
    color:'white',
    cursor: 'pointer',
    margin: '0 10px',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Grid container>
        <Grid item xs={6}>
          <div className={classes.col}>LOGO</div>
          <div className={classes.col}>
            <div>Home</div>
            <div>Help</div>
            <div>Contact</div>
          </div>
          <div className={classes.col}>
            <div>About us</div>
            <div>Team</div>
            <div>Guidlines</div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                className={classes.input}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Send fontSize="small" style={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Public fontSize="small" className={classes.icon} />
              <Facebook fontSize="small" className={classes.icon} />
              <Twitter fontSize="small" className={classes.icon} />
              <Instagram fontSize="small" className={classes.icon} />
            </Grid>
            <div style={{ color: '#cbd0d3', fontSize: 12 }}>Subscribe us to receive the latest news!</div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
