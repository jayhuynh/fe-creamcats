import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Grid,
  Typography,
  Checkbox,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  makeStyles,
} from '@material-ui/core';

interface LoginInputForm {
  type: String;
  email: String;
  password: String;
  rememberMe: Boolean;
}

export const useStyle = makeStyles({
  // Define the styles here
  // Use ```className={classes.<style name>}``` in components to apply the styles
  radio:{
    flexDirection: 'row',

    '& .MuiFormControlLabel-root':{
      width: '48%',
    },
    '& .MuiFormControlLabel-label.Mui-disabled':{
      color:'#333',
    },
  },
  bold:{
    fontWeight:'bold',
  },
  input:{
    background:'white',
    marginTop:12,
    '& .MuiInputBase-input':{
      color:'#d5d5d5',
      borderColor:'#eaeaea',
    },
  },
  check:{
    '& .MuiSvgIcon-root path':{
      // color:'#eaeaea',
    },
  },
  text:{
    color:'#929699',
    display:'inline-block',
  },
  btn:{
    '&:hover':{
      color: '#fa6980',
    },
    cursor:'pointer',
    fontSize:14,
    fontWeight:'bold',
  },
  login: {
    boxShadow: 'none',
    background:'#fa6980',
    fontSize: 12,
    padding:'12px 45px',
    position:'relative',
    top:0,
  },
});

export default function Login(props: any) {
  const classes = useStyle();

  const { register, watch, handleSubmit, control, getValues } =
    useForm<LoginInputForm>({
      defaultValues: {
        type: 'Volunteer',
        email: '',
        password: '',
        rememberMe: false,
      },
    });

  const onSubmit = (data: LoginInputForm) => console.log(data);

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={6} style={{ width:'60vw', margin:'10vh auto 0', fontFamily:'HelveticaNeue' }}>
        <Grid item>
          <Typography style={{ fontSize:36, fontWeight:'bold' }}>Hello! Welcome back to our platform.</Typography>
          <Typography style={{ fontSize:48, fontWeight:'bold', color:'#fa6980' }}>Login Here</Typography>
        </Grid>
        <Grid item>
          <Controller
            control={control}
            defaultValue={getValues('type')}
            name="type"
            render={({ field }) => (
              <RadioGroup {...field} className={classes.radio}>
                <FormControlLabel
                  value="Volunteer"
                  control={<Radio />}
                  label="Volunteer"
                />
                <FormControlLabel
                  value="Organization"
                  control={<Radio />}
                  label="Organization"
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2} style={{ margin:0 }}>
                <Typography className={classes.bold}>Email</Typography>
                <TextField className={classes.input} required variant="outlined" type="email" {...register('email')} />
              </Grid>
            </Grid>
            <Grid item style={{ width: '47%' }}>
              <Grid container direction="column" spacing={2} style={{ margin:0 }}>
                <Typography className={classes.bold}>Password</Typography>
                <TextField required className={classes.input} variant="outlined" type="password" {...register('password')} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box style={{ padding:'0 12px' }}>
          <Checkbox className={classes.check} defaultChecked={false} {...register('rememberMe')} />
          <Box className={classes.text}>Remember me</Box>
        </Box>
        <Box style={{ display:'flex', alignItems:'flex-end', padding:'0 66px 0 16px', marginTop:'20vh' }}>
          <Box className={classes.text + ' ' + classes.btn}>Register now</Box>
          <Box className={classes.text + ' ' + classes.btn} style={{ marginLeft: 77 }}>Forget password?</Box>
          <Box style={{ flex:1 }}></Box>
          <Button
          className={classes.login}
                        variant="contained"
                        type="submit"
                        color="secondary">
                        Login
                      </Button>
        </Box>
      </Grid>
    </form>
  );
}