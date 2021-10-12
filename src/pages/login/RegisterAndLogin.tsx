import { useState } from 'react';

import {
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  makeStyles, Box,
} from '@material-ui/core';

import Login from './components/Login';
import RegisterTabWrapper from './components/RegisterTabWrapper';

const useStyles = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
  left:{
    backgroundImage:'url(https://images.unsplash.com/photo-1622389084799-e2343c893b8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80)',
    backgroundPosition:'center',
    backgroundSize:'cover',
    display:'flex',
    alignItems:'center',
    flexDirection: 'column',
    color: 'white',
  },
  radio:{
    '& .MuiRadio-root':{
      color:'white',
    }, 
    '& .MuiRadio-colorSecondary.Mui-checked':{
      color:'#f50057',
    }, 
    '& .MuiTypography-body1':{
      fontSize: 24,
    },
  },
});

export default function RegisterAndLogin() {
  const classes = useStyles();
  const [currentTab, setTab] = useState('register');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTab((event.target as HTMLInputElement).value);
  };

  return (
    <div style={{ backgroundColor:'#f6f8f9', height:'100vh', fontFamily:'HelveticaNeue' }}>
      {/* Stylise the layout with attributes of `Grid`*/}
      <Grid container direction="row" spacing={4} style={{ margin:0, height:'100vh' }}>
        <Grid item xs={4} className={classes.left}>
          <FormControl component="fieldset" style={{ marginTop:'20vh' }}>
            {/* Stylise the radios with `classes` */}
            <Box style={{ fontSize:24 }}>LOGO</Box>
            <RadioGroup
              aria-label="tab"
              value={currentTab}
              onChange={handleChange}
            >
              <FormControlLabel
                style={{ margin: '10px -11px' }}
                className={classes.radio}
                value="login"
                control={<Radio />}
                label="Login"
              />
              <FormControlLabel
                className={classes.radio}
                value="register"
                control={<Radio />}
                label="Register"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={8} style={{ margin:0, padding:0 }}>
          {currentTab === 'login' ? (
            <Login goRegister={setTab} />
          ) : (
            <RegisterTabWrapper />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
